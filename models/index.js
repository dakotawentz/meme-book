const Meme = require('./Memes');
const User = require('./User');

Meme.belongsTo(User, {

});

User.hasMany(Meme, {
    
});
