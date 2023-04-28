import { Row, Col, Card, Steps, Button, notification  } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import PersonalInformation from "./Add_profile/personalInformation/PersonalInformation";
import { useSelector } from "react-redux";
import { useState } from "react";
import EducationalQualification from "./Add_profile/educationalQualification/EducationalQualification";

function Add_Profile() {

  const [currentSteps, setCurrentSteps] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const profileReducer = useSelector(state => state.profile)

  // const openNotification = (placement) => {
  //   api.error({
  //     message: `Notification ${placement}`,
  //     description:
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //     placement,
  //   });
  // };


  const handleNextDisable = () => {
    if(currentSteps === 0 && profileReducer.personalInformation.length === 0){
      return true
    } else {
      return false
    }
  }

  const handleNext = () => {
    console.log("profileReducer", profileReducer.personalInformation)
    setCurrentSteps(prev => prev + 1)
  }

  return (
    <>
    {contextHolder}
      <div
        className="profile-nav-bg pb-12"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <br></br>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Add Profile</h6>
            <p>More relevant information speeds up work.</p>
          </>
        }
      >
        <Row>
          <Col span={24} md={24} lg={24} xl={24}>
            {/* ------------------------------------------------------------ */}
            <Steps
              progressDot
              current={currentSteps}
              items={[
                {
                  title: "Personal",
                  description: "Information",
                },
                {
                  title: "Educational",
                  description: "Qualification",
                },
                {
                  title: "Job",
                  description: "Experience",
                },
                {
                  title: "Project",
                  description: "Experience",
                },
              ]}
            />
            {/* ------------------------------------------------------------ */}

            <>
              {currentSteps === 0 ? <PersonalInformation /> : currentSteps === 1 ? <EducationalQualification /> : null}
            </>
          </Col>
        </Row>

        <Row>
          <Col md={22}>
            <Button type="default" disabled={false}>Previous</Button>
          </Col>
          <Col md={2}>
            <Button type="primary" onClick={handleNext} disabled={handleNextDisable()}>Next</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Add_Profile;
