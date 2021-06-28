const router = require('express').Router();
const { Highscore,User } = require('../../models');

router.post('/', async(req,res) =>{
    try {
        const currentScore = await Highscore.findOne({where:{user_id:req.session.user_id}});
    if(currentScore === null){
        //no current score
        try{
            const newScoreData = await Highscore.create({
                score: req.body.score,
                user_id: req.session.user_id,
            });
    
            res.status(200).json(newScoreData);

        }catch (err){
            res.status(400).json(err);
        }
        
    }else{
        //there already is a score
        if(req.body.score > currentScore.score){
            Highscore.update(
                {
                  // All the fields you can update and the data attached to the request body.
                  score: req.body.score,
                },
                {
                  // Gets the books based on the id given in the request parameters
                  where: {
                    user_id: req.session.user_id,
                  },
                }
              )
                .then((updatedScore) => {
                  // Sends the updated book as a json response
                  res.status(200).json(updatedScore);
                })
                .catch((err) => res.json(err));
        }
        else{
            res.status(200).json(currentScore);
        }
        
    }
}
catch(err){
    res.status(500).json(err);
}

});




router.get('/topten', async(req,res) =>{
    try{
        const toptenData = await Highscore.findAll({order:[['score','DESC']],limit:10,include: [{model:User,attributes:['name']}]});
        res.status(200).json(toptenData);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;