import fs from 'fs/promises';
import { get } from 'http';
import MarkdownIt from 'markdown-it';

const readdir = async (dir) => {
  // read files's name in directories using async function, then split these files name with its extension
  // and store those file name into an array, eventually return this array
  try {
    const files = await fs.readdir(dir);

    // const entries = files.map((fileName) => fileName.split('.')[0]);
    // const arr = [];
    // for (const fileName of files) {
    //   const entry = fileName.split('.'); // returns ["fileName", "md"]
    //   const [name, extension] = entry; // deconstruct the entry array
    //   arr.push(name);
    // }
    // console.log(entries);
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
    await fs.writeFile(`entries/${title.toLowerCase().trim()}.md`, content);
    console.log(`${title} entry saved successfully!`);
  }
  catch (e) {
    console.log(`this ${e} is from saveEntry function`);
  }
} 

const getEntry = async (title) => {
  try {
    const entries = await listEntries();
    const entry = entries.find((elem) => elem.toLowerCase() === title.toLowerCase().trim());
    return await fs.readFile(`entries/${entry}.md`, { encoding: 'utf8' });
  }
  catch(err) {
    console.log("getEntry can't find this entry file...");
    return null;
  }
}

const mdConverter = (content) => {
  const md = MarkdownIt();
  const html = md.render(content);
  return html;
}

// export util functions
export default {listEntries, saveEntry, getEntry, mdConverter};