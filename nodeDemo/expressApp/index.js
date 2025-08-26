const express = require("express");
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the home page!</h1>')
})

app.get("/reddit", (req, res) => {
  res.send("<h1>You're on weilok page!</h1>")
})

app.get("/reddit/:subreddit", (req, res) => {
  // deconstruct subreddit keys from res.params object
  const { subreddit } = req.params;
  res.send(`You're now on ${subreddit} subreddit`);
  console.log(subreddit);
  console.log(req.params);
})

app.listen(3000, () => {
    console.log("listened on port 3000!");
})