const tagsField = document.querySelector('.tags');
const btnWidth = 80;
const size = 4;
let emptyCoords = {}; // координата пустого места
let numbers = getRandNumbers();
let activeTags = [];


(function () {
    tagsField.style.width = `${btnWidth * size}px`;
    tagsField.style.height = `${btnWidth * size}px`;

    setEmptyCoords();
    createGame();
    setActiveTags();
})();


tagsField.addEventListener('click', (event) => {

    let el = event.target;

    if (el.classList.contains('tags') || !el.hasAttribute('isactive')) {
        return;
    };

    let tagCoords = el.dataset.coords.split(",");

    numbers[emptyCoords.stroke][emptyCoords.pos] = +el.innerText;
    numbers[+tagCoords[1]][+tagCoords[0]] = 0;

    el.style.left = emptyCoords.pos * btnWidth + 'px';
    el.style.top = emptyCoords.stroke * btnWidth + 'px';

    el.dataset.coords = `${emptyCoords.pos},${emptyCoords.stroke}`;

    emptyCoords.pos = +tagCoords[0];
    emptyCoords.stroke = +tagCoords[1];

    setActiveTags();
});


function setActiveTags() {
    let coords = []; // 

    if (emptyCoords.pos - 1 !== -1) {
        coords.push([emptyCoords.pos - 1, emptyCoords.stroke])
    }

    if (emptyCoords.pos + 1 !== size) {
        coords.push([emptyCoords.pos + 1, emptyCoords.stroke])
    }

    if (emptyCoords.stroke - 1 !== -1) {
        coords.push([emptyCoords.pos, emptyCoords.stroke - 1])
    }

    if (emptyCoords.stroke + 1 !== size) {
        coords.push([emptyCoords.pos, emptyCoords.stroke + 1])
    }

    for (let tag of tagsField.children) {
        let tagCoords = tag.dataset.coords.split(","); // [2, 3]
        let isActive = false;
        for (let i = 0; i < coords.length; i++) {
            if (coords[i].join("") == tagCoords.join("")) {
                isActive = true;
            }
        }

        if (isActive) {
            tag.classList.add('tags__btn_active');
            tag.setAttribute('isactive', "");
        } else {
            tag.classList.remove('tags__btn_active');
            tag.removeAttribute('isactive');
        }

    }

}


function setEmptyCoords() {

    for (let i = 0; i < numbers.length; i++) {
        let pos = numbers[i].indexOf(0);
        if (pos !== -1) {
            emptyCoords = {
                pos: pos,
                stroke: i
            }
        }
    }
}


function createGame() {

    for (let i = 0; i < numbers.length; i++) {
        createStroke(numbers[i], i)
    }
}


function createStroke(numbers, stroke) {

    for (let pos = 0; pos < numbers.length; pos++) {

        if (numbers[pos] == 0) {
            continue;
        }

        let tag = createTag(numbers[pos], pos, stroke);
        tagsField.append(tag);
    }
}


function createTag(number, pos, stroke) {

    let btn = document.createElement('div');
    btn.classList.add('tags__btn');
    btn.style.width = `${btnWidth}px`;
    btn.style.height = `${btnWidth}px`;
    btn.innerText = number;

    btn.style.left = pos * btnWidth + 'px';
    btn.style.top = stroke * btnWidth + 'px';
    btn.dataset.coords = `${pos},${stroke}`;

    return btn;
}


function getRandNumbers() {

    let numbers = [];

    while (numbers.length < size ** 2) {
        let rand = getRandomInt(0, (size ** 2) - 1);

        if (!numbers.includes(rand)) {
            numbers.push(rand);
        } else {
            continue;
        }
    }

    let randNumbers = [];

    for (let i = 0; i < size; i++) {
        randNumbers.push(numbers.slice(size * i, size * (i + 1)))
    }

    return randNumbers;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

