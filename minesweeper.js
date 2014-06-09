(function (root) {
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	//BOARD

	var Board = Minesweeper.Board = function(dimension) {
		this.dimension = dimension;
		this.tiles = generateBoard(dimension);
		this.generateBoardDisplay();
		this.blew_up = false;
		this.seedBombs;
	}

	var Board.prototype.generateBoard = function(dimension) {
		var rows = new Array (dimension);
		for (i = 0; i < rows.length; i++) {
			rows[i] = new Array (dimension)
			for (j = 0; j < rows.length; j++) {
				rows[i][j] = new Minesweeper.Tile(this, i, j);
			}
		}
		return rows;
	}

	var Board.prototype.generateBoardDisplay = function() {
		var container = document.getElementById('boardContainer');
		for (i = 0; i < this.length; i++) {
			//insert a div for row
			for (j = 0; j < this.length; j++) {
				//insert a div for each tile
			}
		}
	}

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
	}

	//TILE

	var Tile = Minesweeper.Tile = function(board, row, col) {
		this.board = board;
		this.row = row;
		this.col = col;
		this.bombed = false;
		this.revealed = false;
		this.flagged = false;
	}

})(this);