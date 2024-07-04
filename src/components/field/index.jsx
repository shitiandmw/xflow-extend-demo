const Field = ( { label,prompt,children})=>{
    return (
        <div className="relative">
        {label && <div className='h-8 text-sm flex justify-between items-center'>{label}</div>}
        {prompt && <div className="text-xs text-gray-500 min-h-5 flex items-center">{prompt}</div>}
       
            {children}
    </div>
    )
}
export { Field }