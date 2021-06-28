const sequelize = require('../config/connection');
const { User, Highscore } = require('../models');


const userData = require('./userData.json');
const highscoreData = require('./highscoreData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    //User.bulkCreate(userData);
    /*
    const user=  await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    */
   
      await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Highscore.bulkCreate(highscoreData);
    
    
  
    
    
    process.exit(0);
  };

seedDatabase();