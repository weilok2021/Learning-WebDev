const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
// join __dirname with views folder set templates to be located relative to the current index.js position
// so we can run this from any directory as the __dirname is always the same.
app.set('views', path.join(__dirname, "/views")); 

app.get('/', (req, res) => {
  const name = "weilok";
  res.render("home", {name: undefined});
})

app.get("/r", (req, res) => {
  const subreddits = ["programming", "gym", "habits", "hope"];
  res.render("reddit", { subreddits });
})

app.listen(3000, () => {
  console.log("App is listen on port 3000");
})