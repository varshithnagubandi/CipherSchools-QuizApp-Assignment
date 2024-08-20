const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

const NewStudent = async (request, response) => {
  try {
    const { name, email, password, confirmpassword } = request.body;

    const exists = await Student.findOne({ email: email });

    if (exists) {
      return response.status(400).json({ message: "USER ALREADY EXISTS" });
    }

    if (password !== confirmpassword) {
      return response
        .status(400)
        .json({ message: "PASSWORD AND CONFIRMPASSWORDS ARE NOT MATCHING" });
    }

    const student = new Student({
      name,
      email,
      password,
      confirmpassword,
    });
    await student.save();
    response.status(200).json(student);
  } catch (error) {
    console.log("SERVER ERROR");
    response.status(500).json({ message: "SERVER ERROR" });
  }
};

const LoginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const exists = await Student.findOne({ email: email });
    if (!exists) {
      return response
        .status(400)
        .json({ message: "USER NOT FOUND GO AND REGISTER YOURSELF" });
    }
    if (exists.password !== password) {
      return response.status(400).json({ message: "INVALID PASSWORD" });
    }

    let payload = {
      user: {
        id: exists.id,
      },
    };

    jwt.sign(
      payload,
      "varshithJwtKey",
      { expiresIn: 1800000 },
      (error, token) => {
        if (error) throw error;
        return response.json({ token });
      }
    );
  } catch (error) {
    console.log("SERVER ERROR");
    response.status(500).json({ message: "SERVER ERROR" });
  }
};

const Myprofile = async (request, response) => {
  try {
    const exist = await Student.findById(request.user.id);
    if (!exist) {
      return response.status(400).json({ message: "USER NOT FOUND" });
    }
    response.json(exist);
  } catch (error) {
    console.log("Error is : ", error);
    return response.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = { NewStudent, LoginUser, Myprofile };
