import React from 'react';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Form from 'antd/es/form';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Radio from 'antd/es/radio';

import DatePicker from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function PreviewModal(props) {
  const { visible, onCancel, dataMap } = props;

  function FormMap(value) {
    const { getFieldDecorator } = props.form;
    if (value.title) {
      if (value.componentType === 'input') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }],
              })(
                <Input />,
              )
            }
          </Form.Item>
        );
      }
      if (value.componentType === 'select-single') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }],
              })(
                <Select>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                </Select>,
              )
            }
          </Form.Item>
        );
      }
      if (value.componentType === 'select-multiple') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }],
              })(
                <Select mode='multiple'>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                </Select>,
              )
            }
          </Form.Item>
        );
      } if (value.componentType === 'radio') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }],
              })(
                <Radio.Group>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Radio.Group>,
              )
            }
          </Form.Item>
        );
      }
      if (value.componentType === 'date') {
        return (
          <Form.Item {...formLayout} label={value.title}>
            {
              getFieldDecorator(value.id, {
                rules: [{ required: value.isRequire === 1 ? true : '' }],
              })(
                <RangePicker />,
              )
            }
          </Form.Item>
        );
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
          dataMap.map((item, inx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={inx}>
              {
                item[`Row${inx}`].map((n, index) => (
                  <Col span={8} key={n.id}>{FormMap(n)}</Col>
                ))
              }
            </Row>
          ))
        }
      </Form>

    </Modal>
  );
}

export default Form.create()(PreviewModal);
