import React, { useEffect } from 'react';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Form from 'antd/es/form';
import Radio from 'antd/es/radio';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};


function PropertyModal(props) {
  const { visible, onCancel, currentData, onSetFormData, componentType = [], form } = props;

  const { getFieldDecorator, validateFields, resetFields } = form;

  function handleSave() {
    validateFields((err, value) => {
      if (err) return;
      onSetFormData(value, currentData.title);
      onCancel();
    });
  }

  return (
    <Modal
      title='属性配置'
      visible={visible}
      onCancel={onCancel}
      footer={null}
      afterClose={() => resetFields()}
    >
      <Form>
        <Form.Item label='ID' {...layout}>
          {getFieldDecorator('id', {
            initialValue: currentData.id,
          })(
            <Input disabled />,
          )}
        </Form.Item>
        <Form.Item label='别名' {...layout}>
          {getFieldDecorator('othername', {
            initialValue: currentData.othername,
          })(
            <Input />,
          )}
        </Form.Item>
        <Form.Item label='字体' {...layout}>
          {getFieldDecorator('fontType', {
            initialValue: currentData.fontType || '14',
          })(
            <Select>
              <Select.Option value='8'>8</Select.Option>
              <Select.Option value='10'>10</Select.Option>
              <Select.Option value='12'>12</Select.Option>
              <Select.Option value='14'>14</Select.Option>
              <Select.Option value='16'>16</Select.Option>
              <Select.Option value='18'>18</Select.Option>
              <Select.Option value='20'>20</Select.Option>
              <Select.Option value='28'>28</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label='组件类型' {...layout}>
          {
          getFieldDecorator('componentType', {
            initialValue: currentData.componentType,
          })(
            <Select>
              {
                componentType.map((item) => <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>)
              }
            </Select>,
          )
      }
        </Form.Item>
        <Form.Item label='是否必填' {...layout}>
          {
          getFieldDecorator('isRequire', {
            initialValue: currentData.isRequire,
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>,
          )
        }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' onClick={handleSave}>
            保存
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default Form.create()(PropertyModal);
