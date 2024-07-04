import { Input, Select } from "antd";
import React, { useState } from "react";
const TimeoutSetter = ({ value, onChange }) => {
    const defaultValue = {
        value: 1,
        time: 1,
        unit: 2
    };
    const [valFormat, setValFormat] = useState(defaultValue);
    const handleChange = (value) => {
        setValFormat(prev => ({ ...prev, value }))
    }
    const handleUnitChange = (value) => {
        setValFormat(prev => ({ ...prev, unit: value }))
    }
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <Select onChange={handleChange} defaultValue={valFormat.value} options={[{ label: "不提醒", value: 1 }, { label: "提醒", value: 2 }]}></Select>

            {valFormat.value === 2 && <>
                <div>审批限时</div>
                <div className="flex gap-x-2 items-center" >
                    <Input type="number" value={valFormat.time} /> <Select onChange={handleUnitChange} defaultValue={valFormat.unit} style={{ width: 100 }} options={[{ label: "分钟", value: 1 }, { label: "小时", value: 2 }, { label: "天", value: 3 }]}></Select>
                </div>
            </>}
        </div>
    )
}

export { TimeoutSetter };