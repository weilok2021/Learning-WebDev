// function makeRequest(url, success, fail) {
//     const rand = Math.random();
//     if (rand < 0.5) {
//         success(`the data has been fetched from ${url}!`);
//     }
//     else {
//         fail("There is some error, the request is failed!");
//     }
// }

// makeRequest("weilok.com", msg => {
//     console.log(msg);
//     makeRequest("weilok.com/page2", () => {
//         console.log("Page 2 data also been fetched!");
//     }, () => {
//         console.log("Page 2 data can't be fetched");
//     })
// } , err => (console.log(err)));

// function makePromise() {
//     const rand = Math.random();

//     return new Promise((resolve, reject) => {
//         if (rand < 0.5) {
//             resolve();
//         }
//         else {
//             reject();
//         }
//     });
// }

// make promise  object
// let req = makePromise();
// req
// .then(() => {
//     console.log("First promise is fulfilled");
//     return makePromise();
// })
// .then(() => {
//     console.log("second promise is fufilled");
//     return makePromise();
// })
// .catch(() => {
//     console.log("First promise is rejected");
// });



// reinvent changeColor with promises

// const div = document.querySelector("div");
// function changeColor() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     })
// }

// changeColor()
// .then(() => {
//     div.style.backgroundColor = "red";
//     return changeColor();
// })
// .then(() => {
//     div.style.backgroundColor = "orange";
//     return changeColor();
// })
// .then(() => {
//     div.style.backgroundColor = "yellow"
// });