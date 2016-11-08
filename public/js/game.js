function Game(id) {
	var players = [];
	var player1 = new Player(id)
	players.push(player1);
	this.addPlayer = function(id) {
		var player2 = new Player(id)
		players.push(player2);
	}


}
function Player(id) {
	var id = id;
	this.move = function(key) {

	}


}

function Board() {

}