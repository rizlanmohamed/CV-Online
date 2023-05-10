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
  Slider,
  Steps,
  Card,
  Row,
  Col,
  Popover,
  Typography,
} from "antd";

import {
  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Styles from "./EducationalQualification.module.css";
import { useState, useEffect } from "react";

const CollectionCreateForm = ({
  open,
  onCreate,
  onUpdate,
  onCancel,
  updateData,
}) => {
  const [update, setUpdate] = useState(false);
  const [educationType, setEducationType] = useState("higher");

  const { TextArea } = Input;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...updateData,
    });

    JSON.stringify(updateData) !== "{}" && setUpdate(true);
    
    if(updateData.degree === 'gce'){
      setEducationType('gce')
    } else{
      setEducationType('higher')
    }
  }, [updateData]);

  const [form] = Form.useForm();

  const handleEducationSelect = (value) => {
    // form.resetFields();
    setEducationType(value);
  };

  return (
    <Modal
      open={open}
      title={(update ? "Update " : "Create") + " the Qualification"}
      okText={update ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        setUpdate(false);
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log('values,' , values)
            update ? onUpdate(values) : onCreate(values);
            setUpdate(false);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        labelCol={{
          span: 6,
        }}
        form={form}
        // onFinish={update ? onUpdate : onCreate}
      >
        <Form.Item
          label="School/ Collage"
          name="school"
          rules={[
            {
              required: true,
              message: "Missing School/ Collage place",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Degree"
          name="degree"
          rules={[
            {
              required: true,
              message: "Missing degree",
            },
          ]}
        >
          <Select onSelect={(value) => handleEducationSelect(value)}>
            <Select.Option value="Doctorate">Doctorate</Select.Option>
            <Select.Option value="Masters">Masters</Select.Option>
            <Select.Option value="Bachelors">Bachelors</Select.Option>
            <Select.Option value="Advanced_Diploma">
              Advanced Diploma
            </Select.Option>
            <Select.Option value="Diploma">Diploma</Select.Option>
            <Select.Option value="professionalCertificate">
              Professional Certificate
            </Select.Option>
            <Select.Option value="certificate">Certificate</Select.Option>
            <Select.Option value="gce">GCE</Select.Option>
          </Select>
        </Form.Item>

        {educationType !== "gce" && (
          <Form.Item
            label="Field of study"
            name="fieldOfStudy"
            rules={[
              {
                required: true,
                message: "Missing Field of study",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {educationType === "gce" ? (
          <>
            <Form.Item
              label="Exam Type"
              name="examType"
              rules={[
                {
                  required: true,
                  message: "Missing Exam type",
                },
              ]}
            >
              <Select>
                <Select.Option value="GCE Advance Level">
                  GCE Advance Level
                </Select.Option>
                <Select.Option value="GCE Ordinary Level">
                  GCE Ordinary Level
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.List label="Subjects" name="subjects">
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
                      <div className={Styles.subject_colum}>
                        <Form.Item
                          {...restField}
                          name={[name, "subject"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing subject name",
                            },
                          ]}
                        >
                          <Input placeholder="Subject Name" />
                        </Form.Item>

                        <Form.Item
                          style={{ minWidth: 200, margin: "0 15px" }}
                          {...restField}
                          name={[name, "grade"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing subject grades",
                            },
                          ]}
                        >
                          <Slider
                            marks={{
                              25: "W",
                              50: "C",
                              75: "B",
                              100: "A",
                            }}
                          />
                        </Form.Item>
                      </div>

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
                      Add Subject
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        ) : (
          <Form.Item
            label="Grade"
            name="grade"
            rules={[
              {
                required: true,
                message: "Missing grade field",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: "Missing date",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Missing date",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Missing description",
            },
          ]}
        >
          {/* <DatePicker style={{ width: "100%" }} /> */}
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EducationalQualification = () => {
  const [open, setOpen] = useState(false);
  const [gceQualification, setGceQualification] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const { Link } = Typography;

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    let valuesWithId = { id: gceQualification.length + 1, ...values };
    setGceQualification([...gceQualification, valuesWithId]);
    setOpen(false);
  };

  const onUpdate = (values) => {
   let changedValues = gceQualification.map((data) => {
      if (data.id === updateData.id) {
        let updatedData = {...data, ...values}
        return updatedData
      } else {
        return data;
      }
    })

    setGceQualification(changedValues);
    setOpen(false);
  };

  const handleDeleteGce = (id) => {
    let dataAfterDelete = gceQualification.filter((gce) => gce.id !== id);
    setGceQualification(dataAfterDelete);
  };

  const handleEditGce = (data) => {
    setUpdateData(data);
    setOpen(true);
  };

  const content = (data) => {
    const clickedId = data.id;
    return (
      <div>
        <Button danger type="dashed" onClick={() => handleDeleteGce(clickedId)}>
          <DeleteOutlined /> Delete
        </Button>
        <Button type="dashed" onClick={() => handleEditGce(data)}>
          <DeleteOutlined /> Edit
        </Button>
      </div>
    );
  };
console.log('gceQualification', gceQualification)
  return (
    <>
      <div>
        <div className={Styles.add_gce_button}>
          <Button
            type="dashed"
            onClick={() => {
              setOpen(true);
            }}
            style={{ fontSize: 20 }}
          >
            <PlusCircleOutlined />
            Add Education
          </Button>
        </div>

        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onCancel={() => {
            setOpen(false);
          }}
          updateData={updateData}
        />
      </div>

      {gceQualification.length >= 1 ? (
        <Row gutter={16}>
          {gceQualification.map((gce, i) => {
            return (
              <Col span={8}>
                {/* <Card
                  title={gce.examType}
                  bordered
                  extra={
                    <Popover content={content(gce)} title="Action">
                      <Link>Action</Link>
                    </Popover>
                  }
                >
                  {gce.examType +
                    ", Place " +
                    gce.examPlace +
                    ", Written date " +
                    gce.passedYear.format("YYYY-MM-DD")}
                  {gce.subjects.map((sub, i) => {
                    return (
                      <li key={i}>
                        {sub.subject} : {sub.grade}
                      </li>
                    );
                  })}
                </Card> */}

                <Card
                key={i}
                  title={
                    gce.degree === "gce"
                      ? gce.examType
                      : gce.degree + " in " + (gce.fieldOfStudy ?
                        gce.fieldOfStudy : null)
                  }
                  extra={
                    <Popover content={content(gce)} title="Action">
                      <Link>Action</Link>
                    </Popover>
                  }
                >
                  <h4>{gce.school}</h4>
                  <h4>
                    {gce.startDate?.format("YYYY-MM")} -{" "}
                    {gce.endDate?.format("YYYY-MM")}
                  </h4>
                  <h4>
                    Grade:{" "}
                    {gce.grade
                      ? gce.grade
                      : gce.subjects?.map((sub, i) => {
                          return (
                            <li key={i}>
                              {sub.subject} : {sub.grade}
                            </li>
                          );
                        })}
                  </h4>
                  <p>{gce.description}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>No Education added</p>
      )} 
    </>
  );
};

export default EducationalQualification;
