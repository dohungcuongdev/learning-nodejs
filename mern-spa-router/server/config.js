//const DB = process.env.MONGODB_URL || 'mongodb://localhost/mern-spa';

const DB_USERNAME = 'dohungcuongdev';
const DB_PW = 'ititiu13170';
const DB_MLAB_HOST = 'ds255577.mlab.com:55577';
const DB_MLAB = 'mern-spa';
const DB = "mongodb://" + DB_USERNAME + ":" + DB_PW + "@" + DB_MLAB_HOST + "/" + DB_MLAB;

module.exports = { DB }