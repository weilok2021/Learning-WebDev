const form = document.querySelector("form");
const imgSection = document.querySelector("#img-section");

function makeImg(imgUrl) {
    const img = document.createElement("img");
    img.src = imgUrl;
    imgSection.append(img);
}

function removeImages() {
    while (imgSection.firstChild) {
        imgSection.removeChild(imgSection.firstChild);
    }

    // Bad practice (Do not modify the iterating collection!!!) 

    // for (let img of imgSection) {
    //     imgSection.removeChild(img);
    // }
}

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent form from submitting
    const query = form.elements.query.value;
    removeImages();

    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        for (let tvData of res.data) {
            // append image only when there's an image exist for this tv
            if (tvData.show.image) {
                const imgUrl = tvData.show.image.medium;
                makeImg(imgUrl);
            }
        }
    }
    catch {
        console.log("Some error occured!");
    }

    // reset the user input
    form.elements.query.value = "";
});