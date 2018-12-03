var request = require('supertest');
var should = require('should');

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('./server');
  });
  afterEach(function() {
    server.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(302, done);
  });
  it('responds to / with cookies set', function testSlashWithCookie(done) {
    var data = {
      access_token: 'test',
      request_token: 'test',
      expires_in: 3600,
      expiration_time: Date.now() + 3600 * 1000
    };
    request(server)
      .get('/')
      .set(
        'Cookie',
        'SPOTIFY= {access_token:test, request_token:test, expires_in:3600, expiration_time : ' +
          Date.now() +
          3600 * 1000 +
          '}'
      )
      .expect(200)
      .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        console.log(res.cookies);
        should(res.cookies).not.be.ok();
        done();
      });
  });

  it('responds to /login', function testLogin(done) {
    request(server)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.error.should.equal(false);
        done();
      });
  });
  it('responds to /login/auth by redirecting to Spotify', function testLogin(done) {
    request(server)
      .get('/login/auth')
      .expect(302)
      .end(function(err, res) {
        // HTTP status should be 302
        res.status.should.equal(302);
        // Error key should be false.
        res.error.should.equal(false);
        done();
      });
  });
  it('responds to /login/refresh by fetching refresh token and rendering Index', function testLogin(done) {
    request(server)
      .get('/login/refresh')
      .expect(200)
      .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        console.log(res.cookies);
        should(res.cookies).not.be.ok();
        done();
      });
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .then(res => {
        done();
      });
  });
});
