var Game = function(id1,id2) {
	var takenCells = [];
	var winningNumber = 0;
	var winning_combinations = [["0","1","2"],["3","4","5"],["6","7","8"],["0","3","6"],["1","4","7"],["2","5","8"],["0","4","8"],["2","4","6"]]
	this.players = [];
	var status1 = "me";
	var status2 = "opponent";
	if (id2 == undefined) {
		this.me = new Player(id1, status1);
		this.me.active=false;
		this.opponent = new Player(id2,status2);
		this.opponent.active=false;
	} else {
	this.opponent = new Player(id1,status2)
	this.opponent.active=false;
	this.me = new Player(id2,status1);
	this.me.active=false;
	}
	this.players.push(this.me);
	this.players.push(this.opponent);
	this.movePlayer = function(cell,gameId) {
		var cellId = $(cell).attr("id");
		takenCells.push(cellId);
		for (var i = 0; i < winning_combinations.length; i ++ ) {
		    var gameOver = 0;
			for ( var j = 0; j < winning_combinations[i].length; j ++) {
				if ( takenCells.includes(winning_combinations[i][j]) ) {
					gameOver += 1; 
				} else {
					gameOver += 0;
				}
			}
			if ( gameOver == 3) {
				winningNumber = i;
			}
		}
		if (winningNumber > 0) {
			var winningCo;
			for ( var j = 0; j < winning_combinations[winningNumber].length ; j ++ ) {
				var ind = winning_combinations[winningNumber][j];
				var celll = $("td#" + ind);
				console.log(celll);
				$(celll).css("background-color", "red");
			}
		}

		this.me.move(cell,gameId);
	}
}
var Player = function(id,status) {
	this.status = status;
	this.id = id;
	this.move = function(cell,gameId) {
		this.active = false;
		var text = document.createTextNode(outside.sign);     // Create a text node
		cell.appendChild(text);
		var cell = cell;
		cellId = $(cell).attr("id");
		var data = { game_id: gameId, content: outside.sign, coordinates: cellId }
		$.ajax({
			dataType: "json",
			method: "PUT",
			url: "../cells/" + cellId,
			data: data
		}).done(function(response) {
		
		})
	}
}

var Board = function() {
	this.cells = []
}

//make active player, when it goes, block the key,so it will wait for update from other side
// when other side made a move, unbind the keys, get ready for a move