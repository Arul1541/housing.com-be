const { userRegister, userLogin, userDashboard } = require("../controllers/user");

module.exports = async function (fastify, opts, done) {
  fastify.post("/api/register", userRegister);

  fastify.post("/api/login", userLogin);

  fastify.post("/api/dashboard", userDashboard);

  done();
};
