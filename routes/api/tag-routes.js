const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData=await Tag.findAll(req.params.id, {
     
      include: [{model: Product, through:ProductTag, as: 'tag_products' }],
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData=await Tag.findByPK(req.params.id,{
      include: [{model: Product, through:ProductTag, as: 'tag_products' }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Tag) => {
    
      return ProductTag.findAll({ where: { id: req.params.id } });
    })
    .then((productTags) => {
  
      const tagIds = Product.map(({ tag_id }) => tag_id);
      // create filtered list of new ids
      const newTagIds = req.body.tag_name
        .filter((tag_id) => !tagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const tag_nameToRemove = productTags
        .filter(({tag_id }) => !req.body.tag_name.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        tag_name.destroy({ where: { id: tag_nameToRemove } }),
        ProducTag_name.bulkCreate(newTag_name),
      ]);
    })
    .then((updatedTag_name) => res.json(updatedTag_name))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
