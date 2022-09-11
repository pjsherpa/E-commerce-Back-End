const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
// What has been done by PJ
// column/field created gor product_id & tag_id as this is what will be present in the title for product_id table
   id: {
     type: DataTypes.INTEGER,
     allowNull:false,
     primaryKey: true,
     autoIncrement: true
    },
    product_id:{
     type: DataTypes.INTEGER,
     allowNull:false,
    },
    tag_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
   }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
