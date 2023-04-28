import {
  Alert,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Modal,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Styles from "./EducationalQualification.module.css";
import { useState } from "react";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        labelCol={{
          span: 4,
        }}
      >
        <Form.Item label="Exam Type">
          <Select>
            <Select.Option value="GCE Ordinary Advance">
              GCE Ordinary Advance
            </Select.Option>
            <Select.Option value="GCE Ordinary Level">
              GCE Ordinary Level
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Exam Place">
          <Input />
        </Form.Item>

        <Form.Item label="Passed Year">
          <DatePicker />
        </Form.Item>

        <Form.List name="subjects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing first name",
                      },
                    ]}
                  >
                    <Input placeholder="Subject Name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing last name",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EducationalQualification = () => {
  const { RangePicker } = DatePicker;

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <>
      <Alert showIcon={false} message="Higher Qualification (GCE)" banner />
      <div>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          New Collection
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default EducationalQualification;
