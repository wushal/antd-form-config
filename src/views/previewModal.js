import React from 'react'
import Modal from 'antd/es/modal'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Select from 'antd/es/select'
import Form from 'antd/es/form'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Radio from 'antd/es/radio'

import DatePicker from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

function PreviewModal(props){
  const { visible, onCancel, dataMap } = props

  function  renderForm(value) {
    const { getFieldDecorator } = props.form;
    if(value.title){
      if (value.componentType === 'input'){
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }]
              })(
                <Input />
              )
            }
          </Form.Item>
          )

      }
      else if (value.componentType === 'select-single') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }]
              })(
                <Select>{value.options && value.options.map(item => <Select.Option key={item.value} value={item.value}>{item.title}</Select.Option>)}</Select>
              )
            }
          </Form.Item>
        )
      }
      else if (value.componentType === 'select-multiple') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }]
              })(
                <Select mode="multiple">{value.options && value.options.map(item => <Select.Option key={item.value} value={item.value}>{item.title}</Select.Option>)}</Select>
              )
            }
          </Form.Item>
        )
      } else if (value.componentType === 'radio') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }]
              })(
                <Radio.Group><Radio value={'男'}>男</Radio><Radio value={'女'}>女</Radio></Radio.Group>
              )
            }
          </Form.Item>
        )
      }
      else if (value.componentType === 'date') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }]
              })(
                <RangePicker />
              )
            }
          </Form.Item>
        )
      }
    }
  }
  return (
    <Modal
      title='预览'
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Form>
        {
          dataMap.map((item,i) => (
            <Row key={i}>
              {
                item['Row' + i].map((n, index) => (
                  <Col span={8} key={n.id}>{renderForm(n)}</Col>
                ))
              }
            </Row>
          ))
        }
      </Form>
  
    </Modal>
  )

}

export default Form.create()(PreviewModal)