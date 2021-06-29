const router = require('express').Router();
const { Highscore,User,Comment } = require('../../models');
const withAuth = require('./commentRoutes');

router.get('/',async(req,res) => {

    try{
        const commentData = await Comment.findAll({
            include: [{model:User}],
        });
        res.status(200).json(commentData);
    } catch (err){
        res.status(500).json(err);
    }
    
});

router.post('/post/:id',async(req,res)=>{

    try{
        const commentData = await Comment.create({
            text:req.body.text,

            user_id:req.session.user_id,
        });
       
        res.status(200).json(commentData);
    } catch (err){
        res.status(500).json(err);
    }
    
    
});

module.exports = router;



