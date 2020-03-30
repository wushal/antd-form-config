import React, { useState, useEffect} from 'react'
import PropertyModal from './propertyModal.js'
import Modal from 'antd/es/modal'

const componentType = [{ type: 'input', name:'文本框'},
  { type: 'select-single', name: '下拉框(单选)' },
  { type: 'select-multiple', name: '下拉框(多选)' },
  { type: 'date', name: '日期控件' },
  { type: 'radio', name: '单选框' },
  { type: 'input-number', name: '文本数字框' }]

let clickTimeId

function ElementDraggle(props) {
  const { rightData, putElement, getRightList } = props
  const [visible,setVisible] = useState(false)
  const [isadd, setIsadd] = useState(0)
  const [rowid, setRowid] = useState('')
  const [endElement, setEndElement] = useState('')
  const [startElement, setStartElement] = useState('')
  const [propertyvalue,setPropertyvalue] = useState({})
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    let elementList = rightData
    if (elementList.length < 1 ){
      Array.from({ length: 6 }, (v, i) => i).map((item, index) => {
        const chiltIem = []
        Array.from({ length: 3 }, (v, i) => i).map((n, i) => {
          chiltIem.push({ id: 'id' + item + n, title: '', componentType: '', isRequire: '', fontType: '' })
        }) 
        elementList.push({['Row' + index]: chiltIem})
      })
      setIsadd(1)
    }else {
      setIsadd(0)
    }
    setDataList([...elementList])
  }, [])
 
  //add row
  function handleAddRow(){
    const length = Object.keys(dataList).length
    let childList = []
    Array.from({ length: 3 }, (v, i) => i).map(item => childList.push({ id: 'id' + item + length, title: '',componentType: '', isRequire: '', fontType: ''}))
    const addRow = dataList
    addRow.push({ ['Row' + length]: childList})
    setIsadd(1)
    setDataList([...addRow])
  }
  
  function handleDragStart(e) {
    e.persist()
    const startEle = JSON.parse(document.getElementById(e.target.id).getAttribute('data-value'))
    const colElement = { id: startEle.id, title: startEle.title}
    e.dataTransfer.setData('element', JSON.stringify(colElement))
    setIsadd(0)
    setStartElement(startEle)
    
  }

  function handleDragEnd(e) {
    const data = dataList.map((item, index) => {
      const childList = item['Row' + index].map(n => {
        if (n.id === endElement.id) {
          n = startElement
          n.change = true
        }
        return n
      })
      return { ['Row' + index]: childList}
    })
    const lastData = data.map((item, index) => {
      const childList =  item['Row' + index].map(n => {
        if (n.id === startElement.id && !n.change) {
          n = endElement
        }
        if (n.change) {
          delete n.change
        }
        return n
      })
      return { ['Row' + index]: childList }
    })
    setIsadd(1)
    setDataList([...lastData])
    getRightList([...lastData])
  }

  function handleDragEnter(e) {
    e.preventDefault()
    setRowid(e.target.id)
  }

  function handleDragLeave(e) {
    e.preventDefault()
  }

  function handleDrop(e) {
    e.preventDefault()
    let draggleElement = JSON.parse(e.dataTransfer.getData('element') || "{}")
    const currentId = document.getElementById(e.target.id)   
    putElement(draggleElement,true) //拖拽之后左边禁止选择
    draggleElement.fontType = '14'
    draggleElement.componentType = 'input'
    setEndElement(JSON.parse(currentId.getAttribute('data-value')))
    if (isadd) {
      modifyDataList(draggleElement,rowid)
    }
    
  }

  //open property modal
  function handleClick(e){
    e.persist()
    clearTimeout(clickTimeId);
    //执行延时
    clickTimeId = setTimeout(function () {
      //此处为单击事件要执行的代码
      const isProperty = JSON.parse(document.getElementById(e.target.id).getAttribute('data-value'))
      setPropertyvalue(isProperty)
      if (isProperty.title || isProperty.othername) {
        setVisible(true)
      }
    }, 250);
   
  }
  function onCancel() {
    setVisible(false)
  }
  function onSetFormData(values,title){
    const property = values
    property.title = values.othername || title
    setPropertyvalue(property)
    modifyDataList(property,values.id)
  }


  //modify dataList
  function modifyDataList(property,value) {
    const data = dataList.map((item,index)=> {
      const childList = item['Row' + index].map(n => {
        if (n.id === value) {
          n = property
        }
      return n
    })
      return { ['Row' + index]: childList } 
    })
    setDataList([...data]) //页面的数据
    getRightList([...data]) //预览的数据
  }

  //delete Item
  function handleDeleteCol(e){
    e.persist()
    // 取消上次延时未执行的方法
    clearTimeout(clickTimeId);
    if (e.target.innerHTML) {
      Modal.confirm({
        title: '删除元素',
        content: '是否删除元素',
        onText: '确认',
        cancalText: '取消',
        onOk: () => {
          const deleteId = e.target.id
          const data = dataList.map((item, index) => {
            const childList = item['Row' + index].map(n => {
              if (n.id === deleteId) {
                n.title = ''
              }
              return n
            })
            return { ['Row' + index]: childList }
          })
          putElement(e.target, false)
          setDataList([...data])
        }
      })
    }
  }

  return (
    <section>
      <div>
        <h3 className='page-right-title'>元素配置</h3>
        {dataList.map((item,index) => (
          <div className='page-row' key={index}>
            <div className='header-span draggleDiv' id={index} key={index} style={isadd === 1 && index === dataList.length-1 ? {  background:'#E9F6FE'}:null}></div>
            {item['Row' + index].map((n, ind) => 
              <div
                draggable={true}
                key={n.id} 
                id={n.id}
                data-position={`Row${index}-${ind}`}
                data-value={JSON.stringify(n)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEnter}
                onDrop={handleDrop} 
                className='page-col draggleDiv text'  
                onClick={handleClick}
                onDoubleClick={handleDeleteCol} 
              >{(n.title || n.othername) ? `${n.title || n.othername}(${(componentType.find(t => t.type === n.componentType) || {}).name}${n.isRequire === 1 ? '、必填' : ''})` : ''}</div>
              )}
          </div>
        ))
        }
        <div className='page-row'>
          <div className='header-span draggleDiv'></div>
          <div className='page-add-col' onClick={handleAddRow}>+</div>
        </div>
        <PropertyModal visible={visible} onCancel={onCancel} currentData={propertyvalue} onSetFormData={onSetFormData} componentType={componentType}/>
    
      </div>
    </section>
  )


}
export default ElementDraggle