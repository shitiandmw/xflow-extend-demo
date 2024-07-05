export default {
    title: "汇合点",
    category: "节点",
    props: [
        {
            name: "label",
            title: "标题",
            propType: "string",
            setter: "StringSetter",
            defaultValue: "汇合点"
        },
        {
            name: "desc",
            title: "说明",
            propType: "object",
            setter: {
                name: "DescSetter",
                props: {
                    editable: false,
                    content: "汇合点用于将多个审批节点汇合成一个节点，用于需要多个节点均处理完成后才能进行下一步操作的场景。"
                }
            }
        },

    ]
}