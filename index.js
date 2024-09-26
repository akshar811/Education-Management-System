const express = require("express");
const cookie = require("cookie-parser");
const connect = require("./config/db");
const userRoute = require("./routes/user.routes");
const courseRoute = require("./routes/coures.routes");
const gradeRoute = require("./routes/grade.routes");
const quizeRouete = require("./routes/quize.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
app.use(cookie());

app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/grade", gradeRoute);
app.use("/quiz", quizeRouete);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`port is running ${process.env.PORT}`);
});
