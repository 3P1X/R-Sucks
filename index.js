const axios = require("axios");
var conf1g = require("./config");
var request = require("request");

function getR0S3(data) {
  var options = {
    method: "GET",
    url: conf1g.url.r0s3_level_1,
    headers: {
      "cache-control": "no-cache",
      Cookie: data,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

function postJSecCheck(data) {
  console.log(data);

  var options = {
    method: "POST",
    url: conf1g.url.j_sec,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.JSESSIONID,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      username: conf1g.user.name,
      password: conf1g.user.pass,
      _csrf: data.csrf,
      login: "%D9%88%D8%B1%D9%88%D8%AF"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    getR0S3(response.headers["set-cookie"][0].substring(0, 43));
  });
}

function getJSCS() {
  axios
    .get(conf1g.url.r0s3_level_1)
    .then(res => {
      const start = res.data.search("'X-CSRF-TOKEN' : '") + 18;
      let i;
      for (i = start; ; i++) {
        if (res.data.charAt(i) === "'") break;
      }
      return {
        JSESSIONID: res.headers["set-cookie"][0].substring(0, 43),
        csrf: res.data.substring(start, i)
      };
    })
    .then(data => postJSecCheck(data));
}

getJSCS();
