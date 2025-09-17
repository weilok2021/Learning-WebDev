import fs from 'fs/promises';
import { get } from 'http';
import MarkdownIt from 'markdown-it';

/*Every title arguments that I passed in to these util.functions method from wiki.js
 are assumed preprocessed (trim white spaces and standardize cases)*/

const readdir = async (dir) => {
  // read files's name in directories using async function, then split these files name with its extension
  // and store those file name into an array, eventually return this array
  try {
    const files = await fs.readdir(dir);
    return files;
  }
  catch (err) {
    console.log("readdir can't read this directory, probably dir not exists.");
    return [];
  }
}

const listEntries = async () => {
  try {
    const files = await readdir("entries");
    const entries = files.map((fileName) => fileName.split('.')[0]);
    return entries;
  }
  catch(err) {
    console.log("Failed to list entries");
    return [];
  }
}

const saveEntry = async (title, content) => {
  try {
    // await fs.writeFile(`entries/${title.toLowerCase().trim()}.md`, content);
    await fs.writeFile(`entries/${title}.md`, content);
    console.log(`${title} entry saved successfully!`);
  }
  catch (e) {
    console.log(`this ${e} is from saveEntry function`);
  }
} 

const getEntry = async (title) => {
  try {
    const entries = await listEntries();
    // const entry = entries.find((elem) => elem.toLowerCase() === title.toLowerCase().trim());
    const entry = entries.find((elem) => elem.toLowerCase() === title);
    return await fs.readFile(`entries/${entry}.md`, { encoding: 'utf8' });
  }
  catch(err) {
    console.log("getEntry can't find this entry file...");
    return null;
  }
}

const removeEntry = async (title) => {
  try {
    const result = await fs.rm(`entries/${title}.md`);
    return result;
  }
  catch(message) {
    return "No such entry!";
  }
}

const mdConverter = (content) => {
  const md = MarkdownIt();
  const html = md.render(content);
  return html;
}

// export util functions
export default {listEntries, saveEntry, getEntry, mdConverter, removeEntry};