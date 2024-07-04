import React, { useState, useEffect } from'react'
import { Card, Button } from 'antd'
import { nanoid } from 'nanoid'
import { EdgeConditionGroupItem } from './group-item'

const EdgeConditionGroup = ({ value, onChange }) => {
    const [groups, setGroups] = useState([])
    useEffect(() => {
        setGroups(value || [])
    }, [value])

    const handleConditionGroupsDelete = (id) => {
        onChange(value.filter(group => group.id !== id))
    }
    const handleGroupChange = (value) => {
        const values = groups.map(group => {
            if (group.id == value.id) {
                return value
            }
            return group
        })
        onChange(values)
    }
    const handleConditionGroupsAdd = () => {
        const newGroup = {
            id: nanoid(),
            groupRelation: "AND",
            conditions: []
        }
        onChange([...value, newGroup])
    }
    return <>
        {groups.map(group => {
            return <Card size="small" title="条件组1" extra={<Button type="link" onClick={() => { handleConditionGroupsDelete(group.id) }} danger>删除</Button>} key={group.id} >
                <EdgeConditionGroupItem value={group} onChange={handleGroupChange}></EdgeConditionGroupItem>
            </Card>

        })}

        <div> <Button onClick={handleConditionGroupsAdd} >添加条件组</Button></div>
    </>

}

export { EdgeConditionGroup }