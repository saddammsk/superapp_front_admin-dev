import { getDecodedToken } from '@/utils/utils';
import axios from 'axios';

const baseUrl = `https://super.xertify.co:40002`
const headers = {
  "Content-Type": "application/json",
};

export const getAllWorkflowByAccId = async () => {
  try {
    const decodedToken = getDecodedToken();
    const accId = decodedToken.acc_id;
    console.log(accId)
    console.log(`${baseUrl}/workflow/v1/users/ByAccId?accId=${accId}`)
    const response = await axios.get(`${baseUrl}/workflow/v1/users/ByAccId?accId=${accId}`, { headers: headers });
    return response;
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
};

export const createWorkflow = async (workflow_key, name) => {
  try {
    const decodedToken = getDecodedToken();
    const accId = decodedToken.acc_id;
    console.log(accId)
    console.log(`${baseUrl}/workflow/v1/createWorkflow`)
    const response = await axios.post(`${baseUrl}/workflow/v1/createWorkflow`, {
      acc_id: accId,
      workflow_key,
      name
    }, { headers: headers });
    return response;
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
};

export const getWorkflowByWorkflowUserId = async (workflow_user_id) => {
  try {
    console.log(`${baseUrl}/workflow/v1/users/getBlocks/${workflow_user_id}`)
    const response = await axios.get(`${baseUrl}/workflow/v1/users/getBlocks/${workflow_user_id}`, { headers: headers });
    return response;
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
};

export const getBlockById = async (blockId, type, status_block, id) => {
  try {
    let response = null;
    if(type == 'form'){
      response = await axios.get(`${baseUrl}/workflow/v1/forms/${blockId}`, { headers: headers });
      if(status_block == 'SUBMITTED' || status_block == 'CORRECTED' || status_block == 'ToBeCORRECTED'){
        let answers = await getAnswerByBlockId(id)
        answers = answers.data.data.value
        response = {...response}
        let newAnswers = {};
        answers.map((item)=>{
          newAnswers[item.key] = item.value;
        })
        response.data.data.formFields = response.data.data.formFields.map((item)=>{
          return {
            ...item,
            value: newAnswers[item.key]
          }
        })
      }
    }
    if(type == 'document'){
      response = await axios.get(`${baseUrl}/workflow/v1/documents/${blockId}`, { headers: headers });
    }
    if(type == 'attachment'){
      response = await axios.get(`${baseUrl}/workflow/v1/attachment/${blockId}`, { headers: headers });
      if(status_block == 'SUBMITTED' || status_block === 'REJECTED'){
        let answers = await getAnswerByBlockId(id)
        answers = answers.data.data.value
        response = {...response}
        let newAnswers = {};
        answers.map((item)=>{
          newAnswers[item.keyName] = item;
        })
        response.data.data.attachments = response.data.data.attachments.map((item)=>{
          return {
            ...item,
            savedValue: newAnswers[item.key]
          }
        })
      }
    }
    if(type == 'notification'){
      response = await axios.get(`${baseUrl}/workflow/v1/notification/${blockId}`, { headers: headers });
    }
    if(type == 'staticContent'){
      response = await axios.get(`${baseUrl}/workflow/v1/static-content/${blockId}`, { headers: headers });
    }
    if(response == null) throw new Error('Error');
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const SaveAnswersBlockForm = async (answer) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/forms/create-form-answers`, answer,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const SaveAnswersBlockAttachment = async (answer) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/attachment`, answer,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getAnswerByBlockId = async (blockId) => {
  try {
    const response = await axios.get(`${baseUrl}/workflow/v1/users/answers/${blockId}`,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const UpdateRevisorStatus = async (blockId, status) => {
  try {
    const response = await axios.put(`${baseUrl}/workflow/v1/users/updateRevisorstatus/${blockId}`,{
      revision_status: status
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const UpdateStatusAttachment = async (key, label, status, wf_user_id, message, deadline) => {
  try {
    const response = await axios.put(`${baseUrl}/workflow/v1/attachment/updateStatus/${wf_user_id}`,{
      keyName: key,
      fileName: label,
      status: status,
      message: message,
      deadline: deadline
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const createBlockTypeDocument = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/documents/instruction`,body,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const createBlockTypeAttachment = async (wf_id, key, label, order, required) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/block/${wf_id}`, {
      key,
      label,
      order: Number(order),
      type: "attachment",
      required
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const createBlockTypeForm = async (wf_id, key, label, order, required) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/block/${wf_id}`, {
      key,
      label,
      order: Number(order),
      type: "form",
      required
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const createBlockTypeStaticContent = async (wf_id, key, label, order, default_language, content, required) => {
  try {
    const response = await axios.post(`${baseUrl}/workflow/v1/block/${wf_id}`, {
      key,
      label,
      order: Number(order),
      type: "staticContent",
      default_language,
      content,
      required
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getSavedFileByBlockID = async (block_id) => {
  try {
    const response = await axios.post(`https://super.xertify.co:40002/workflow/v1/users/generateDocument`, {
      wfUserBlockId: block_id,
    },{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const sendManuallyWorkflow = async (body) => {
  try {
    const response = await axios.post(`https://super.xertify.co:40002/workflow/v1/users/create-wf-individual`, body,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getAllResponsiblesByWfUserId = async (wf_user_id) => {
  try {
    const response = await axios.get(`${baseUrl}/workflow/v1/users/getAllresponsible/${wf_user_id}`, { headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getParticipantsByWfUserBlockId = async (wf_user_block_id) => {
  try {
    const response = await axios.get(`https://super.xertify.co:40002/workflow/v1/users/getParticipantsByWfUserBlockId/${wf_user_block_id}`);
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getSubmittedDateByWfUserBlockId = async (wf_user_block_id) => {
  try {
    let response = null;
    let answers = await getAnswerByBlockId(wf_user_block_id);
    response = answers.data.data.date
    if(response == null) throw new Error('Error');
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const sendRejectWorkflow = async (id,body) => {
  try {
    const response = await axios.put(`https://super.xertify.co:40002/workflow/v1/users/updateRevisorstatus/${id}`, body,{ headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const sendNextWorkflowCreate = async (body) => {
  try {
    const response = await axios.post(`https://super.xertify.co:40002/workflow/v1/users/create-next-wf-user`, body, { headers: headers });
    return response
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}