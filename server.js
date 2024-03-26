/**-------------------------- 4) Start Server |-----------------------*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});
const app = require('./app');

// DATABASE_LOCAL=mongodb://localhost:27017/natours-test
// const DB = 'mongodb://localhost:27017/natours-test';
// mongoose.connect(DB);

/** -------------| another rule to connect to mongoDB |---------*/
// mongoose.connect('mongodb://0.0.0.0:27017/natours-test', {
//     dbName: 'event_db',
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => err ? console.log(err) : console.log('Connected to database Sucessfully.....'));

mongoose.connect("mongodb://0.0.0.0:27017/natours-test")
.then(() => {
    console.log("Connected To DB Successfully....")
})
// .catch(err => console.log('ERROR'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
    console.log(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', err => {
    console.log('Uncaught Exception! SHUTTING DOWN...');
    console.log(err.name, err.message);
    process.exit(1);
});
// console.log(x);