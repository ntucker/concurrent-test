import { Input, Button, Form } from 'antd';
import { PostResource } from 'resources';
import React, { useCallback } from 'react';

import useForm from './useForm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

type FormProps = {
  onSubmit: (v: object) => any;
  initialValues: object;
};
export default function PostForm({ onSubmit, initialValues }: FormProps) {
  const [values, handleChange, handleSubmit] = useForm(
    PostResource,
    initialValues,
  );

  const onFinish = useCallback(handleSubmit(onSubmit), [
    handleSubmit,
    onSubmit,
  ]);

  return (
    <Form onFinish={onFinish} noValidate autoComplete="off" {...formItemLayout}>
      <Form.Item label="Title">
        <Input value={values.title} onChange={handleChange('title')} />
      </Form.Item>
      <Form.Item label="Body">
        <Input.TextArea
          value={values.body}
          onChange={handleChange('body')}
          autoSize={{ minRows: 4 }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
}
