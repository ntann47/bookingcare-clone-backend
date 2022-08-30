import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/display-crud", homeController.displayCRUD);
  router.post("/api-login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleUpdateUserData);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-all-code", userController.getAllCode);
  router.get("/api/top-doctors-home", doctorController.getTopDoctorsHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-doctor-info", doctorController.postDoctorInfo);

  router.get(
    "/api/get-doctor-detail-by-id",
    doctorController.getDoctorDetailById
  );
  router.post(
    "/api/bulk-create-schedules",
    doctorController.bulkCreateSchedule
  );
  router.get(
    "/api/get-doctor-schedule-by-date",
    doctorController.getDoctorScheduleByDate
  );

  router.get(
    "/api/get-more-doctor-info-by-id",
    doctorController.getMoreDoctorInfoById
  );
  router.get(
    "/api/get-doctor-profile-by-id",
    doctorController.getDoctorProfileById
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.postPatientBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-specialty-detail-by-id",
    specialtyController.getSpecialtyDetailById
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-clinic-detail-by-id",
    clinicController.getClinicDetailById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );

  router.post("/api/send-remedy", doctorController.sendRemedy);
  return app.use("/", router);
};
module.exports = initWebRoutes;
