const fs = require("fs");
const request = require("request");

var conf1g = require("./config/config");

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

function __getStart__Ajx(b0dy) {
  let start = b0dy.search('name="weekStartDateTimeAjx" value="') + 35;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __getStart__w33k(b0dy) {
  let start = b0dy.search('name="weekStartDateTime" value="') + 32;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __get_cr3d1t(b0dy) {
  let start = b0dy.search('name="remainCredit" value="') + 27;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __t0chB0dy(b0dy) {
  fs.writeFile("./index.html", b0dy, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("b0dy t0ch3d !");
  });
}

function __get_pr1ce(b0dy, index) {
  let start =
    b0dy.search(`this, 'userWeekReserves.selectedCount${index}', '`) + 42;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "'") break;
  }
  return b0dy.substring(start, i);
}

function __get_data(b0dy, index) {
  let start = b0dy.search(`id="hiddenSelectedCount${index}"`);
  return {
    programId: b0dy.substring(start + 823, start + 829),
    time: b0dy.substring(start + 1537, start + 1550),
    foodTypeId: b0dy.substring(start + 2249, start + 2252),
    price: __get_pr1ce(b0dy, index)
  };
}

function __calc_credit(data) {
  cre = parseInt(data.credit);
  for (let i = 0; i < data.data.length; i += 2) {
    cre -= parseInt(data.data[i].price);
  }
  return cre;
}

function __get_w33k_1nf0(b0dy) {
  let i = 0;
  let arr = [];
  while (b0dy.includes(`id="hiddenSelectedCount${i}"`)) {
    arr.push(__get_data(b0dy, i));
    i++;
  }

  return arr;
}

function __get_param(data) {
  console.log(data);
  let params = "";
  for (let i = 0; i < data.length; i += 2) {
    let first =
      `userWeekReserves%5B${i}%5D.selected=true&` +
      `userWeekReserves%5B${i}%5D.programId=${data[i].programId}&` +
      `userWeekReserves%5B${i}%5D.mealTypeId=2&` +
      `userWeekReserves%5B${i}%5D.programDateTime=${data[i].time}&` +
      `userWeekReserves%5B${i}%5D.selfId=1&` +
      `userWeekReserves%5B${i}%5D.foodTypeId=${data[i].foodTypeId}&` +
      `userWeekReserves%5B${i}%5D.selectedCount=1&`;
    let last =
      `userWeekReserves%5B${i + 1}%5D.programId=${data[i + 1].programId}&` +
      `userWeekReserves%5B${i + 1}%5D.mealTypeId=2&` +
      `userWeekReserves%5B${i + 1}%5D.programDateTime=${data[i + 1].time}&` +
      `userWeekReserves%5B${i + 1}%5D.selfId=1&` +
      `userWeekReserves%5B${i + 1}%5D.foodTypeId=${data[i + 1].foodTypeId}&`;

    params = params + first + last;
  }

  return params;
}

function post_r3s3rv3(data) {
  let url =
    conf1g.url.r3s3rv3r0s3 +
    `?weekStartDateTime=${data.weekStartDateTime}&remainCredit=${__calc_credit(
      data
    )}&method%3AdoReserve=Submit&selfChangeReserveId=&weekStartDateTimeAjx=${
      data.weekStartDateTimeAjx
    }&selectedSelfDefId=1&` +
    __get_param(data.data) +
    `_csrf=${data._csrf}`;

  // console.log(url);

  var options = {
    method: "GET",
    url: url,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    __t0chB0dy(body);
  });
}

function post_n3xtw33k(data) {
  var options = {
    method: "POST",
    url: conf1g.url.r3s3rv3r0s3,
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
      weekStartDateTime: data.weekStartDateTime,
      "method:showNextWeek": "Submit",
      selfChangeReserveId: "",
      weekStartDateTimeAjx: data.weekStartDateTimeAjx,
      selectedSelfDefId: "1",
      _csrf: data._csrf
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    post_r3s3rv3({
      weekStartDateTime: __getStart__w33k(body),
      weekStartDateTimeAjx: __getStart__Ajx(body),
      _csrf: __getC$RF(body),
      J_S3$$ion: data.J_S3$$ion,
      credit: __get_cr3d1t(body),
      data: __get_w33k_1nf0(body)
    });
  });
}

function get_pan3lR0S3(J_S3$$ion) {
  var options = {
    method: "GET",
    url: conf1g.url.pan3l_r0s3,
    headers: {
      "cache-control": "no-cache",
      Cookie: J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    post_n3xtw33k({
      weekStartDateTime: __getStart__w33k(body),
      weekStartDateTimeAjx: __getStart__Ajx(body),
      _csrf: __getC$RF(body),
      J_S3$$ion: J_S3$$ion
    });
  });
}

function get_R0S3__(data) {
  var options = {
    method: "GET",
    url: conf1g.url.r0s3_level_1,
    headers: {
      "cache-control": "no-cache",
      Cookie: data,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
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

    get_pan3lR0S3(__getJ_S3$$ion(response));
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

get_1n1t1al_JS3$_c$rf();
