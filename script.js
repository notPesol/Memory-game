window.addEventListener('DOMContentLoaded', () => {
    const cards = [
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ]

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const resetBtn = document.querySelector('#reset');

    let cardsChosen = [];
    let cardsChosenId = [];
    const cardsWon = [];

    // create board
    function createBoard() {
        cards.sort(() => 0.5 - Math.random());

        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('img');

            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);

            grid.appendChild(card);
        }
    }

    // flip a card
    function flipCard() {
        let cardId = this.getAttribute('data-id');

        cardsChosen.push(cards[cardId].img);
        cardsChosenId.push(cardId);

        this.setAttribute('src', cards[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 50);
        }
    }

    //check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (optionTwoId === optionOneId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Oh no!, You have clicked same image!');
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found match');
            console.log(cardsChosen[0]);
            cards[optionOneId].setAttribute('src', cardsChosen[0]);
            cards[optionTwoId].setAttribute('src', cardsChosen[0]);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry, Try again!');
        }

        cardsChosen = [];
        cardsChosenId = [];

        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === (cards.length / 2)) {
            resultDisplay.textContent = 'Congratulations! You found them all!';
            setTimeout(resetBoard, 10000);
        }
    }

    // reset
    function resetBoard() {
        while (grid.children.length) {
            console.log(grid.children[0]);
            grid.removeChild(grid.children[0]);
        }

        createBoard();

        resultDisplay.textContent = 'Ok, Reset...';
        setTimeout(() => {
            resultDisplay.textContent = '';
        }, 500)
    }

    resetBtn.addEventListener('click', () => {
        resetBoard();
    });

    createBoard();
});