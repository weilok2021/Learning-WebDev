const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); // for overriding http request as html forms only handle get and post method
const { v4: uuidv4 } = require('uuid');
// console.log(typeof uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// Configuration
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")))
app.set("views", path.join(__dirname, "/views"));


let comments = [
  { id: uuidv4(), userName: "Wei Lok", comment: "Everything is becoming better by each day!" },
  { id: uuidv4(), userName: "Li Sheng", comment: "You did a great job!" },
  { id: uuidv4(), userName: "Sheng Li", comment: "We are different... you guys hava a bright future." }
]

// When a user submits a form, the browser packages the data into a URL-encoded string 
// (e.g., username=john&password=123). This middleware takes that string, decodes it, 
// and makes it available as a JavaScript object on req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Restful Routing Section
// Index
app.get("/comments", (req, res) => {
  res.render("comments", { comments });
})

// render form to create new comment
app.get("/comments/new", (req, res) => {
  res.render("new");
})

// Create and add Comment
app.post("/comments", (req, res) => {
  const { userName, newComment } = req.body;
  comments.push({ id: uuidv4(), userName: userName, comment: newComment });
  res.redirect("/comments");
})

// Show Specific Comment
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((e) => e.id === id)
  res.render("comment", { comment })
})

// render form to edit comment
app.get("/comments/:id/edit", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((e) => e.id === id)
  res.render("edit", { comment });
})

app.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((e) => e.id === id)
  const newComment = req.body.editComment;
  comment.comment = newComment; // update comment 
  res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  // 1. Find the index of the comment with the matching ID
  const index = comments.findIndex((comment) => comment.id === id);

  // 2. If the comment is found (index is not -1), remove it
  if (index !== -1) {
    comments.splice(index, 1); // Removes 1 element starting at the found index
  }
  res.redirect("/comments");
})

app.listen(3000, () => {
  console.log("App is listened on port 3000!");
})