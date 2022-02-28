const tagsField = document.querySelector('.tags');  // блок игрового поля
const tagWidth = 80;                                // ширина костяшки, px
const size = 4;                                     // количество костяшек в ряду
let emptyCoords = {};                               // координата пустого места
let numbers = getRandNumbers();


(function () {
    tagsField.style.width = `${tagWidth * size}px`;
    tagsField.style.height = `${tagWidth * size}px`;

    setEmptyCoords();
    createGame();
    setActiveTags();
})();


//
tagsField.addEventListener('click', (event) => {

    let el = event.target;

    if (el.classList.contains('tags') || !el.hasAttribute('isactive')) {
        return;
    };

    let tagCoords = el.dataset.coords.split(",");

    numbers[emptyCoords.stroke][emptyCoords.pos] = +el.innerText;
    numbers[+tagCoords[1]][+tagCoords[0]] = 0;

    el.style.left = emptyCoords.pos * tagWidth + 'px';
    el.style.top = emptyCoords.stroke * tagWidth + 'px';
    el.dataset.coords = `${emptyCoords.pos},${emptyCoords.stroke}`;

    setEmptyCoords(+tagCoords[0], +tagCoords[1]);
    setActiveTags();
});


// Устанавливает класс для костяшек, которые можно двигать
function setActiveTags() {

    let coords = [];

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

        let tagCoords = tag.dataset.coords.split(",");
        let isActive = false;

        for (let i = 0; i < coords.length; i++) {
            if (coords[i].join("") == tagCoords.join("")) {
                isActive = true;
            }
        }

        if (isActive) {
            tag.classList.add('tags__tag_active');
            tag.setAttribute('isactive', "");
        } else {
            tag.classList.remove('tags__tag_active');
            tag.removeAttribute('isactive');
        }
    }

}


// Устанавливает координаты пустого места
function setEmptyCoords(pos = null, stroke = null) {

    if (pos == null && stroke == null) {

        for (let i = 0; i < numbers.length; i++) {
            let pos = numbers[i].indexOf(0);
            if (pos !== -1) {
                emptyCoords = {
                    pos: pos,
                    stroke: i
                }
            }
        }

    } else {

        emptyCoords = {
            pos: pos,
            stroke: stroke
        }

    }
}


// Создание игры
function createGame() {

    for (let i = 0; i < numbers.length; i++) {
        createStroke(numbers[i], i)
    }
}


// Создает ряд костяшек
function createStroke(numbers, stroke) {

    for (let pos = 0; pos < numbers.length; pos++) {

        if (numbers[pos] == 0) {
            continue;
        }

        let tag = createTag(numbers[pos], pos, stroke);
        tagsField.append(tag);
    }
}


// Создает и возвращает костяшку
function createTag(number, pos, stroke) {

    let btn = document.createElement('div');

    btn.classList.add('tags__tag');
    btn.style.width = `${tagWidth}px`;
    btn.style.height = `${tagWidth}px`;
    btn.innerText = number;

    btn.style.left = pos * tagWidth + 'px';
    btn.style.top = stroke * tagWidth + 'px';
    btn.dataset.coords = `${pos},${stroke}`;

    return btn;
}


// Возвращает массив случайных чисел от 0 до size**2 - 1
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


// Возвращает случайное целое число от min до max включительно
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Проверка победителя
function checkWin() {
    let arr = numbers.join().split(",");

    for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i])
    }

}