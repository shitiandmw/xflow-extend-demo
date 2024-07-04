import { Form, Radio } from 'antd'
import { Field } from '../../field'
import { EdgeConditionGroup } from './group'
import { nanoid } from 'nanoid'
import React,{ forwardRef, useEffect, useRef, useState } from'react'

const defaultValue = {
    conditionGroupRelation: "AND",
    conditionGroups: [
        {
            id: nanoid(),
            groupRelation: "AND",
            conditions: [
                {
                    id: nanoid(),
                    leftParam: "",
                    operator: "==",
                    valueType: "fixed",
                    rightParam: ""
                }
            ],
        }
    ]
}
const EdgeCondition =  forwardRef(({value},ref) => {
    const [formRef] = Form.useForm()
    const conditionValue= useRef()
    React.useImperativeHandle(ref, () => ({
        getValue:() => {
            return conditionValue.current
        }
    }), []);

    const handleFormChange = () => {
        const formValues = formRef.getFieldsValue()
        conditionValue.current = {...conditionValue.current,...formValues}
        console.log("handleFormChange conditionValue.current",conditionValue.current)
    }


    useEffect(() => {
        const formValues =  {...defaultValue,...(value || {})}
        console.log("setValue formValues",formValues)
        formRef.setFieldsValue(formValues)
        conditionValue.current = formValues
    },[value])


    return <Form form={formRef} onValuesChange={handleFormChange}>
        <div className="flex flex-col gap-y-4">
            <Field label="条件组关系">
                <Form.Item name="conditionGroupRelation" noStyle>
                    <Radio.Group >
                        <Radio value="AND">并且</Radio>
                        <Radio value="OR">或者</Radio>
                    </Radio.Group>
                </Form.Item>
            </Field>
            <Form.Item name="conditionGroups" noStyle>
                <EdgeConditionGroup></EdgeConditionGroup>
            </Form.Item>

        </div>
    </Form>
}
)
export { EdgeCondition }