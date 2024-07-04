import { Form, Radio } from 'antd'
import { EdgeConditionGroupCondition } from './group-condition'
import { useEffect } from'react'
import { Field } from '../../field'

const EdgeConditionGroupItem = ({ value, onChange }) => {
    const [formRef] = Form.useForm()
    const handleFormChange = () => {
        onChange({ ...value, ...formRef.getFieldsValue() })
    }
    useEffect(() => {
        formRef.setFieldsValue(value || {})
    }, [value])

    return <Form form={formRef} onValuesChange={handleFormChange}  >
        <div className="flex flex-col gap-y-2">
            <Field label="组内条件关系" prompt="">
                <Form.Item name="groupRelation" noStyle>
                    <Radio.Group >
                        <Radio value="AND">并且</Radio>
                        <Radio value="OR">或者</Radio>
                    </Radio.Group>
                </Form.Item>
            </Field>
            <Field label="条件" prompt="">
                <div className="flex flex-col gap-y-2">
                    <Form.Item name="conditions" noStyle>
                        <EdgeConditionGroupCondition></EdgeConditionGroupCondition>
                    </Form.Item>
                </div>

            </Field>
        </div>
    </Form>
}
export { EdgeConditionGroupItem }