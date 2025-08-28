import express from "express"
const router = express.Router();
import util from "../util.js";

const entries = await util.listEntries();
// Index Routes, list all entries
router.get('/', (req, res) => {
  console.log(util);
  res.render("index", {entries});
})

// Show Routes, list a specific entry
router.get("/:title", async (req, res, next) => {
  const title = req.params.title;
  // console.log(`title: ${title}`);
  const entry = await util.getEntry(title);
  if (entry) {
    const content = await util.mdConverter(entry);
    console.log(`content: ${content}`);
    res.render("show", { title, content});
  }
  else {
    res.send("This entry does not exist!");
  }
})

export default router;