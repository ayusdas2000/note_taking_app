module.exports = (sequelize,DataTypes) =>{
    const notes_sequelize = sequelize.define("notes_sequelize",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })
    return notes_sequelize
}