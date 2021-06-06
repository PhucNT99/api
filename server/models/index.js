const { Sequelize, Model, DataTypes } = require('sequelize');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env
const fs = require("fs");
const DB_LOGGING = process.env.DB_LOGGING
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: eval(DB_LOGGING)     
})
let models = {}
const files = fs.readdirSync("./server/models")
for( f of files) {
    if(f != "index.js" && f != "models.js") {
        isManual = require("./" + f).isManual
        if(isManual) {
            continue
        }
        name = require("./" + f).Name
        models[name] = require("./" + f)(sequelize, models)
    }
}
models["Project"].hasMany(models["Api"])
models["Api"].hasMany(models["Test"])
// models["Api"].belongsTo(models["Project"])
sequelize.sync({force: false, alter: true})
.then(() => {
    console.log("SUCCESS!")   
})

module.exports = models