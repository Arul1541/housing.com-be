const Housing = require("../models/housing");
const { verifyToken } = require("../Middlewares/auth");

//controller for adding housing data
exports.addHousingData = async (req, reply) => {
    try {
        console.log(req.body)
        const addHousingData = await new Housing({
            ...req.body,
          }).save();
          if (addHousingData) console.log("Housing Data created successfully: ", addHousingData);
          return reply.code(200).send({ status: "ok", message: "Housing Data successfully" });
    } catch (error) {
      console.log("Something went wrong", error);
      reply.code(400).send({ error: "Adding Data Failed" });
    }
  };

//controller for getting housing data
exports.getHousingData = async (req, reply) => {
  try {
    const token = req.headers["token"];
    // console.log(token);
    const verify = verifyToken(token);
    if (!verify.status)
      return reply.code(400).send({ status: "error", message: verify.err });
    // return reply.send({ status: "ok", message: "User authenticated successfully" });
    const data = await Housing.find({ token: token });
    if (data){
        return reply.code(200).send({status:"ok",data:data})
    }
  } catch (error) {
    console.log("Something went wrong", error);
    reply.code(400).send({ error: "Verification Failed" });
  }
};
