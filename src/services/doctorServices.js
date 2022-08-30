import db from "../models/index";
import emailService from "../services/emailService";
import _ from "lodash";
require("dotenv").config();
const MAX_SCHEDULE = process.env.MAX_SCHEDULE;
const getTopDoctorsHome = async (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        limit: limit,
        where: {
          roleId: "R2",
        },
        include: [
          {
            model: db.Allcodes,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcodes,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        raw: false,
        nest: true,
      });
      if (doctors) {
        resolve({
          errCode: 0,
          errMessage: "Ok",
          data: doctors,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Ok",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve(doctors);
    } catch (err) {
      reject(err);
    }
  });
};
const postDoctorInfoService = (inputData) => {};
const getDoctorDetailByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              include: [
                {
                  model: db.Allcodes,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "Successfull",
          data: data,
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
const handleBulkCreateSchedule = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.doctorId || !data.formattedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let schedules = data.data;
        if (schedules.length > 0) {
          schedules = schedules.map((item) => {
            item.date = "" + item.date;
            item.maxNumber = parseInt(MAX_SCHEDULE, 10);
            return item;
          });
        }
        console.log("Schedules");
        console.log(schedules);
        // Get Existing Schedule
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: "" + data.formattedDate },
        });
        console.log("existing");
        console.log(existing);
        let toCreate = _.differenceWith(schedules, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        console.log("toCreate");
        console.log(toCreate);
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
          resolve({
            errCode: 0,
            errMessage: "Successfully",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
const handleGetDoctorScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        console.log(doctorId);
        console.log(date);
        doctorId = parseInt(doctorId, 10);
        let data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
            {
              model: db.Allcodes,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          errMessage: "Successfull",
          data: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const handleGetMoreDoctorInfoByIdService = async (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = await db.Doctor_Info.findOne({
          where: { doctorId: doctorId },

          include: [
            {
              model: db.Allcodes,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcodes,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcodes,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],

          raw: false,
          nest: true,
        });
        if (data) {
          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: data,
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
const handleGetDoctorProfileByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },

            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              include: [
                {
                  model: db.Allcodes,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "Successfull",
          data: data,
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
const handleGetListPatientForDoctorService = async (id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      console.log(date);
      if (!id || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            doctorId: id,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "lastName",
                "address",
                "gender",
                "phonenumber",
              ],
            },
            {
              model: db.Allcodes,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data) {
          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: data,
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: [],
          });
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
const handleSendRemedyService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (inputData) {
        if (
          !inputData.remedyData.doctorId ||
          !inputData.remedyData.patientId ||
          !inputData.remedyData.patientEmail ||
          !inputData.remedyData.patientName ||
          !inputData.remedyData.date
        ) {
          resolve({
            errCode: 1,
            errMessage: "Missing data",
          });
        } else {
          //update patient status
          let appointment = await db.Booking.findOne({
            where: {
              doctorId: inputData.remedyData.doctorId,
              patientId: inputData.remedyData.patientId,
              date: inputData.remedyData.date,
              statusId: "S2",
            },
            raw: false,
          });
          if (appointment) {
            appointment.statusId = "S3";
            await appointment.save();
          }
          //send email
          await emailService.sendAttachment(inputData);
          resolve({
            errCode: 0,
            errMessage: "Successfully",
          });
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = {
  getTopDoctorsHome,
  getAllDoctors,
  postDoctorInfoService,
  getDoctorDetailByIdService,
  handleBulkCreateSchedule,
  handleGetDoctorScheduleByDateService,
  handleGetMoreDoctorInfoByIdService,
  handleGetDoctorProfileByIdService,
  handleGetListPatientForDoctorService,
  handleSendRemedyService,
};
