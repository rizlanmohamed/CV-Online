import Styles from "./ReviewPage.module.css";
import { useSelector } from "react-redux";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Timeline,
  Space,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../../../assets/images/bg-profile.jpg";
import profilavatar from "../../../assets/images/face-1.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import convesionImg4 from "../../../assets/images/face-6.jpeg";
import convesionImg5 from "../../../assets/images/face-2.jpg";
import project1 from "../../../assets/images/home-decor-1.jpeg";
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";
import { useState } from "react";
import { addUser } from "../../../services/services";

const ReviewPage = () => {
  const profileInfo = useSelector((state) => state.profile);
  console.log(profileInfo);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const lastElement = (arr) => {
    let len = arr?.length;
    const result = arr.length !== 0 ? arr[len - 1] : null;
    return result ? result.title + " / " + result.companyName : "Anonymous";
  };

  const handleGrade = (marks) => {
    if(marks <= 25){return 'W'}
    else if (marks >= 26 && marks <= 50) {return 'C'}
    else if (marks >= 51 && marks <= 75) {return 'B'}
    else if (marks >= 75) {return 'A'}
    else {return 'W'}

  }

  const handleConfirm = () => {
    addUser(profileInfo)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  return (
    <>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  {profileInfo &&
                    profileInfo.personalInformation.map((personalInfo, i) => (
                      <h4 className="font-semibold m-0">
                        {personalInfo.firstName}
                      </h4>
                    ))}

                  <p>{lastElement(profileInfo.experienceInformation)}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Space>
                <Button>Edit Profile</Button>
                <Button type="primary" onClick={handleConfirm}>Confirm</Button>
                </Space>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        {profileInfo &&
          profileInfo.personalInformation.map((personalInfo, i) => {
            return (
              <>
                <Col span={24} md={8} className="mb-24">
                  <Card
                    key={i}
                    bordered={false}
                    title={
                      <h6 className="font-semibold m-0">Profile Information</h6>
                    }
                    className="header-solid h-full card-profile-information"
                    // extra={<Button type="link">{pencil}</Button>}
                    bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                  >
                    {/* <hr className="my-25" /> */}
                    <Descriptions title="">
                      <Descriptions.Item label="Full Name" span={3}>
                        {personalInfo.firstName + " " + personalInfo.lastName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile" span={3}>
                        {personalInfo.phoneNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email" span={3}>
                        {personalInfo.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Location" span={3}>
                        {personalInfo.location}
                      </Descriptions.Item>
                      <Descriptions.Item label="Higher Education" span={3}>
                        {personalInfo.higherEducation}
                      </Descriptions.Item>
                      <Descriptions.Item label="Total Experience" span={3}>
                        {personalInfo.totalExperience}
                      </Descriptions.Item>
                      {personalInfo.skills?.length >= 1 && 
                      <Descriptions.Item label="Primary Skills" span={3}>
                      {personalInfo.skills?.map((skill) => (
                        <p>{skill + " | "}</p>
                      ))}
                    </Descriptions.Item>}
                      
                      <Descriptions.Item label="Social" span={3}>
                        {personalInfo.facebook && (
                          <a href={personalInfo.facebook} className="mx-5 px-5">
                            {<FacebookOutlined style={{ color: "#344e86" }} />}
                          </a>
                        )}

                        {personalInfo.twitter && (
                          <a href={personalInfo.twitter} className="mx-5 px-5">
                            {<TwitterOutlined />}
                          </a>
                        )}

                        {personalInfo.instagram && (
                          <a
                            href={personalInfo.instagram}
                            className="mx-5 px-5"
                          >
                            {<InstagramOutlined style={{ color: "#e1306c" }} />}
                          </a>
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>

                <Col span={24} md={8} className="mb-24 ">
                  <Card
                    bordered={false}
                    className="header-solid h-full"
                    title={
                      <h6 className="font-semibold m-0">
                        About
                      </h6>
                    }
                  >
                    <p>
                        {personalInfo.about}
                    </p>
                  </Card>
                </Col>
              </>
            );
          })}

        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24} md={12} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={
              <h6 className="font-semibold m-0">Experience Information</h6>
            }
            style={{ margin: 10 }}
          >
            <Timeline
              mode={"alternate"}
              items={profileInfo.experienceInformation
                ?.slice(0)
                .reverse()
                .map((exp) => {
                  return {
                    label:
                      exp.startDate.format("YYYY-MM") +
                      " - " +
                      exp.endDate.format("YYYY-MM"),
                    children: (
                      <>
                        <h4>{exp.title}</h4>
                        <p>
                          {exp.companyName + " - " + exp.location}
                          <br />
                          {exp.EmploymentType}
                          <br />
                          {"Skills : " +
                            exp.skills?.map((skill) => skill + " | ")}
                          <br />
                          {exp.description}
                        </p>
                      </>
                    ),
                  };
                })}
            />
          </Card>
        </Col>

        <Col span={20} md={12} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Education Information</h6>}
            style={{ margin: 10 }}
          >
            <Timeline
              mode={"alternate"}
              items={profileInfo.educationInformation
                ?.slice(0)
                .reverse()
                .map((edu) => {
                  return {
                    label:
                      edu.startDate.format("YYYY-MM") +
                      " - " +
                      edu.endDate.format("YYYY-MM"),
                    children: (
                      <>
                        <h4>{edu.degree === 'gce' ? edu.examType : (edu.degree + " in " + edu.fieldOfStudy)}</h4>
                        <p>
                          <b>{edu.school}</b>
                          <br />
                          <b>Grade: {edu.degree === 'gce' ? edu.subjects.map((sub, i) => {
                            return(
                              <li key={i}>{sub.subject} : {handleGrade(sub.grade)}</li>
                            )
                          }) : edu.grade}</b>
         
                          <br />
                          {edu.description}
                        </p>
                      </>
                    ),
                  };
                })}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewPage;
