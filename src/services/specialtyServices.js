const db = require("../models");

const handleCreateSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        console.log(data);
        await db.Specialty.create({
          name: data.name,
          image: data.image,
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
const handleGetAllSpecialtyService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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
const handleGetDetailSpecialtyByIdService = async (specialtyId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!specialtyId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let data = { specialtyDetail: {}, specialtyDoctors: [] };
        data.specialtyDetail = await db.Specialty.findOne({
          where: { id: specialtyId },
          attributes: ["name", "descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctors = [];
          if (location === "ALL") {
            doctors = await db.Doctor_Info.findAll({
              where: { specialtyId: specialtyId },
              attributes: ["doctorId", "provinceId"],
            });
            data.specialtyDoctors = doctors;
            console.log(data);
            resolve({
              errCode: 0,
              errMessage: "Successfully",
              data: data,
            });
          } else {
            doctors = await db.Doctor_Info.findAll({
              where: { specialtyId: specialtyId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
            data.specialtyDoctors = doctors;
            resolve({
              errCode: 0,
              errMessage: "Successfully",
              data: data,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = {
  handleCreateSpecialtyService,
  handleGetAllSpecialtyService,
  handleGetDetailSpecialtyByIdService,
};
