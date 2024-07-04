import { DeleteOutlined } from "@ant-design/icons"
import { Form, Radio, Modal, Button, Card, Select, Input } from "antd"
import {COMPARISON_OPERATORS, VALUE_TYPES } from './consts'
import React, { useEffect } from "react"
import { SelectParams } from "../select-params"

const EdgeConditionGroupConditionItem = ({ value, onChange, onDel }) => {
    const [formRef] = Form.useForm()
    const handleFormChange = () => {
        onChange({ ...value, ...formRef.getFieldsValue() })
    }
    useEffect(() => {
        formRef.setFieldsValue(value || {})
    }, [value])

    // return <div className="flex gap-x-2 items-center">  1111</div>
    return <Form form={formRef} onValuesChange={handleFormChange}>
        <div className="flex gap-x-2 items-center">
            <div className="flex-1 overflow-hidden"><Form.Item name="leftParam" noStyle><SelectParams /></Form.Item></div>
            <Form.Item name="operator" noStyle>
                <Select style={{ width: "80px" }} options={COMPARISON_OPERATORS} />
            </Form.Item>
            <Form.Item name="valueType" noStyle>
                <Select con
                    style={{ width: "100px" }} options={VALUE_TYPES} />
            </Form.Item>
            <div className="flex-1 overflow-hidden">
                <Form.Item name="rightParam" noStyle dependencies={['valueType']}>
                    {formRef.getFieldsValue()?.valueType != "variable" ?  <Input placeholder="请输入值" />:<SelectParams />}
                </Form.Item>

            </div>
            <div className=" rounded border border-dotted w-8 h-8 flex items-center justify-center cursor-pointer" onClick={onDel}><DeleteOutlined /></div>
        </div>
    </Form>
}

export {EdgeConditionGroupConditionItem} 