import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Modal,
  Card,
  Row,
  Col,
  Popover,
  Typography,
  Tag,
  theme,
  Empty,
  Space,
} from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { experienceInfoFunc } from "../../../redux/profileSlice";

const CollectionCreateForm = ({
  open,
  onCreate,
  onUpdate,
  onCancel,
  updateData,
}) => {
  const [update, setUpdate] = useState(false);

  const { TextArea } = Input;

  const { experienceInformation } = useSelector((state) => state.profile);
  console.log("experienceInformation ", experienceInformation);

  // useEffect(() => {
  //   form.resetFields();
  //   form.setFieldsValue({
  //     ...updateData,
  //   });

  //   JSON.stringify(updateData) !== "{}" && setUpdate(true);
  // }, [updateData]);

  const [form] = Form.useForm();
  const inputRef = useRef(null);

  const { token } = theme.useToken();
  const [tags, setTags] = useState(["Skills 1", "Skills 2"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...updateData,
    });

    setTags(updateData?.skills);

    JSON.stringify(updateData) !== "{}" && setUpdate(true);
  }, [updateData]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      form.setFieldValue("skills", tags);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags?.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const onFinish = (value) => {
    console.log("onFinish", [value]);
  };

  return (
    <Modal
      open={open}
      title={(update ? "Update " : "Create") + " the Qualification"}
      okText={update ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        setTags([]);
        onCancel();
        setUpdate(false);
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            let valWithSkills = { ...values, skills: tags };
            console.log("modded,", valWithSkills);
            update ? onUpdate(valWithSkills) : onCreate(valWithSkills);
            setUpdate(false);
            setTags([]);
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
      >
        <Form.Item
          label="Title "
          name="title"
          rules={[
            {
              required: true,
              message: "Missing Title",
            },
          ]}
        >
          <Input placeholder="Sales Manager" />
        </Form.Item>

        <Form.Item
          label="Employment type"
          name="employmentType"
          rules={[
            {
              required: true,
              message: "Missing Employment type",
            },
          ]}
        >
          <Select placeholder="Full-time">
            <Select.Option value="Full-time">Full-time</Select.Option>
            <Select.Option value="Part-time">Part-time</Select.Option>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="Internship">Internship</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            {
              required: true,
              message: "Missing Company Name",
            },
          ]}
        >
          <Input placeholder="Virtusa" />
        </Form.Item>

        <Form.Item label="Skills" name="skills">
          <>
            {tagChild}

            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{
                  width: 78,
                }}
                name="skills"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag onClick={showInput} style={tagPlusStyle}>
                <PlusOutlined /> New Skills
              </Tag>
            )}
          </>
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Missing Location",
            },
          ]}
        >
          <Input placeholder="Colombo, SriLanka" />
        </Form.Item>

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
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const JobExperience = () => {
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(experienceInfoFunc(experience));
  }, [experience]);

  const { Link } = Typography;

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    let valuesWithId = { id: experience.length + 1, ...values };
    setExperience([...experience, valuesWithId]);
    setOpen(false);
  };

  const onUpdate = (values) => {
    let changedValues = experience.map((data) => {
      if (data.id === updateData.id) {
        let updatedData = { ...data, ...values };
        return updatedData;
      } else {
        return data;
      }
    });

    setExperience(changedValues);
    setOpen(false);
  };

  const handleDeleteGce = (id) => {
    let dataAfterDelete = experience.filter((gce) => gce.id !== id);
    setExperience(dataAfterDelete);
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
  console.log("experience", experience);
  return (
    <>
      <div>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              Add <a href="#API">relevant experience</a>
            </span>
          }
        >
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Experience
          </Button>
        </Empty>

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

      {experience.length >= 1 ? (
        <Row gutter={16}>
          {experience.map((gce, i) => {
            return (
              <Col span={8}>
                <Space>
                  <Card
                    key={i}
                    title={gce.title + " at " + gce.companyName}
                    extra={
                      <Popover content={content(gce)} title="Action">
                        <Link>Action</Link>
                      </Popover>
                    }
                  >
                    <h4>{gce.employmentType + " - " + gce.location}</h4>
                    <h4>
                      {gce.startDate?.format("YYYY-MM")} -{" "}
                      {gce.endDate?.format("YYYY-MM")}
                    </h4>
                    <h5>{gce.skills?.map((skill) => skill + ", ")}</h5>
                    <p>{gce.description}</p>
                  </Card>
                </Space>
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

export default JobExperience;
