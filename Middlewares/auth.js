const jwt = require("jsonwebtoken");

//validation for user
const validate = (data) => {
  if (!data.name || typeof data.name !== "string")
    return { err: "Invalid name" };
  if (!data.username || typeof data.username !== "string")
    return { err: "Invalid username" };
  if (!data.password || typeof data.password !== "string")
    return { err: "Invalid password" };
  if (data.password.length < 5)
    return { err: "Password too small. Should be atleast 6 characters" };
  if (!data.phonenumber || typeof data.phonenumber !== "string")
    return { err: "Invalid phone number" };
  else {
    let validRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!data.phonenumber.match(validRegex))
      return { err: "Invalid phone number" };
  }
  if (!data.email || typeof data.email !== "string")
    return { err: "Invalid email" };
  else {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!data.email.match(validRegex)) return { err: "Invalid email" };
  }
};

//generating token for user
const generateAuthToken = function (user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "18h" }
  );
  return token;
};

//verifying token for user
const verifyToken = function (token) {
  if (!token) {
    return { status: false, err: "A token is required for authentication" };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { status: true, payload: decoded };
  } catch (err) {
    return { status: false, err: "Invalid token" };
  }
};

module.exports = {
  validate,
  generateAuthToken,
  verifyToken,
};
