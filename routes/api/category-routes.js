const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product, as: 'category_id' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/',async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
   // update product data
   Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
    
      return ProductTag.findAll({ where: { id: req.params.id } });
    })
    .then((productTags) => {
  
      const categoryIds = Product.map(({ cat_id }) => cat_id);
      // create filtered list of new ids
      const newcategoryIds = req.body.category_name
        .filter((cat_id) => !categoryIds.includes(cat_id))
        .map((cat_id) => {
          return {
            id: req.params.id,
            cat_id,
          };
        });
      // figure out which ones to remove
      const category_nameToRemove = productTags
        .filter(({ cat_id }) => !req.body.category_name.includes(cat_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        category_name.destroy({ where: { id: category_nameToRemove } }),
        Produccategory_name.bulkCreate(newCategory_name),
      ]);
    })
    .then((updatedCategory_name) => res.json(updatedCategory_name))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
