import express, {Request,Response} from 'express'
const app = express();
const router = express.Router();
import path from 'path';
import fs, { read } from 'fs';
import {v4 as uuidv4} from 'uuid'
//import {allBalance, oneAccountBalance, createAccount, transferTransaction, accountType,transactType} from '../Models/BalanceModels'
//import {getAccountNumber} from '../utils'
import accountBalance from '../Models/mondodbBalanceModel'


app.use(express.json());
 async function getAllBalance(req: Request, res: Response){
    try{

        const accBalance = await accountBalance.find({});
        res.status(200).json({
            data: accBalance});

    }catch(error){
        console.log(error);
    }
} 


async function getOneAccount(req: Request, res: Response){
    try{

        const rawAccountNumber =+req.params.id;
         console.log(typeof rawAccountNumber)
         console.log(rawAccountNumber);
    //const accountNumber = accBalance.find((c:{accNo:number})=>c.accNo === parseInt(req.params.accountNumber));
    // const accountNumber = await oneAccountBalance(rawAccountNumber);

    // console.log(accountNumber);
    //   if(!accountNumber){
    //       return res.status(400).send(`${rawAccountNumber} account does not exist `)
    //   }
    // res.status(200).json({data:accountNumber});

    }catch(error){
        console.log(error);
    }
} 

async function performCreateAccount(req: Request, res: Response){
    // try{
         console.log(req.body);
        const {accountNumber,balance} = req.body;
        const acclength = accountNumber.toString();
           console.log(acclength);
    
       
      if(req.body ===null){
          return res.status(400).send('account no is required');
      }
   
       if(acclength.length !==10){
           return res.status(404).send('account must be 10 digit long')
       }
      
    

       const create  = new accountBalance({
       accountNumber,
       balance,
       'createdAt':new Date().toISOString()
      });

      console.log(create);
      try {
          console.log("here")
        await create.save();
        res.send("New account  Added Successfully");
      } catch (error) {
          console.log("not here")
        return res.status(400).json({ error });
      }






} 




async function doTransferTransaction(req: Request, res: Response){
    try{
        const{from , to , amount} = req.body;
     console.log(req.body)
     console.log(typeof from);
     console.log(from);
        // let transDetials:transactType ={
              
        //     from : from,
        //       amount : amount,
        //      to:to
        //     //  transferDescription:"failed transaction",
        //     //  createAt: new Date().toISOString()
        //     }

    
        if(from.toString().length !==10){
            return res.status(404).send('account must be 10 digit long')
        }

        if(to.toString().length !==10){
            return res.status(404).send('account must be 10 digit long')
        }
        if(isNaN(+amount)){
            return res.status(404).send('Invalid Amount')
        }
      

        //   const result = await transferTransaction(parseInt(from),parseInt(to),parseInt(amount));
        //   res.status(201).send(result);


    
            

    }catch(error){
        console.log(res.status(404).send(error));
    }
} 



export {getAllBalance,getOneAccount,performCreateAccount,doTransferTransaction};