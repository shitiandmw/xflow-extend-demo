import React, { useState, useEffect } from 'react'
import { Card, Button,Form, Radio } from 'antd'
import { EdgeConditionGroupCondition } from './group-condition'
import { nanoid } from 'nanoid'
import { Field } from '../../field'
const EdgeConditionGroupItem = ({ field }) => {
    return <>
        <div className="flex flex-col gap-y-2">
            <Field label="组内条件关系" prompt="">
                <Form.Item name={[field.name, 'groupRelation']} noStyle>
                    <Radio.Group >
                        <Radio value="AND">并且</Radio>
                        <Radio value="OR">或者</Radio>
                    </Radio.Group>
                </Form.Item>
            </Field>
            <Field label="条件" prompt="">
                <div className="flex flex-col gap-y-2">
                    <Form.List name={[field.name, 'conditions']}>
                        {(subFields, { add, remove }) => (
                        <EdgeConditionGroupCondition group_index={field.name} fields={subFields} add={add} remove={remove} ></EdgeConditionGroupCondition>
                        )}
                    </Form.List>
                </div>
            </Field>
        </div>
    </>
}
const EdgeConditionGroup = ({ fields, add, remove }) => {
    return <>
        {fields.map((group, group_index) => {
            return <Card size="small" title="条件组1" extra={<Button type="link" onClick={() => { remove(group_index) }} danger>删除</Button>} key={`card_${group_index}`} >
                 <EdgeConditionGroupItem field={group} key={`item_${group_index}`}></EdgeConditionGroupItem>
            </Card>
        })}
        <div> <Button onClick={() => {
            add({
                id: nanoid(),
                groupRelation: "AND",
                conditions: []
            })
        }} >添加条件组</Button></div>
    </>
}

export { EdgeConditionGroup }