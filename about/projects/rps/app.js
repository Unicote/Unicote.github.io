const game = () => {
    let pScore = 0;
    let cScore = 0;
    const playerNameScreen = document.querySelector('.playerName');
    const introScreen = document.querySelector('.intro');
    const inputPlayer = document.querySelector('.playerName input');
    const player = document.querySelector('.player-score h2')
    const matchScreen = document.querySelector('.match');
    const gameOverScreen = document.querySelector('.gameOver');

    // Allows user to type his name
    const typeUserScreen = () => {
        const nextButton = document.querySelector('.intro button');
        // Show user typing screen
        nextButton.addEventListener(
            'click',
            () => {
                introScreen.style.transition = 'opacity 0.5s ease';
                introScreen.classList.remove('fadeIn');
                introScreen.classList.add('fadeOut');
                playerNameScreen.classList.remove('fadeOut');
                playerNameScreen.classList.add('fadeIn');
            }
        )
    }

    // Start the game
    const startGame = () => {
        const choseOption = document.querySelector('.winner');
        const playButton = document.querySelector('#submitName');
        let playerName = '';

        // Show match screen after pressing button
        playButton.addEventListener(
            'click',
            () => {
                choseOption.innerText = "Choose an option";
                playerNameScreen.classList.remove('fadeIn');
                playerNameScreen.classList.add('fadeOut');
                matchScreen.classList.remove('fadeOut');
                matchScreen.classList.add('fadeIn');

                // Add current player to the heading
                playerName = inputPlayer.value;
                
                if (playerName !== '') {
                    player.innerText = playerName.charAt(0).toUpperCase() + playerName.slice(1);
                } else {
                    player.innerText = "Player"
                }

                

            }
        )
    }

    // Play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        // Remove animation style
        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            })
        })


        // Computer Options
        const computerOption = ['rock' ,'paper', 'scissors'];

        // Picks random number and assign the const computerOption to it
        options.forEach((option) => {
            option.addEventListener("click", function() {
                // Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOption[computerNumber]

                playerHand.src = 'rock.png';
                computerHand.src = 'rock.png';

                // Sets timeout for hands, and after aniation it show the picks
                setTimeout(() => {
                    // Call compareHands
                    compareHands(this.textContent, computerChoice)

                    // Update Images
                    playerHand.src = `${this.textContent}.png`;
                    computerHand.src = `${computerChoice}.png`;
                }, 1800)

                // Adds animation to playerHand and computerhand
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease"
            });
        });

    }

    // Updates score after every move
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p')
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        // checks after every move that someone has 3 points
        gameOver();
    }

    const compareHands = (playerChoice, computerChoice) => {
        // Update text
        const winner = document.querySelector('.winner');

        // Tie
        if(playerChoice === computerChoice) {
            winner.textContent = "It's a tie!";
            return;
        };

        // Rock
        if(playerChoice === 'rock') {
            if(computerChoice === 'scissors'){
                winner.textContent = `${player.innerText} Wins!`;
                pScore++;
                updateScore();
                return;
            }else {
                winner.textContent = 'Computer Wins!';
                cScore++;
                updateScore();
                return;
            }
        };

        // Scissors
        if(playerChoice === 'scissors') {
            if(computerChoice === 'paper') {
                winner.textContent = `${player.innerText} Wins!`;
                pScore++;
                updateScore();
                return;
            }else {
                winner.textContent = 'Computer Wins!'
                cScore++;
                updateScore();
                return
            }
        };

        // Paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = `${player.innerText} Wins!`;
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins!';
                cScore++;
                updateScore();
                return;
            }
        };

    }

    // Check when player or computer gain 3 points and display gameOver screen
    const gameOver = () => {
        const gameOverHeading = document.querySelector('.gameOver h1');
        const gameOverParagraph = document.querySelector('.gameOver p');


        if (pScore == 3) {
            matchScreen.classList.remove('fadeIn');
            matchScreen.classList.add('fadeOut');
            gameOverScreen.classList.add('fadeIn');
            gameOverScreen.classList.remove('fadeOut');
            gameOverHeading.innerText = `Good Job ${player.innerText}!`;
            gameOverParagraph.innerText = `You won with stupid computer :)`
            pScore = 0;
            cScore = 0;
            return
        } else if (cScore == 3) {
            matchScreen.classList.remove('fadeIn');
            matchScreen.classList.add('fadeOut');
            gameOverScreen.classList.add('fadeIn');
            gameOverScreen.classList.remove('fadeOut');
            gameOverHeading.innerText = `Unlucky ${player.innerText}!`;
            gameOverParagraph.innerText = `You lost with stupid computer :(`
            pScore = 0;
            cScore = 0;
            return
        }

    }

    // When user clicks on playAgain button app moves him to intro screen
    const playAgain = () => {
        const playAgainButton = document.querySelector('.gameOver button');

        playAgainButton.addEventListener(
            'click',
            () => {
                console.log("again")
                gameOverScreen.classList.remove('fadeIn')
                gameOverScreen.classList.add('fadeOut')
                introScreen.classList.remove('fadeOut')
                introScreen.style.transition = 'opacity 0.5s ease 1.2s'
                introScreen.classList.add('fadeIn')

                // Updates score after the game ends
                updateScore();
            }
        )
    }

    // call all the inner functions, exept gameOver, compareHands, updateScore
    playAgain();
    typeUserScreen();
    startGame();
    playMatch();
}

game();
