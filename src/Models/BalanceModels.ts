import express, {Request,Response} from 'express'
const app = express();
const router = express.Router();
import path from 'path';
import fs, { read } from 'fs';
import {v4 as uuidv4} from 'uuid'



const balancePath = path.join(__dirname,'../../database/balance.json')
const transactPath = path.join(__dirname,'../../database/transact.json');
  const accBalance = JSON.parse(fs.readFileSync(balancePath, 'utf-8'));
  const transact = JSON.parse(fs.readFileSync(transactPath,'utf-8'));
  //console.log(transact);
  
  interface accountType {
    accountNumber: number,
    balance: number,
    "created-At": string
  }

  interface transactType {
    from: number,
    to: number,
    amount: number
  }

  function allBalance(){
    return new Promise ((resolve, reject) => {
      try{
        const accDatabase = accBalance;
        resolve(accDatabase)
      } catch(error){
        reject('problem getting all balance')
      }
    })
  }


  function oneAccountBalance(num: number){
    return new Promise ((resolve, reject) => {
      try{
    
        const oneAccountNumber = accBalance.find((c:{accountNumber:number})=>c.accountNumber === num);

        const singleAccount = oneAccountNumber;
        resolve(singleAccount)
      } catch(error) {
        reject('problem getting that Account')
      }
    })
    }

function createAccount(transDetails:accountType){
   return new Promise((resolve,reject)=>{
   try{
       console.log(accBalance);
    const exist = accBalance.find((c:{accountNumber:number})=> {
        console.log(c.accountNumber);
        return c.accountNumber ===transDetails.accountNumber});
    console.log(exist);
  if(exist){
      //return res.status(404).send(`${transDetials.accountNumber} already exist`);
      reject(` ${transDetails.accountNumber}accountNumber already exist`);
  }else{


    accBalance.push(transDetails);
    fs.writeFileSync(balancePath,JSON.stringify(accBalance,null, " "));
  
     resolve(transDetails);
  }
  
  
   }catch(error){
    console.log(error);
   }


   })

}


   

function transferTransaction(from: number, to: number, amount: number){
    // console.log(typeof from);
    // console.log(from)
    // console.log(to)
    // console.log(amount)
    return new Promise ((resolve, reject) => {
      try{
        let transDetails ={
            reference:uuidv4(),
         senderAccount : from,
         amount : amount,
         receiverAccount:to,
         transferDescription:"failed transaction",
         createAt: new Date().toISOString()
        }
    
        const senderAccountDetails = accBalance.find((c:{accountNumber:number})=>{
            // console.log(transDetails.senderAccount);
            // console.log(c.accNo);
            if(c.accountNumber === transDetails.senderAccount){
               // console.log(c);
                return c;
            }});
        const recieverAccountDetails = accBalance.find((c:{accountNumber:number})=>{
            if(c.accountNumber === transDetails.receiverAccount){
                return c;
            }});
              console.log(senderAccountDetails)
             if(!senderAccountDetails ){
                   return resolve(`please confirm this account ${transDetails.senderAccount}, it doesnt exist on our account database`);
            }else if(!recieverAccountDetails){
                  return resolve(`please confirm this account ${transDetails.receiverAccount}, it doesnt exist on our account database`);
             }
               
    
             //do the updating.
              const indexsender = accBalance.indexOf(senderAccountDetails);
              accBalance.splice(indexsender,1);
              const indexreceiver = accBalance.indexOf(recieverAccountDetails);
              accBalance.splice(indexreceiver,1);
       
          if(transDetails.amount>senderAccountDetails.balance){
    
              accBalance.push(senderAccountDetails);
              accBalance.push(recieverAccountDetails);
              transact.push(transDetails);
    
              fs.writeFileSync(transactPath,JSON.stringify(transact,null," "))
              return resolve("insufficient balance");
          }
      transDetails.transferDescription="transaction successfully";
    senderAccountDetails.balance=senderAccountDetails.balance - transDetails.amount;
    recieverAccountDetails.balance = recieverAccountDetails.balance + transDetails.amount;
      accBalance.push(senderAccountDetails);
      accBalance.push(recieverAccountDetails);
      // console.log(transact);
       transact.push(transDetails);
    //    const result = [];
    //    result.push(senderAccountDetails);
    //    result.push(recieverAccountDetails);
       //console.log(transact);
      fs.writeFileSync(balancePath,JSON.stringify(accBalance,null," "));
      fs.writeFileSync(transactPath,JSON.stringify(transact,null," "));
      //console.log(senderAccountDetails);
      //console.log(recieverAccountDetails);
    //   res.write()
       resolve ([senderAccountDetails, recieverAccountDetails]);
    
      console.log(accBalance);
         
    
      } catch(error){
        reject('problem getting all balance')
      }
    })
  }





export  {allBalance, oneAccountBalance, createAccount, transferTransaction, accountType,transactType};