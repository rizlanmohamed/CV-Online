import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Tag,
  theme,
  InputNumber,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import styles from "./PersonalInformation.module.css"; // Import css modules stylesheet as styles
import { addPersonalInfoFunc } from "../../../redux/profileSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PersonalInformation = () => {
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const { TextArea } = Input;

  const { token } = theme.useToken();
  const [tags, setTags] = useState(["Skills 1", "Skills 2", "Skills 3"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const dispatch = useDispatch();

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
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const onFinish = (value) => {
    console.log([value]);
    dispatch(addPersonalInfoFunc([value]))
  };

  return (
    <>
      <div className={styles.center_userImage}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>

      <div>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>

        {/* ----------------- Form starting ------------------ */}

        <div className={styles.formsarea}>
          <div>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: 1000,
              }}
              fields={[
                {
                    name: ["skills"],
                    value: tags,
                },
                ]}
              onFinish={onFinish}
            >
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First name is mandatory to submit the details",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last name is mandatory to submit the details",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your contact number",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Total Experience" name="totalExperience">
                <Select defaultValue="1 - 2 Years">
                  <Select.Option value="Non or less than a year">
                    Non or less than a year
                  </Select.Option>
                  <Select.Option value="1 - 2 Years">1 - 2 Years</Select.Option>
                  <Select.Option value="2 - 4 Years">2 - 4 Years</Select.Option>
                  <Select.Option value="4 - 6 Years">4 - 6 Years</Select.Option>
                  <Select.Option value="6 - 8 Years">6 - 8 Years</Select.Option>
                  <Select.Option value="8 - 10 Years">8 - 10 Years</Select.Option>
                  <Select.Option value="More than 10 Years">
                    More than 10 Years
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Higher education" name="higherEducation">
                <Select defaultValue="Diploma">
                  <Select.Option value="Doctorate">Doctorate</Select.Option>
                  <Select.Option value="Masters">Masters</Select.Option>
                  <Select.Option value="Bachelors">Bachelors</Select.Option>
                  <Select.Option value="Advanced_Diploma">
                    Advanced Diploma
                  </Select.Option>
                  <Select.Option value="Diploma">Diploma</Select.Option>
                  <Select.Option value="GCE A/L">GCE A/L</Select.Option>
                  <Select.Option value="GCE O/L">GCE O/L</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="About"
                name="about"
                rules={[
                  {
                    required: true,
                    message: "Mandatory to submit",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Skills" name="skills" value={"fx"}>
                {/* ---------------------- TAGS ------------------------ */}
                <>
                  <div
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    {tagChild}
                  </div>
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
                {/* ---------------------------------------------------------- */}
              </Form.Item>
              <Form.Item label="Social Media">
                <Form.Item
                  name="facebook"
                  label="facebook"
                  rules={[
                    { type: "url", warningOnly: true },
                    { type: "string", min: 6 },
                  ]}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>

                <Form.Item
                  name="instagram"
                  label="Instagram"
                  rules={[
                    { type: "url", warningOnly: true },
                    { type: "string", min: 6 },
                  ]}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>

                <Form.Item
                  name="twitter"
                  label="Twitter"
                  rules={[
                    { type: "url", warningOnly: true },
                    { type: "string", min: 6 },
                  ]}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Submit">
                <Button type="primary" htmlType="submit">
                  Save Personal Information
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;