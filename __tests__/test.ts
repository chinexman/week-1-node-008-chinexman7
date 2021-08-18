

import request from 'supertest';
import app from '../src/app';
describe('TEST FOR POST METHODS API', () => {
  test('Should return 201 for created account', async () => {
    const data = {
      accountNumber: 4396334980,
      balance: 12000,
    };
    await request(app)
      .post('/create-account')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201);
  });
  test('Should return 404 for invalid account number', async () => {
    const data = { accountNumber: 4395334 };
    await request(app)
      .post('/create-account')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  test('Should return 404 for account number that already exist', async () => {
    const data = { accountNumber: 4395334850 };
    await request(app)
      .post('/create-account')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  test('Should return 201 for sucessful transfer', async () => {
    const data = {
      from: 4395436789,
      amount: 2000,
      to: 4395434499,
      transferDescription: 'successfully',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201);
  });
  test('Should return 404 for receiver account not found', async () => {
    const data = {
        senderAccount: 4395436789,
        amount: 2000,
        receiverAccount: 439533485,
      transferDescription: 'failed transaction',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  test('Should return 404 for insufficient fund', async () => {
    const data = {
        senderAccount: 4395434450,
        amount: 0,
        receiverAccount: 4395334850,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  test('Should return 404 for sender account not found', async () => {
    const data = {
        senderAccount: 439436789,
        amount: 5000,
        receiverAccount: 4395334850,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
});
describe('TEST THE GET METHODS FOR API', () => {
  test('Should return 200, and json for single account by account number', async () => {
    await request(app)
      .get('/balance/4395334850')
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
  test('Should return 404 for invalid account number', async () => {
    await request(app)
      .get('/balance/123456789999')
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400);
  });
  test('should return 200, and json for all accounts', async () => {
    await request(app)
      .get('/balance')
      //.set('Accept', 'application/json')
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

});