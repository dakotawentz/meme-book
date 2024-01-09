const sequelize = require('../config/connection');
const { User, Meme, Comment } = require('../models');

const userData = require('./userData.json');
const memeData = require('./memeData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

 const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const meme of memeData) {
    await Meme.create({
      ...meme,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  const comments = await Comment.bulkCreate(commentData);
  
  process.exit(0);
};

seedDatabase();
