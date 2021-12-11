import mongoose from 'mongoose';
const {Schema } = mongoose;

const balanceAccount = new Schema({

   accountNumber :{
       type:Number,
       required:true,
   },
   balance :{
       type:Number,
       required:true,
   },
   createdAt:{
       type: Date,
       required: true,
   },

});

export default mongoose.model('accountbalance', balanceAccount);

