const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('typeRecipe', {  //No le paso el ID porque lo hace solo.
    title: {                     //Sequalize lo crea cuando vos no le pasas como queres que sea.
      type: DataTypes.STRING,
      allowNull: false
    }
});
};