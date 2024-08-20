const Student = require("../models/Student");
const StudentController = require("../controllers/StudentController");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/Middleware");

router.post("/add-student", StudentController.NewStudent);
router.post("/verify-login", StudentController.LoginUser);

router.get("/my-profile", middleware, StudentController.Myprofile);

module.exports = router;
