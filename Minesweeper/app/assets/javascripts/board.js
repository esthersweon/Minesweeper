(function(root){
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Board = Minesweeper.Board = function(dimension){
		this.dimension = dimension;
		this.tiles = generateBoard(dimension);
		this.boardDisplay();
		this.bombCount = this.generateBombs();
		// this.bombedTiles = this.findBombedTiles();
	}; 

	function generateBoard(dimension){
		var outerArray = new Array(dimension);
		for (var i = 0; i < outerArray.length; i++){
			outerArray[i] = new Array(dimension);
			for (var j = 0; j < outerArray[i].length; j++){
				outerArray[i][j] = new Minesweeper.Tile(i, j);
			}
		}
		return outerArray;
	}; 

	Board.prototype.boardDisplay = function() {
		var container = document.getElementById('boardContainer');
		container.oncontextmenu = function(){
			return false;
		};
		for (var i = 0; i < this.tiles.length; i++){
			var row = this.tiles[i];
			for(var j = 0; j < row.length; j++){
				container.appendChild(row[j].mark);
			}
		}
	};

	Board.prototype.generateBombs = function(){
		var totalBombs = Math.round(this.dimension * this.dimension * 0.2);
		var bombPositions = [];
		while(bombPositions.length < totalBombs){
			var loc = [(Math.floor(Math.random() * this.dimension)), (Math.floor(Math.random() * this.dimension))]
			if(!includedIn(bombPositions, loc)){
				bombPositions.push(loc);
			}
		}
		this.setBombs(bombPositions);
		return totalBombs;
	};

	var includedIn = function(placements, loc){
		for (var i = 0; i < placements.length; i++){
			if(placements[i][0] === loc[0] && placements[i][1] === loc[1]){
				return true;
			}
		}
		return false;
	};

	Board.prototype.setBombs = function(bombPositions){
		for (var i = 0; i < bombPositions.length; i++){
			var bombedTile = this.tiles[bombPositions[i][0]][bombPositions[i][1]].setBomb();
			// this.bombs.push(this.tiles[bombPositions[i][0]][bombPositions[i][1]]);
		}
		// return bombs;
	};

	// Board.prototype.findBombedTiles = function() {
	// 	bombedTiles = [];
	// 	for (var i = 0; i < this.tiles.length; i++){
	// 		var row = this.tiles[i];
	// 		for (var j = 0; j < row.length; j++){
	// 			var tile = row[j];
	// 			if(tile.bomb){
	// 				bombedTiles.push(tile);
	// 			}
	// 		}
	// 	}
	// 	return bombedTiles;
	// };

	Board.prototype.reset = function(){
		for (var i = 0; i < this.tiles.length; i++){
			var row = this.tiles[i];
			for(var j = 0; j<row.length; j++){
				row[j].revealed = false;
				row[j].bomb = false;
				row[j].flagged = false;
				row[j].setMark('concealed');
			}
		}
		this.bombCount = this.generateBombs();
	};

	Board.prototype.neighbors = function(pos){
		var x_coord = pos[0];
		var y_coord = pos[1];
		var neighborsPos = [
		[x_coord-1, y_coord], 
		[x_coord-1, y_coord+1], 
		[x_coord, y_coord+1], 
		[x_coord+1, y_coord+1], 
		[x_coord+1, y_coord], 
		[x_coord+1, y_coord-1], 
		[x_coord, y_coord-1], 
		[x_coord-1, y_coord-1]
		].select(this.isValidPos.bind(this));
		return neighborsPos;
	};

	Array.prototype.select = function(isValidPosFcn){
		var validPositions = [];
		for(var i = 0; i < this.length; i++){
			if(isValidPosFcn(this[i])){
				validPositions.push(this[i]);
			}
		}
		return validPositions;
	};

	Board.prototype.isValidPos = function(pos){
		if(pos[0] >= 0 && pos[0] < this.dimension && pos[1] >=0 && pos[1] < this.dimension){
			return true;
		}
		return false;
	};

	Board.prototype.neighborBombCount = function(pos){
		var count = 0;
		var neighbors = this.neighbors(pos);
		for(var i = 0; i<neighbors.length; i++){
			if(this.tiles[neighbors[i][0]][neighbors[i][1]].bomb){
				count++;
			}
		}
		return count;
	};

	Board.prototype.neighborFlagCount = function(pos){
		var count = 0;
		var neighbors = this.neighbors(pos);
		for(var i = 0; i < neighbors.length; i++){
			if(this.tiles[neighbors[i][0]][neighbors[i][1]].flagged){
				count++;
			}
		}
		return count;
	};

	Board.prototype.revealNeighboringTiles = function(pos){
		var neighbors = this.neighbors(position);
    	for(var i = 0; i < neighbors.length; i++){
    		this.revealTile(neighbors[i]);
    	}
	};

	Board.prototype.revealTile = function(pos){
		var tile = this.tiles[pos[0]][pos[1]];
		if(!tile.flagged && !tile.revealed){
			tile.revealed = true;
			if(tile.bomb){
				tile.setMark('triggeredBomb')
			} else {
				var count = this.neighborBombCount(pos);
				tile.setMark('revealed-' + count.toString());
				if(count ===0){
					var neighbors = this.neighbors(pos);
					for(var i = 0; i < neighbors.length; i++){
            			this.revealTile([neighbors[i][0], neighbors[i][1]]);  
          			}
				}
			}
		}
	};

	Board.prototype.getTile = function(pos){
		return this.tiles[Math.round(pos[0])][Math.round(pos[1])];
	};
})(this);