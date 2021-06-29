const router = require('express').Router();
const { Highscore,User,Comment,Rating } = require('../../models');
const withAuth = require('./ratingRoutes');

router.get('/',async(req,res) => {

    try{
        const ratingData = await Rating.findAll({
            include: [{model:User}],
        });
        res.status(200).json(ratingData);
    } catch (err){
        res.status(500).json(err);
    }
    
});

router.post('/post/:id',async(req,res)=>{

    try{
        const ratingData = await Rating.create({
            rating:req.body.rating,

            user_id:req.session.user_id,
        });
       
        res.status(200).json(ratingData);
    } catch (err){
        res.status(500).json(err);
    }
    
    
});

module.exports = router;


