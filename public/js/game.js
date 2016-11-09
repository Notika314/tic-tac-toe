var Game = function(id1,id2) {
	this.players = [];
	var status1 = "me";
	var status2 = "opponent";
	this.opponent = new Player(id1,status2)
	this.me = new Player(id2,status1);
	this.players.push(this.me);
	this.players.push(this.opponent);
	this.movePlayer = function(cell) {
		this.me.move(cell);
		//insert "X" or "O" in cell, depending on player
	}
}
var Player = function(id,status) {
	this.status = status;
	if (this.status === "me") { 
		this.active = true;
	} else {
		this.active = false;
	}
	this.id = id;
	this.move = function(cell) {
		this.active = false;
		var text = document.createTextNode("X");     // Create a text node
		cell.appendChild(text);
	}
}

var Board = function() {
	this.cells = []
}

//make active player, when it goes, block the key,so it will wait for update from other side
// when other side made a move, unbind the keys, get ready for a move