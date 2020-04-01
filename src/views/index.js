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