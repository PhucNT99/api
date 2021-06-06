const { DataTypes, Model } = require("sequelize")
const modelName = "Project"
class Project extends Model {}
module.exports = function(sequelize) {
    return Project.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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