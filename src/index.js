import './main.scss'

const gemPuzzle = {
    elements: {
        container: '',
        scoreboard: '',
        time: '',
        pause: '',
        moves: '',
        mainArea: '',
        puzzles: [],

        pauseBtn: '',

        menu: '',
        continueGameBtn: '',
        newGameBtn: '',
        saveGameBtn: '',
        savedGamesBtn: '',
        bestScoresBtn: '',
        rulesGameBtn: '',
        settingsBtn: '',

        audioMove: '',
        audioDragMove: '',
        audioWin: '',
    },
    values: {
        moves: 0,
        timerId: '',
        time: `00:00`,
        minutes: 0,
        seconds: 0,
        isPauseClicked: false,

    },

    init() {
        //Create main container
        this.elements.container = document.createElement("div");
        this.elements.container.classList.add('container');

        // Create scoreboard
        this.elements.scoreboard = document.createElement("div");
        this.elements.scoreboard.classList.add('scoreboard');

        // Create scoreboard parts (time, pause, moves)
        // Time
        this.elements.time = document.createElement("div");
        this.elements.time.classList.add('time');
        this.elements.time.textContent = `Time:${this.values.time}`
        // Pause container with button inside
        this.elements.pause = document.createElement("div");
        this.elements.pause.classList.add('pause');

        this.elements.pauseBtn = document.createElement("h3");
        this.elements.pauseBtn.classList.add('pauseBtn');
        this.elements.pauseBtn.textContent = `Pause game`
        this.elements.pauseBtn.addEventListener('click', () => {
            clearInterval(this.values.timerId)
            this.values.isPauseClicked = true;
            this.openMenu()
        })

        // Moves
        this.elements.moves = document.createElement("div");
        this.elements.moves.classList.add('moves');
        this.elements.moves.textContent = `Moves: ${this.values.moves}`

        this.elements.pause.appendChild(this.elements.pauseBtn)
        this.elements.scoreboard.appendChild(this.elements.time)
        this.elements.scoreboard.appendChild(this.elements.pause)
        this.elements.scoreboard.appendChild(this.elements.moves)
        this.elements.container.appendChild(this.elements.scoreboard);


        //Create main area for puzzles
        this.elements.mainArea = document.createElement("div");
        this.elements.mainArea.classList.add('main-area');
        this.elements.container.appendChild(this.elements.mainArea)

        document.body.appendChild(this.elements.container)

        this.initiateAudio()
        this.createSortedPuzzles()
        this.initiatePuzzles()
        this.initiateDragNDrop()
        this.openMenu()
        // keyElement.classList.toggle("someClass", this.bool);

    },


    checkPuzzlesOrder() {
        if (this.elements.puzzles.every((el, ind) => Number(el.id) === ind + 1)) {
            alert('You won!');
        }
    },
    initiateAudio() {
        // Move sound for swap
        this.elements.audioMove = document.createElement('audio');
        this.elements.audioMove.classList.add('audioMove');
        let audioMoveSource = document.createElement('source');
        // this.elements.audioMove.setAttribute("autoplay", "true");
        audioMoveSource.src = 'src/assets/sounds/Move.mp3';
        // audio.innerHTML = "<source src=\"./assets/sounds/Move.mp3\"  type=\"audio/mpeg\">";
        this.elements.audioMove.appendChild(audioMoveSource);
        document.body.appendChild(this.elements.audioMove);

        // Move sound for drag-n-drop
        this.elements.audioDragMove = document.createElement('audio');
        this.elements.audioDragMove.classList.add('audioDragMove');
        let audioDragMoveSource = document.createElement('source');
        // this.elements.audioDragMove.setAttribute("autoplay", "true");
        audioDragMoveSource.src = 'src/assets/sounds/DragMove.mp3';
        // audio.innerHTML = "<source src=\"./assets/sounds/Move.mp3\"  type=\"audio/mpeg\">";
        this.elements.audioDragMove.appendChild(audioDragMoveSource);
        document.body.appendChild(this.elements.audioDragMove);

    },
    initiatePuzzles() {
        for (let val of this.elements.puzzles) {
            val.addEventListener('click', () => {
                if (val.className !== 'empty') {
                    this.swapPuzzles(val);
                }
            })
            if (val.className === 'puzzle') {
                val.setAttribute('draggable', true);
            }
        }
    },
    updateTime() {
        this.values.timerId = setInterval(() => {

            this.values.seconds += 1;

            if (this.values.seconds === 60) {
                this.values.minutes += 1;
                this.values.seconds = 0;
            }
            let min = this.values.minutes;
            let sec = this.values.seconds;

            if (this.values.minutes <= 9) {
                min = `0${this.values.minutes}`;
            }
            if (this.values.seconds <= 9) {
                sec = `0${this.values.seconds}`;
            }

            this.values.time = `${min}:${sec}`;
            this.elements.time.textContent = `Time:${this.values.time}`;
        }, 1000)
    },
    startGame() {
        this.elements.pauseBtn.classList.remove('scoreElements_inactive');
        this.elements.time.classList.remove('scoreElements_inactive');
        this.elements.moves.classList.remove('scoreElements_inactive');
        this.elements.menu.remove();
        this.updateTime();
    },
    openMenu() {
        this.elements.pauseBtn.classList.add('scoreElements_inactive');
        this.elements.time.classList.add('scoreElements_inactive');
        this.elements.moves.classList.add('scoreElements_inactive');
        // this.elements.pauseBtn.style.cssText = 'color:red;'

        // this.elements.container.style.cssText = 'display:none;'
        this.elements.menu = document.createElement("div");
        this.elements.menu.classList.add('menu');

        //Create menu elements wrapper

        //    Create menu elements
        this.elements.continueGameBtn = document.createElement("h3");
        this.elements.continueGameBtn.classList.add('continueGameBtn', 'menu-item');
        this.elements.continueGameBtn.textContent = `Continue Game`;
        this.elements.continueGameBtn.addEventListener('click', () => {
            this.values.isPauseClicked = false;
            this.startGame();
        })

        this.elements.newGameBtn = document.createElement("h3");
        this.elements.newGameBtn.classList.add('newGameBtn', 'menu-item');
        this.elements.newGameBtn.textContent = `New Game`;
        this.elements.newGameBtn.addEventListener('click', () => {

            // Reset time
            this.values.time = '00:00';
            this.values.seconds = 0;
            this.values.minutes = 0;
            this.elements.time.textContent = `Time:${this.values.time}`;

            //Reset moves
            this.values.moves = 0;
            this.elements.moves.textContent = `Moves: ${this.values.moves}`;

            this.values.isPauseClicked = false;
            this.createRandomPuzzles();
            this.initiatePuzzles();
            this.initiateDragNDrop();
            this.startGame();
        })

        this.elements.saveGameBtn = document.createElement("h3");
        this.elements.saveGameBtn.classList.add('saveGameBtn', 'menu-item');
        this.elements.saveGameBtn.textContent = `Save Game`;
        this.elements.saveGameBtn.addEventListener('click', () => {
            alert('saveGameBtn is clicked');
        })

        this.elements.savedGamesBtn = document.createElement("h3");
        this.elements.savedGamesBtn.classList.add('savedGamesBtn', 'menu-item',);
        this.elements.savedGamesBtn.textContent = `Saved Games`;
        this.elements.savedGamesBtn.addEventListener('click', () => {
            alert('savedGamesBtn is clicked');
        })

        this.elements.bestScoresBtn = document.createElement("h3");
        this.elements.bestScoresBtn.classList.add('bestScoresBtn', 'menu-item');
        this.elements.bestScoresBtn.textContent = `Best Scores`;
        this.elements.bestScoresBtn.addEventListener('click', () => {
            alert('bestScoresBtn is clicked');
        })

        this.elements.rulesGameBtn = document.createElement("h3");
        this.elements.rulesGameBtn.classList.add('rulesGameBtn', 'menu-item');
        this.elements.rulesGameBtn.textContent = `Game Rules`;
        this.elements.rulesGameBtn.addEventListener('click', () => {
            alert('rulesGameBtn is clicked');
        })

        this.elements.settingsBtn = document.createElement("h3");
        this.elements.settingsBtn.classList.add('settingsBtn', 'menu-item');
        this.elements.settingsBtn.textContent = `Settings`;
        this.elements.settingsBtn.addEventListener('click', () => {
            alert('settingsBtn is clicked');
        })


        if (this.values.isPauseClicked) {
            this.elements.menu.appendChild(this.elements.continueGameBtn);
        }
        this.elements.menu.appendChild(this.elements.newGameBtn);
        this.elements.menu.appendChild(this.elements.saveGameBtn);
        this.elements.menu.appendChild(this.elements.savedGamesBtn);
        this.elements.menu.appendChild(this.elements.bestScoresBtn);
        this.elements.menu.appendChild(this.elements.rulesGameBtn);
        this.elements.menu.appendChild(this.elements.settingsBtn);


        document.body.appendChild(this.elements.menu);
    },
    initiateDragNDrop() {

        let isAllowDragDrop = true;
        let currentPuzzle = '';
        // Listeners for puzzles
        const dragStart = function () {
            setTimeout(() => {
                this.classList.add('puzzle_hidden');
            }, 0)

            isAllowDragDrop = true;
            currentPuzzle = this;


            const currentPuzzleIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === currentPuzzle);
            const emptyElementIndex = gemPuzzle.elements.puzzles.findIndex((el) => el.className === 'empty');


            const isElementsInAOneRow = () => {
                const shiftedElementRowNumber = Math.floor(currentPuzzleIndex / 4) + 1;
                const emptyElementRowNumber = Math.floor(emptyElementIndex / 4) + 1;
                if (shiftedElementRowNumber === emptyElementRowNumber) {
                    return true
                }
                return false
            }

            if (!(currentPuzzleIndex === emptyElementIndex + 4
                || currentPuzzleIndex === emptyElementIndex - 4
                || (currentPuzzleIndex === emptyElementIndex + 1 && isElementsInAOneRow())
                || (currentPuzzleIndex === emptyElementIndex - 1 && isElementsInAOneRow()))
            ) {
                isAllowDragDrop = false;
            }

        }

        const dragEnd = function () {
            this.classList.remove('puzzle_hidden');
        }

        this.elements.puzzles.forEach((el) => {
            el.addEventListener('dragstart', dragStart);
            el.addEventListener('dragend', dragEnd);

        })

        //--------------------------------Borders checking--------------------------------------


        // Listeners for Empty Element
        const emptyElement = this.elements.puzzles.find((el) => el.className === 'empty');

        const dragEnter = function (e) {
            e.preventDefault();
            if (!isAllowDragDrop) {
                return
            }
            this.classList.add('empty_hovered');
        }

        const dragLeave = function () {
            this.classList.remove('empty_hovered');
        }
        const dragOver = function (e) {
            e.preventDefault()
        }
        emptyElement.addEventListener('dragenter', dragEnter);
        emptyElement.addEventListener('dragleave', dragLeave);
        emptyElement.addEventListener('dragover', dragOver);

        const dragDrop = function () {

            if (!isAllowDragDrop) {
                return
            }

            const currentPuzzleIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === currentPuzzle);
            const emptyElementIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === this);


            const newEmpty = this.cloneNode(true);
            const newCurrentPuzzle = currentPuzzle.cloneNode(true);
            currentPuzzle.replaceWith(newEmpty);
            this.replaceWith(newCurrentPuzzle);


            newEmpty.classList.remove('empty_hovered');
            newCurrentPuzzle.classList.remove('puzzle_hidden');

            newCurrentPuzzle.addEventListener('dragstart', dragStart);
            newCurrentPuzzle.addEventListener('dragend', dragEnd);
            newEmpty.addEventListener('drop', dragDrop);
            newEmpty.addEventListener('dragenter', dragEnter);
            newEmpty.addEventListener('dragleave', dragLeave);
            newEmpty.addEventListener('dragover', dragOver);


            newCurrentPuzzle.addEventListener('click', () => {
                gemPuzzle.swapPuzzles(newCurrentPuzzle);
            })
            newCurrentPuzzle.setAttribute('draggable', true);


            //    update puzzles array after every swap


            gemPuzzle.elements.puzzles[currentPuzzleIndex] = newEmpty;
            gemPuzzle.elements.puzzles[emptyElementIndex] = newCurrentPuzzle;

            gemPuzzle.values.moves++;
            gemPuzzle.elements.moves.textContent = `Moves: ${gemPuzzle.values.moves}`;

            gemPuzzle.elements.audioDragMove.play();

            gemPuzzle.checkPuzzlesOrder();

        }

        emptyElement.addEventListener('drop', dragDrop);
    },
    swapPuzzles(puzzle) {
        // find indexes of shifted and empty elements into puzzles array
        const shiftedElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.id === puzzle.id));
        const emptyElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.className === 'empty'));

        //Border checking
        const isElementsInAOneRow = () => {
            const shiftedElementRowNumber = Math.floor(shiftedElementIndex / 4) + 1;
            const emptyElementRowNumber = Math.floor(emptyElementIndex / 4) + 1;
            if (shiftedElementRowNumber === emptyElementRowNumber) {
                return true
            }
            return false
        }
        if (shiftedElementIndex === emptyElementIndex + 4
            || shiftedElementIndex === emptyElementIndex - 4
            || (shiftedElementIndex === emptyElementIndex + 1 && isElementsInAOneRow())
            || (shiftedElementIndex === emptyElementIndex - 1 && isElementsInAOneRow())
        ) {
            // swap elements
            const extra = this.elements.puzzles[shiftedElementIndex];
            this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
            this.elements.puzzles[emptyElementIndex] = extra;
            //clean and rerender of mainArea
            this.elements.mainArea.innerHTML = '';
            this.elements.puzzles.forEach((el) => {
                this.elements.mainArea.appendChild(el);
            })
            this.values.moves++;
            this.elements.moves.textContent = `Moves: ${this.values.moves}`;

            this.elements.audioMove.play();

            this.checkPuzzlesOrder();

        }
    },
    createRandomPuzzles() {
        // Reset order board of puzzles
        this.elements.mainArea.innerHTML = '';
        this.elements.puzzles = [];

        // Fill array for random indexes
        let randomIndexes = [];
        while (randomIndexes.length < 16) {
            let randomNumber = Math.floor(0 + Math.random() * (15 + 1 - 0));
            let found = false;
            for (let i = 0; i < randomIndexes.length; i++) {
                if (randomIndexes[i] === randomNumber) {
                    found = true;
                    break;
                }
            }
            // if (!found) { randomIndexes[randomIndexes.length]=randomNumber; }
            if (!found) {
                randomIndexes = [...randomIndexes, randomNumber];
            }
        }

        // Second cycle for clarification and visibility
        //create elements in different places
        for (let i = 0; i < randomIndexes.length; i++) {
            this.elements.puzzles[i] = document.createElement("div");
            if (randomIndexes[i] + 1 === randomIndexes.length) {
                this.elements.puzzles[i].classList.add('empty');
                this.elements.puzzles[i].id = 16;

            } else {
                this.elements.puzzles[i].classList.add('puzzle');
                this.elements.puzzles[i].id = randomIndexes[i] + 1;
                this.elements.puzzles[i].textContent = randomIndexes[i] + 1;
            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);
        }
    },

    createSortedPuzzles() {
        for (let i = 0; i < 16; i++) {
            this.elements.puzzles[i] = document.createElement("div");
            this.elements.puzzles[i].id = i + 1;
            if (i !== 15) {
                this.elements.puzzles[i].classList.add('puzzle');
                this.elements.puzzles[i].textContent = i + 1;

            } else {
                this.elements.puzzles[i].classList.add('empty');
            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);
        }
    },

}


window.onload = () => {
    gemPuzzle.init();
}
