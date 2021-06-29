const User = require('./User');
const Highscore = require('./Highscore');
const Comment = require('./Comment');
const Rating = require('./Rating');
User.hasOne(Highscore, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Highscore.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
})
Commment.belongsTo(User,{
    foreignKey:'user_id',

});

User.hasMany(Rating,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
})
Rating.belongsTo(User,{
    foreignKey:'user_id',

});

module.exports = { User, Highscore,Comment,Rating };