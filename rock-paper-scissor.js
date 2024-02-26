let score = JSON.parse(localStorage.getItem('score'));

        if(score===null){
            score= {
                wins: 0,
                losses: 0,
                ties: 0
            };
        }

        // updateScoreElement();

        let isAutoPlaying = false;

        let intervalId;

        function autoPlay(){
            if(!isAutoPlaying){
                intervalId=setInterval(function(){
                    const playerMove = computerMove();
                    yourMove(playerMove);
                }, 1000);
                isAutoPlaying=true;
            }
            else{
                clearInterval(intervalId);
                isAutoPlaying=false;
            }
        }

        function updateScoreElement() {
            document.querySelector('.js-score')
            .innerHTML = `Wins - ${score.wins}, Losses - ${score.losses}, Ties - ${score.ties}`;
        }

        function computerMove() {
            const randomNumber = Math.random();
            let computerChoice = '';
            if (randomNumber >= 0 && randomNumber < 1/3) {
                computerChoice = 'rock';
            }
            else if (randomNumber >= 1/3 && randomNumber < 2/3) {
                computerChoice = 'paper';
            }
            else if (randomNumber >= 2/3 && randomNumber < 1) {
                computerChoice = 'scissors';
            }   
            return computerChoice;
        }
        function yourMove(move) {
            const computerChoice = computerMove();
            let result = '';
            if (move === 'rock') {
                if (computerChoice === 'rock') {
                    result = `It's a Tie`;
                }
                else if (computerChoice === 'paper') {
                    result = 'You Lose';
                }
                else if (computerChoice === 'scissors') {
                    result = 'You Win';
                }
            }
            else if (move === 'paper') {
                if (computerChoice === 'rock') {
                    result = 'You Win';
                }
                else if (computerChoice === 'paper') {
                    result = `It's a Tie`;
                }
                else if (computerChoice === 'scissors') {
                    result = 'You Lose';
                }
            }
            else if (move === 'scissors') {
                if (computerChoice === 'rock') {
                    result = 'You Lose';
                }
                else if (computerChoice === 'paper') {
                    result = 'You Win';
                }
                else if (computerChoice === 'scissors') {
                    result = `It's a Tie`;
                }
            }

            if(result==='You Win'){
                score.wins++;
            }
            else if(result==='You Lose'){
                score.losses++;
            }
            else if(result===`It's a Tie`){
                score.ties++;
            }

            localStorage.setItem('score', JSON.stringify(score));
            
            updateScoreElement();

            document.querySelector('.js-result').innerHTML=result;

            document.querySelector('.js-moves').innerHTML=`You chose ${move}. Computer chose ${computerChoice}.`
        }