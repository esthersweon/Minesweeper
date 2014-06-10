(function (root) {
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Board = Minesweeper.Board = function(dimension){
		this.dimension = dimension;
		this.tiles = this.generateBoard(dimension);
		this.generateBoardDisplay();
		this.blew_up = false;
		this.seedBombs;
	};

	Board.prototype.generateBoard = function(dimension){
		var rows = new Array (dimension);
		for (var i = 0; i < rows.length; i++) {
			rows[i] = new Array (dimension)
			for (var j = 0; j < rows.length; j++) {
				rows[i][j] = new Minesweeper.Tile(this, i, j);
			}
		}
		return rows;
	};

	Board.prototype.generateBoardDisplay = function() {
		var container = document.getElementById('boardContainer');
		
		for (var i = 0; i < this.tiles.length; i++) {
			var row = this.tiles[i];
			for (var j = 0; j < this.tiles.length; j++) {
				container.appendChild(row[j].tag)
			}
			var endOfRow = document.createElement('div');
			endOfRow.setAttribute('class', 'rowEnd');
			container.appendChild(endOfRow);
		};
	};

	Board.prototype.seedBombs = function(){
		for (var i = 0; i < this.dimension; i++){
			var randRow = Math.floor(Math.random()*10);
			var randCol = Math.floor(Math.random()*10);
			var tile = this.tiles[randRow][randCol];

			while (tile.bombed) {
				var randRow = Math.floor(Math.random()*10);
				var randCol = Math.floor(Math.random()*10);
				var tile = this.board[randRow][randCol];
			};

			tile.bomb();
		};
	};

	Board.prototype.reveal = function(row, col) {
		this[row][col].reveal;
    	this.blew_up = this[row][col].bombed
	};

	Board.prototype.flag = function() {
		this[row][col].flag;
	};

	Board.prototype.won = function() {
		var all_tiles = [];

		for (var i = 0; i < this.length; i++) {
			for (j = 0; j < this.length; j++) {
				all_tiles.push(this[i][j]);
			}
		}

		var unrevealed_tiles = all_tiles.filter(function(tile) {return !tile.revealed});
		unrevealed_tiles.count === 10;
	};

	Board.prototype.lost = function() {
		return this.blew_up;
	}

})(this);