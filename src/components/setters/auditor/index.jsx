import React, { useEffect, useState } from 'react'
import { Radio, Space } from 'antd'
import { isEqual } from 'lodash'
const auditorList = [
    { label: '指定人员', value: '1' },
    { label: '部门主管', value: '2' },
    { label: '逐级部门主管', value: '3' },
    { label: '指定部门主管', value: '4' },
    { label: '指定岗位', value: '5' },
    { label: '项目角色', value: '6' },
]
const AuditorSetter = ({ value, onChange }) => {
    const defaultValue = { value: "1", time: 0 };
    const [valFormat, setValFormat] = useState(defaultValue);
    const handleChange = (e) => {
        const newValue = { ...valFormat, value: e.target.value };
        setValFormat(newValue);
        setterChange(newValue);
    }

    const setterChange = (val) => {
        if (!isEqual(val, value)){
            onChange(val)
        }
    }
    useEffect(() => {
        if (value && typeof value == "string") {
            try {
                value = JSON.parse(value)
                return
            } catch { }
        }
        if (value)
            setValFormat(prev => ({ ...prev, ...value }))
    }, [value])
    return <>
        <Radio.Group onChange={handleChange} value={valFormat.value}>
            <Space direction="vertical">
                {auditorList.map(item => {
                    return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                })}
            </Space>
        </Radio.Group>
    </>
}

export { AuditorSetter } 