import React,{useRef,useState,useEffect} from 'react'
import BaseElement from './baseElement.js'
import ElementDraggle from './elementDraggle.js'
import ToolBanner from './toolbanner.js'
import './style'
import './index.less'

function AntdFormConfig (props){
  const { value, height, closable, onSave, onClose, leftData=[],rightData=[]} = props;
  const [elementMap, setElementMap] = useState({})
  const [rightList,setRightList] = useState([])
  const [leftList,setLeftList] = useState([])
  //const rightData = []
  // const rightData = [{
  //   "Row0": [{ id: 'name', componentType: 'input', title: '姓名' }, { id: 'sex', componentType: 'radio', title: '性别', isRequire: 1 },
  //   { id: 'mobile', componentType: 'input', title: '手机' }]},
  //   {"Row1": [{ id: 'address', componentType: 'input', title: '地址' }, { id: 'reason', componentType: 'input', title: '归档原因' }, { id: 'collectTime', componentType: 'date', title: '采样日期' }]},
  //   // "Row2": [{ id: 'height', componentType: 'input', title: '身高' }, { id: 'gravidity', componentType: 'input-number', title: '孕次'},
  //   //   { id: 'parity', componentType: 'input-number', title: '产次' }],
  // ]

  const leftData = [{
    id:'name',
    title:'姓名'
  }, {
      id: 'sex',
      title: '性别'
    }, {
      id: 'mobile',
      title: '手机'
    }, {
      id: 'height',
      title: '身高'
    }, {
      id: 'gravidity',
      title: '孕次'
    }, {
      id: 'parity',
      title: '产次'
    }]

  const configData = []
  rightData.map((item, i) => item['Row' + i].map(n => configData.push(n)))

  const elMap = React.useMemo(() => (
    configData.reduce((a, b) => {
      a[b.id] = true;
      return a;
    }, {})
  ), [configData]);
  

  useEffect(() => {
    setElementMap(elMap)
    setRightList(rightData)
    setLeftList(leftData)
  }, [])

  function handleLeftList(value){
    setLeftList(value)
  }

  //拖拽之后对应的表单元素禁止操作
  function handleSetElement(values, del){
    const data = elementMap
    data[values.id] = del
    setElementMap({...data})
  }

  //修改最后生成的数据
  function handleRightList(value){
    setRightList([...value])
  }

  function searchElem(value){
    const data = value ? leftList.filter(item => item.title === value) : leftData
    setLeftList([...data])
  }

  return (
    <section >
      <ToolBanner dataMap={rightList} onSave={onSave}/>
      <article className='page-style'>
        <div className='page-left'>
          <BaseElement leftList={leftList} elementMap={elementMap} onSearch={searchElem}/>
        </div>
        <div className='page-right' >
          <ElementDraggle rightData={rightData} putElement={handleSetElement} getRightList={handleRightList}/>
        </div>
      </article>
    </section>
  )
}

export default AntdFormConfig