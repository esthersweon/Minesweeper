(function (root) {
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Tile = Minesweeper.Tile = function(board, row, col) {
		this.board = board;
		this.row = row;
		this.col = col;
		this.bombed = false;
		this.revealed = false;
		this.flagged = false;
		this.tag = document.createElement('div');
		this.tag.setAttribute('id', row.toString() + "," + col.toString());
		this.tag.setAttribute('class', 'tile concealed');
	};

	Tile.prototype.setTag = function(classString) {
		this.tag.setAttribute('class', "tile " + classString);
	};

	Tile.prototype.neighbors = function() {
		var neighbors = [];
		var deltas = [-1, 0, 1].product([-1, 0, 1]);
		deltas.delete([0,0]);

		deltas.forEach(function(row_offset, col_offset) {
			if (this.row + row_offset > 0 && this.row + row_offset < 8 && this.col + col_offset > 0 && this.col + col_offset > 8) {
				neighbors.push(this.board.tiles[this.row + row_offset][this.col + col_offset])
			}board
		});

		return neighbors;
	};

	Tile.prototype.neighbor_bomb_count = function() {
		var bombed_neighbors = this.neighbors.filter(function(neighbor) {return neighbor.bombed});
		bombed_neighbors.count;
	}

	Tile.prototype.display = function() {
		if (this.flagged) {
			return "F"
		} else if (this.revealed) {
			if (this.bombed) {
				return "B"
			} else if (neighbor_bomb_count > 0) {
				return neighbor_bomb_count.to_s
			} else {
				return "E"
			}
		} else {
			return "_"
		}
	};

	Tile.prototype.reveal = function() {
		if (flagged) {
			flag;
		};

		this.revealed = true;

		if (!bombed && !(neighbor_bomb_count > 0)) {
			var neighbors_to_expand = neighbors.filter(function(neighbor) {return !neighbor.bombed && !neighbor.revealed});
			neighbors_to_expand.forEach( function (neighbor) {
				neighbor.reveal;
			})
		};
	};

	Tile.prototype.revealed = function() {
		this.revealed;
	};

	Tile.prototype.bomb = function() {
		this.bombed = true;
	};

	Tile.prototype.bombed = function() {
		this.bombed;
	};

	Tile.prototype.flag = function() {
		if (!reaveled) {
			this.flagged = !this.flagged;
		}
	};

	Tile.prototype.flagged = function() {
		this.flagged;
	};

})(this);