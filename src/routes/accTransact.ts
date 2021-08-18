import express, { Router, Response, Request} from 'express';
import { builtinModules } from 'module';
import {getAllBalance,getOneAccount,performCreateAccount,doTransferTransaction} from '../AccountController/BalanceController';

const app = express();
const router = Router()

router.get('/', (req,res)=>{
    res.send('it is working')
})

router.get('/balance', getAllBalance)
router.get('/balance/:id', getOneAccount)
router.post('/create-account', performCreateAccount)
router.post('/transfer', doTransferTransaction)

 export default router;
