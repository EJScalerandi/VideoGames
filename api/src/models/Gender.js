const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gender = sequelize.define('Gender', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  // No definas la relación aquí
  // Gender.belongsToMany(Videogame, {
  //   through: 'Videogame_activity',
  //   as: 'genders', // Alias para la relación
  //   foreignKey: 'GenderId', // Nombre de la clave foránea en la tabla intermedia
  // });

  return Gender;
};

