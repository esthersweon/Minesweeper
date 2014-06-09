(function (root) {
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Board = Minesweeper.Board = function(dimension) {
		this.dimension = dimension;
		this.board = generateBoard(dimension);
		this.generateBoardDisplay();
		this.blew_up = false;
		this.seedBombs;
	};

	var Board.prototype.generateBoard = function(dimension) {
		var rows = new Array (dimension);
		for (i = 0; i < rows.length; i++) {
			rows[i] = new Array (dimension)
			for (j = 0; j < rows.length; j++) {
				rows[i][j] = new Minesweeper.Tile(this, i, j);
			}
		}
		return rows;
	};

	var Board.prototype.generateBoardDisplay = function() {
		var container = document.getElementById('boardContainer');
		for (i = 0; i < this.length; i++) {
			//insert a div for row this[i].html('<div></div>')
			for (j = 0; j < this.length; j++) {
				//insert a div for each tile this[i][j].display
			}
		}
	};

	var Board.prototype.seedBombs = function() {
		for (i = 0; i < this.dimension; i++) {
			var randRow = Math.floor(Math.random()*10)
			var randCol = Math.floor(Math.random()*10)
			var tile = this[randRow][randCol]

			while (tile.bombed?) {
				var randRow = Math.floor(Math.random()*10)
				var randCol = Math.floor(Math.random()*10)
				var tile = this[randRow][randCol]
			}

			tile.bomb();
		}	
	};

	var Board.prototype.reveal = function(row, col) {
		this[row][col].reveal;
    	this.blew_up = this[row][col].bombed?
	};

	var Board.prototype.flag = function() {
		this[row][col].flag;
	};

	var Board.prototype.won? = function() {
		var all_tiles = [];

		for (i = 0; i < this.length; i++) {
			for (j = 0; j < this.length; j++) {
				all_tiles.push(this[i][j]);
			}
		}

		var unrevealed_tiles = all_tiles.filter(function(tile) {return !tile.revealed?})
		unrevealed_tiles.count === 10
	};

	var Board.prototype.lost? = function() {
		return this.blew_up
	}

})(this);