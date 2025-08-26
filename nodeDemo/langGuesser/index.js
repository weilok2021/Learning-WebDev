/*
This app receive text from user's terminal and prompt to the user what language the entered text belongs to. 
*/


const francPg = require("franc");
const langs = require("langs");


argv = process.argv[2]; // user argument from terminal
const langCode = francPg.franc(argv);
console.log(argv);
console.log(`Language code: ${langCode}`);

const afr = francPg.franc('Alle menslike wesens word vry') //=> 'afr'
const ben = francPg.franc('এটি একটি ভাষা একক IBM স্ক্রিপ্ট') //=> 'ben'
const nno = francPg.franc('Alle menneske er fødde til fridom') //=> 'nno'

try {
    // const language = langs.where("3", langCode);
    // console.log(langCode, language.name);
    console.log(afr, langs.where("3", afr).name);
    console.log(ben, langs.where("3", ben).name);
    console.log(nno, langs.where("3", nno).name);

}
catch {
    console.log("couldn't detect this language");
}

