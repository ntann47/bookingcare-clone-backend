import bcrypt, { hash } from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
        gender: data.gender == "1" ? true : false,
        // image: data.image,
        roleId: data.roleId,
        // positionId: data.positionId,
      });
      resolve("New User created successfully");
    } catch (err) {
      reject(err);
    }
  });
};
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
};
