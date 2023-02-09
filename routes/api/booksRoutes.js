const router = require('express').Router();
const { Books } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const booksData = await Books.findAll({
      include: [
        {
          model: Books,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = booksData.map((book) => book.get({ plain: true }));

    // Pass serialized data and session flag into template

    res.render('homepage', { 
      Books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;