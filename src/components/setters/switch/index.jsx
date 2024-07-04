import React from 'react';
import { Switch } from 'antd';
const BooleanSetter = ({ value, onChange }) => {
    const toggleSwitch = (value) => {
        onChange(value);
    };

    return (
       <Switch checked={value} onChange={toggleSwitch} />
    );
};

export { BooleanSetter }
