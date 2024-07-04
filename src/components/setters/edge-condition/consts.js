const COMPARISON_OPERATORS = [
    { label: "等于", value: "==" },
    { label: "不等于", value: "!=" },
    { label: "大于", value: ">" },
    { label: "大于等于", value: ">=" },
    { label: "小于", value: "<" },
    { label: "小于等于", value: "<=" },
    { label: "包含于", value: "in" },
    { label: "被包含于", value: "contain" },
    { label: "交叉包含", value: "cross_contain" }
]
const VALUE_TYPES = [{ label: "固定值", value: "fixed" }, { label: "变量", value: "variable" }]

export { COMPARISON_OPERATORS, VALUE_TYPES }