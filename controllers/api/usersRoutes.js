const router = require('express').Router();
const { Users } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const usersData = await Users.findAll({
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = usersData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template

    res.render('homepage', { 
      users, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;