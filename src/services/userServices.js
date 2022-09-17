import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};
const handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {
        errCode: 0,
        errMessage: "",
      };
      let isExist = await mailCheck(email);
      if (isExist != null) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
        });
        let isTruePass = bcrypt.compareSync(password, user.password);
        if (isTruePass) {
          result.errCode = 0;
          result.errMessage = "Passwords matched";
          delete user.password;
          result.user = user;
        } else {
          result.errCode = 2;
          result.errMessage = "Passwords not match";
        }
      } else {
        result.errCode = 3;
        result.errMessage = "Email not exist";
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
const mailCheck = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(err);
    }
  });
};
const passCheck = (pass) => {
  return new Promise((resolve, reject) => {});
};
const getAllUsers = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = {};
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await mailCheck(data.email);
      if (user === null) {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        console.log(hashPasswordFromBcrypt);
        console.log(data);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        });
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User already exists",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: false,
      });
      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          errMessage: "User has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `User ${userId} is not exist`,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data.email);
      let user = await db.User.findOne({
        where: {
          email: data.email,
        },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        if (data.image) {
          user.image = data.image;
        }
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "User was updated successfully",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `User ${data.id} is not exist`,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcodes.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  mailCheck: mailCheck,
  passCheck: passCheck,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
