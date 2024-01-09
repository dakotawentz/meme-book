const Meme = require('./Memes');
const User = require('./User');
const Comments = require('./Comments');

Meme.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Meme, {
    foreignKey: 'user_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Meme, {
    foreignKey: 'meme_id',
});

Meme.hasMany(Comments, {
    foreignKey: 'meme_id',
});

module.exports = { User, Meme, Comments };