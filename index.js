const express = require("express");
const app = express();
const Port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Generate a random Id
var methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Default Posts

let posts = [
  {
    id: uuidv4(),
    username: "amankumawat",
    content:
      "I have completed my backhlore in computer Application from Apex university. Currently I am working as a Full stack developer Intern ar webMobi360.",
  },
  {
    id: uuidv4(),
    username: "nikhilsharma",
    content: "Hii, I'm Founder of AdMediaX",
  },
  {
    id: uuidv4(),
    username: "codingHeist",
    content: "Thanks for visiting my web page",
  },
];

app.get("/", (req,res) => {
  res.redirect("/posts")
})

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Add a new Post

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// See Post In Details

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Edit Post content

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Delete a Post

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// Start localhost

app.listen(Port, () => {
  console.log(`Listening on Port ${Port}`);
});
