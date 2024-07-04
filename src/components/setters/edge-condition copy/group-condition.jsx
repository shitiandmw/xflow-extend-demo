import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Button } from "antd"
import { EdgeConditionGroupConditionItem } from "./group-condition-item"


const EdgeConditionGroupCondition = ({ value, onChange }) => {
    const [conditions, setConditions] = useState([])
    const handleConditionChange = (value) => {
        onChange(conditions.map(condition => {
            return condition.id === value.id ? value : condition
        }))
    }
    const handleConditionDelete = (id) => {
        onChange(conditions.filter(condition => condition.id !== id))
    }
    const handleConditionAdd = () => {
        const newCondition = {
            id: nanoid(),
            leftParam: "",
            operator: "==",
            valueType: "fixed",
            rightParam: ""
        }
        onChange([...conditions, newCondition])
    }
    useEffect(() => {
        setConditions(value || [])
    }, [value])
    return <>
        {conditions.map(condition => {
            return <EdgeConditionGroupConditionItem value={condition} onChange={handleConditionChange} onDel={() => { handleConditionDelete(condition.id) }} key={condition.id} />
        })}
        <div> <Button onClick={handleConditionAdd} >添加条件</Button></div>
    </>
}

export { EdgeConditionGroupCondition }