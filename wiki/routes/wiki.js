import express from "express"
const router = express.Router();
const app = express();
// import methodOverride from "method-override";
import util from "../util.js";

// const entries = await util.listEntries();

// router.use(express.json()) // for parsing application/jso
// router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Index Routes, list all entries
router.get('/', async (req, res) => {
  const entries = await util.listEntries();
  const title = "wiki";
  let message = "";
  if (entries.length === 0) {
    message = "Currently no entries on this site!"
  }
  res.render("index", { entries, title, nav: '', message: message});
})

// New route, get a form that let user creates new entry
router.get("/new", (req, res) => {
  res.render("new", { title: "New", nav: '' });
})

// Create route, creates a new entry, then redirect to home page
router.post("/", async (req, res) => {
  const entryName = req.body.entryName.trim().toLowerCase(); // trim the white spaces of entry's title
  const entryContent = req.body.entryContent;
  if (entryName && entryContent && entryName !== '' && entryContent.trim() !== '') {
    const exists = await util.getEntry(entryName);
    if (exists) {
      // Handle the case where the entry already exists, as per project requirements
      // You can redirect to an error page or render a form with an error message
      res.status(404).render("error.ejs", { message: "Entry already exists! Please choose another entry name" })
    } else {
      await util.saveEntry(entryName, entryContent);
      res.redirect(`/wiki/${entryName}`);
    }
  }
  else {
    res.redirect("/wiki/new");
  }
})

// Show Routes, list a specific entry
router.get("/:title", async (req, res, next) => {
  const title = req.params.title.trim().toLowerCase();
  const entry = await util.getEntry(title);
  if (entry) {
    const content = await util.mdConverter(entry);
    // this nav link will redirect to Edit route
    const nav = `<div>
    <a href="/wiki/${title}/edit">Edit Page</a>
    </div>`
    res.render("show", { title, content, nav });
  }
  else {
    res.status(404).render('error', { message: "Entry not found!" });
  }
})

// Edit Route, get a form for editing entry
router.get("/:title/edit", async (req, res) => {
  const title = req.params.title;
  const content = await util.getEntry(title);
  res.render("edit", { title, nav: '', content: content });
})

// Update Route, update the entry with user edited content, and redirect to show route
router.put("/:title", async (req, res) => {
  const title = req.params.title.trim().toLowerCase();
  const editedContent = req.body.editedContent;
  await util.saveEntry(title, editedContent);
  res.redirect(`/wiki/${title}`);
})

// destroy/delete route, delete a specific entry and redirect to home
router.delete("/:title", async (req, res) => {
  const title = req.params.title.toLowerCase();
  await util.removeEntry(title);
  res.redirect(`/wiki/`);
})

// search route
router.post("/search", async (req, res) => {
  const query = req.body.q.toLowerCase().trim();
  const entry = await util.getEntry(query);
  if (entry) {
    res.redirect(`/wiki/${query}`);
  }
  else {  // redirect user to the related entry page (related keyword in title)
    // also passed query string to the /search/related route
    res.redirect(`/wiki/search/related?q=${query}`);
  }
})

router.get("/search/related", async (req, res) => {
  const query = req.query.q.toLowerCase().trim();
  let message = "";
  if (query) {
    const entries = await util.listEntries();
    console.log(`query is ${query}, and the type is ${query}`)
    // filter entries that has user search as it's substring 
    const relatedEntries = entries.filter((entry) => entry.toLowerCase().indexOf(query) !== -1);
    if (relatedEntries.length === 0) {
      message = "The entry does not exist and none of the existed entries is related to your keyword.";
    }
    res.render("related", 
    { relatedEntries: relatedEntries, title: "Related Entries", nav: '', message: message}
    );
    console.log(relatedEntries, message);
  } else {
    message = "This is an invalid search!"
    res.render("related", {
      relatedEntries: [], title: "Related Entries", nav: "", message: message
    });
  }

})

export default router;