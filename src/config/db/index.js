const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/study_node_dev');
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
    throw new Error(error);
  }
}

module.exports = { connect };
