const db = require("../models");

const handleCreateClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        console.log(data);
        await db.Clinic.create({
          name: data.name,
          image: data.image,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Successfully",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const handleGetAllClinicService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data = data.map((item) => {
          if (item.image) {
            item.image = Buffer.from(item.image, "base64").toString("binary");
            return item;
          }
        });
        resolve({
          errCode: 0,
          errMessage: "Successfully",
          data,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Successfully",
          data: [],
        });
      }
    } catch (err) {
      resolve(err);
    }
  });
};
const handleGetClinicDetailByIdService = async (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!clinicId) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: clinicId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let arrDoctorId = [];
          let doctors = [];

          doctors = await db.Doctor_Info.findAll({
            where: { clinicId: clinicId },
            attributes: ["doctorId", "provinceId"],
          });
          data.clinicDoctors = doctors;
          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: data,
          });
        } else {
          data.clinicDoctors = [];
          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: data,
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
  handleCreateClinicService,
  handleGetClinicDetailByIdService,
  handleGetAllClinicService,
};
