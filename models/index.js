const Meme = require('./Memes');
const User = require('./User');
const Comment = require('./Comments');

Meme.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Meme, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    targetKey: 'id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Meme, {
    foreignKey: 'meme_id',
});

Meme.hasMany(Comment, {
    foreignKey: 'meme_id',
});

module.exports = { User, Meme, Comment };