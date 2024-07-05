import React, { useEffect, useState } from "react"
import { Field } from '../../field'
import { Form, Radio, Modal, Button, Card, Select, Input } from "antd"
import { nanoid } from "nanoid"

import { EdgeCondition } from './condition'
const conditionTypes = [
    { label: "自定义条件", value: "1", desc: "可以根据表单、创建人等参数自定义复杂的流转条件" },
    { label: "其他情况", value: "2", desc: "其他所有连接线条件都不满足的时候进入此分支" },
]
const EdgeConditionSetter = ({ value, onChange }) => {
    const defaultValue = {
        type: "2",
        condition: null,
    }
    const [inputValue, setInputValue] = useState("")
    const [condition, setCondition] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const conditionRef = React.createRef()
    const handleWithOk = () => {
        onChange({ ...condition, condition: conditionRef.current?.getValue() })
        setShowEdit(false)
    }
    const handleTypeChange = (e) => {
        console.log("handleTypeChange", e.target.value)
        onChange({ ...condition, type: e.target.value })
    }


    useEffect(() => {
        console.log("EdgeConditionSetter value change", value)
        if (value && typeof value === "string") {
            try {
                value = JSON.parse(value)
                onChange(value)
                return
            } catch (error) { }
        }
        setCondition({ ...defaultValue, ...(value || {}) })
    }, [value])

    return (
        <div className="flex flex-col w-full gap-y-2">
            <Radio.Group onChange={handleTypeChange} value={condition?.type}>
                {conditionTypes.map((item, index) => {
                    return <>
                        <Radio value={item.value} key={`radio_${index}`}>{item.label}</Radio>
                        <div className="py-1 text-xs text-gray-400" key={`desc_${index}`}>{item.desc}</div>
                    </>
                })}
            </Radio.Group>
            {condition?.type == "1" && <>
                <div className="">自定义条件内容</div>
                <div className={"border rounded h-8 cursor-pointer flex items-center justify-center w-full " + (condition?.condition ? "text-blue-500" : "text-gray-500")} onClick={() => setShowEdit(true)} >{condition?.condition ? "条件已设置，点击修改" : "点击设置流转条件"}</div>
                <Modal
                    destroyOnClose={true}
                    width={700}
                    title="流转条件设置"
                    open={showEdit}
                    onCancel={() => setShowEdit(false)}
                    onOk={handleWithOk}
                >
                    <EdgeCondition value={condition?.condition} ref={conditionRef}></EdgeCondition>
                </Modal>
            </>}

        </div>
    )
}
export { EdgeConditionSetter }    