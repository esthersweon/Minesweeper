(function (root) {
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Tile = Minesweeper.Tile = function(board, row, col) {
		this.board = board;
		this.row = row;
		this.col = col;
		this.bombed = false;
		this.revealed = false;
		this.flagged = false;
	};

	var Tile.prototype.neighbors = function() {
		var neighbors = [];
		var deltas = [-1, 0, 1].product([-1, 0, 1])
		deltas.delete([0,0])

		deltas.forEach(function(row_offset, col_offset) {
			if ((@row + row_offset).between?(0, 8) && (@col + col_offset).between?(0, 8)) {
				neighbors.push(this.board.board[this.row + row_offset][this.col + col_offset])
			}
		});

		return neighbors;
	};

	var Title.prototype.neighbor_bomb_count = function() {
		var bombed_neighbors = this.neighbors.filter(function(neighbor) {return neighbor.bombed?});
		bombed_neighbors.count;
	}

	var Tile.prototype.display = function() {
		if (flagged?) {
			this.flag
		} else if (revealed?) {
			if (bombed?) {

			} else if () {

			}
		} else {

		}

	};

	var Tile.prototype.display = function() {

	};

	var Tile.prototype.reveal = function() {
		this.revealed = true;
	};

	var Tile.prototype.revealed? = function() {
		this.revealed
	};

	var Tile.prototype.bomb = function() {
		this.bombed = true;
	};

	var Tile.prototype.bombed? = function() {
		this.bombed
	};

	var Tile.prototype.flag = function() {
		this.flagged = true;
	};

	var Tile.prototype.flagged? = function() {
		this.flagged
	};

})(this);