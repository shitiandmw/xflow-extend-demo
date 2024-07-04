import React, { useEffect, useState } from "react"
import { Field } from '../../field'
import { Form, Radio, Modal, Button, Card, Select, Input } from "antd"
import { nanoid } from "nanoid"

import { EdgeCondition } from './condition'

const EdgeConditionSetter = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState("")
    const [showEdit, setShowEdit] = useState(false)
    const conditionRef = React.createRef()
    const handleWithOk = () => {
        console.log(conditionRef.current?.getValue())
        onChange(conditionRef.current?.getValue())
        setShowEdit(false)
    }


    useEffect(() => {
        console.log("EdgeConditionSetter value change", value)
        if (value) setInputValue("已设置，点击修改")
        else setInputValue("")
    }, [value])

    return (
        <><div className={"border rounded h-8 cursor-pointer flex items-center justify-center w-full " + (inputValue ? "text-blue-500" : "text-gray-500")} onClick={() => setShowEdit(true)} >{inputValue || "点击设置流转条件"}</div>
            <Modal
                destroyOnClose={true}
                width={700}
                title="流转条件设置"
                open={showEdit}
                onCancel={() => setShowEdit(false)}
                onOk={handleWithOk}
            >
                <EdgeCondition value={value} ref={conditionRef}></EdgeCondition>
            </Modal>
        </>
    )
}
export { EdgeConditionSetter }    