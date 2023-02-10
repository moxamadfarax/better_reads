const router = require('express').Router();
const { Users } = require('../../models');
/*
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const usersData = await Users.findAll();

    // Serialize data so the template can read it
    const users = usersData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template

    res.render('allusers', users)
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

//move to homeRoutes
/*
router.get('/:id', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const usersData = await Users.findByPk(req.params.id);

    // Serialize data so the template can read it
    const user = usersData.get({ plain: true });

    // Pass serialized data and session flag into template

    res.render('userpage', user)
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;