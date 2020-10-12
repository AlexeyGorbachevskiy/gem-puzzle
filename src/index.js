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
        soundBtn: '',
        settingsBtn: '',

        savedGamesMenu: '',
        savedGamesMenuTitle: '',
        savedGamesMenuButtonsWrapper: '',
        loadButton: '',
        removeButton: '',

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
        puzzlesForLocalStorage: '',
        slider: '',
        angleLeft: '',
        angleRight: '',


    },
    values: {
        dimension: 4,
        moves: 0,
        timerId: '',
        time: `00:00`,
        minutes: 0,
        seconds: 0,
        isPauseClicked: false,
        isVolumeOn: false,
        isAnimation: true,
        // for autoplay policy
        isMenuItemClicked: false,
        randomImageName: '',
        maxSavedGamesCount: 10,

        savedGames: [],
        currentScreenShotId: 0,

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
            this.elements.savedGamesMenu.remove();
            this.openMenu();
        })
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

            console.log(this.elements.screenShots.length)
            console.log(this.values.savedGames.length )
            console.log(this.values.currentScreenShotId)



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


    //TODO
    toggleSlider(direction) {

        if (direction === 'right' && this.values.currentScreenShotId < this.values.savedGames.length - 1) {
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

    },


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


        //TODO
        // Load and Remove buttons


        this.elements.savedGamesMenuButtonsWrapper = document.createElement('div');
        this.elements.savedGamesMenuButtonsWrapper.classList.add('savedGamesMenuButtonsWrapper');

        this.elements.loadButton = document.createElement('button');
        this.elements.loadButton.classList.add('loadButton');
        this.elements.loadButton.textContent = `Load`;
        this.elements.savedGamesMenuButtonsWrapper.appendChild(this.elements.loadButton);


        this.elements.removeButton = document.createElement('button');
        this.elements.removeButton.classList.add('removeButton');
        this.elements.removeButton.textContent = 'Remove';
        this.elements.removeButton.addEventListener('click', () => {
            this.removeGame();
        })
        this.elements.savedGamesMenuButtonsWrapper.appendChild(this.elements.removeButton);


        // Back button
        this.elements.backButton = document.createElement('h3');
        this.elements.backButton.classList.add('backButton');
        this.elements.backButton.textContent = 'Back';

        this.elements.savedGamesMenu.appendChild(this.elements.slider);
        this.elements.savedGamesMenu.appendChild(this.elements.savedGamesMenuButtonsWrapper);
        this.elements.savedGamesMenu.appendChild(this.elements.backButton);
        this.elements.container.appendChild(this.elements.savedGamesMenu);


    },

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
                    i++;

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

                    this.checkPuzzlesOrder();
                }
            }, 5)

        } else if (direction === 'bottom') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleHeight + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.top = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.bottom = `${i}px`;
                    // Animation step
                    i++;

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

                    this.checkPuzzlesOrder();
                }
            }, 5)
        } else if (direction === 'right') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleWidth + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.left = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.right = `${i}px`;
                    // Animation step
                    i++;

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

                    this.checkPuzzlesOrder();
                }
            }, 5)
        } else if (direction === 'left') {
            const timerId = setInterval(() => {

                // 5 - it's a grid gap (margin) between puzzles
                if (i <= puzzleWidth + 5) {
                    this.elements.puzzles[shiftedElementIndex].style.right = `${i}px`;
                    this.elements.puzzles[emptyElementIndex].style.left = `${i}px`;
                    // Animation step
                    i++;

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

                    this.checkPuzzlesOrder();
                }
            }, 5)
        }

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
        this.elements.audioMenuItemHover.setAttribute("autoplay", "");
        this.elements.audioMenuItemHover.setAttribute("muted", "muted");
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


    },
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
        this.elements.continueGameBtn.addEventListener('mouseover', () => {

            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
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
            this.startGame();
        })

        this.elements.newGameBtn = document.createElement("h3");
        this.elements.newGameBtn.classList.add('newGameBtn', 'menu-item');
        this.elements.newGameBtn.textContent = `New Game`;
        this.elements.newGameBtn.addEventListener('mouseover', () => {
            // && this.values.isPauseClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
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
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
                this.elements.audioMenuItemHover.play();
            }

        })

        this.elements.saveGameBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }

            let savedGames = JSON.parse(localStorage.getItem('savedGames'));

            if (savedGames) {
                this.values.savedGames = savedGames;
            }

            if (this.values.savedGames.length < this.values.maxSavedGamesCount) {


                this.elements.screenShot = this.elements.container.cloneNode(true);
                this.elements.puzzlesForLocalStorage = this.elements.puzzles
                    .map((el) => JSON.stringify(el.outerHTML))


                this.values.savedGames = [
                    ...this.values.savedGames,
                    {
                        minutes: this.values.minutes,
                        seconds: this.values.minutes,
                        moves: this.values.moves,
                        screenShot: this.elements.screenShot.innerHTML,
                        puzzles: this.elements.puzzlesForLocalStorage,
                    }
                ];

                localStorage.removeItem('savedGames');
                localStorage.setItem('savedGames', JSON.stringify(gemPuzzle.values.savedGames));

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
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
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
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.bestScoresBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
        })

        this.elements.rulesGameBtn = document.createElement("h3");
        this.elements.rulesGameBtn.classList.add('rulesGameBtn', 'menu-item');
        this.elements.rulesGameBtn.textContent = `Game Rules`;
        this.elements.rulesGameBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.rulesGameBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
        })

        this.elements.settingsBtn = document.createElement("h3");
        this.elements.settingsBtn.classList.add('settingsBtn', 'menu-item');
        this.elements.settingsBtn.textContent = `Settings`;
        this.elements.settingsBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.settingsBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
        })


        this.elements.soundBtn = document.createElement("h3");
        this.elements.soundBtn.classList.add('soundBtn', 'menu-item');
        this.elements.soundBtn.textContent = `Sound`;
        this.elements.soundBtn.addEventListener('mouseover', () => {
            // && this.values.isMenuItemClicked -> this validation is done for browser autoplay policy
            // (user need to interact with domain before listen  audio)
            if (this.values.isVolumeOn && this.values.isMenuItemClicked) {
                this.elements.audioMenuItemHover.play();
            }

        })
        this.elements.soundBtn.addEventListener('click', () => {
            this.values.isMenuItemClicked = true
            if (this.values.isVolumeOn) {
                this.elements.audioMenuItemSelect.play();
            }
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
        this.elements.menu.appendChild(this.elements.soundBtn);
        this.elements.menu.appendChild(this.elements.settingsBtn);

        // TODO: check it out: affect on menu behavior or not
        //  this.elements.container.appendChild(this.elements.menu);
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
                // isAllowDragDrop = false;
                isAllowDragDrop = true;
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
                this.checkPuzzlesOrder();
            }


        }
    },
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
                //TODO
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
                // this.elements.puzzles[i].style.backgroundSize = `${this.elements.mainArea.clientWidth}px ${this.elements.mainArea.clientHeight}px`;
                this.elements.puzzles[i].style.backgroundPosition = `-${left}px -${top}px`;

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
