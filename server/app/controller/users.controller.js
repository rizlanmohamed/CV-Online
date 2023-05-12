import {
  createUserModal,
  getAllUsers,
  findEmail,
  loginUserModal,
  addUserDetailsModal,
  addUserEducationModal,
  addUserExperienceModal
} from "../modal/users.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getAllUsersController = async (req, res) => {
  const notes = await getAllUsers();
  res.status(201).json(notes);
};

const createUser = async (req, res) => {
  const { username, password, email, userType } = req.body;

  if (!username || !password || !email || !userType) {
    res.status(400).json({ message: "Please fill the all values" });
  } else {
    const checkExistUser = await findEmail(email);

    if (checkExistUser.length >= 1) {
      res.status(400).json({ message: "User already exist, please login" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      createUserModal(username, hashedPassword, email, userType)
        .then((result) => {
          let token = generateJWT(result.insertId);

          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: false,
            })
            .json({
              message: "User successfully created",
              result: result.insertId,
              token: token,
            });
        })
        .catch((err) => {
          res.status(400).json({ message: "User adding failed", err });
        });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please fill all the values" });
  } else {
    const checkUserMail = await findEmail(email);

    if (
      checkUserMail.length !== 0 &&
      (await bcrypt.compare(password, checkUserMail[0].password))
    ) {
      let token = generateJWT(checkUserMail[0].id);
      res
        .status(200)
        .cookie("access_token", token)
        .json({
          ...checkUserMail,
          checkingToken: checkUserMail[0].id,
          token: token,
        });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  }
};

const logoutUser = async (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

const addUserDetails = async (req, res) => {
  const result = req.body.data;
  const personalInfo = await result.personalInformation[0];
  const educationInfo = await result.educationInformation;
  const experienceInfo = await result.experienceInformation;
  const token = req.headers.authorization.split(" ")[1];
  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  try{
    // ---------------------------User Profile ----------------------------------
  let userProfileValuesToDB = {
    user_id: decode.id,
    ...personalInfo,
    skills: personalInfo.skills.toString(),
    phoneNumber: personalInfo.phoneNumber.toString(),
    twitter: personalInfo.twitter ? personalInfo.twitter : null,
    instagram: personalInfo.instagram ? personalInfo.instagram : null,
    facebook: personalInfo.facebook ? personalInfo.facebook : null,
    image: personalInfo.image ? personalInfo.image : null
  }

  const userProfileResult = await addUserDetailsModal(userProfileValuesToDB)
// -----------------------------------------------------------------------------

  // ---------------------------User Education ----------------------------------

  const userEducationValuesToDB = educationInfo?.map((data) => {
    const modData = [
      decode.id,
      data.school,
      data.degree,
      data.fieldOfStudy ? data.fieldOfStudy : null,
      data.examType ? data.examType : null,
      data.subjects ? data.subjects.map(sub => sub.subject + ' - ' + sub.grade).toString() : null,
      data.grade ? data.grade.toString()  : null,
      data.startDate,
      data.endDate,
      data.description,
      data.createdAt ? data.createdAt : null,
    ]

    return modData
  })

const userEducationResult = await addUserEducationModal(userEducationValuesToDB)
// -----------------------------------------------------------------------------

  // ---------------------------User Experience ----------------------------------

  const userExperienceValuesToDB = experienceInfo?.map((data) => {
    const modData = [
      decode.id,
      data.title,
      data.employmentType,
      data.companyName,
      data.skills?.length >= 1 ? data.skills.toString() : null,
      data.location,
      data.startDate,
      data.endDate,
      data.description,
      data.createdAt ? data.createdAt : null,
    ]

    return modData
  })

const userExperienceResult = await addUserExperienceModal(userExperienceValuesToDB)


  res
      .status(201)
      .json({message: 'data added', userProfileResult, userEducationResult , userExperienceResult })

// ----------------------------------------------------------------------------- 
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Error during the data adding', error})
  }

};

export {
  getAllUsersController,
  createUser,
  loginUser,
  logoutUser,
  addUserDetails,
};
