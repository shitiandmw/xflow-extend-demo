import { InputNumber, Radio } from 'antd';
import { useEffect, useState } from 'react';
const SequentialDeptLeader = ({ value, onChange }) => {
    const handleTypeChange = (e) => {
        onChange({...value,type:e.target.value})
    }
    const handleLevelChange = (level) => {
        onChange({...value,level:level})
    }
    return <>
        <div>部门层级终点</div>
        <Radio.Group onChange={handleTypeChange} value={value?.type}>
            <div className="flex flex-col w-full">
                <div className="h-8 flex items-center">
                    <Radio value={"1"}>直到顶级部门</Radio>
                </div>
                <div className="h-8 flex items-center">
                    <Radio value={"2"}>向上指定级别为止</Radio>
                    <InputNumber className=' flex-1' value={value?.level} onChange={handleLevelChange} />
                </div>
            </div>
        </Radio.Group>
    </>
}
export { SequentialDeptLeader }