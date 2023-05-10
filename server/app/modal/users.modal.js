import pool from "../database.js";

const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users_details");
  return rows;
};

const createUserModal = async (username, password, email, userType) => {
  const response = await pool.query(
    `INSERT INTO users(username, password, email, userType) VALUES (?, ?, ? ,?)`,
    [username, password, email, userType]
  );
  return response;
};

const findEmail = async (email) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
    return result;
}

const loginUserModal = async (email, password) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE email = ? AND password = ? `, [email, password])
    return result;
}

export { getAllUsers, createUserModal, findEmail, loginUserModal };
