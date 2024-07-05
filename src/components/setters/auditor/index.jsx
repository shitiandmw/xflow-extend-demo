import React, { useEffect, useState } from 'react'
import { Button, Radio, Space, Tag } from 'antd'
import { isEqual } from 'lodash'
import { DeptUser } from '../../dept-user'
import { SpecifiedUsers } from './specified-users'
import {DeptLeader} from "./dept-leder"
import {SequentialDeptLeader} from "./sequential-dept-leader"
const auditorList = [
    { label: '指定人员', value: '1' },
    { label: '部门负责人', value: '2' },
    { label: '逐级部门负责人', value: '3' },
    { label: '指定部门负责人', value: '4' },
    { label: '指定岗位', value: '5' },
    { label: '项目角色', value: '6' },
    { label: '由申请人自选', value: '7' },
]
const AuditorSetter = ({ value, onChange }) => {
    const defaultValue = {
        value: "1",
        time: 0,
        // 指定人员
        specified_users: [],
        // 部门负责人
        dept_leader: 0,
        // 逐级部门负责人
        sequential_dept_leader:{
            type:1,
            level:0
        },
        // 指定部门负责人
        specified_dept_leader: [],
        // 指定岗位
        specified_position: [],
        // 项目角色
        project_role: {
            column_name: "",
            roles:[]
        },
    };
    const [valFormat, setValFormat] = useState(defaultValue);
    const handleChange = (e) => {
        const newValue = { ...valFormat, value: e.target.value };
        setterChange(newValue);
    }

    const setterChange = (val) => {
        if (!isEqual(val, value)) {
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
    return <div className='flex flex-col gap-y-2'>
        <Radio.Group onChange={handleChange} value={valFormat.value}>
            <Space direction="vertical">
                {auditorList.map(item => {
                    return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                })}
            </Space>
        </Radio.Group>
        {valFormat?.value === "1" && <SpecifiedUsers value={valFormat?.specified_users} onChange={(users)=>{
            const newValue = { ...valFormat, specified_users: users };
            setterChange(newValue);
        }} />}
        {valFormat?.value === "2" && <DeptLeader value={valFormat?.dept_leader} onChange={(value)=>{
            if (value <0) return 
            const newValue = { ...valFormat, dept_leader: value };
            setterChange(newValue);
        }} />}
        {valFormat?.value === "3" && <SequentialDeptLeader value={valFormat?.sequential_dept_leader} onChange={(value)=>{
            const newValue = { ...valFormat, sequential_dept_leader: value };
            console.log("SequentialDeptLeader",newValue)
            setterChange(newValue);
            // setterChange({ ...valFormat, sequential_dept_leader: value });
        }} />}
    </div>
}

export { AuditorSetter } 