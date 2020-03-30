import React, { useState, useEffect } from 'react'
import Button from 'antd/es/button';
import PreviewModal from './previewModal.js'

function ToolBanner(props){
  const { dataMap, onSave } = props
  const [visible,setVisible] = useState(false)

  function handlePreview(){
    setVisible(true)
  }

  function onCancel(){
    setVisible(false)
  }
  
  return (
    <section className='page-banner'>
      <div className='banner-button'>
        <Button type='default' className='btn-preview' onClick={handlePreview}>预览</Button>
        <Button type='primary' onClick={onSave}>保存</Button>
      </div>
      {visible && <PreviewModal visible={visible} onCancel={onCancel} dataMap={dataMap}/>}
    </section>
  )
}

export default ToolBanner