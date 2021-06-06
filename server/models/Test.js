const { DataTypes, Model } = require("sequelize")
const modelName = "Test"
class Test extends Model {}
module.exports = function(sequelize) {
    return Test.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false
        }        
    }, {
        sequelize,
        modelName,
        freezeTableName: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    })
}
module.exports.Name = modelName