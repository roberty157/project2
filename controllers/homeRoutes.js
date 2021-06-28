const router = require('express').Router();
const {  User,Highscore } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
      
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/game', withAuth, (req,res) =>{
  
    res.render('game', {
        logged_in: req.session.logged_in 
      });
});

router.get('/leaderboard',async(req,res)=>{
  try{
    const toptenData = await Highscore.findAll({order:[['score','DESC']],limit:10,include: [{model:User,attributes:['name']}]});
    const topten = toptenData.map((score)=>score.get({plain:true}));

    res.render('leaderboard',{
      topten,
      logged_in: req.session.logged_in
    });
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;