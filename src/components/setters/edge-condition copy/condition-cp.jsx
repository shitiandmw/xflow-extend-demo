import { Form, Radio } from 'antd'
import { Field } from '../../field'
import { EdgeConditionGroup } from './group'
import { nanoid } from 'nanoid'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

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
const EdgeCondition = forwardRef(({ value }, ref) => {
    const conditionValue = useRef()
    const [condition, setCondition] = useState()
    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return conditionValue.current
        }
    }), []);

    useEffect(() => {
        const formValues = { ...defaultValue, ...(value || {}) }
        conditionValue.current = formValues
        setCondition(formValues)
    }, [value])

    const handleRelationChange = (value) => {
        console.log("handleRelationChange value", value)
        conditionValue.current.conditionGroupRelation = value
        setCondition({ ...conditionValue.current })
    }

    const handleGroupChange = (value) => {
        console.log("handleGroupChange value", value)
        conditionValue.current.conditionGroups = value
        setCondition({ ...conditionValue.current })
    }

    return condition ? <div className="flex flex-col gap-y-4">
        <Field label="条件组关系">
            <Radio.Group value={condition.conditionGroupRelation} onChange={handleRelationChange}>
                <Radio value="AND">并且</Radio>
                <Radio value="OR">或者</Radio>
            </Radio.Group>
        </Field>
        <EdgeConditionGroup value={condition.conditionGroups} onChange={handleGroupChange}></EdgeConditionGroup>

    </div> : null

}
)
export { EdgeCondition }