// refactor the configuration syntaxes such as importing and exporting module from CommonJS to ESModule

import express from 'express'
import path from 'node:path';
import wikiRouter from "./routes/wiki.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import util from './util.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// Tell the app to use wikiRouter for any requests to "/wiki".
app.use("/wiki", wikiRouter);
app.listen(3000, () => {
  console.log("app has listened on port 3000");
})

