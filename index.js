const axios = require("axios");
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

function __t0chB0dy(b0dy) {
  fs.writeFile("./index.html", b0dy, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("b0dy t0ch3d !");
  });
}

function post_r3s3rv3(data) {
  console.log(data);
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
      "method:showNextWeek": "Submit",
      weekStartDateTime: data.weekStartDateTime,
      weekStartDateTimeAjx: data.weekStartDateTimeAjx,
      selectedSelfDefId: "1",
      remainCredit: "-44292",
      selfChangeReserveId: "",
      _csrf: data._csrf

      //   "userWeekReserves%5B0%5D.selected": "false",
      //   "userWeekReserves%5B0%5D.selectedCount": "0",
      //   "userWeekReserves%5B0%5D.id": "",
      //   "userWeekReserves%5B0%5D.programId": "164662",
      //   "userWeekReserves%5B0%5D.mealTypeId": "2",
      //   "userWeekReserves%5B0%5D.programDateTime": "1572035400000",
      //   "userWeekReserves%5B0%5D.selfId": "1",
      //   "userWeekReserves%5B0%5D.foodTypeId": "597",
      //   "userWeekReserves%5B0%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B0%5D.freeFoodSelected": "false",

      //   "userWeekReserves%5B1%5D.selected": "false",
      //   "userWeekReserves%5B1%5D.selectedCount": "0",
      //   "userWeekReserves%5B1%5D.id": "",
      //   "userWeekReserves%5B1%5D.programId": "164646",
      //   "userWeekReserves%5B1%5D.mealTypeId": "2",
      //   "userWeekReserves%5B1%5D.programDateTime": "1572035400000",
      //   "userWeekReserves%5B1%5D.selfId": "1",
      //   "userWeekReserves%5B1%5D.foodTypeId": "598",
      //   "userWeekReserves%5B1%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B1%5D.freeFoodSelected": "false",

      //   "userWeekReserves%5B2%5D.id": "",
      //   "userWeekReserves%5B2%5D.programId": "164694",
      //   "userWeekReserves%5B2%5D.mealTypeId": "2",
      //   "userWeekReserves%5B2%5D.programDateTime": "1572208200000",
      //   "userWeekReserves%5B2%5D.selfId": "1",
      //   "userWeekReserves%5B2%5D.foodTypeId": "598",
      //   "userWeekReserves%5B2%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B2%5D.freeFoodSelected": "false",

      //   "userWeekReserves%5B3%5D.selected": "true",
      //   "userWeekReserves%5B3%5D.id": "1732857",
      //   "userWeekReserves%5B3%5D.programId": "164678",
      //   "userWeekReserves%5B3%5D.mealTypeId": "2",
      //   "userWeekReserves%5B3%5D.programDateTime": "1572208200000",
      //   "userWeekReserves%5B3%5D.selfId": "1",
      //   "userWeekReserves%5B3%5D.foodTypeId": "599",
      //   "userWeekReserves%5B3%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B3%5D.selectedCount": "1",
      //   "userWeekReserves%5B3%5D.freeFoodSelected": "false",

      //   "userWeekReserves%5B4%5D.selected": "true",
      //   "userWeekReserves%5B4%5D.id": "1731260",
      //   "userWeekReserves%5B4%5D.programId": "164726",
      //   "userWeekReserves%5B4%5D.mealTypeId": "2",
      //   "userWeekReserves%5B4%5D.programDateTime": "1572381000000",
      //   "userWeekReserves%5B4%5D.selfId": "1",
      //   "userWeekReserves%5B4%5D.foodTypeId": "616",
      //   "userWeekReserves%5B4%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B4%5D.selectedCount": "1",
      //   "userWeekReserves%5B4%5D.freeFoodSelected": "false",

      //   "userWeekReserves%5B5%5D.id": "",
      //   "userWeekReserves%5B5%5D.programId": "164710",
      //   "userWeekReserves%5B5%5D.mealTypeId": "2",
      //   "userWeekReserves%5B5%5D.programDateTime": "1572381000000",
      //   "userWeekReserves%5B5%5D.selfId": "1",
      //   "userWeekReserves%5B5%5D.foodTypeId": "599",
      //   "userWeekReserves%5B5%5D.priorReserveDateStr": "null",
      //   "userWeekReserves%5B5%5D.freeFoodSelected": "false"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    __t0chB0dy(body);
  });
}
////////////////

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
      J_S3$$ion: data.J_S3$$ion
    });
    // __t0chB0dy(body);
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
