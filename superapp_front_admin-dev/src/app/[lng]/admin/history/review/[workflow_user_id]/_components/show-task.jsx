"use client"

import { InputText } from "@/app/components/inputs/input-text";
import { InputNumber } from "@/app/components/inputs/input-number";
import { InputDate } from "@/app/components/inputs/input-date";
import { InputSelect } from "@/app/components/inputs/input-select";
import { useWorkflowStore } from "@/store/WorkflowStore";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { Button } from "@/app/components/buttons/button";
import { getDecodedToken } from "@/utils/utils";
import { SaveAnswersBlockAttachment, SaveAnswersBlockForm, UpdateRevisorStatus, sendRejectWorkflow } from "@/services/WorkflowService";
import { UploadFile } from "@/services/FileManagerService";
import { ReviewDocument } from "./review-document";
import { getSavedFileByBlockID } from "@/services/WorkflowService"
import { toast } from "react-toastify";

export const ShowTask = ({ lng, setPreview }) => {

    const {currentBlock, currentWorkflowTask, updateCurrentWorkflowTaskStatus, updateStatusAttachment} = useWorkflowStore((state) => ({
        currentBlock: state.currentBlock,
        currentWorkflowTask: state.currentWorkflowTask,
        updateCurrentWorkflowTaskStatus: state.updateCurrentWorkflowTaskStatus,
        updateStatusAttachment: state.updateStatusAttachment
      }));
    
    //Generate useState


    const [data, setData] = useState({})
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        let state = {}
        let error = {}
        if(currentBlock?.type === "form"){
            currentBlock.formFields.map((item)=>{
                error[item.key] = null
                switch (item.type) {
                    case "number":
                        state[item.key] = Number(item.value) || 0
                        break;
                    case "date":
                        state[item.key] = item.value || new Date()
                        break;
                    case "text":
                        state[item.key] = item.value || ""
                        break;
                    case "selectOne":
                        state[item.key] = item.value?{value: item.value, label: item.value} : null
                        break;
                    case "selectMany":
                        state[item.key] = item.value?JSON.parse(item.value).map((item)=>{return {value: item, label: item}}): []
                        break;
                    default:
                        state[""] = item.value || ""
                        break;
                }
            })
        }
    
        if(currentBlock?.type === "attachment"){
            currentBlock.attachments.map((item)=>{
                error[item.key] = null
                state[item.key] = null
            })
        }

        if(currentBlock?.type === "document"){
            getSavedFileByBlockID(currentWorkflowTask.id).then((response)=>{
                if(response.data.success){
                    setData(response.data.data)
                }
            })
        }
        setData(state)
        setErrors(error)
    }, [currentBlock])

    
    const changeValueInState = (key, value) => {
        let _data = {...data}
        _data[key] = value
        setData(_data)
    }

    const validateAnswer = () => {
        setErrors(error);
        let currentErrors = {...error};
        let isValid = true
        if(currentBlock.type == "form"){
            currentBlock.formFields.map((item)=>{
                if(item.restrictions.required){
                    if(!data[item.key]){
                        isValid = false
                        currentErrors[item.key] = `${item.label} is required*`
                    }
                } 
            })
        }

        if(currentBlock.type == "attachment"){
            currentBlock.attachments.map((item)=>{
                if(!(Array.isArray(data[item.key]) && data[item.key][0] != null && data[item.key][0] != undefined)){
                    isValid = false
                    currentErrors[item.key] = `the file of ${item.label} is not selected`
                }
            })
        }
        setErrors(currentErrors)
        return isValid
    }
    const structureAnswer = async () => {
        const decodedToken = getDecodedToken();
        if(currentBlock.type == "form"){
            return {
                acc_id: decodedToken.acc_id,
                staff_id: decodedToken.staff_id,
                workflow_id: currentWorkflowTask.workflow_id,
                wf_user_block_id: currentWorkflowTask.id,
                workflow_key: currentWorkflowTask.workflow_key,
                block_key: currentWorkflowTask.block_key,
                block_id: currentWorkflowTask.block_id,
                type: currentBlock.type,
                order: currentBlock.order,
                sub_type: "text",
                status: "SUBMITTED",
                date: new Date().toISOString(),
                value: currentBlock.formFields.map((item)=>{
                    if(item.type === "number"){
                        return {
                            key: item.key,
                            value: String(data[item.key]),
                            type: item.type
                        }
                    }
                    if(item.type === "text"){
                        return {
                            key: item.key,
                            value: data[item.key],
                            type: item.type
                        }
                    }
                    if(item.type === "date"){
                        return {
                            key: item.key,
                            value: data[item.key],
                            type: item.type
                        }
                    }
                    if(item.type === "selectOne"){
                        return {
                            key: item.key,
                            value: data[item.key]?data[item.key].value : "",
                            type: item.type
                        }
                    }
                    if(item.type === "selectMany"){
                        return {
                            key: item.key,
                            value: JSON.stringify(data[item.key].map((it)=>{
                                return it.value
                            })),
                            type: item.type
                        }
                    }
                    if(item.type === "calculated"){
                        let formFieldRestrictions = currentBlock.formFields.find((field)=> field.key == item.key).restrictions;
                        let operands = []
                        //Search operands
                        formFieldRestrictions.operands.map((operand)=>{
                            if(data[operand]!== undefined && data[operand] !== null){
                                operands.push(Number(data[operand]))
                                return operand
                            }
                            if(formFieldRestrictions[operand]!== undefined && formFieldRestrictions[operand] !== null){
                                operands.push(Number(formFieldRestrictions[operand]))
                                return operand
                            }
                            return operand
                        })
                        let result = 0
                        switch (formFieldRestrictions.operation) {
                            case "addition":
                                result = operands.reduce((total, number) => total + number, 0);
                                break;
                        }
                        return {
                            key: item.key,
                            value: String(result),
                            type: item.type
                        }
                    }
                    
                })
            }
        }

        if(currentBlock.type === "attachment"){
            //save images
            let files = {}
            await Promise.all(currentBlock.attachments.map(async (item)=>{
                let savedFile = await UploadFile(data[item.key][0], item.file_path);
                files[item.key] = {...savedFile.data, uploadedTime: new Date}
            }))

            //Generate answer
            return {
                acc_id: decodedToken.acc_id,
                staff_id: decodedToken.staff_id,
                workflow_id: currentWorkflowTask.workflow_id,
                workflow_key: currentWorkflowTask.workflow_key,
                block_key: currentWorkflowTask.block_key,
                block_id: currentWorkflowTask.block_id,
                wf_user_block_id: currentWorkflowTask.id,
                type: currentBlock.type,
                order: currentBlock.order,
                sub_type: "pdf",
                status: "SUBMITTED",
                value: currentBlock.attachments.map((it)=>{
                    return {
                        "filePath": files[it.key].key,
                        "uploadedTime": files[it.key].uploadedTime.toISOString(),
                        "userId": "user124",
                        "keyName": it.key,
                        "fileType": data[it.key][0].type
                    }
                })                
            }


        }
        return null
    }


    const saveBlock = async () => {
        let isValid = validateAnswer();
        if(!isValid) return;
        const answer = await structureAnswer();
        if(currentBlock.type == "form"){
            SaveAnswersBlockForm(answer).then((response)=>{
                toast.success(`Block Form Saved Successfull!`);
            }).catch((error)=>{
                toast.error(`Error to saved the Block Form :(`)
            })
        }
        if(currentBlock.type == "attachment"){
            SaveAnswersBlockAttachment(answer).then((response)=>{
                toast.success(`Block Attachment Saved Successfull!`);
            }).catch((error)=>{
                toast.error(`Error to saved the Block Attachment :(`)
            })
        }
    }

    const updateBlocksAndToBeCORRECTED = async (keyName, label, type, currentWorkflowTaskID, message, deadline) => {
        try {
            updateStatusAttachment(keyName, label, type, currentWorkflowTaskID, message, deadline)
            updateCurrentWorkflowTaskStatus(currentWorkflowTask?.id, "REJECTED", "ToBeCORRECTED")
        } catch (error) {
            console.log(error)
        }
    }

    if(currentBlock.type === "form"){
        return <div className="block md:grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 border rounded-lg p-4">
            {
                currentBlock.formFields.sort((a, b) => a.order - b.order).map((item, number)=>{
                    if(item.type === "text") return <div className="mb-4 md:mb-0" key={number}>
                        <InputText key={number}
                        label={`${item.label} ${item.restrictions.required?'*': ''}`}
                        placeholder={item.label}
                        value={data[item.key]}
                        minLength={item.restrictions.minLength}
                        maxLength={item.restrictions.maxLength}
                        onChange={(val)=>changeValueInState(item.key, val)}
                        error={errors[item.key]}
                        disabled={true}
                        />
                    </div>

                    if(item.type === "number") return <div className="mb-4 md:mb-0" key={number}>
                        <InputNumber key={number}
                        label={`${item.label} ${item.restrictions.required?'*': ''}`}
                        placeholder={item.label}
                        value={data[item.key]}
                        minValue={item.restrictions.minValue}
                        maxValue={item.restrictions.maxValue}
                        onChange={(val)=>changeValueInState(item.key, val)}
                        error={errors[item.key]}
                        disabled={true}
                        />
                    </div>
                    if(item.type === "date") return <div className="mb-4 md:mb-0" key={number}>
                        <InputDate key={number}
                        label={`${item.label} ${item.restrictions.required?'*': ''}`}
                        placeholder={item.label}
                        value={data[item.key]}
                        maxDate={item.restrictions.maxDate}
                        minDate={item.restrictions.minDate}
                        onChange={(val)=>changeValueInState(item.key, val)}
                        error={errors[item.key]}
                        disabled={true}
                        />
                    </div>
                    if(item.type === "selectOne"){
                        const options = currentBlock.formFields.find((field)=> field.key == item.key).restrictions.options.map((option)=>{
                            return {
                                value: option,
                                label: option
                            }
                        })
                        return <div className="mb-4 md:mb-0" key={number}>
                            <InputSelect key={number}
                            label={`${item.label} ${item.restrictions.required?'*': ''}`}
                            placeholder={item.label}
                            value={data[item.key]}
                            options={options}
                            onChange={(event)=>changeValueInState(item.key, event)}
                            error={errors[item.key]}
                            disabled={true}
                            />
                        </div>
                    }

                    if(item.type === "selectMany"){
                        const options = currentBlock.formFields.find((field)=> field.key == item.key).restrictions.options.map((option)=>{
                            return {
                                value: option,
                                label: option
                            }
                        })
                        return <div className="mb-4 md:mb-0" key={number}>
                            <InputSelect key={number}
                            label={`${item.label} ${item.restrictions.required?'*': ''}`}
                            placeholder={item.label}
                            value={data[item.key]}
                            options={options}
                            multi={true}
                            onChange={(event)=>changeValueInState(item.key, event)}
                            error={errors[item.key]}
                            disabled={true}
                            />
                        </div>
                    }

                    if(item.type === "calculated"){
                        let formFieldRestrictions = currentBlock.formFields.find((field)=> field.key == item.key).restrictions;
                        let operands = []
                        //Search operands
                        formFieldRestrictions.operands.map((operand)=>{
                            if(data[operand]!== undefined && data[operand] !== null){
                                operands.push(Number(data[operand]))
                                return operand
                            }
                            if(formFieldRestrictions[operand]!== undefined && formFieldRestrictions[operand] !== null){
                                operands.push(Number(formFieldRestrictions[operand]))
                                return operand
                            }
                            return operand
                        })
                        let result = 0
                        switch (formFieldRestrictions.operation) {
                            case "addition":
                                result = operands.reduce((total, number) => total + number, 0);
                                break;
                        }
                        return <div className="mb-4 md:mb-0" key={number}>
                            <InputText key={number}
                            label={item.label}
                            placeholder={item.label}
                            value={result}
                            disabled={true}
                            />
                        </div>
                    }

                    return <></>
                })
            }
            <div className="col-span-2 flex gap-3 justify-end">
            {
                currentWorkflowTask.revision_status == "PENDING" && <><Button onClick={()=>{
                    UpdateRevisorStatus(currentWorkflowTask.id, "REJECTED").then((data)=>{
                        toast.success("Update Revision Status succesfully")
                        updateCurrentWorkflowTaskStatus(currentWorkflowTask.id, "REJECTED")
                    })
                }}>
              Reject
            </Button>
            <Button variant="success" onClick={()=>{
                    UpdateRevisorStatus(currentWorkflowTask.id, "APPROVED").then((data)=>{
                        toast.success("Update Revision Status succesfully")
                        updateCurrentWorkflowTaskStatus(currentWorkflowTask.id, "APPROVED")
                    })
                }}>
                      Approve
        </Button>
                    </>
            }
      </div>
        </div>
    }

    if(currentBlock.type === "attachment"){
        return <div className="grid grid-cols-3 gap-5 border rounded-lg p-4">
            {
                currentBlock.attachments.sort((a, b) => a.order - b.order).map((item, number)=>{
                    return (<ReviewDocument
                        key={number}
                        title={item.label}
                        value={data[item.key]}
                        onAprove={()=>{updateStatusAttachment(item.savedValue.keyName, item.label, "ACCEPTED", currentWorkflowTask.id)}}
                        onReject={(message, deadline)=>{updateBlocksAndToBeCORRECTED(item.savedValue.keyName, item.label, "ToBeCORRECTED", currentWorkflowTask.id, message, deadline)}}
                        multiple={false}
                        accepts={JSON.parse(item.allowed_file_types)}
                        fileSize={item.max_size}
                        error={errors[item.key]}
                        savedValue={item.savedValue}
                        deadLine={currentWorkflowTask?.deadline}
                        disabled={true}
                        setPreview={()=>{
                            setPreview(item.savedValue)
                        }}
                    />)
                })
            }
            <div className="col-span-3 flex gap-3 justify-end">
            {
                currentWorkflowTask.revision_status == "PENDING" && <><Button onClick={()=>{
                    UpdateRevisorStatus(currentWorkflowTask.id, "REJECTED").then((data)=>{
                        toast.success("Update Revision Status succesfully")
                        updateCurrentWorkflowTaskStatus(currentWorkflowTask.id, "REJECTED")
                    })
                }}>
              Reject
            </Button>
            <Button variant="success" onClick={()=>{
                    UpdateRevisorStatus(currentWorkflowTask.id, "APPROVED").then((data)=>{
                        toast.success("Update Revision Status succesfully")
                        updateCurrentWorkflowTaskStatus(currentWorkflowTask.id, "APPROVED")
                    })
                }}>
                      Approve
        </Button>
                    </>
            }
      </div>
        </div>
    }

    if(currentBlock.type === "staticContent"){
        return <div className="grid grid-cols-1 gap-5 border rounded-lg p-4">
            <div dangerouslySetInnerHTML={{__html: currentBlock.content[lng]}}></div>
        </div>
    }

    if(currentBlock.type === "document"){
        return <div className="grid grid-cols-1 gap-5 border rounded-lg p-4">
            {data !== null && typeof data === 'object' ? (
                Object.keys(data).length === 0 ? (
                    <div className="flex justify-center w-full font-bold">Cargando...</div>
                ) : data.success === false ? (
                    <div className="flex justify-center w-full font-bold">Pendiente por respuestas</div>
                ) : (
                    <div className="flex justify-center w-full font-bold">Pendiente por respuestas</div>
                )
            ) : typeof data === 'string' ? (
                <iframe title="document" src={`data:application/pdf;base64,${data}`} frameBorder={0} height={800} className="w-full"/>
            ) : (
                <div className="flex justify-center w-full font-bold">Pendiente por respuestas</div>
            )}
         </div>
    }
  };