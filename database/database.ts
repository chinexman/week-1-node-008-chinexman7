import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI).then(() => console.log('database have been connected')).catch((err)=> console.log(`DB Connection Error ${err}`));

mongoose.connection.on('error', (err)=>{
    console.log(`DB connection error : ${err.message}`);
});

module.exports = mongoose;