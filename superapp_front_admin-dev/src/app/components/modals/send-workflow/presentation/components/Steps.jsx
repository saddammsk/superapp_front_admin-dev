
const RenderStep = ({icon, isFirst, isActive, label, description}) =>{
    return (<div className="w-1/3">
    <div className="relative mb-2">
        {!isFirst&&<div className="absolute flex align-center items-center align-middle content-center" style={{width: "calc(100% - 5rem)", top: "50%", transform: "translate(-50%, -50%)"}}>
            <div className={`${isActive?'bg-green-2000': 'bg-gray-1000'} w-full rounded items-center align-middle align-center flex-1`}>
                <div className={`${isActive?'bg-green-2000': 'bg-gray-1000'} w-0 rounded`} style={{width: "100%", height: "0.2mm"}}></div>
            </div>
        </div>}
      <div className={`${isActive?'bg-green-2000':'bg-gray-1000'} text-white w-20 h-20 mx-auto rounded-full text-lg flex items-center`}>
        <span className={`${isActive?'text-white': 'text-gray-12000'} text-center w-full`}>
        {icon}
        </span>
      </div>
    </div>
    <div className={`${isActive?'text-green-2000':'text-black-3000'} text-xs text-center md:text-base font-semibold`}>{label}</div>
    <div className="text-xs text-center md:text-base">{description}</div>
  </div>)
}

export const Step = ({steps, currentStep}) =>{
    return <div className="w-full py-6 font-sans">
    <div className="flex">
        {steps.map((step, index)=>{
            return <RenderStep key={index} icon={step.icon} isFirst={index===0} isActive={(index+1)<=currentStep} label={step.label} description={step.description}/>
        })}
  
    </div>
    <center><div className="border-b w-11/12 mt-5"></div></center>
  </div>
}