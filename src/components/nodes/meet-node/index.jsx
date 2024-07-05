import { useEffect, useState } from "react";
import Svg from './svg'
import mata from './meta'


const MeetNode = ({ label = "汇合点",selected=false ,isCanvas=false }) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setValue(label)
    }, [label]);
    const canvasRander = <div className={`w-full h-full border border-slate-300 rounded shadow-md bg-white flex items-center justify-center gap-2 cursor-pointer border-l-4 border-l-amber-500 text-gray-600 outline-sky-600   ${selected?"outline":""}`}>
        <Svg className=" w-4 h-4 " />{value} 
    </div>;
    // 演示：可以使用isCanvas来判断当前节点是否在画布上，用来渲染不同的UI
    if (!isCanvas) return canvasRander
    return canvasRander;

};

const MeetNodeMeta = mata
export { MeetNode, MeetNodeMeta };