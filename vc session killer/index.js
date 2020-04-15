const request = require("request");
const rq = require("request-promise-native");
const fs = require("fs");

const config = {
  user: "",
  pass: "",
};

async function getLoginCredentials() {
  var options = {
    method: "GET",
    url: `https://vc.kntu.ac.ir/login/index.php`,
    headers: {
      "cache-control": "no-cache",
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    resolveWithFullResponse: true,
  };

  return rq(options)
    .then((response) => {
      let start = response.body.indexOf("logintoken") + 19;
      return {
        logintoken: response.body.substring(start, start + 32),
        cookie: response.headers["set-cookie"][0],
      };
    })
    .catch((e) => new Error(e));
}

async function login(data) {
  var options = {
    method: "POST",
    url: `https://vc.kntu.ac.ir/login/index.php`,
    headers: {
      "cache-control": "no-cache",
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: data.cookie,
    },
    form: {
      username: config.user,
      password: config.pass,
      logintoken: data.logintoken,
      anchor: "",
    },
    resolveWithFullResponse: true,
    simple: false,
  };

  return rq(options)
    .then((response) => {
      if (!response.headers) return new Error("user/pass incorrect");
      return {
        cookie: response.headers["set-cookie"][0],
      };
    })
    .catch((e) => new Error(e));
}

async function getSessions(data) {
  var options = {
    method: "GET",
    url: `https://vc.kntu.ac.ir/report/usersessions/user.php`,
    headers: {
      "cache-control": "no-cache",
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: data.cookie,
    },
    cookie: data.cookie,
    resolveWithFullResponse: true,
  };

  return rq(options)
    .then((response) => {
      //   __t0uchB0dy(response.body);
      let body = response.body;
      let sessionList = [];
      let start = body.indexOf(
        "https://vc.kntu.ac.ir/report/usersessions/user.php?"
      );
      while (start > 0) {
        let i = 0;
        while (body.charAt(start + i) !== '"') i++;
        sessionList.push(body.substring(start, start + i));
        body = body.substring(start + i);
        start = body.indexOf(
          "https://vc.kntu.ac.ir/report/usersessions/user.php?"
        );
      }
      return sessionList;
    })
    .catch((e) => new Error(e));
}

function killSessions(data, list) {
  if (list.length == 0) console.log("EMPTY");
  list.forEach((s) => {
    let index = s.indexOf("sesskey");
    let link = s.substring(0, index - 4) + s.substring(index);
    var options = {
      method: "GET",
      url: link,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        cookie: data.cookie,
      },
      resolveWithFullResponse: true,
      simple: false,
    };
    request(options, function (error, response) {
      if (error) console.log(error);
      else console.log(s.substring(51) + " => KILLED");
    });
  });
}

// function __t0uchB0dy(b0dy) {
//   fs.writeFile("./index.html", b0dy, function (err) {
//     if (err) {
//       return console.log(err);
//     }
//   });
// }

async function main() {
  let data = await getLoginCredentials();
  data = await login(data);
  setInterval(async () => {
    let list = await getSessions(data);
    killSessions(data, list);
  }, 5000);
}

main();
