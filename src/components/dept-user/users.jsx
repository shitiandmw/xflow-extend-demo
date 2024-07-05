
import { Checkbox } from 'antd'
import VirtualList from 'rc-virtual-list';
import { useEffect, useState, useRef } from 'react';
import { isEqual } from 'lodash';
const FetchUserList = ({ page, pageSize, deptId }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let newusers = []
            for (let index = 0; index < pageSize; index++) {
                const key = (page - 1) * 10 + index
                newusers.push({
                    id: key,
                    username: `user${key}`,
                })
            }
            console.log("FetchUserList", newusers)
            resolve({ code: 0, data: newusers })
        }, 500);
    })
}
const Users = ({ deptid, multiple = false, onChange, value }) => {
    const [users, setUsers] = useState([])
    const usersRef = useRef([])
    const [containerHeight, setContainerHeight] = useState(0); // Initial height
    const containerRef = useRef(null);
    const pageRef = useRef(1);
    const userEnd = useRef(false);
    const [selected, setSelected] = useState([])
    const initUsers = () => {
        pageRef.current = 1;
        usersRef.current = [];
        userEnd.current = false;
        appendUsers()
    }
    const appendUsers = async () => {
        const pageSize = 10
        if (userEnd.current) return
        const newUsers = await FetchUserList({ page: pageRef.current, pageSize: pageSize, ...(deptid > 0 ? { deptId: deptid } : {}) })
        console.log("newUsers", newUsers)
        if (newUsers.code === 0) {
            if (newUsers.data.length < pageSize)
                userEnd.current = true
            usersRef.current = [...usersRef.current, ...newUsers.data]
            setUsers(usersRef.current)
        }
    }
    const onScroll = (e) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - containerHeight) <= 1) {
            pageRef.current += 1;
            appendUsers();
        }
    }
    // const handleSelect = (value) => {
    //     console.log("handleSelect", value)
    //     if (!multiple && value.length > 1) value = [value[value.length - 1]]
    //     const selusers = value.map(v => {
    //         return usersRef.current.find(u => u.id == v) || value.find(u => u.id == v)
    //     })
    //     console.log("selusers", selusers)
    //     typeof onChange == "function" && onChange(selusers)
    //     setSelected(selusers)
    // }
    const handleItemSelect = (user, checked) => {
        let users = [...selected]
        let index = users.findIndex(u => isEqual(u, user))
        if (checked && index < 0) users = [...users, user]
        if (!checked && index >= 0) users.splice(index, 1)
        setSelected(users)
        typeof onChange == "function" && !isEqual(value, users) && onChange(users)
    }
    useEffect(() => {
        initUsers()
    }, [deptid])
    useEffect(() => {
        if (value && value.length > 0) {
            setSelected(value)
        }
    }, [value])
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return <div className='w-full h-full' ref={containerRef} >
        {/* <Checkbox.Group style={{ width: '100%' }} value={selected} onChange={handleSelect}> */}
        <div className='flex flex-col w-full h-full overflow-hidden'>
            {containerHeight > 0 && <VirtualList
                data={users}
                height={containerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(user, index) => {
                    return <div className=' h-8 w-full flex items-center' key={`user-${user.id}`}><Checkbox value={user.id} checked={selected.findIndex(u => u.id == user.id) >= 0} onChange={(e) => {
                        handleItemSelect(user, e.target.checked)
                    }}>{user.username}</Checkbox></div>
                }}
            </VirtualList>}
        </div>
        {/* </Checkbox.Group> */}
    </div>
}
export default Users