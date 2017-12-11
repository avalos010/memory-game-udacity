let watch, clocktimer;
watch = new Stopwatch("timer");


function startWatch() {
    clocktimer = setInterval("watch.update(false)", 1);
    watch.start();
}

function pauseWatch() {
    watch.stop();
    clearInterval(clocktimer);
}

function resetWatch() {
    watch.reset();
}


let cards = [];

for (let i = 0; i < 16; i++) {
    cards.push($('.card')[i]);
    $(cards[i]).attr('id', i); // add id to every card to distinguise each one

}




function shuffled() {
    shuffle(cards);
    //appends shuffled deck
    cards.map(card => {
        $('.deck').append(card);
    });
};
shuffled();



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
opened is an array that has the 2 opened cards and it is used to 
compare both cards at the end it goes back empty ready to check the next pair
*/
let opened = [];

/*
matched is an array where if the pair on the opened array matched than 
they will get added to the matched array that way we could tell when 
all cards have been matched
*/
let matched = [];
let clicks = 0;


//On clik show the card only if theres less than 2 cards flipped
function click() {
    if (opened.length < 2) {

        $(this).addClass('open show');
        opened.push(this);
        if (opened.length === 2 && $(opened[0]).attr('id') === $(opened[1]).attr('id')) {
            reset();
        } else {
            clicks += 1;
            $('.moves').text(clicks / 2);
            setTimeout(check, 1500);
        }
    }
    if (clicks === 1) {
        startWatch();
    }

}

//When there are 2 cards flipped this function will compare them
function check() {
    while (opened.length === 2) {
        if (opened[0].innerHTML !== opened[1].innerHTML) {
            opened.map(card => {
                $(card).removeClass('open show');
            });
            opened = [];
        } else {
            opened.map(card => {
                $(card).addClass('match');
                matched.push(card);
                if (matched.length === 16) {
                    $('.modal').show(); // show modal when all cards are matched
                    pauseWatch();
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                    if (clicks < 30) {
                        $('.stars').append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'));
                    } else if (clicks > 31 && clicks < 50)
                        $('.stars').append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'));
                } else {
                    $('.stars').append($('<li><i class="fa fa-star"></i></li>'));
                }
            });
            opened = [];
        }
    }


}



$('.card').on('click', click);


function reset() {
    cards.map(card => {
        $(card).removeClass('open show match');
    });
    matched = [];
    opened = [];
    clicks = 0;
    $('.moves').text(clicks);
    shuffled();
    resetWatch();

}
$('.fa-repeat').click(reset);


$('.close-modal').click(function() {
    $('.modal').hide();
})



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */