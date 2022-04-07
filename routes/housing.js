const { addHousingData, getHousingData } = require('../controllers/housing');

module.exports = async function (fastify, opts, done) {
    fastify.post("/api/add-housing-data", addHousingData);

    fastify.get("/api/get-housing-data", getHousingData);

    done();
};
