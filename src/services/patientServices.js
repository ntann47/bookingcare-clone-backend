import bcrypt, { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import db from "../models";
require("dotenv").config();
import emailService from "../services/emailService";
const handlePostPatientBookAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.selectedSchedule ||
        !data.doctorName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing email address",
        });
      } else {
        //find or create
        let [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            lastName: data.fullName,
            gender: data.gender,
            address: data.address,
            roleId: "R3",
          },
        });
        let token = uuidv4();
        data.redirectLink = builUrlConfirmBooking(data.doctorId, token);
        await emailService.sendSimpleEmail(data);

        //create a booking record
        if (user) {
          let [bookSchedule, created] = await db.Booking.findOrCreate({
            where: {
              patientId: user.id,
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user.id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Saving user Successfully",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const builUrlConfirmBooking = (doctorId, token) => {
  return `${process.env.URL_CLIENT}/verify-booking?token=${token}&doctorId=${doctorId}`;
};
const handlePostVerifyBookAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: parseInt(data.doctorId, 10),
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        console.log(appointment);
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update appointment successfully",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  handlePostPatientBookAppointment,
  handlePostVerifyBookAppointment,
};
