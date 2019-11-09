const express = require("express");

const { d0_da_g3t } = require("./func");

const app = express();
const port = 8569;
app.use(express.json());

app.post("/back_off_b1tch_u_dont_wanna_t3st_me", async (req, res) => {
  let resData = await d0_da_g3t(req.body);
  res.json({
    stats: resData
  });
});

app.post("/test", (req, res) => res.json(req.body));

app.listen(port, () => console.log(`app listening on port ${port}!`));
