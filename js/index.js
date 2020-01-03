var cards = [
	'fa fa-snowflake-o',
	'fa fa-snowflake-o',
	'fa fa-bath',
	'fa fa-bath',
 	'fa fa-coffee',
 	'fa fa-coffee', 
 	'fa fa-globe', 
 	'fa fa-globe',
 	'fa fa-money', 
  'fa fa-money',
 	'fa fa-taxi', 
 	'fa fa-taxi', 
 	'fa fa-wifi', 
 	'fa fa-wifi', 
 	'fa fa-smile-o', 
 	'fa fa-smile-o'
];//List of cards/icons
var totalTime = document.querySelector("#totalTime");//selects query id
var timeSelector = document.querySelector(".time");
var moveRating = document.querySelector("#finalMove");//selects element in modal
var movesSelector = document.querySelector(".moves");//selects element in score panel
var modal = document.getElementById('myModal');//get the modal
var span = document.getElementsByClassName("close")[0];//Get <span> element that closes the modal
var totalStars = document.querySelector("#starRating");//Gets "#starRating" in modal
var restart = $(".restart");
var starSelector1 = $("#icon1");//selects element with id
var starSelector2 = $("#icon2");
var allDeck = $(".deck");
var time = 0;//variable that will be incremented by 1 every second
var moves = 0;//will be incremented by 1 everytime two cards are clicked
var matchedCard= 0;
var timerOccurrences = 1;//to only initiate myTimer() once
var shuffledCards = shuffle(cards);//creating new var for shuffled cards list
var interval;
var openedCard=[];


/***restart game function will quickly reload page when reload/reset icon is clicked***/
restart.click(function(){
  window.location.href = window.location.href;
});

/***Game timer***/
function myTimer(){//increments 'time' by 1 every second, updates innerHTML
	interval = setInterval(function(){
		time++;
		timeSelector.innerHTML = time + " sec.";
	}, 1000);
}

/***Star Rating***/
function rating(){
	switch(moves) {
		case 15://IF 15 moves have been made
			starSelector1.remove();//Element with star icon is removed from HTML
			break;
		case 18://If 18 moves have been made
			starSelector2.remove();//Element with star icon is removed from HTML
			break;
	}
}

/***Updates moves on page and removes stars***/
function addMove(){//updates innerHTML of "#finalMove" and ".moves"
	moves++;
	movesSelector.innerHTML = moves;
	moveRating.innerHTML = moves;
	rating();//will initiate depending on the moves made
};

/***The Modal***/
//When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

/***Won Game***/
function wonGame(){
	if (matchedCard === 8) {//if matched all cards
		
		clearInterval(interval);//stop timer interval
		
		totalTime.innerHTML = timeSelector.innerHTML;//adds time to totalTime in modal
		
		var starRating = document.querySelector(".stars").innerHTML;
		totalStars.innerHTML = starRating;//adds stars to totalStars in modal
		
		setTimeout(function(){//delays and displays the modal
			modal.style.display = "block";
			span();
			window();
		},1100);
	};
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/***creates html: <li>,<i> and adds icons for each card, adds them to page***/
for (index = 0; index < cards.length; index++) {
	allDeck.append('<li class="card"><i class="'+shuffledCards[index]+'"></i></li>');
};

/***Start Game***/
$(".card").click(function() {//event listener for card when clicked

	$(this).addClass("open show disabled");//adds classes to card clicked


	openedCard.push(this);//adds card to opened card list

	var currentCard = this;//creating variables for current and prev card clicked
	var prevCard = openedCard[0];


	if (openedCard.length === 2) {//if player clicks two cards, they will be compared

		if (currentCard.innerHTML === prevCard.innerHTML){//if same, 'match' class is added to elem
			currentCard.classList.add("match");
			prevCard.classList.add("match");
			openedCard = [];//emptying opened card list
			matchedCard += 1;
			wonGame();//function that will run once matched all cards

		} else{//if cards NOT same, classes are added and removed
			currentCard.classList.add("unmatched");
			prevCard.classList.add("unmatched");

			setTimeout(function(){//will delay and display animation then close card and remove classes
				currentCard.classList.remove("open", "show", "unmatched", "disabled");
				prevCard.classList.remove("open", "show", "unmatched", "disabled");
				openedCard = [];}, 500);
		}

		while (timerOccurrences === 1) {//initiate timer once two cards are clicked
			myTimer();
			timerOccurrences += 1;
			break;
		}

		addMove();//increments number of moves when two cards are clicked
	}
});