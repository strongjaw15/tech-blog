const { User } = require('../models');

const userData = [
  {
    username: "ssumption0",
    password: "9Om7cZzT"
  }, 
  {
    username: "ckores1",
    password: "qxdAg1XyFT"
  }, 
  {
    username: "trosenberg2",
    password: "dwp3Xg0wvN"
  }, 
  {
    username: "slockey3",
    password: "uWbhRamtw5"
  }, 
  {
    username: "vgoady4",
    password: "kIsIlQ1SfQ57"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;