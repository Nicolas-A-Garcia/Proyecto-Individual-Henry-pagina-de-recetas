const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID, //Genera un numero random con letras y numeros que no se va a repetir,r.
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //Permite que este vacio. Si lo setea en false, no lo permite
      primaryKey: true 
    
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishSummary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    score:{
      type: DataTypes.INTEGER
    },
    healthyFoodLevel:{
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn7.kiwilimon.com/recetaimagen/38976/400x300/50316.jpg.webp"
    },
    steps: {
      type: DataTypes.TEXT
    },   
  });
};
