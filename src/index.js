import './main.scss'


const gemPuzzle = {
    elements: {
        container: '',
        scoreboard: '',
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
        this.elements.container.appendChild(this.elements.scoreboard);

        //Create main area for puzzles
        this.elements.mainArea = document.createElement("div");
        this.elements.mainArea.classList.add('main-area');
        this.elements.container.appendChild(this.elements.mainArea)


        this.createRandomPuzzles()


        document.body.appendChild(this.elements.container)


        // document.querySelectorAll(".use-keyboard-input").forEach(element => {
        //     element.addEventListener("focus", () => {
        //         this.open()
        //     });
        //     element.oninput=function(e){
        //         element.value = e.currentTarget.value
        //         this.inputValue=element.value
        //     }
        // });
        // keyElement.classList.toggle("keyboard__key_active", this.isCapsLock);
        // keyElement.classList.add("keyboard__key-wide");
        // keyElement.innerHTML = createIconHTML("keyboard_return");
        // const fragment = document.createDocumentFragment();

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
            if (randomIndexes[i]+1 === randomIndexes.length) {
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
