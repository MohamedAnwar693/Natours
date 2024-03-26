/**-------------------------- | Start Server |-----------------------*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});
const app = require('./app');

mongoose.connect("mongodb://0.0.0.0:27017/natours-test")
.then(() => {
    console.log("Connected To DB Successfully....")
})

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
