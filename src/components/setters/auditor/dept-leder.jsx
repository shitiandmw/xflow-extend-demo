import { InputNumber  } from "antd"

const DeptLeader = ({value, onChange}) => {
    return <>
        <div className=" flex flex-col gap-1">
            指定主管级别
            <div className=" text-xs text-gray-500">从发起人部门的向上第x级主管，0级开始</div>
        </div>
        <InputNumber value={value} onChange={onChange} style={{width: '100%'}} />
    </>
}
export { DeptLeader }