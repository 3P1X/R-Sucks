const fs = require("fs");
const request = require("request");

var conf1g = require("./config");

function __getJ_S3$$ion(r3s) {
  return r3s.headers["set-cookie"][0].substring(0, 43);
}

function __getC$RF(b0dy) {
  let start = b0dy.search("'X-CSRF-TOKEN' : '") + 18;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "'") break;
  }
  return b0dy.substring(start, i);
}

function __t0chB0dy(b0dy, m$g) {
  fs.appendFile("./list.js", b0dy + "\n", function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("b0dy t0ch3d !\t" + m$g);
  });
}

function get_$tu_l1st(cookie, year) {
  for (let i = 0; i <= 9; i++) {
    get_by_1d(year, "00" + i, cookie);
  }
  for (let i = 10; i <= 99; i++) {
    get_by_1d(year, "0" + i, cookie);
  }
  for (let i = 100; i < 371; i++) {
    get_by_1d(year, i, cookie);
  }
}

function get_by_1d(year, dig, cookie) {
  var options = {
    method: "GET",
    url: `http://refahi.kntu.ac.ir/messaging/searchUsers.rose?q=${year}${dig}&_=`,
    headers: {
      "cache-control": "no-cache",
      Cookie: cookie,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    list = JSON.parse(body).join("\n");
    __t0chB0dy(list, "dig: " + dig + "\t year :" + year);
  });
}

function post_Js3c(data) {
  var options = {
    method: "POST",
    url: conf1g.url.j_sec,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      username: conf1g.user.name,
      password: conf1g.user.pass,
      _csrf: data.c$rf,
      login: "%D9%88%D8%B1%D9%88%D8%AF"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    get_$tu_l1st(__getJ_S3$$ion(response), 95);
  });
}

function get_1n1t1al_JS3$_c$rf() {
  var options = {
    method: "GET",
    url: conf1g.url.r0s3_level_1,
    headers: {
      "User-Agent": "__hahaholo__"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    post_Js3c({
      J_S3$$ion: __getJ_S3$$ion(response),
      c$rf: __getC$RF(body)
    });
  });
}

function run() {
  get_1n1t1al_JS3$_c$rf();
}

run();
