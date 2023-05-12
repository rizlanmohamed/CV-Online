import pool from "../database.js";

const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users_details");
  return rows;
};

const createUserModal = async (username, password, email, userType) => {
  const [result] = await pool.query(
    `INSERT INTO users(username, password, email, userType) VALUES (?, ?, ? ,?)`,
    [username, password, email, userType]
  );
  return result;
};

const findEmail = async (email) => {
  const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return result;
};

const findByUserID = async (id) => {
  const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return result;
};

const loginUserModal = async (email, password) => {
  const [result] = await pool.query(
    `SELECT * FROM users WHERE email = ? AND password = ? `,
    [email, password]
  );
  return result;
};

const addUserDetailsModal = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO users_details ( user_id, firstName, lastName, phoneNumber, email, totalExperience, higherEducation, location, about, skills, facebook, instagram, twitter, image) 
      VALUES 
    ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `, [
      data.user_id,
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.email,
      data.totalExperience,
      data.higherEducation,
      data.location,
      data.about,
      data.skills,
      data.facebook,
      data.instagram,
      data.twitter,
      data.image
    ]
  );
  return result;
};

const addUserEducationModal = async (multipleData) => {
  const [result] = await pool.query(
    `INSERT INTO users_education (user_id, school, degree, fieldOfStudy, examType, Subjects, grade, startDate, endDate, description, createdAt) 
      VALUES ? `, [multipleData]);
  return result;
};

const addUserExperienceModal = async (multipleData) => {
  const [result] = await pool.query(
    `INSERT INTO user_experience (user_id, title, employmentType, companyName, skills, location, startDate, endDate, description, createdAt) 
      VALUES ? `, [multipleData]);
  return result;
};

export {
  getAllUsers,
  createUserModal,
  findEmail,
  loginUserModal,
  findByUserID,
  addUserDetailsModal,
  addUserEducationModal,
  addUserExperienceModal,
};
