import { Input, Popover } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import React from "react";
const SelectParams = () => {
    const [visible, setVisible] = React.useState(false);
    const [selectValue, setSelectValue] = React.useState("");
    return <Popover open={visible} trigger="click" placement="bottomLeft" title={""} content={<div>这里是参数选择框</div>}>
        <Input placeholder="请选择参数" onBlur={() => setVisible(false)} value={selectValue} onClick={() => setVisible(true)}  />
    </Popover>;
}

export { SelectParams };

