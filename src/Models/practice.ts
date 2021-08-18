// import express, {Request,Response} from 'express'
// const app = express();
// const router = express.Router();
// import path from 'path';
// import fs, { read } from 'fs';
// import {v4 as uuidv4} from 'uuid'



// const balancePath = path.join(__dirname,'../../database/balance.json')
// const transactPath = path.join(__dirname,'../../database/transact.json');
//   const accBalance = JSON.parse(fs.readFileSync(balancePath, 'utf-8'));
//   const transact = JSON.parse(fs.readFileSync(transactPath,'utf-8'));
//   //console.log(transact);
  
//   interface accountType {
//     accountNumber: number,
//     balance: number,
//     "created-At": string
//   }

//   function allBalance(){
//     return new Promise ((resolve, reject) => {
//       try{
//         const accDatabase = JSON.stringify(accBalance, null, ' ')
//         resolve(accDatabase)
//       } catch(error){
//         reject('problem getting all balance')
//       }
//     })
//   }


//   function oneAccountBalance(num: string){
//     return new Promise ((resolve, reject) => {
//       try{
    
//         const accountNumber = accBalance.find((c:{accNo:number})=>c.accNo === parseInt(num));

//         const singleAccount = JSON.stringify(accountNumber, null, ' ')
//         resolve(singleAccount)
//       } catch(error) {
//         reject('problem getting that Account')
//       }
//     })
//     }

// router.get('/:accountNumber', function(req,res,next){
//     console.log(req.params.accountNumber);

//     const accountNumber = accBalance.find((c:{accNo:number})=>c.accNo === parseInt(req.params.accountNumber));
//     console.log(accountNumber);
//       if(!accountNumber){
//           return res.status(400).send(`${accountNumber} account does not exist `)
//       }
//     res.status(200).send(accountNumber);
// })

// router.post('/create-account', function(req,res,next){
//     const {accNo,balance} = req.body;
//      const acclength = accNo.toString();
//     const create = {
        
//         accNo:accNo,
//         balance:balance,
//         createAt: new Date().toISOString()

//     };
    
//    if(req.body ===null){
//        return res.status(400).send('account no is required');
//    }

//     if(acclength.length !==10){
//         return res.status(404).send('account must be 10 digit long')
//     }
//     console.log(balance);
// const exist = accBalance.find((c:{accNo:number})=> {
//       return c.accNo ===create.accNo});
//   console.log(exist);
// if(exist){
//     return res.status(404).send(`${create.accNo} already exist`);
// }

//     accBalance.push(create);
// fs.writeFileSync(balancePath,JSON.stringify(accBalance,null, " "));
// res.status(201).send(`${create.accNo} account was created successfully`);

// })


// router.post('/transfer',function(req:Request,res:Response,__next){
//    // console.log(req.body);

//     let transDetials ={
//         reference:uuidv4(),
//      senderAccount : req.body.senderAccount,
//      amount : req.body.amount,
//      receiverAccount:req.body.receiverAccount,
//      transferDescription:"failed transaction",
//      createAt: new Date().toISOString()
//     }

//     const senderAccountDetails = accBalance.find((c:{accNo:number})=>{
//         if(c.accNo === parseInt(transDetials.senderAccount)){
//             return c;
//         }});
//     const recieverAccountDetails = accBalance.find((c:{accNo:number})=>{
//         if(c.accNo === parseInt(transDetials.receiverAccount)){
//             return c;
//         }});

//          if(!senderAccountDetails ){
//                return res.status(400).send(`please confirm this account ${transDetials.senderAccount}, it doesnt exist on our account database`);
//         }else if(!recieverAccountDetails){
//               return res.status(400).send(`please confirm this account ${transDetials.receiverAccount}, it doesnt exist on our account database`);
//          }
           

//          //do the updating.
//           const indexsender = accBalance.indexOf(senderAccountDetails);
//           accBalance.splice(indexsender,1);
//           const indexreceiver = accBalance.indexOf(recieverAccountDetails);
//           accBalance.splice(indexreceiver,1);
   
//       if(transDetials.amount>senderAccountDetails.balance){

//           accBalance.push(senderAccountDetails);
//           accBalance.push(recieverAccountDetails);
//           transact.push(transDetials);

//           fs.writeFileSync(transactPath,JSON.stringify(transact,null," "))
//           return res.status(404).send("insufficient balance");
//       }
//   transDetials.transferDescription="transaction successfully";
// senderAccountDetails.balance=senderAccountDetails.balance - transDetials.amount;
// recieverAccountDetails.balance = recieverAccountDetails.balance + transDetials.amount;
//   accBalance.push(senderAccountDetails);
//   accBalance.push(recieverAccountDetails);
//   // console.log(transact);
//    transact.push(transDetials);
//    //console.log(transact);
//   fs.writeFileSync(balancePath,JSON.stringify(accBalance,null," "));
//   fs.writeFileSync(transactPath,JSON.stringify(transact,null," "));
//   //console.log(senderAccountDetails);
//   //console.log(recieverAccountDetails);
// //   res.write()
//   res.status(200).send([senderAccountDetails, recieverAccountDetails]);

//   console.log(accBalance);
     

        
  
//     // console.log(transDetials);
//     // res.send(transact);
// });

// export  {allBalance, oneAccountBalance, createAccount, transferTransaction, accountType};