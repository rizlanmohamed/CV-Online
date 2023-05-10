import {
  createUserModal,
  getAllUsers,
  findEmail,
  loginUserModal
} from "../modal/users.modal.js";
import bcrypt from "bcryptjs";

const getAllUsersController = async (req, res) => {
  const notes = await getAllUsers();
  res.json(notes);
  console.log(notes);
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
          res
            .status(200)
            .json({ message: "User successfully created", result });
        })
        .catch((err) => {
          res.status(400).json({ message: "User adding failed", err });
        });
    }
  }
};

const loginUser = async (req, res) =>{
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400).json({ message: "Please fill all the values" });
  } else{
    const checkUserMail = await findEmail(email);

    if(checkUserMail.length !== 0 && (await bcrypt.compare(password, checkUserMail[0].password))){
      res.status(200).json({...checkUserMail})
    } else{
      res.status(400).json({ message: "Invalid username or password" });
    }
  }
}

export { getAllUsersController, createUser, loginUser };
