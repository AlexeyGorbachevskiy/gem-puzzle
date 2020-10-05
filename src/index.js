import './main.scss'

const gemPuzzle = {
    elements: {
        container: '',
        scoreboard: '',
        time: '',
        pause: '',
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

        // Create scoreboard parts (time, pause, moves)
        // Time
        this.elements.time = document.createElement("div");
        this.elements.time.classList.add('time');
        this.elements.time.textContent = `Time:`
        // Pause container with button inside
        this.elements.pause = document.createElement("div");
        this.elements.pause.classList.add('pause');

        this.elements.pauseBtn = document.createElement("h3");
        this.elements.pauseBtn.classList.add('pauseBtn');
        this.elements.pauseBtn.textContent = `Pause game`

        // Moves
        this.elements.moves = document.createElement("div");
        this.elements.moves.classList.add('moves');
        this.elements.moves.textContent = `Moves:`

        this.elements.pause.appendChild(this.elements.pauseBtn)
        this.elements.scoreboard.appendChild(this.elements.time)
        this.elements.scoreboard.appendChild(this.elements.pause)
        this.elements.scoreboard.appendChild(this.elements.moves)
        this.elements.container.appendChild(this.elements.scoreboard);


        //Create main area for puzzles
        this.elements.mainArea = document.createElement("div");
        this.elements.mainArea.classList.add('main-area');
        this.elements.container.appendChild(this.elements.mainArea)


        this.createRandomPuzzles()
        document.body.appendChild(this.elements.container)


        for (let val of this.elements.puzzles) {
            val.addEventListener('click', () => {
                if (val.className !== 'empty') {
                    this.swapPuzzles(val)
                }
            })
            if (val.className === 'puzzle') {
                val.setAttribute('draggable', true)
            }
        }


        this.dragNDrop()
        // keyElement.classList.toggle("someClass", this.bool);

    },


    dragNDrop() {
        let currentPuzzle = ''
        // Listeners for puzzles
        const dragStart = function () {
            setTimeout(() => {
                this.classList.add('puzzle_hidden')
            }, 0)

            currentPuzzle = this
        }
        const dragEnd = function () {
            this.classList.remove('puzzle_hidden')
        }

        this.elements.puzzles.forEach((el) => {
            el.addEventListener('dragstart', dragStart)
            el.addEventListener('dragend', dragEnd)

        })

        // Listeners for Empty Element
        const emptyElement = this.elements.puzzles.find((el) => el.className === 'empty')

        const dragEnter = function (e) {
            e.preventDefault()
            this.classList.add('empty_hovered')
        }

        const dragLeave = function () {
            this.classList.remove('empty_hovered')
        }
        const dragOver = function (e) {
            e.preventDefault()
        }
        emptyElement.addEventListener('dragenter', dragEnter)
        emptyElement.addEventListener('dragleave', dragLeave)
        emptyElement.addEventListener('dragover', dragOver)

        const dragDrop = function () {

            const newEmpty = this.cloneNode(true)
            const newCurrentPuzzle = currentPuzzle.cloneNode(true)
            currentPuzzle.replaceWith(newEmpty);
            this.replaceWith(newCurrentPuzzle);


            newEmpty.classList.remove('empty_hovered')
            newCurrentPuzzle.classList.remove('puzzle_hidden')

            newCurrentPuzzle.addEventListener('dragstart', dragStart)
            newCurrentPuzzle.addEventListener('dragend', dragEnd)
            newEmpty.addEventListener('drop', dragDrop)
            newEmpty.addEventListener('dragenter', dragEnter)
            newEmpty.addEventListener('dragleave', dragLeave)
            newEmpty.addEventListener('dragover', dragOver)


            newCurrentPuzzle.addEventListener('click', () => {
                gemPuzzle.swapPuzzles(newCurrentPuzzle)
            })
            newCurrentPuzzle.setAttribute('draggable', true)


            //    update puzzles array after every swap

            const currentPuzzleIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === currentPuzzle)
            const emptyElementIndex = gemPuzzle.elements.puzzles.findIndex((el) => el === this)


            gemPuzzle.elements.puzzles[currentPuzzleIndex] = newEmpty
            gemPuzzle.elements.puzzles[emptyElementIndex] = newCurrentPuzzle

        }

        emptyElement.addEventListener('drop', dragDrop)

    },
    swapPuzzles(puzzle) {
        // find indexes of shifted and empty elements into puzzles array
        const shiftedElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.id === puzzle.id))
        const emptyElementIndex = this.elements.puzzles.indexOf(this.elements.puzzles.find((el) => el.className === 'empty'))

        //Border checking
        const isElementsInAOneRow = () => {
            const shiftedElementRowNumber = Math.floor(shiftedElementIndex / 4) + 1
            const emptyElementRowNumber = Math.floor(emptyElementIndex / 4) + 1
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
            this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex]
            this.elements.puzzles[emptyElementIndex] = extra
            //clean and rerender of mainArea
            this.elements.mainArea.innerHTML = '';
            this.elements.puzzles.forEach((el) => {
                this.elements.mainArea.appendChild(el)
            })
        }
    },
    createRandomPuzzles() {
        // Fill array for random indexes
        let randomIndexes = []
        while (randomIndexes.length < 16) {
            let randomNumber = Math.floor(0 + Math.random() * (15 + 1 - 0))
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
                this.elements.puzzles[i].id = 16

            } else {
                this.elements.puzzles[i].classList.add('puzzle');
                this.elements.puzzles[i].id = randomIndexes[i] + 1;
                this.elements.puzzles[i].textContent = randomIndexes[i] + 1
            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i])
        }
    },
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
        }
    },

}


window.onload = () => {
    gemPuzzle.init()
}
