scriptconst albums = [
    { title: "Taylor Swift", year: 2006 },
    { title: "Fearless", year: 2008 },
    { title: "Speak Now", year: 2010 },
    { title: "Red", year: 2012 },
    { title: "1989", year: 2014 },
    { title: "Reputation", year: 2017 },
    { title: "Lover", year: 2019 },
    { title: "Folklore", year: 2020 },
    { title: "Evermore", year: 2020 },
    { title: "Fearless (Taylor’s Version)", year: 2021 },
    { title: "Red (Taylor’s Version)", year: 2021 },
    { title: "Midnights", year: 2022 },
    { title: "Speak Now (Taylor’s Version)", year: 2023 },
    { title: "1989 (Taylor’s Version)", year: 2023 },
    { title: "The Tortured Poets Department", year: 2024 }
];

// Shuffle albums
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderAlbums() {
    const albumList = document.getElementById("album-list");
    albumList.innerHTML = "";
    albums.forEach((album, index) => {
        const li = document.createElement("li");
        li.textContent = album.title;
        li.draggable = true;
        li.dataset.index = index;
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);
        albumList.appendChild(li);
    });
}

let draggedItem;

function dragStart(e) {
    draggedItem = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (draggedItem !== e.target) {
        const listItems = [...document.querySelectorAll("li")];
        const targetIndex = listItems.indexOf(e.target);
        const draggedIndex = listItems.indexOf(draggedItem);

        // Reorder albums array
        const draggedAlbum = albums.splice(draggedIndex, 1)[0];
        albums.splice(targetIndex, 0, draggedAlbum);

        renderAlbums();
    }
}

function submitAnswers() {
    const results = document.getElementById("result-message");
    results.innerHTML = "";
    const albumListItems = document.querySelectorAll("#album-list li");

    let allCorrect = true;
    albumListItems.forEach((li, index) => {
        const albumTitle = li.textContent;
        const correctYear = albums.find(album => album.title === albumTitle).year;

        if (correctYear === years[index]) {
            li.classList.add("highlight-correct");
            li.classList.remove("highlight-wrong");
        } else {
            li.classList.add("highlight-wrong");
            li.classList.remove("highlight-correct");
            allCorrect = false;
        }
    });

    if (allCorrect) {
        results.textContent = "All answers are correct! 🎉";
    } else {
        results.textContent = "Some answers are incorrect. Please try again.";
    }
}

const years = [2006, 2008, 2010, 2012, 2014, 2017, 2019, 2020, 2020, 2021, 2021, 2022, 2023, 2023, 2024];

document.getElementById("submit-btn").addEventListener("click", submitAnswers);

// Initialize
shuffle(albums);
renderAlbums();
