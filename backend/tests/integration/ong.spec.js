const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');


describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be albe to create a new NGO', async () => {
    const response = await request(app).post('/ongs').send({
        name: 'doguinhos do bem', 
        email: 'sla@email.com', 
        whatsapp: '14997178121', 
        cidade: 'Ourinhos', 
        uf: 'SP'
    })
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    //app.listen(3232);
  });
});

/*
pra setar o header da requisicao:
  .set('authorization': 'ksdbchjdbs')
*/