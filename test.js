const request = require('supertest');
const should = require('should');
// --> OFF
/* eslint no-undef: 0, global-require :0 */ describe('loading express', () => {
  let server;
  beforeEach(() => {
    server = require('./src/server');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(302, done);
  });
  it('responds to / with cookies set', (done) => {
    request(server)
      .get('/')
      .set(
        'Cookie',
        `SPOTIFY= {access_token:test, request_token:test, expires_in:3600, expiration_time : ${Date.now()}${3600
          * 1000}}`,
      )
      .expect(200)
      .end((err, res) => {
        // HTTP status should be 200
        res.status.should.equal(200);
        // should.exist(res.cookies);
        done();
      });
  });
  it('responds to /login', (done) => {
    request(server)
      .get('/login')
      .expect(200)
      .end((err, res) => {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.error.should.equal(false);
        done();
      });
  });
  it('responds to /logout with redirect', (done) => {
    request(server)
      .get('/logout')
      .expect(302)
      .end((err, res) => {
        // HTTP status should be 200
        res.status.should.equal(302);
        // Error key should be false.
        res.error.should.equal(false);

        done();
      });
  });
  it('responds to /login/auth by redirecting to Spotify', (done) => {
    request(server)
      .get('/login/auth')
      .expect(302)
      .end((err, res) => {
        // HTTP status should be 302
        res.status.should.equal(302);
        // Error key should be false.
        res.error.should.equal(false);
        done();
      });
  });
  it('responds to /login/refresh by fetching refresh token and rendering Index', (done) => {
    request(server)
      .get('/login/refresh')
      .expect(200)
      .end((err, res) => {
        // HTTP status should be 200
        res.status.should.equal(200);
        console.log(res.cookies);
        should(res.cookies).not.be.ok();
        done();
      });
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .then((res) => {
        done();
      });
  });
});

/* eslint no-use-before-define: 2 */ // --> ON
