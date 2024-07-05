import React, { useState, useRef } from 'react';
import { Tag, Button, Modal } from 'antd';
import { DeptUser } from '../../dept-user';

const SpecifiedUsers = ({ value, onChange }) => {
    const [showEdit, setShowEdit] = useState(false);
    const enterUserRef = useRef(null);
    const handleWithOk = () => {
        const users = enterUserRef.current.getValue();
        onChange(users);
        setShowEdit(false);
    }
    
    return <>
        <div className=''>
            选择人员
        </div>
        {value && Array.isArray(value) && value.length > 0 && <div className=' flex flex-wrap gap-1'>
            {value.map((user, index) => {
                return <Tag
                    className='mr-0'
                    key={`user-${user.id}`}
                    closable
                    onClose={(e) => {
                        e.preventDefault();
                        onChange(value.filter(u => u.id !== user.id))
                    }}
                >
                    {user.username}
                </Tag>
            })}

        </div>}
        <div>
            <Button size='small' onClick={() => setShowEdit(true)}>添加人员</Button>
        </div>
        <Modal
            destroyOnClose={true}
            width={500}
            title="选择人员"
            open={showEdit}
            onCancel={() => setShowEdit(false)}
            onOk={handleWithOk}
        >
           <div className='w-full h-64'> <DeptUser value={value} ref={enterUserRef} multiple={true} ></DeptUser></div>
        </Modal>

    </>
}
export { SpecifiedUsers }