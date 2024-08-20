const jwt = require("jsonwebtoken");

const Middleware = (request, response, next) => {
  try {
    let token = request.header("x-token");
    if (!token) {
      return response.status(400).json({ message: "TOKEN NOT FOUND" });
    }

    // this line gives the original id after decoding
    let decode = jwt.verify(token, "varshithJwtKey");
    /*
    our id is in payload in the form of -->
    let payload={
       user:{
        id:exist.id
       }
    }
    */
    request.user = decode.user;
    next();
  } catch (error) {
    console.log("Error is : ", error);
    response.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = Middleware ;
