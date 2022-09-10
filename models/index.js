// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// What has been done-PJ
//Product/Category/Tag/ProductTag have all been connected through ProductTag.

// Products belongsTo Category
Product.belongsToMany(Category, {
  through: {
    model: product_tag,
    unique: false
  },
  as: 'product_category'
});

// Categories have many Products
Category.belongsToMany(Product, {
  through: {
    model: product_tag,
    unique: false
  },
  as: 'category_products'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: product_tag,
    unique: false
  },
  as: 'category_products'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product,{

  throughL{
    model: product_tag,
    unique:false
  },
    as: 'tag_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
