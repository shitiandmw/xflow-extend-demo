import { Input, Popover, Tabs, Button,Radio } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

const SelectParamsContent = ({ items }) => {
    if (!items || !Array.isArray(items) || items.length <= 0) return <div className=" w-44 h-12 flex items-center justify-center text-gray-400">暂无数据</div>
    return <Tabs tabPosition="left" items={items}></Tabs>
}

const SelectParams = ({ value, onChange, fetchGetParams }) => {
    const [params, setParams] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [selectValue, setSelectValue] = React.useState();
    const handleSelect = (item, column) => {
        const newValue = {
            name: item.name,
            label: item.label,
            column: column,
        }
        // setSelectValue(newValue);
        onChange(newValue);
        setVisible(false)
    }
    const buildTagChildren = (item) => {
        return <div className="w-64 max-w-64 overflow-y-auto box-border ">
            {item?.columns.map((column) => {
                return <div key={`${item.name}_${column.column_name}`} className=" h-10 flex items-center justify-between px-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer" onClick={() => { handleSelect(item, column) }} >{column.label}</div>
            })}
        </div>
    }
    const init = async () => {
        let initParams = [];
        let fetchParams = [];
        if (fetchGetParams && typeof fetchGetParams === "function")
            fetchParams = await fetchGetParams();
        if (fetchParams && fetchParams.length > 0) {
            initParams = fetchParams.map((item) => {
                return {
                    key: item.name,
                    label: item.label,
                    fields: item.columns,
                    children: buildTagChildren(item),
                    closable: false,
                }
            })
        }
        setParams(initParams);
    }
    const handleVisibleChange = (visible) => {
        setVisible(visible);
    }

    useEffect(() => {
        init();
    }, [fetchGetParams])
    useEffect(() => {
    }, [])

    useEffect(() => {
        if (value && typeof value == "string") {
            try {
                value = JSON.parse(value);
            } catch (error) { }
        }

        if (value) {
            setSelectValue(value);
        }
    })
    return <Popover open={visible} trigger="click" placement="bottomLeft" title={""} onVisibleChange={handleVisibleChange} content={<SelectParamsContent items={params} />}>
            <Input placeholder="请选择参数" value={selectValue ? `${selectValue.label}.${selectValue.column.label}` : ""} />
        </Popover>;
}

export { SelectParams };

