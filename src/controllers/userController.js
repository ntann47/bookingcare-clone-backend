import userServices from "../services/userServices";
const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing or invalid email and password",
    });
  }
  let result = await userServices.handleUserLogin(email, password);
  return res.status(200).json({
    // errCode: 0,
    // message: 'Hello world!',
    // email: email,
    // password: password
    errCode: result.errCode,
    errMessage: result.errMessage,
    user: result.user ? result.user : {},
  });
};
const handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // ALL, ID
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: {},
    });
  }
  let users = await userServices.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
const handleCreateNewUser = async (req, res) => {
  console.log(req.body);
  let result = await userServices.createNewUser(req.body);
  return res.status(200).json(result);
};
const handleUpdateUserData = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let result = await userServices.updateUserData(req.body);
  return res.status(200).json(result);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let result = await userServices.deleteUser(req.body.id);
  return res.status(200).json(result);
};
const getAllCode = async (req, res) => {
  try {
    let data = await userServices.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get all code error: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleUpdateUserData: handleUpdateUserData,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
