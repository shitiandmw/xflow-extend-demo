import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Button , Form, Input, Select } from "antd"
import { SelectParams } from "../select-params"
import { COMPARISON_OPERATORS, VALUE_TYPES } from './consts'
import { DeleteOutlined } from "@ant-design/icons"

const EdgeConditionGroupConditionItem = ({ group_index, condition_index, field, onDel }) => {
    return <div className="flex gap-x-2 items-center">
        <div className="flex-1 overflow-hidden"><Form.Item name={[field.name, 'leftParam']} noStyle><SelectParams /></Form.Item></div>
        <Form.Item name={[field.name, "operator"]} noStyle>
            <Select style={{ width: "80px" }} options={COMPARISON_OPERATORS} />
        </Form.Item>
        <Form.Item name={[field.name, "valueType"]} noStyle>
            <Select con
                style={{ width: "100px" }} options={VALUE_TYPES} />
        </Form.Item>
        <div className="flex-1 overflow-hidden">
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => {
                return prevValues?.conditionGroups?.[group_index]?.conditions?.[condition_index]?.valueType !== currentValues?.conditionGroups?.[group_index]?.conditions?.[condition_index]?.valueType
            }}>
                {({ getFieldValue }) => {
                    const conditionGroups = getFieldValue("conditionGroups")
                    const valueType = conditionGroups[group_index].conditions[condition_index].valueType
                    if (valueType != "variable") return <Form.Item name={[field.name, "rightParam"]} noStyle><Input placeholder="请输入值" /></Form.Item>
                    else return <Form.Item name={[field.name, "rightParam"]} noStyle><SelectParams /></Form.Item>
                }}
            </Form.Item>

        </div>
        <div className=" rounded border border-dotted w-8 h-8 flex items-center justify-center cursor-pointer" onClick={onDel}><DeleteOutlined /></div>
    </div>
}


const EdgeConditionGroupCondition = ({fields, add, remove,group_index }) => {
    return <>
        {fields.map((condition,condition_index) => {
            return <EdgeConditionGroupConditionItem group_index={group_index} condition_index={condition_index} field={condition} onDel={()=>{ remove(condition_index) }} key={`item_${condition_index}`} />
        })}
        <div> <Button onClick={()=>{add({
            id: nanoid(),
            leftParam: "",
            operator: "==",
            valueType: "fixed",
            rightParam: ""
        })}} >添加条件</Button></div>
    </>
}

export { EdgeConditionGroupCondition }