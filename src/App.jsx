
import './App.css'
import React from 'react'

import XFlowExtend, { registerNode, registerSetter, setEdgeMeta, AudioNode, AudioNodeMeta, setEdgeProps } from 'xflow-extend'
import 'xflow-extend/dist/style.css'

import { TimeoutSetter, ReverseSetter, BooleanSetter, AuditorSetter ,EdgeConditionSetter,DescSetter} from './components'
import { MeetNode, MeetNodeMeta } from  './components'
import { Divider } from 'antd'

import {DeptUser} from './components'

// 修改审核节点的部分属性(修改后重新注册节点)
const appendProps = [{
  name: "auditor_isnull",
  title: "当审批人为空时",
  propType: "string",
  setter:{
    name: "RadioGroupSetter",    
    props: {
      options: [
        { label: "自动通过", value: "auto_pass" },
        { label: "自动拒绝", value: "auto_reject" },
      ]
    }
  },
},{
  name: "reverse",
  title: "允许反审",
  propType: "object",
  setter: "ReverseSetter",
}]
registerNode("AudioNode", AudioNode, {
  ...AudioNodeMeta, props: [...AudioNodeMeta.props, ...appendProps]
})
registerNode("MeetNode",MeetNode, MeetNodeMeta)


// 注册自定义节点设置器
registerSetter("TimeoutSetter", TimeoutSetter)
registerSetter("ReverseSetter", ReverseSetter)
registerSetter("BooleanSetter", BooleanSetter)
registerSetter("AuditorSetter", AuditorSetter)
registerSetter("EdgeConditionSetter", EdgeConditionSetter)
registerSetter("DescSetter", DescSetter)

// setEdgeMeta({ color: '#993300' })

// 修改默认连接线的部分属性
setEdgeProps(prev => {
  return prev.map(item => {
    if (item.name == "flowCondition") {
      item.setter = "EdgeConditionSetter"
    }
    return item
  })
})


const App = () => {
  const flowRef = React.useRef();
  const getFlowData = () => {
    const flowData = flowRef.current?.getFlowData()
    localStorage.setItem('flowData', JSON.stringify(flowData))
    console.log('获取数据', flowData)
  }
  const setFlowData = () => {
    const flowData = JSON.parse(localStorage.getItem('flowData') || '{}')
    flowRef.current?.setFlowData(flowData)
    console.log('设置数据', flowData)
  }
  return <div className='w-screen bg-gray-400 flex items-center flex-col gap-4 p-8 overflow-y-auto'>
    <div className=' w-[500px] h-64 bg-white p-4 flex flex-col box-border'>
      <div>人员选择组件</div>
      <div className='flex-1 overflow-hidden'><DeptUser /></div>
    </div>
    <div className='w-[1200px] h-16 border rounded-lg bg-white flex items-center px-4 gap-2'>
      <div onClick={getFlowData} className=' rounded border bg-blue-500  text-gray-50 p-4 w-32 h-10 cursor-pointer flex justify-center items-center '>
        获取数据
      </div>
      <div onClick={setFlowData} className=' rounded border bg-green-500  text-gray-50 p-4 w-32 h-10 cursor-pointer flex justify-center items-center '>
        设置数据
      </div>
    </div>

    <div className='w-[1200px] h-[800px] border rounded-lg bg-white'>
      <XFlowExtend ref={flowRef} />
    </div>

  </div>
}

export default App
