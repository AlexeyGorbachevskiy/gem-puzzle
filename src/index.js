import './main.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const gemPuzzle = {
    elements: {
        container: '',
        scoreboard: '',
        volume: '',
        time: '',
        pause: '',
<<<<<<< HEAD
        pauseBtn: '',
        moves: '',
        mainArea: '',
        puzzles: [],
    },
    init() {
        //Create main container
        this.elements.container = document.createElement("div");
        this.elements.container.classList.add('container');

        // Create scoreboard
        this.elements.scoreboard = document.createElement("div");
        this.elements.scoreboard.classList.add('scoreboard');

=======
        moves: '',
        help: '',
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

        winMenu: '',


        audioMove: '',
        audioDragMove: '',
        audioWin: '',
    },
    values: {
        dimension: 4,
        moves: 0,
        timerId: '',
        time: `00:00`,
        minutes: 0,
        seconds: 0,
        isPauseClicked: false,
        isVolumeOn: true,
        randomImageName: '',
    },

    init() {
        //Create main container
        this.elements.container = document.createElement('div');
        this.elements.container.classList.add('container');

        // Create scoreboard
        this.elements.scoreboard = document.createElement('div');
        this.elements.scoreboard.classList.add('scoreboard');

>>>>>>> gem-puzzle
        // Create scoreboard parts (time, pause, moves)
        // Time
        this.elements.time = document.createElement('div');
        this.elements.time.classList.add('time');
<<<<<<< HEAD
        this.elements.time.textContent = `Time:`
=======
        this.elements.time.textContent = `Time:${this.values.time}`
>>>>>>> gem-puzzle
        // Pause container with button inside
        this.elements.pause = document.createElement('div');
        this.elements.pause.classList.add('pause');

        this.elements.pauseBtn = document.createElement("h3");
        this.elements.pauseBtn.classList.add('pauseBtn');
<<<<<<< HEAD
        this.elements.pauseBtn.textContent = `Pause game`
<<<<<<< HEAD
=======
=======
        this.elements.pauseBtn.textContent = `Pause`
>>>>>>> gem-puzzle
        this.elements.pauseBtn.addEventListener('click', () => {
            clearInterval(this.values.timerId)
            this.values.isPauseClicked = true;
            this.openMenu()
        })
>>>>>>> gem-puzzle

        // Volume
        this.elements.volume = document.createElement('div');
        this.elements.volume.classList.add('volume');
        this.elements.volume.innerHTML = '<i class="fas fa-volume-up"></i>'
        this.elements.volume.addEventListener('click', () => {
            if (this.elements.volume.className === 'volume') {
                this.values.isVolumeOn = false;
                this.elements.volume.classList.remove('volume');
                this.elements.volume.classList.add('volume_Off');
                this.elements.volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                this.values.isVolumeOn = true;
                this.elements.volume.classList.remove('volume_Off');
                this.elements.volume.classList.add('volume');
                this.elements.volume.innerHTML = '<i class="fas fa-volume-up"></i>';
            }

        })

        // Help
        this.elements.help = document.createElement('div');
        this.elements.help.classList.add('help');
        this.elements.help.innerHTML = '<i class="fas fa-question-circle"></i>';

        // Moves
        this.elements.moves = document.createElement('div');
        this.elements.moves.classList.add('moves');
<<<<<<< HEAD
        this.elements.moves.textContent = `Moves:`
=======
        this.elements.moves.textContent = `Moves: ${this.values.moves}`
>>>>>>> gem-puzzle

        this.elements.pause.appendChild(this.elements.pauseBtn);
        this.elements.scoreboard.appendChild(this.elements.volume);
        this.elements.scoreboard.appendChild(this.elements.time);
        this.elements.scoreboard.appendChild(this.elements.pause);
        this.elements.scoreboard.appendChild(this.elements.moves);
        this.elements.scoreboard.appendChild(this.elements.help);
        this.elements.container.appendChild(this.elements.scoreboard);


        //Create main area for puzzles
        this.elements.mainArea = document.createElement("div");
        this.elements.mainArea.classList.add('main-area');
        this.elements.mainArea.style = `grid-template-columns: repeat(${this.values.dimension}, 1fr);`
        this.elements.container.appendChild(this.elements.mainArea);

<<<<<<< HEAD
<<<<<<< HEAD

        this.createRandomPuzzles()
        document.body.appendChild(this.elements.container)


=======
        document.body.appendChild(this.elements.container)
=======
        document.body.appendChild(this.elements.container);
>>>>>>> gem-puzzle

        this.values.randomImageName = this.chooseRandomImage();
        this.initiateAudio();
        this.createSortedPuzzles();
        this.initiatePuzzles();
        this.initiateDragNDrop();
        this.openMenu();
        // keyElement.classList.toggle("someClass", this.bool);

    },


    animateSwapping() {
        // swap elements
        // let i = 0;
        // const puzzleHeight = this.elements.puzzles[shiftedElementIndex].clientHeight
        // const timerId= setInterval(() => {
        //     // 5 - it's grid gap (margin)
        //     if (i <= puzzleHeight + 5) {
        //         this.elements.puzzles[shiftedElementIndex].style = `top: ${i}px`;
        //         i++;
        //     } else {
        //         this.elements.puzzles[shiftedElementIndex].style = `top: 0px`;
        //
        //         const extra = this.elements.puzzles[shiftedElementIndex];
        //         this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
        //         this.elements.puzzles[emptyElementIndex] = extra;
        //
        //
        //         //clean and rerender of mainArea
        //
        //         this.elements.mainArea.innerHTML = '';
        //         this.elements.puzzles.forEach((el) => {
        //             this.elements.mainArea.appendChild(el);
        //         })
        //
        //         clearInterval(timerId)
        //
        //     }
        // }, 5)

    },


    chooseRandomImage() {
        let min = 1;
        let max = 150;
        let randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
        return randomNumber
    },


    checkPuzzlesOrder() {
        if (this.elements.puzzles.every((el, ind) => Number(el.id) === ind + 1)) {
            clearInterval(this.values.timerId);
            this.elements.winMenu = document.createElement('div');
            this.elements.winMenu.classList.add('win-menu');
            const winMenuText = document.createElement('div');
            winMenuText.classList.add('win-menu__text');
            winMenuText.textContent = `Hooray! You solved the puzzle in ${this.values.time} and ${this.values.moves} moves`;
            this.elements.winMenu.appendChild(winMenuText);
            this.elements.container.appendChild(this.elements.winMenu);

            const winMenuBtn = document.createElement('button');
            winMenuBtn.classList.add('win-menu__btn');
            winMenuBtn.textContent = 'Ok';
            this.elements.winMenu.appendChild(winMenuBtn);

            if (this.values.isVolumeOn) {
                this.elements.audioWin.play()
            }

            winMenuBtn.addEventListener('click', () => {
                this.elements.winMenu.remove();
                this.elements.audioWin.pause();
                this.elements.audioWin.currentTime = 0;


                // this.initiatePuzzles();
                // this.initiateDragNDrop();
                this.openMenu();
                this.values.minutes = 0;
                this.values.seconds = 0;
                this.values.time = '00:00'
                this.elements.time.textContent = `Time:${this.values.time}`
                this.values.moves = 0;
                this.elements.moves.textContent = `Moves: ${this.values.moves}`


            })
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

        // Move sound for win
        this.elements.audioWin = document.createElement('audio');
        this.elements.audioWin.classList.add('audioWin');
        let audioWinSource = document.createElement('source');
        // this.elements.audioDragMove.setAttribute("autoplay", "true");
        audioWinSource.src = 'src/assets/sounds/Win.mp3';
        // audio.innerHTML = "<source src=\"./assets/sounds/Move.mp3\"  type=\"audio/mpeg\">";
        this.elements.audioWin.appendChild(audioWinSource);
        document.body.appendChild(this.elements.audioWin);

    },
    initiatePuzzles() {
>>>>>>> gem-puzzle
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
<<<<<<< HEAD


        this.dragNDrop()
        // keyElement.classList.toggle("someClass", this.bool);

    },


    dragNDrop() {
=======
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
        this.values.randomImageName = this.chooseRandomImage()
        this.elements.menu.remove();
        this.updateTime();
    },
    openMenu() {
        // this.elements.pauseBtn.style.cssText = 'color:red;'

        // this.elements.container.style.cssText = 'display:none;'
        this.elements.menu = document.createElement("div");
        this.elements.menu.classList.add('menu');

        //Create menu elements wrapper

        //    Create menu elements
        this.elements.continueGameBtn = document.createElement("h3");
        this.elements.continueGameBtn.classList.add('continueGameBtn', 'menu-item');
        this.elements.continueGameBtn.textContent = `Continue`;
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
        if (this.values.isPauseClicked) {
            this.elements.menu.appendChild(this.elements.saveGameBtn);
        }
        this.elements.menu.appendChild(this.elements.savedGamesBtn);
        this.elements.menu.appendChild(this.elements.bestScoresBtn);
        this.elements.menu.appendChild(this.elements.rulesGameBtn);
        this.elements.menu.appendChild(this.elements.settingsBtn);
        this.elements.container.appendChild(this.elements.menu);
    },
    initiateDragNDrop() {

        let isAllowDragDrop = true;
<<<<<<< HEAD
>>>>>>> gem-puzzle
        let currentPuzzle = ''
=======
        let currentPuzzle = '';
>>>>>>> gem-puzzle
        // Listeners for puzzles
        const dragStart = function () {
            setTimeout(() => {
                this.classList.add('puzzle_hidden');
            }, 0)

<<<<<<< HEAD
            currentPuzzle = this
        }
=======
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
                // isAllowDragDrop = false;
                isAllowDragDrop = true;
            }

        }

>>>>>>> gem-puzzle
        const dragEnd = function () {
            this.classList.remove('puzzle_hidden');
        }

        this.elements.puzzles.forEach((el) => {
            el.addEventListener('dragstart', dragStart);
            el.addEventListener('dragend', dragEnd);

        })

<<<<<<< HEAD
=======
        //--------------------------------Borders checking--------------------------------------


>>>>>>> gem-puzzle
        // Listeners for Empty Element
        const emptyElement = this.elements.puzzles.find((el) => el.className === 'empty');

        const dragEnter = function (e) {
<<<<<<< HEAD
            e.preventDefault()
<<<<<<< HEAD
=======
            if (!isAllowDragDrop) {
                return
            }
>>>>>>> gem-puzzle
            this.classList.add('empty_hovered')
=======
            e.preventDefault();
            if (!isAllowDragDrop) {
                return
            }
            this.classList.add('empty_hovered');
>>>>>>> gem-puzzle
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

<<<<<<< HEAD
=======
            if (!isAllowDragDrop) {
                return
            }

            const currentPuzzleIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === currentPuzzle);
            const emptyElementIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === this);


<<<<<<< HEAD
>>>>>>> gem-puzzle
            const newEmpty = this.cloneNode(true)
            const newCurrentPuzzle = currentPuzzle.cloneNode(true)
=======
            const newEmpty = this.cloneNode(true);
            const newCurrentPuzzle = currentPuzzle.cloneNode(true);
>>>>>>> gem-puzzle
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

<<<<<<< HEAD
            const currentPuzzleIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === currentPuzzle)
            const emptyElementIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === this)

=======
>>>>>>> gem-puzzle

            gemPuzzle.elements.puzzles[currentPuzzleIndex] = newEmpty;
            gemPuzzle.elements.puzzles[emptyElementIndex] = newCurrentPuzzle;

<<<<<<< HEAD
<<<<<<< HEAD
        }

        emptyElement.addEventListener('drop', dragDrop)

=======
            gemPuzzle.values.moves++
            gemPuzzle.elements.moves.textContent = `Moves: ${gemPuzzle.values.moves}`
=======
            gemPuzzle.values.moves++;
            gemPuzzle.elements.moves.textContent = `Moves: ${gemPuzzle.values.moves}`;
>>>>>>> gem-puzzle

            if (gemPuzzle.values.isVolumeOn) {
                gemPuzzle.elements.audioDragMove.play();
            }


            gemPuzzle.checkPuzzlesOrder();

        }

<<<<<<< HEAD
        emptyElement.addEventListener('drop', dragDrop)
>>>>>>> gem-puzzle
=======
        emptyElement.addEventListener('drop', dragDrop);
>>>>>>> gem-puzzle
    },
    swapPuzzles(puzzle) {
        // find indexes of shifted and empty elements into puzzles array
        const shiftedElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.id === puzzle.id));
        const emptyElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.className === 'empty'));

        //Border checking
        const isElementsInAOneRow = () => {
            const shiftedElementRowNumber = Math.floor(shiftedElementIndex / this.values.dimension) + 1;
            const emptyElementRowNumber = Math.floor(emptyElementIndex / this.values.dimension) + 1;
            if (shiftedElementRowNumber === emptyElementRowNumber) {
                return true
            }
            return false
        }
        if (shiftedElementIndex === emptyElementIndex + this.values.dimension
            || shiftedElementIndex === emptyElementIndex - this.values.dimension
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        }
    },
    createRandomPuzzles() {
=======
            this.values.moves++
            this.elements.moves.textContent = `Moves: ${this.values.moves}`
=======
=======

>>>>>>> gem-puzzle
            this.values.moves++;
            this.elements.moves.textContent = `Moves: ${this.values.moves}`;
>>>>>>> gem-puzzle

            if (this.values.isVolumeOn) {
                this.elements.audioMove.play();
            }


            this.checkPuzzlesOrder();

        }
    },
    createRandomPuzzles() {
        // Reset order board of puzzles
        this.elements.mainArea.innerHTML = '';
        this.elements.puzzles = [];

>>>>>>> gem-puzzle
        // Fill array for random indexes
        let randomIndexes = [];
        let puzzlesCount = this.values.dimension * this.values.dimension;

        while (randomIndexes.length < puzzlesCount) {
            let min = 0;
            let max = puzzlesCount - 1;
            let randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
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
                this.elements.puzzles[i].id = this.values.dimension * this.values.dimension;

            } else {
                this.elements.puzzles[i].classList.add('puzzle');
                this.elements.puzzles[i].id = randomIndexes[i] + 1;
                this.elements.puzzles[i].textContent = randomIndexes[i] + 1;

                // Image assemble
                this.elements.puzzles[i].style.backgroundImage = `url('src/assets/images/puzzle-images/${this.values.randomImageName}.jpg')`;
                this.elements.puzzles[i].style.backgroundRepeat = `no-repeat`;
                const puzzleWidth = this.elements.mainArea.clientWidth / this.values.dimension;
                const puzzleHeight = this.elements.mainArea.clientHeight / this.values.dimension;
                const left = puzzleWidth * (randomIndexes[i] % this.values.dimension);
                const top = puzzleHeight * Math.floor((randomIndexes[i] / this.values.dimension));
                this.elements.puzzles[i].style.backgroundSize = `${this.elements.mainArea.clientWidth}px ${this.elements.mainArea.clientHeight}px`;
                this.elements.puzzles[i].style.backgroundPosition = `-${left}px -${top}px`;

            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);


        }
    },
<<<<<<< HEAD
    createSortedPuzzles() {
        const randomEmptyPlace = Math.floor(0 + Math.random() * (16 + 1 - 0))
        let isEmptyPuzzleCreated = false
        for (let i = 0; i < 16; i++) {
            this.elements.puzzles[i] = document.createElement("div");
            if (i !== randomEmptyPlace - 1) {
                this.elements.puzzles[i].classList.add('puzzle');
                isEmptyPuzzleCreated ? this.elements.puzzles[i].id = i : this.elements.puzzles[i].id = i + 1;
                isEmptyPuzzleCreated ? this.elements.puzzles[i].textContent = i : this.elements.puzzles[i].textContent = i + 1
                this.elements.mainArea.appendChild(this.elements.puzzles[i])
            } else {
                this.elements.puzzles[i] = document.createElement("div");
                this.elements.puzzles[i].classList.add('empty');
                this.elements.puzzles[i].id = 15;
                this.elements.mainArea.appendChild(this.elements.puzzles[i])
                isEmptyPuzzleCreated = true
            }
=======

    createSortedPuzzles() {
        for (let i = 0; i < this.values.dimension * this.values.dimension; i++) {
            this.elements.puzzles[i] = document.createElement("div");
            this.elements.puzzles[i].id = i + 1;
            if (i !== this.values.dimension * this.values.dimension - 1) {
                this.elements.puzzles[i].classList.add('puzzle');
                this.elements.puzzles[i].textContent = i + 1;


                // Assemble of image
                this.elements.puzzles[i].style.backgroundImage = `url('src/assets/images/puzzle-images/${this.values.randomImageName}.jpg')`;
                this.elements.puzzles[i].style.backgroundRepeat = `no-repeat`;
                const puzzleWidth = this.elements.mainArea.clientWidth / this.values.dimension;
                const puzzleHeight = this.elements.mainArea.clientHeight / this.values.dimension;
                const left = puzzleWidth * (i % this.values.dimension);
                const top = puzzleHeight * Math.floor((i / this.values.dimension));
                this.elements.puzzles[i].style.backgroundSize = `${this.elements.mainArea.clientWidth}px ${this.elements.mainArea.clientHeight}px`;
                this.elements.puzzles[i].style.backgroundPosition = `-${left}px -${top}px`;

            } else {
                this.elements.puzzles[i].classList.add('empty');
            }
<<<<<<< HEAD
            this.elements.mainArea.appendChild(this.elements.puzzles[i])
>>>>>>> gem-puzzle
=======
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);
>>>>>>> gem-puzzle
        }
    },

}


window.onload = () => {
    gemPuzzle.init();
}
