// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // What has been done here-by PJ
    // Created column/field for id/product_name/price/stock/category_id according to seeds folder on the product section as this is what will be filled in
   id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoInrement: true
   },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  price: {
    type: DataTypes.INTEGER,
    allowNull:false,
  }
  stock: {
    type: DataTypes.INTEGER,
    allowNull:false,
  }
  category_id: {
    type.DataTypes.INTEGER,
    //check if this is unique
    unique: true,
    allowNull:false,
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
