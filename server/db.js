require("dotenv").config();

const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password : process.env.PASSWORD,
    database:"iot",
    port: 5432,
    host:"localhost"
});

module.exports = pool;