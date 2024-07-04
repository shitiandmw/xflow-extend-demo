import React, { useState } from 'react';
import { Switch , Select } from 'antd';
const ReverseSetter = ({ value, onChange }) => {
    const [valFormat, setValFormat] = useState({ value: false, time: 0 });
    const handleChange = (value) => {
        setValFormat(prev => ({ ...prev, value: value }));
    }
    const handleTimeChange = (value) => {
        setValFormat(prev => ({ ...prev, time: value }));
    }
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className=' text-xs text-gray-500'>若单据已被调用，则无法反审</div>
            <div className='w-16'><Switch value={valFormat.value} onChange={handleChange} /></div>
            {valFormat.value && <>
                <div className=''>反审限时</div>
                <Select onChange={handleTimeChange} defaultValue={valFormat.time} options={[{ label: "不限时", value: 0 }, { label: "当天", value: 1 }, { label: "当月", value: 2 }, { label: "当年", value: 3 }]}></Select>
            </>}
        </div>
    )
}

export { ReverseSetter };