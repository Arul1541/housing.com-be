const fastify = require("fastify")();

fastify.register(require("fastify-cors"), {});

const mongoose = require("mongoose");

require("dotenv").config();

//regesitering the routes
fastify.register(require("./routes/user"));
fastify.register(require("./routes/housing"))

// fastify.register(require("./routes/housingdata"));
//mongo db connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo is ready !"))
  .catch((err) => console.log(err));

//declare a basic route
fastify.get("/", function (request, reply) {
  reply.send({ test: "working" });
});

//running the port
fastify.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log(`Server Started at ${new Date()} Running....`);
});
