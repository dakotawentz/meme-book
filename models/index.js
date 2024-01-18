const Meme = require('./Memes');
const User = require('./User');
const Comment = require('./Comments');

Meme.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE",
});

User.hasMany(Meme, {
    foreignKey: 'user_id',
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    // as: 'user',
    // targetKey: 'id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Meme, {
    foreignKey: 'meme_id',
    onDelete: "CASCADE",
});

Meme.hasMany(Comment, {
    foreignKey: 'meme_id',
});

module.exports = { User, Meme, Comment };