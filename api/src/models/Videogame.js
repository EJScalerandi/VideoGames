const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Videogame = sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {tableName: 'Videogames', timestamps: false });

  // En el modelo Videogame
  Videogame.associate = (models) => {
    Videogame.belongsToMany(models.Gender, {
      through: 'Videogame_activity',
      as: 'genders', // Alias para la relación
      foreignKey: 'VideogameId', // Nombre de la clave foránea en la tabla intermedia
    });
  };

  return Videogame;
};
