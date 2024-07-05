import { Checkbox } from 'antd'
import VirtualList from 'rc-virtual-list';
import React,{ useEffect, useState,useRef ,forwardRef} from 'react';
import Users from './users';    

const DeptUser = forwardRef(({ value,multiple= false }, ref) => {
    const [selectedDept, setSelectedDept] = useState(0);
    const selectedUsers = useRef([]);
    const onChange = (users)=>{
        console.log("onChange",users)
        selectedUsers.current = users;
    }
    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return selectedUsers.current
        }
    }), []);
    return <div className="flex w-full h-full">
        <div className="flex-1 border-r  p-2">

        </div>
        <div className="flex-1  px-4 py-2 box-border h-full overflow-hidden">
           <Users  multiple={multiple} deptid={selectedDept} onChange={onChange} value={value}  />
        </div>
    </div>
})

export { DeptUser };