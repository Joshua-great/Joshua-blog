const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Authentication API', () => {
  it('should log in a user', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ email: 'testuser@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
