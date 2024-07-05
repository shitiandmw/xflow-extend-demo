const FetchUserList = async (params, options) => {
    const users = []
    for (let i = 0; i < 10; i++) {
        users.push( {
            "id": 3,
            "code": "U2024060611332410876881",
            "systemAccount": "10003",
            "username": "卢十天",
           
        }

        )
    }

    return users

}
const DeptList = async (params, options) => {
    return [
        {
            "id": 11,
            "parentId": 0,
            "ancestors": "",
            "deptName": "解决方案部",
            "orderNum": 0,
            "leader": "",
            "phone": "",
            "email": "",
            "remark": "第三方",
            "status": 0,
            "createdBy": 0,
            "updatedBy": 2,
            "createdAt": "2024-06-05 09:54:35",
            "updatedAt": "2024-06-18 11:20:08",
            "deletedAt": null,
            "tenantId": 0
        },
        {
            "id": 15,
            "parentId": 11,
            "ancestors": "",
            "deptName": "士大夫 ",
            "orderNum": 0,
            "leader": "",
            "phone": "",
            "email": "",
            "remark": "",
            "status": 0,
            "createdBy": 2,
            "updatedBy": 0,
            "createdAt": "2024-06-18 11:19:55",
            "updatedAt": "2024-06-18 11:19:55",
            "deletedAt": null,
            "tenantId": 0
        },
        {
            "id": 16,
            "parentId": 11,
            "ancestors": "",
            "deptName": "似懂非懂",
            "orderNum": 0,
            "leader": "",
            "phone": "",
            "email": "",
            "remark": "sdfsdfdsf",
            "status": 0,
            "createdBy": 2,
            "updatedBy": 0,
            "createdAt": "2024-06-18 11:20:17",
            "updatedAt": "2024-06-18 11:20:17",
            "deletedAt": null,
            "tenantId": 0
        }
    ]

}

export {
    DeptList,
    FetchUserList
}