var Game = function(id1,id2) {
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
		this.me.move(cell,gameId);
		//insert "X" or "O" in cell, depending on player
	}
}
var Player = function(id,status) {
	this.status = status;
	this.id = id;
	this.move = function(cell,gameId) {
		this.active = false;
		var text = document.createTextNode("X");     // Create a text node
		cell.appendChild(text);
		var cell = cell;
		cellId = $(cell).attr("id");
		var data = { game_id: gameId, content: "X", coordinates: cellId }
		$.ajax({
			dataType: "json",
			method: "PUT",
			url: "../cells/" + cellId,
			data: data
		}).done(function(response) {
			console.log(response);
		})
	}
}

var Board = function() {
	this.cells = []
}

//make active player, when it goes, block the key,so it will wait for update from other side
// when other side made a move, unbind the keys, get ready for a move