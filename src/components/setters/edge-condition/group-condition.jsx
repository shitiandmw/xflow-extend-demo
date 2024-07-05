import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Button , Form, Input, Select } from "antd"
import { SelectParams } from "../select-params"
import { COMPARISON_OPERATORS, VALUE_TYPES } from './consts'
import { DeleteOutlined } from "@ant-design/icons"

const EdgeConditionGroupConditionItem = ({ group_index, condition_index, field, onDel }) => {
    
    const fetchGetParams = async () => {
        return [{
            name: "fieldsValue",
            label: "当前表单",
            columns: [
                {
                    "column_name": "id",
                    "label": "主键ID"
                },
                {
                    "column_name": "node_oclxe3zz073",
                    "label": "客户编号"
                },
                {
                    "column_name": "node_oclxe3zz072",
                    "label": "客户名称"
                },
                {
                    "column_name": "node_oclxe3zz074",
                    "label": "注册地址"
                },
                {
                    "column_name": "node_oclxe3zz075",
                    "label": "通讯地址"
                }
            ]
        }]
    }

    return <div className="flex gap-x-2 items-center">
        <div className="flex-1 overflow-hidden"><Form.Item name={[field.name, 'leftParam']} noStyle><SelectParams fetchGetParams={fetchGetParams}  /></Form.Item></div>
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
                    else return <Form.Item name={[field.name, "rightParam"]} noStyle><SelectParams fetchGetParams={fetchGetParams}  /></Form.Item>
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