import fetch from 'node-fetch';

function getJSON(data) {
  if (data.constructor === 'test'.constructor) {
    return JSON.parse(data);
  }
  return data;
}

const homeRoute = (req, res) => {
  let data = req.cookies.SPOTIFY;
  console.log(`HOME:${data.expiration_time - Date.now()}`);
  if (data) {
    data = getJSON(data);
    if (data.expiration_time < Date.now()) {
      fetch('/login/refresh')
        .then(resp => resp.json())
        .then((resp_data) => {
          data.access_token = resp_data.access_token;
          data.expiration_time = resp_data.expiration_time;
        })
        .catch((err) => {
          console.log(`Error:  ${err}`);
        });
    }
    if (data.access_token) {
      res.render('index', {
        access_token: data.access_token,
        interval: data.expiration_time - Date.now(),
      });
      return;
    }
  }
  res.redirect('/login/');
};

export default homeRoute;
