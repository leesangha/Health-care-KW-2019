const express = require("express");
const path = require("path");
const router = require("./routes/router");
const loginRouter = require("./routes/login");
const addUserRouter = require("./routes/addUser");
const foodRouter = require("./routes/food");
const userDataRouter = require("./routes/userData");
const uploadRouter = require("./routes/uploads");
const ingredientRouter = require('./routes/search')
const registerRouter = require('./routes/register');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/addUser", addUserRouter);
app.use("/process/login", loginRouter);
app.use("/food", foodRouter);
app.use("/userData", userDataRouter);
app.use("/uploads", uploadRouter);
app.use("/search_ingredient",ingredientRouter);
app.use("/register",registerRouter);
app.use("/", router);

app.listen(PORT, () => {
  console.log("Check out the app at https://localhost:" + PORT);
});
