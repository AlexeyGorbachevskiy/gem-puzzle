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
        clearBestScoresBtn: '',
        settingsBtn: '',

        savedGamesMenu: '',
        savedGamesMenuTitle: '',
        savedGamesMenuButtonsWrapper: '',
        loadButton: '',
        removeButton: '',

        bestScoresMenu: '',
        rulesMenu: '',
        settingsMenu: '',
        boardSizeSelect: '',
        moveAnimationCheckbox: '',
        difficultySelect: '',

        backButton: '',
        winMenu: '',


        audioMove: '',
        audioDragMove: '',
        audioWin: '',
        audioMoveAnimation: '',
        audioMenuItemHover: '',
        audioMenuItemSelect: '',
        audioMenu: '',
        audioMainTheme: '',

        // for local storage
        screenShot: '',

        // for saved game menu
        screenShots: [],
        slider: '',
        angleLeft: '',
        angleRight: '',


    },
    values: {
        isFirstLoad: false,

        dimension: 4,
        moves: 0,
        timerId: '',
        time: `00:00`,
        minutes: 0,
        seconds: 0,
        isPauseClicked: false,
        isVolumeOn: true,
        isAnimation: true,
        // for autoplay policy
        isMenuItemClicked: false,
        previousRandomImageName: '',
        randomImageName: '',
        maxSavedGamesCount: 10,
        maxBestScoresCount: 10,

        isLoad: false,
        savedGames: [],
        bestScores: [],
        currentScreenShotId: 0,
        difficulty: 3,
    },

    init() {
        //Create main container
        this.elements.container = document.createElement('div');
        this.elements.container.classList.add('container');

        // Create scoreboard
        this.elements.scoreboard = document.createElement('div');
        this.elements.scoreboard.classList.add('scoreboard');

        // Create scoreboard parts (time, pause, moves)
        // Time
        this.elements.time = document.createElement('div');
        this.elements.time.classList.add('time');
        this.elements.time.textContent = `Time:${this.values.time}`
        // Pause container with button inside
        this.elements.pause = document.createElement('div');
        this.elements.pause.classList.add('pause');

        this.elements.pauseBtn = document.createElement("h3");
        this.elements.pauseBtn.classList.add('pauseBtn');
        this.elements.pauseBtn.textContent = `Pause`;
        this.elements.pauseBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play()
            }

        })
        this.elements.pauseBtn.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
                this.elements.audioMenu.play();
                this.elements.audioMainTheme.pause();
                this.elements.audioMainTheme.currentTime = 0;
            }

            clearInterval(this.values.timerId)
            this.values.isPauseClicked = true;
            this.openMenu()
        })


        // Volume
        this.elements.volume = document.createElement('div');
        this.elements.volume.classList.add('volume');
        this.elements.volume.innerHTML = '<i class="fas fa-volume-up"></i>'
        this.elements.volume.addEventListener('click', () => {


            if (this.elements.volume.className === 'volume') {
                this.elements.audioMenuItemSelect.play();
                this.elements.audioMainTheme.volume = 0;
                this.values.isVolumeOn = false;
                this.elements.volume.classList.remove('volume');
                this.elements.volume.classList.add('volume_Off');
                this.elements.volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                this.elements.audioMainTheme.volume = 1;
                this.values.isVolumeOn = true;
                this.elements.volume.classList.remove('volume_Off');
                this.elements.volume.classList.add('volume');
                this.elements.volume.innerHTML = '<i class="fas fa-volume-up"></i>';
            }

        })


        // Help
        this.elements.help = document.createElement('div');
        this.elements.help.classList.add('help');
        this.elements.help.innerHTML = '<i class="fas fa-question-circle help-icon"></i>';
        this.elements.help.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.openHelpMenu();
        });


        // Moves
        this.elements.moves = document.createElement('div');
        this.elements.moves.classList.add('moves');
        this.elements.moves.textContent = `Moves: ${this.values.moves}`

        this.elements.pause.appendChild(this.elements.pauseBtn);
        this.elements.scoreboard.appendChild(this.elements.volume);
        this.elements.scoreboard.appendChild(this.elements.time);
        this.elements.scoreboard.appendChild(this.elements.pause);
        this.elements.scoreboard.appendChild(this.elements.moves);
        this.elements.scoreboard.appendChild(this.elements.help);
        this.elements.container.appendChild(this.elements.scoreboard);


        this.checkSettings();

        //Create main area for puzzles
        this.elements.mainArea = document.createElement("div");
        this.elements.mainArea.classList.add('main-area');
        this.elements.mainArea.style = `grid-template-columns: repeat(${this.values.dimension}, 1fr);`
        this.elements.container.appendChild(this.elements.mainArea);

        document.body.appendChild(this.elements.container);


        this.values.randomImageName = this.chooseRandomImage();
        this.initiateAudio();
        this.createSortedPuzzles();
        this.initiatePuzzles();
        this.initiateDragNDrop();
        this.openMenu();
        // keyElement.classList.toggle("someClass", this.bool);

    },

    openHelpMenu() {
        if (this.values.isVolumeOn) {
            this.elements.audioMenuItemSelect.play();
            this.elements.audioMenu.play();
            this.elements.audioMainTheme.pause();
            this.elements.audioMainTheme.currentTime = 0;
        }
        clearInterval(this.values.timerId)
        this.values.isPauseClicked = true;


        let helpMenu = document.createElement('div');
        helpMenu.classList.add('helpMenu');

        let helpMenuTitle = document.createElement('h3');
        helpMenuTitle.classList.add('helpMenuTitle');
        helpMenuTitle.textContent = 'Help';
        helpMenu.appendChild(helpMenuTitle);

        let helpText = document.createElement('h3');
        helpText.classList.add('helpText');
        helpText.textContent = 'You need to place the puzzles (tiles) in order as shown on the image below.'
        helpMenu.appendChild(helpText);

        let helpImage = document.createElement('div');
        helpImage.classList.add('helpImage');

        if (this.values.difficulty === 2 || this.values.difficulty === 3) {
            helpImage.style.backgroundImage = `url(src/assets/images/puzzle-images/${this.values.previousRandomImageName}.jpg)`
        } else if (this.values.difficulty === 1) {
            helpImage.style.backgroundImage = `url(src/assets/images/digits-${this.values.dimension}.png)`
        }

        helpMenu.appendChild(helpImage);


        const okBtn = document.createElement('button');
        okBtn.classList.add('okBtn');
        okBtn.textContent = 'Ok';
        helpMenu.appendChild(okBtn);

        this.elements.container.appendChild(helpMenu);

        okBtn.addEventListener('click', () => {
            this.values.isPauseClicked = false;
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play()
                this.elements.audioMenu.pause();
                this.elements.audioMenu.currentTime = 0;
                this.elements.audioMainTheme.play();
            }
            helpMenu.remove();
            this.updateTime();
        })

        okBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });
    },

    resetSettings() {

        localStorage.removeItem('settings');

        this.values.dimension = 4;
        this.values.isAnimation = true;
        this.values.difficulty = 3;
        this.elements.settingsMenu.remove();
        this.openSettingsMenu();
        this.saveSettings();

    },

    saveSettings() {
        this.values.dimension = Number(this.elements.boardSizeSelect.value.slice(0, 1));
        this.values.isAnimation = this.elements.moveAnimationCheckbox.checked;


        if (this.elements.difficultySelect.value === 'Digits') {
            this.values.difficulty = 1;
        } else if (this.elements.difficultySelect.value === 'Picture with digits') {
            this.values.difficulty = 2;
        } else if (this.elements.difficultySelect.value === 'Picture only') {
            this.values.difficulty = 3;
        }

        localStorage.setItem('settings',
            JSON.stringify({
                dimension: this.values.dimension,
                isAnimation: this.values.isAnimation,
                difficulty: this.values.difficulty,
            }))


        document.body.innerHTML = '';
        this.elements.settingsMenu.remove();
        this.values.isPauseClicked = false;
        this.values.isVolumeOn = true;
        this.init();
        this.openModal('Settings are successfully applied');
    },


    checkSettings() {
        let settingsFromLocalStorage = JSON.parse(localStorage.getItem('settings'));

        if (settingsFromLocalStorage) {
            this.values.dimension = settingsFromLocalStorage.dimension;
            this.values.isAnimation = settingsFromLocalStorage.isAnimation;
            this.values.difficulty = settingsFromLocalStorage.difficulty;
        }

    },


    openSettingsMenu() {

        this.elements.menu.style.display = 'none';

        this.elements.settingsMenu = document.createElement('div');
        this.elements.settingsMenu.classList.add('settingsMenu');


        let settingsMenuTitle = document.createElement('h3');
        settingsMenuTitle.classList.add('settingsMenuTitle');
        settingsMenuTitle.textContent = 'Settings';

        let boardSizeWrapper = document.createElement('div');
        boardSizeWrapper.classList.add('boardSizeWrapper');
        let boardSizeText = document.createElement('p');
        boardSizeText.classList.add('boardSizeText');
        boardSizeText.textContent = 'Board Size';
        this.elements.boardSizeSelect = document.createElement('select');
        this.elements.boardSizeSelect.classList.add('boardSizeSelect');

        let option1 = document.createElement('option');
        option1.classList.add('option');
        option1.textContent = '3x3';
        let option2 = document.createElement('option');
        option2.classList.add('option');
        option2.textContent = '4x4';
        let option3 = document.createElement('option');
        option3.classList.add('option');
        option3.textContent = '5x5';
        let option4 = document.createElement('option');
        option4.classList.add('option');
        option4.textContent = '6x6';
        let option5 = document.createElement('option');
        option5.classList.add('option');
        option5.textContent = '7x7';
        let option6 = document.createElement('option');
        option6.classList.add('option');
        option6.textContent = '8x8';


        boardSizeWrapper.appendChild(boardSizeText);
        this.elements.boardSizeSelect.appendChild(option1);
        this.elements.boardSizeSelect.appendChild(option2);
        this.elements.boardSizeSelect.appendChild(option3);
        this.elements.boardSizeSelect.appendChild(option4);
        this.elements.boardSizeSelect.appendChild(option5);
        this.elements.boardSizeSelect.appendChild(option6);
        boardSizeWrapper.appendChild(this.elements.boardSizeSelect);


        let boardSizeOptionValue = `${this.values.dimension}x${this.values.dimension}`;
        for (let i = 0; i < this.elements.boardSizeSelect.options.length; i++) {
            if (this.elements.boardSizeSelect.options[i].value === boardSizeOptionValue) {
                this.elements.boardSizeSelect.options[i].setAttribute('selected', '');
            }
        }


        let moveAnimationWrapper = document.createElement('div');
        moveAnimationWrapper.classList.add('moveAnimationWrapper');
        let moveAnimationText = document.createElement('p');
        moveAnimationText.classList.add('moveAnimationText');
        moveAnimationText.textContent = 'Move Animation';

        let moveAnimationLabel = document.createElement('label');
        moveAnimationLabel.classList.add('switch');
        this.elements.moveAnimationCheckbox = document.createElement('input');
        this.elements.moveAnimationCheckbox.type = 'checkbox';
        this.elements.moveAnimationCheckbox.classList.add('checkbox');
        this.elements.moveAnimationCheckbox.setAttribute('checked', '');
        let moveAnimationSpan = document.createElement('span');
        moveAnimationSpan.classList.add('slider', 'round');
        moveAnimationLabel.appendChild(this.elements.moveAnimationCheckbox)
        moveAnimationLabel.appendChild(moveAnimationSpan)

        moveAnimationWrapper.appendChild(moveAnimationText);
        moveAnimationWrapper.appendChild(moveAnimationLabel);

        this.elements.moveAnimationCheckbox.checked = this.values.isAnimation;

        let difficultyWrapper = document.createElement('div');
        difficultyWrapper.classList.add('difficultyWrapper');

        let difficultyText = document.createElement('p');
        difficultyText.classList.add('difficultyText');
        difficultyText.textContent = 'Difficulty';

        this.elements.difficultySelect = document.createElement('select');
        this.elements.difficultySelect.classList.add('difficultySelect');
        let difficultyOption1 = document.createElement('option');
        difficultyOption1.classList.add('option');
        difficultyOption1.textContent = 'Digits';
        let difficultyOption2 = document.createElement('option');
        difficultyOption2.classList.add('option');
        difficultyOption2.textContent = 'Picture with digits';
        let difficultyOption3 = document.createElement('option');
        difficultyOption3.classList.add('option');
        difficultyOption3.textContent = 'Picture only';

        this.elements.difficultySelect.appendChild(difficultyOption1);
        this.elements.difficultySelect.appendChild(difficultyOption2);
        this.elements.difficultySelect.appendChild(difficultyOption3);
        difficultyWrapper.appendChild(difficultyText);
        difficultyWrapper.appendChild(this.elements.difficultySelect);


        for (let i = 0; i < this.elements.difficultySelect.options.length; i++) {
            if (this.values.difficulty === 1) {
                this.elements.difficultySelect.options[0].setAttribute('selected', '');
            } else if (this.values.difficulty === 2) {
                this.elements.difficultySelect.options[1].setAttribute('selected', '');
            } else if (this.values.difficulty === 3) {
                this.elements.difficultySelect.options[2].setAttribute('selected', '');
            }
        }

        let buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add('buttonsWrapper');


        let saveBtn = document.createElement('button');
        saveBtn.classList.add('saveBtn');
        saveBtn.textContent = 'Save';

        saveBtn.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            setTimeout(() => {
                this.saveSettings();
            }, 500)

        });
        saveBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });

        let resetBtn = document.createElement('button');
        resetBtn.classList.add('resetBtn');
        resetBtn.textContent = 'Reset';
        resetBtn.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            setTimeout(() => {
                this.resetSettings();
            }, 500)

        });
        resetBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });

        buttonsWrapper.appendChild(saveBtn);
        buttonsWrapper.appendChild(resetBtn);


        this.elements.backButton = document.createElement('h3');
        this.elements.backButton.classList.add('backButton');
        this.elements.backButton.textContent = 'Back';
        this.elements.backButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.backToMenu(this.elements.settingsMenu);
        })
        this.elements.backButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        })


        this.elements.settingsMenu.appendChild(settingsMenuTitle);
        this.elements.settingsMenu.appendChild(boardSizeWrapper);
        this.elements.settingsMenu.appendChild(moveAnimationWrapper);
        this.elements.settingsMenu.appendChild(difficultyWrapper);
        this.elements.settingsMenu.appendChild(buttonsWrapper);
        this.elements.settingsMenu.appendChild(this.elements.backButton);
        this.elements.container.appendChild(this.elements.settingsMenu);


    }
    ,

    openRulesMenu() {
        this.elements.menu.style.display = 'none';


        this.elements.rulesMenu = document.createElement('div');
        this.elements.rulesMenu.classList.add('rulesMenu');

        let rulesMenuTitle = document.createElement('h3');
        rulesMenuTitle.classList.add('rulesMenuTitle');
        rulesMenuTitle.textContent = 'Game Rules';

        //Content
        const content = document.createElement('div');
        content.classList.add('content');

        const mainText = document.createElement('p');
        mainText.classList.add('mainText');
        mainText.textContent = 'The goal of the puzzle game is to place the puzzles (tiles) in order by making sliding moves that use the empty space.';

        const p1 = document.createElement('p');
        p1.classList.add('p1');
        p1.textContent = '1. You can enter the menu by pressing the "Pause" button.';

        const p2 = document.createElement('p');
        p2.classList.add('p2');
        p2.textContent = '2. You can Save your game and Load it later. (Max count is 10). Also you can remove the game.';

        const p3 = document.createElement('p');
        p3.classList.add('p3');
        p3.textContent = '3. You can see the top 10 results in "Best Scores" menu.';


        const p4 = document.createElement('p');
        p4.classList.add('p4');
        p4.textContent = '4. You can choose puzzle board size (from 3x3 to 8x8) in "Settings" menu.';

        const p5 = document.createElement('p');
        p5.classList.add('p5');
        p5.textContent = '5. You can turn off puzzles move animation in "Settings" menu.';

        const p6 = document.createElement('p');
        p6.classList.add('p6');
        p6.textContent = '6. You can choose type of puzzles in "Settings" menu (3 different levels).';

        const p7 = document.createElement('p');
        p7.classList.add('p7');
        p7.textContent = '7. You can turn off sound in Main panel. See volume icon.';

        const p8 = document.createElement('p');
        p8.classList.add('p8');
        p8.textContent = '8. If you choose "Only picture" mode  you can click on "Question" icon in Main panel and see full image which you need to have.';

        const p9 = document.createElement('p');
        p9.classList.add('p9');
        p9.textContent = '9. If you don\'t know how to place puzzles in order -  You can "Finish" game and see how puzzles move to their positions with animation.';

        const p10 = document.createElement('p');
        p10.classList.add('p10');
        p10.textContent = '10. If you win you can see congratulations text and listen enjoyable melody.';


        content.appendChild(mainText);
        content.appendChild(p1);
        content.appendChild(p2);
        content.appendChild(p3);
        content.appendChild(p4);
        content.appendChild(p5);
        content.appendChild(p6);
        content.appendChild(p7);
        content.appendChild(p8);
        content.appendChild(p9);
        content.appendChild(p10);

        this.elements.backButton = document.createElement('h3');
        this.elements.backButton.classList.add('backButton');
        this.elements.backButton.textContent = 'Back';
        this.elements.backButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.backToMenu(this.elements.rulesMenu);
        })

        this.elements.backButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        })


        this.elements.rulesMenu.appendChild(rulesMenuTitle);
        this.elements.rulesMenu.appendChild(content);
        this.elements.rulesMenu.appendChild(this.elements.backButton);
        this.elements.container.appendChild(this.elements.rulesMenu);


    }
    ,

    backToMenu(currentMenu) {

        currentMenu.remove();
        this.elements.menu.style.display = 'flex';
        // this.openMenu();
    }
    ,

    openBestScoresMenu() {

        // Take best scores from local storage
        let bestScores = JSON.parse(localStorage.getItem('bestScores'))

        if (bestScores) {
            this.values.bestScores = bestScores
        }


        // Create best scores Menu
        this.elements.menu.style.display = 'none'


        this.elements.bestScoresMenu = document.createElement('div');
        this.elements.bestScoresMenu.classList.add('bestScoresMenu');

        let bestScoresMenuTitle = document.createElement('h3');
        bestScoresMenuTitle.classList.add('bestScoresMenuTitle');
        bestScoresMenuTitle.textContent = 'Best Scores'

        let bestScoresMenuGrid = document.createElement('div');
        bestScoresMenuGrid.classList.add('bestScoresMenuGrid');

        let bestScoresMenuGridID = document.createElement('div');
        bestScoresMenuGridID.classList.add('bestScoresMenuGridID');
        bestScoresMenuGridID.textContent = 'Id'
        let bestScoresMenuGridBoardSize = document.createElement('div');
        bestScoresMenuGridBoardSize.classList.add('bestScoresMenuGridBoardSize');
        bestScoresMenuGridBoardSize.textContent = 'Size'
        let bestScoresMenuGridTime = document.createElement('div');
        bestScoresMenuGridTime.classList.add('bestScoresMenuGridTime');
        bestScoresMenuGridTime.textContent = 'Time'
        let bestScoresMenuGridMoves = document.createElement('div');
        bestScoresMenuGridMoves.classList.add('bestScoresMenuGridMoves');
        bestScoresMenuGridMoves.textContent = 'Moves'

        this.elements.clearBestScoresBtn = document.createElement('button');
        this.elements.clearBestScoresBtn.classList.add('clearBestScoresBtn');
        this.elements.clearBestScoresBtn.textContent = `Clear all`;
        this.elements.clearBestScoresBtn.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            localStorage.removeItem('bestScores');
            this.values.bestScores = [];
            this.elements.bestScoresMenu.remove();
            this.openBestScoresMenu();
        });
        this.elements.clearBestScoresBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });

        this.elements.backButton = document.createElement('h3');
        this.elements.backButton.classList.add('backButton');
        this.elements.backButton.textContent = 'Back';
        this.elements.backButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.backToMenu(this.elements.bestScoresMenu);
        });

        this.elements.backButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });


        bestScoresMenuGrid.appendChild(bestScoresMenuGridID);
        bestScoresMenuGrid.appendChild(bestScoresMenuGridBoardSize);
        bestScoresMenuGrid.appendChild(bestScoresMenuGridTime);
        bestScoresMenuGrid.appendChild(bestScoresMenuGridMoves);
        this.elements.bestScoresMenu.appendChild(bestScoresMenuTitle);
        this.elements.bestScoresMenu.appendChild(bestScoresMenuGrid);
        this.elements.bestScoresMenu.appendChild(this.elements.clearBestScoresBtn);
        this.elements.bestScoresMenu.appendChild(this.elements.backButton);
        this.elements.container.appendChild(this.elements.bestScoresMenu);


        // Render data from local storage in Menu

        if (this.values.bestScores.length) {

            for (let i = 0; i < this.values.bestScores.length; i++) {

                let id = document.createElement('div');
                id.classList.add('bestScoresMenuGridID');
                id.textContent = `${i + 1}`
                let size = document.createElement('div');
                size.classList.add('bestScoresMenuGridBoardSize');
                size.textContent = `${this.values.bestScores[i].boardSize}x${this.values.bestScores[i].boardSize}`
                let time = document.createElement('div');
                time.classList.add('bestScoresMenuGridTime');
                time.textContent = `${this.values.bestScores[i].time}`;
                let moves = document.createElement('div');
                moves.classList.add('bestScoresMenuGridMoves');
                moves.textContent = `${this.values.bestScores[i].movesCount}`;

                let grid = document.querySelector('.bestScoresMenuGrid')

                grid.appendChild(id);
                grid.appendChild(size);
                grid.appendChild(time);
                grid.appendChild(moves);
                this.elements.bestScoresMenu.appendChild(bestScoresMenuGrid);
            }

            bestScoresMenuGrid.style.gridTemplateRows = `repeat(${this.values.bestScores.length + 1}, 1fr)`
        } else {
            // bestScoresMenuGrid.style.gridTemplateRows = `repeat(${1}, 1fr)`;
            // bestScoresMenuGrid.style.display = 'none';
            // this.elements.clearBestScoresBtn.style.display = 'none';
            // let noResults = document.createElement('h3');
            // noResults.classList.add('noResults');
            // noResults.textContent = `No Results`;
            // this.elements.bestScoresMenu.appendChild(noResults);

            this.elements.bestScoresMenu.remove();
            this.openModal('You don\'t have any results yet')
        }

    }
    ,

    loadGame() {
        this.values.isLoad = true;

        // this.elements.mainArea.remove();

        // Update time
        this.values.time = this.values.savedGames[this.values.currentScreenShotId].time;
        this.values.seconds = this.values.savedGames[this.values.currentScreenShotId].seconds;
        this.values.minutes = this.values.savedGames[this.values.currentScreenShotId].minutes;
        this.elements.time.textContent = `Time:${this.values.time}`;


        //Update moves
        this.values.moves = this.values.savedGames[this.values.currentScreenShotId].moves;
        this.elements.moves.textContent = `Moves: ${this.values.moves}`;

        // background Image
        this.values.randomImageName = this.values.savedGames[this.values.currentScreenShotId].backgroundImageName

        // dimension
        this.values.dimension = this.values.savedGames[this.values.currentScreenShotId].dimension

        this.elements.mainArea.style = `grid-template-columns: repeat(${this.values.dimension}, 1fr);`

        this.values.isPauseClicked = false;
        this.createRandomPuzzles();
        this.initiatePuzzles();
        this.initiateDragNDrop();
        this.startGame();
        this.elements.savedGamesMenu.remove();

        this.elements.audioMenu.pause();
        this.elements.audioMenu.currentTime = 0;
        if (this.values.isVolumeOn) {
            this.elements.audioMainTheme.play();
        }


        this.values.isLoad = false;
        this.values.currentScreenShotId = 0;
    },

    openModal(text) {
        this.elements.menu.style.display = 'none'

        if (this.elements.savedGamesMenu) {
            this.elements.savedGamesMenu.remove()
        }

        this.elements.savedGamesMenu = document.createElement('div');
        this.elements.savedGamesMenu.classList.add('savedGamesMenu');
        this.elements.savedGamesMenu.style.justifyContent = 'center'

        let noSavedGamesText = document.createElement('h3');
        noSavedGamesText.classList.add('noSavedGamesText');
        noSavedGamesText.textContent = text;
        this.elements.savedGamesMenu.appendChild(noSavedGamesText);

        const noSavedGamesModalButton = document.createElement('button');
        noSavedGamesModalButton.classList.add('noSavedGamesModalButton');
        noSavedGamesModalButton.textContent = 'Ok';
        this.elements.savedGamesMenu.appendChild(noSavedGamesModalButton);

        this.elements.container.appendChild(this.elements.savedGamesMenu);

        noSavedGamesModalButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.elements.savedGamesMenu.remove();
            this.openMenu();
        });
        noSavedGamesModalButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });


    },

    removeGame() {

        let removedScreenShot = this.elements.screenShots.find((el) => {
            return Number(el.id) === this.values.currentScreenShotId
        })


        this.elements.screenShots = this.elements.screenShots.filter((el) => {
            return Number(el.id) !== this.values.currentScreenShotId
        })

        this.values.savedGames = this.values.savedGames.filter((el, index) => {
            if (index !== this.values.currentScreenShotId) {
                return el
            }
        })


        if (this.values.currentScreenShotId !== 0 && this.values.currentScreenShotId !== this.elements.screenShots.length - 1) {
            this.values.currentScreenShotId--;
        }


        if (this.values.savedGames.length !== 0) {

            removedScreenShot.replaceWith(this.elements.screenShots[this.values.currentScreenShotId]);

            for (let i = 0; i < this.elements.screenShots.length; i++) {
                this.elements.screenShots[i].id = i;
            }
            this.elements.savedGamesMenuTitle.textContent =
                `Saved Games: ${this.values.currentScreenShotId + 1}/${this.values.savedGames.length}`;


            if (this.values.currentScreenShotId === 0) {
                this.elements.angleLeft.style.opacity = '0.4';
            }
            if (this.values.currentScreenShotId === this.values.savedGames.length - 1) {
                this.elements.angleRight.style.opacity = '0.4';
            }


        } else {
            this.openModal(`All saved games are successfully removed`)
        }

        localStorage.removeItem('savedGames')
        localStorage.setItem('savedGames', JSON.stringify(this.values.savedGames))


    },


    toggleSlider(direction) {

        if (direction === 'right' && this.values.currentScreenShotId < this.values.savedGames.length - 1) {

            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play()
            }


            this.elements.screenShots[Number(this.values.currentScreenShotId)]
                .replaceWith(this.elements.screenShots[Number(this.values.currentScreenShotId) + 1]);
            this.values.currentScreenShotId++;

            if (this.values.currentScreenShotId === this.values.savedGames.length - 1) {
                this.elements.angleRight.style.opacity = '0.4'
            }
            if (this.values.currentScreenShotId > 0) {
                this.elements.angleLeft.style.opacity = '1'
            }

        }
        if (direction === 'left' && this.values.currentScreenShotId > 0) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play()
            }

            this.elements.screenShots[Number(this.values.currentScreenShotId)]
                .replaceWith(this.elements.screenShots[Number(this.values.currentScreenShotId) - 1]);
            this.values.currentScreenShotId--;

            if (this.values.currentScreenShotId < this.values.savedGames.length - 1) {
                this.elements.angleRight.style.opacity = '1'
            }
            if (this.values.currentScreenShotId === 0) {
                this.elements.angleLeft.style.opacity = '0.4'
            }
        }

        this.elements.savedGamesMenuTitle.textContent =
            `Saved Games: ${this.values.currentScreenShotId + 1}/${this.values.savedGames.length}`

    }
    ,


    openSavedGamesMenu() {

        this.values.savedGames = JSON.parse(localStorage.getItem('savedGames'))


        // Modal window appears if no existing saved games
        if (!this.values.savedGames.length) {

            this.openModal(`You don't have any saved games`)

            return
        }

        this.elements.menu.style.display = 'none'

        this.elements.savedGamesMenu = document.createElement('div');
        this.elements.savedGamesMenu.classList.add('savedGamesMenu');
        this.elements.savedGamesMenu.style.justifyContent = 'space-evenly'

        this.elements.savedGamesMenuTitleWrapper = document.createElement('div');
        this.elements.savedGamesMenuTitleWrapper.classList.add('savedGamesMenuTitleWrapper');
        this.elements.savedGamesMenuTitle = document.createElement('h3');
        this.elements.savedGamesMenuTitle.classList.add('savedGamesMenuTitle');
        this.elements.savedGamesMenuTitle.textContent = `Saved Games: ${this.values.currentScreenShotId + 1}/${this.values.savedGames.length}`

        this.elements.savedGamesMenuTitleWrapper.appendChild(this.elements.savedGamesMenuTitle);
        this.elements.savedGamesMenu.appendChild(this.elements.savedGamesMenuTitleWrapper);

        for (let i = 0; i < this.values.savedGames.length; i++) {

            this.elements.screenShots[i] = document.createElement('div');
            this.elements.screenShots[i].classList.add('screen');
            this.elements.screenShots[i].id = i;
            // insert screen into Saved Games Menu
            this.elements.screenShots[i].insertAdjacentHTML('afterBegin', this.values.savedGames[i].screenShot);

        }


        this.elements.slider = document.createElement('div');
        this.elements.slider.classList.add('slider');

        this.elements.angleLeft = document.createElement('div');
        this.elements.angleLeft.classList.add('angles', 'angle-left');
        this.elements.angleLeft.innerHTML = '<i class="fas fa-chevron-left"></i>';
        this.elements.angleLeft.addEventListener('click', () => {
            this.toggleSlider('left')
        })
        this.elements.slider.appendChild(this.elements.angleLeft);

        this.elements.slider.appendChild(this.elements.screenShots[0]);

        this.elements.angleRight = document.createElement('div')
        this.elements.angleRight.innerHTML = '<i class="fas fa-chevron-right"></i>';
        this.elements.angleRight.classList.add('angles', 'angle-right');
        this.elements.angleRight.addEventListener('click', () => {
            this.toggleSlider('right')
        })
        this.elements.slider.appendChild(this.elements.angleRight);


        if (this.values.savedGames.length === 1) {
            this.elements.angleRight.style.opacity = '0.4';
            this.elements.angleLeft.style.opacity = '0.4';
        }


        this.elements.savedGamesMenuButtonsWrapper = document.createElement('div');
        this.elements.savedGamesMenuButtonsWrapper.classList.add('savedGamesMenuButtonsWrapper');

        this.elements.loadButton = document.createElement('button');
        this.elements.loadButton.classList.add('loadButton');
        this.elements.loadButton.textContent = `Load`;
        this.elements.loadButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.loadGame();
        });
        this.elements.loadButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });
        this.elements.savedGamesMenuButtonsWrapper.appendChild(this.elements.loadButton);


        this.elements.removeButton = document.createElement('button');
        this.elements.removeButton.classList.add('removeButton');
        this.elements.removeButton.textContent = 'Remove';
        this.elements.removeButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.removeGame();
        });
        this.elements.removeButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });
        this.elements.savedGamesMenuButtonsWrapper.appendChild(this.elements.removeButton);


        // Back button
        this.elements.backButton = document.createElement('h3');
        this.elements.backButton.classList.add('backButton');
        this.elements.backButton.textContent = 'Back';
        this.elements.backButton.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.backToMenu(this.elements.savedGamesMenu);
        });
        this.elements.backButton.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });


        this.elements.savedGamesMenu.appendChild(this.elements.slider);
        this.elements.savedGamesMenu.appendChild(this.elements.savedGamesMenuButtonsWrapper);
        this.elements.savedGamesMenu.appendChild(this.elements.backButton);
        this.elements.container.appendChild(this.elements.savedGamesMenu);


    }
    ,

    animateSwapping(direction, shiftedElementIndex, emptyElementIndex) {
        let i = 0;
        const puzzleHeight = this.elements.puzzles[shiftedElementIndex].clientHeight;
        const puzzleWidth = this.elements.puzzles[shiftedElementIndex].clientWidth;


        if (direction === 'top') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleHeight + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.bottom = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.top = `${i}px`;
                    // Animation step
                    i += 2;

                } else {
                    clearInterval(timerId)

                    this.elements.puzzles[shiftedElementIndex].style.bottom = `auto`;
                    this.elements.puzzles[emptyElementIndex].style.top = `auto`;

                    // swap puzzles places
                    const extra = this.elements.puzzles[shiftedElementIndex];
                    this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
                    this.elements.puzzles[emptyElementIndex] = extra;

                    //clean and rerender of mainArea
                    this.elements.mainArea.innerHTML = '';
                    this.elements.puzzles.forEach((el) => {
                        this.elements.mainArea.appendChild(el);
                    })

                    this.checkpuzzlesIndexesOrder();
                }
            }, 5)

        } else if (direction === 'bottom') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleHeight + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.top = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.bottom = `${i}px`;
                    // Animation step
                    i += 2;

                } else {
                    clearInterval(timerId)

                    this.elements.puzzles[shiftedElementIndex].style.top = `auto`;
                    this.elements.puzzles[emptyElementIndex].style.bottom = `auto`;

                    // swap puzzles places
                    const extra = this.elements.puzzles[shiftedElementIndex];
                    this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
                    this.elements.puzzles[emptyElementIndex] = extra;

                    //clean and rerender of mainArea
                    this.elements.mainArea.innerHTML = '';
                    this.elements.puzzles.forEach((el) => {
                        this.elements.mainArea.appendChild(el);
                    })

                    this.checkpuzzlesIndexesOrder();
                }
            }, 5)
        } else if (direction === 'right') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleWidth + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.left = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.right = `${i}px`;
                    // Animation step
                    i += 2;

                } else {
                    clearInterval(timerId)

                    this.elements.puzzles[shiftedElementIndex].style.left = `auto`;
                    this.elements.puzzles[emptyElementIndex].style.right = `auto`;

                    // swap puzzles places
                    const extra = this.elements.puzzles[shiftedElementIndex];
                    this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
                    this.elements.puzzles[emptyElementIndex] = extra;

                    //clean and rerender of mainArea
                    this.elements.mainArea.innerHTML = '';
                    this.elements.puzzles.forEach((el) => {
                        this.elements.mainArea.appendChild(el);
                    })

                    this.checkpuzzlesIndexesOrder();
                }
            }, 5)
        } else if (direction === 'left') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleWidth + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.right = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.left = `${i}px`;
                    // Animation step
                    i += 2;

                } else {
                    clearInterval(timerId)

                    this.elements.puzzles[shiftedElementIndex].style.right = `auto`;
                    this.elements.puzzles[emptyElementIndex].style.left = `auto`;

                    // swap puzzles places
                    const extra = this.elements.puzzles[shiftedElementIndex];
                    this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
                    this.elements.puzzles[emptyElementIndex] = extra;

                    //clean and rerender of mainArea
                    this.elements.mainArea.innerHTML = '';
                    this.elements.puzzles.forEach((el) => {
                        this.elements.mainArea.appendChild(el);
                    })

                    this.checkpuzzlesIndexesOrder();
                }
            }, 5)
        }

    }
    ,


    chooseRandomImage() {
        let min = 1;
        let max = 150;
        let randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
        return randomNumber
    }
    ,


    checkpuzzlesIndexesOrder() {
        if (this.elements.puzzles.every((el, ind) => Number(el.id) === ind + 1)) {

            clearInterval(this.values.timerId);
            this.elements.audioMainTheme.pause();
            this.elements.audioMainTheme.currentTime = 0;


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


            // Best Scores record
            let bestScores = JSON.parse(localStorage.getItem('bestScores'))

            if (bestScores) {
                this.values.bestScores = bestScores
            }


            if (this.values.bestScores.length === this.values.maxBestScoresCount) {

                let movesCountArray = this.values.bestScores.map(el => el.movesCount)
                let worstResult = Math.max(...movesCountArray)
                let worstResultIndex = this.values.bestScores.findIndex(el => el.movesCount === worstResult)


                if (this.values.moves < this.values.bestScores[worstResultIndex].movesCount) {
                    this.values.bestScores[worstResultIndex] =
                        {
                            time: this.values.time,
                            movesCount: this.values.moves,
                            boardSize: this.values.dimension,
                        }
                }


            } else if (this.values.bestScores.length < this.values.maxBestScoresCount) {

                this.values.bestScores = [
                    ...this.values.bestScores,
                    {
                        time: this.values.time,
                        movesCount: this.values.moves,
                        boardSize: this.values.dimension,
                    }
                ]

            }

            // Sort by moves count
            for (let i = 0; i < this.values.bestScores.length - 1; i++) {
                for (let j = 0; j < this.values.bestScores.length - 1 - i; j++) {
                    if (this.values.bestScores[j].movesCount > this.values.bestScores[j + 1].movesCount) {
                        let extra = this.values.bestScores[j].movesCount;
                        this.values.bestScores[j].movesCount = this.values.bestScores[j + 1].movesCount;
                        this.values.bestScores[j + 1].movesCount = extra;
                    }

                }
            }

            localStorage.removeItem('bestScores');
            localStorage.setItem('bestScores', JSON.stringify(this.values.bestScores));


            winMenuBtn.addEventListener('click', () => {
                this.elements.winMenu.remove();
                this.elements.audioWin.pause();
                this.elements.audioWin.currentTime = 0;
                this.elements.audioMenu.play();

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
    }
    ,
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
        audioDragMoveSource.src = 'src/assets/sounds/DragMove.mp3';
        this.elements.audioDragMove.appendChild(audioDragMoveSource);
        document.body.appendChild(this.elements.audioDragMove);

        // Sound for win
        this.elements.audioWin = document.createElement('audio');
        this.elements.audioWin.classList.add('audioWin');
        let audioWinSource = document.createElement('source');
        audioWinSource.src = 'src/assets/sounds/Win.mp3';
        this.elements.audioWin.appendChild(audioWinSource);
        document.body.appendChild(this.elements.audioWin);


        // Move sound for animation
        this.elements.audioMoveAnimation = document.createElement('audio');
        this.elements.audioMoveAnimation.classList.add('audioMoveAnimation');
        let audioMoveAnimationSource = document.createElement('source');
        audioMoveAnimationSource.src = 'src/assets/sounds/Move-animation.mp3';
        this.elements.audioMoveAnimation.appendChild(audioMoveAnimationSource);
        document.body.appendChild(this.elements.audioMoveAnimation);

        // Sound for menu item hover
        this.elements.audioMenuItemHover = document.createElement('audio');
        this.elements.audioMenuItemHover.classList.add('audioMenuItemHover');
        let audioMenuItemHoverSource = document.createElement('source');
        audioMenuItemHoverSource.src = 'src/assets/sounds/Hover-menu-item.mp3';
        this.elements.audioMenuItemHover.appendChild(audioMenuItemHoverSource);
        // this.elements.audioMenuItemHover.setAttribute("autoplay", "");
        // this.elements.audioMenuItemHover.setAttribute("muted", "muted");
        document.body.appendChild(this.elements.audioMenuItemHover);


        // Sound for menu item click
        this.elements.audioMenuItemSelect = document.createElement('audio');
        this.elements.audioMenuItemSelect.classList.add('audioMenuItemSelect');
        let audioMenuItemSelectSource = document.createElement('source');
        audioMenuItemSelectSource.src = 'src/assets/sounds/Select-menu-item.mp3';
        this.elements.audioMenuItemSelect.appendChild(audioMenuItemSelectSource);
        document.body.appendChild(this.elements.audioMenuItemSelect);

        // Sound for menu item click
        this.elements.audioMenu = document.createElement('audio');
        this.elements.audioMenu.classList.add('audioMenu');
        let audioMenuSource = document.createElement('source');
        audioMenuSource.src = 'src/assets/sounds/Menu.mp3';

        if (this.values.isVolumeOn) {
            this.elements.audioMenu.setAttribute('autoplay', '')
        }

        this.elements.audioMenu.appendChild(audioMenuSource);
        this.elements.audioMenu.setAttribute("loop", "");
        document.body.appendChild(this.elements.audioMenu);


        //    Main theme audio
        let min = 1;
        let max = 7;
        let randomMainThemeAudio = Math.floor(min + Math.random() * (max + 1 - min));
        this.elements.audioMainTheme = document.createElement('audio');
        this.elements.audioMainTheme.classList.add('audioMainTheme');
        let audioMainThemeSource = document.createElement('source');
        audioMainThemeSource.src = `src/assets/sounds/main-theme/${randomMainThemeAudio}.mp3`;


        this.elements.audioMainTheme.appendChild(audioMainThemeSource);
        this.elements.audioMainTheme.setAttribute("loop", "");
        document.body.appendChild(this.elements.audioMainTheme);


    }
    ,
    initiatePuzzles() {
        for (let val of this.elements.puzzles) {
            val.addEventListener('click', () => {
                if (val.className === 'puzzle') {
                    this.swapPuzzles(val);
                }
            })
            if (val.className === 'puzzle') {
                val.setAttribute('draggable', true);
            }
        }
    }
    ,
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
        this.values.previousRandomImageName = this.values.randomImageName;
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
        this.elements.continueGameBtn.addEventListener('mouseover', () => {

            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play()
            }

        })
        this.elements.continueGameBtn.addEventListener('click', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play()
                this.elements.audioMenu.pause();
                this.elements.audioMenu.currentTime = 0;
                this.elements.audioMainTheme.play();
            }
            this.values.isPauseClicked = false;

            // this.startGame();

            this.elements.menu.remove();
            this.updateTime();
        })

        this.elements.newGameBtn = document.createElement("h3");
        this.elements.newGameBtn.classList.add('newGameBtn', 'menu-item');
        this.elements.newGameBtn.textContent = `New Game`;
        this.elements.newGameBtn.addEventListener('mouseover', () => {
            // && this.values.isPauseClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            //if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
                // let promise = this.elements.audioMenuItemHover.play();
                // if (promise !== undefined) {
                //     promise.then(res => {
                //
                //     }).catch(error => {
                //         console.log(error.message)
                //         // Autoplay was prevented.
                //         // Show a "Play" button so that user can start playback.
                //     });
                // }
            }

        })
        this.elements.newGameBtn.addEventListener('click', () => {


            this.values.isMenuItemClicked = true;
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
                this.elements.audioMenu.pause();
                this.elements.audioMenu.currentTime = 0;
            }

            if (this.values.isPauseClicked) {
                let min = 1;
                let max = 7;
                let randomMainThemeAudio = Math.floor(min + Math.random() * (max + 1 - min));

                this.elements.audioMainTheme.remove()
                this.elements.audioMainTheme = document.createElement('audio');
                this.elements.audioMainTheme.classList.add('audioMainTheme');
                let audioMainThemeSource = document.createElement('source');
                audioMainThemeSource.src = `src/assets/sounds/main-theme/${randomMainThemeAudio}.mp3`;
                this.elements.audioMainTheme.appendChild(audioMainThemeSource);
                this.elements.audioMainTheme.setAttribute("loop", "");
                document.body.appendChild(this.elements.audioMainTheme);
            }
            if (this.values.isVolumeOn) {
                this.elements.audioMainTheme.play();
                this.elements.audioMainTheme.volume = 1;
            } else {
                this.elements.audioMainTheme.volume = 0;
                this.elements.audioMainTheme.play();
            }

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
        this.elements.saveGameBtn.addEventListener('mouseover', () => {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }

        })

        this.elements.saveGameBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true;

            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }

            let savedGames = JSON.parse(localStorage.getItem('savedGames'));

            if (savedGames) {
                this.values.savedGames = savedGames;
            }

            if (this.values.savedGames.length < this.values.maxSavedGamesCount) {


                this.elements.screenShot = this.elements.container.cloneNode(true);
                let puzzlesIndexesOrder = this.elements.puzzles
                    .map(el => Number(el.id) - 1)


                this.values.savedGames = [
                    ...this.values.savedGames,
                    {
                        time: this.values.time,
                        minutes: this.values.minutes,
                        seconds: this.values.seconds,
                        moves: this.values.moves,
                        screenShot: this.elements.screenShot.innerHTML,
                        puzzlesIndexesOrder: puzzlesIndexesOrder,
                        dimension: this.values.dimension,
                        backgroundImageName: this.values.previousRandomImageName
                    }
                ];

                localStorage.removeItem('savedGames');
                localStorage.setItem('savedGames', JSON.stringify(gemPuzzle.values.savedGames));

                this.openModal(`The game was saved successfully`)

            } else {
                this.openModal(`Max saved games count should not exceed ${this.values.maxSavedGamesCount}`)
            }
            // this.elements.menu.style.display = 'none'


        })

        this.elements.savedGamesBtn = document.createElement("h3");
        this.elements.savedGamesBtn.classList.add('savedGamesBtn', 'menu-item',);
        this.elements.savedGamesBtn.textContent = `Saved Games`;
        this.elements.savedGamesBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            //if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.savedGamesBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true;
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }

            this.openSavedGamesMenu();
        })

        this.elements.bestScoresBtn = document.createElement("h3");
        this.elements.bestScoresBtn.classList.add('bestScoresBtn', 'menu-item');
        this.elements.bestScoresBtn.textContent = `Best Scores`;
        this.elements.bestScoresBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            //if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.bestScoresBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true;
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }

            this.openBestScoresMenu();

        })

        this.elements.rulesGameBtn = document.createElement("h3");
        this.elements.rulesGameBtn.classList.add('rulesGameBtn', 'menu-item');
        this.elements.rulesGameBtn.textContent = `Game Rules`;
        this.elements.rulesGameBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            //if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.rulesGameBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }

            this.openRulesMenu();
        })

        this.elements.settingsBtn = document.createElement("h3");
        this.elements.settingsBtn.classList.add('settingsBtn', 'menu-item');
        this.elements.settingsBtn.textContent = `Settings`;
        this.elements.settingsBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            // if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemHover.play();
            }
        });
        this.elements.settingsBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
            this.openSettingsMenu();
        });


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

        //  this.elements.container.appendChild(this.elements.menu);
        document.body.appendChild(this.elements.menu);
    }
    ,


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

            if (gemPuzzle.values.isVolumeOn) {
                gemPuzzle.elements.audioDragMove.play();
            }


            gemPuzzle.checkpuzzlesIndexesOrder();

        }

        emptyElement.addEventListener('drop', dragDrop);
    }
    ,
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

            if (this.values.isAnimation) {

                switch (shiftedElementIndex) {
                    case (emptyElementIndex + this.values.dimension): {
                        this.animateSwapping('top', shiftedElementIndex, emptyElementIndex);
                        break;
                    }
                    case (emptyElementIndex - this.values.dimension): {
                        this.animateSwapping('bottom', shiftedElementIndex, emptyElementIndex);
                        break;
                    }
                    case (emptyElementIndex + 1): {
                        this.animateSwapping('left', shiftedElementIndex, emptyElementIndex);
                        break;
                    }
                    case (emptyElementIndex - 1): {
                        this.animateSwapping('right', shiftedElementIndex, emptyElementIndex);
                        break;
                    }
                }


            } else {
                // swap elements
                const extra = this.elements.puzzles[shiftedElementIndex];
                this.elements.puzzles[shiftedElementIndex] = this.elements.puzzles[emptyElementIndex];
                this.elements.puzzles[emptyElementIndex] = extra;

                //clean and rerender of mainArea
                this.elements.mainArea.innerHTML = '';
                this.elements.puzzles.forEach((el) => {
                    this.elements.mainArea.appendChild(el);
                })
            }


            this.values.moves++;
            this.elements.moves.textContent = `Moves: ${this.values.moves}`;

            if (this.values.isVolumeOn && this.values.isAnimation) {
                this.elements.audioMoveAnimation.play();
            } else if (this.values.isVolumeOn) {
                this.elements.audioMove.play();
            }


            if (!this.values.isAnimation) {
                this.checkpuzzlesIndexesOrder();
            }


        }
    }
    ,
    createRandomPuzzles() {
        // Reset order board of puzzles
        this.elements.mainArea.innerHTML = '';
        this.elements.puzzles = [];

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

        if (this.values.isLoad) {
            randomIndexes = this.values.savedGames[this.values.currentScreenShotId].puzzlesIndexesOrder

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


                if (this.values.difficulty === 1 || this.values.difficulty === 2) {
                    this.elements.puzzles[i].textContent = randomIndexes[i] + 1;
                }

                if (this.values.difficulty === 2 || this.values.difficulty === 3) {
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

            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);


        }
    }
    ,

    createSortedPuzzles() {
        for (let i = 0; i < this.values.dimension * this.values.dimension; i++) {
            this.elements.puzzles[i] = document.createElement("div");
            this.elements.puzzles[i].id = i + 1;
            if (i !== this.values.dimension * this.values.dimension - 1) {
                this.elements.puzzles[i].classList.add('puzzle');

                if (this.values.difficulty === 1 || this.values.difficulty === 2) {
                    this.elements.puzzles[i].textContent = i + 1;
                }


                if (this.values.difficulty === 2 || this.values.difficulty === 3) {
                    // Assemble of image
                    this.elements.puzzles[i].style.backgroundImage = `url('src/assets/images/puzzle-images/${this.values.randomImageName}.jpg')`;
                    this.elements.puzzles[i].style.backgroundRepeat = `no-repeat`;
                    const puzzleWidth = this.elements.mainArea.clientWidth / this.values.dimension;
                    const puzzleHeight = this.elements.mainArea.clientHeight / this.values.dimension;
                    const left = puzzleWidth * (i % this.values.dimension);
                    const top = puzzleHeight * Math.floor((i / this.values.dimension));
                    this.elements.puzzles[i].style.backgroundSize = `${this.elements.mainArea.clientWidth}px ${this.elements.mainArea.clientHeight}px`;
                    this.elements.puzzles[i].style.backgroundPosition = `-${left}px -${top}px`;
                }


            } else {
                this.elements.puzzles[i].classList.add('empty');
            }
            this.elements.mainArea.appendChild(this.elements.puzzles[i]);
        }
    }
    ,

}


window.onload = () => {
    if (!gemPuzzle.values.isFirstLoad) {
        gemPuzzle.init();
        gemPuzzle.values.isFirstLoad = true;
    }

}
