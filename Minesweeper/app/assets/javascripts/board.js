(function(root){
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Board = Minesweeper.Board = function(height, width){
		this.height = height;
		this.width = width; 
		this.tiles = generateBoard(height, width);
		this.generateBoardDisplay();
		this.bombCount = this.generateBombs();
	}; 

	function generateBoard(height, width){
		var outerArray = new Array(height);
		for (var i = 0; i < outerArray.length; i++){
			outerArray[i] = new Array(width);
			for (var j = 0; j < outerArray[i].length; j++){
				outerArray[i][j] = new Minesweeper.Tile(i, j);
			}
		}
		return outerArray;
	}; 

	Board.prototype.generateBoardDisplay = function() {
		var container = document.getElementById('boardContainer');
		container.oncontextmenu = function(){
			return false;
		};
		for (var i = 0; i < this.tiles.length; i++){
			var row = this.tiles[i];
			for(var j = 0; j < row.length; j++){
				container.appendChild(row[j].mark);
			}
			var rowEnd = document.createElement("div");
			rowEnd.setAttribute('class', 'rowEnd');
			container.appendChild(rowEnd);
		}
		true;
	}

	Board.prototype.countBombs = function() {
		var count = 0;
		for (var i = 0; i < this.tiles.length; i++) {
			for (var j = 0; j < this.tiles[i].length; j++){
				if(this.tiles[i][j].isBomb()){
					count += 1;
				}
			}
		}
		return count;
	};

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

	Board.prototype.generateBombs = function(){
		var totalBombs = Math.round(this.height * this.width * 0.2);
		var bombPlacements = [];
		while(bombPlacements.length < totalBombs){
			var loc = [(Math.floor(Math.random() * this.height)), (Math.floor(Math.random() * this.width))]
			if(!existsWithin(bombPlacements, loc)){
				bombPlacements.push(loc);
			}
		}
		this.setBombs(bombPlacements);
		return totalBombs;
	};

	var existsWithin = function(placements, loc){
		for (var i = 0; i < placements.length; i++){
			if(placements[i][0] === loc[0] && placements[i][1] === loc[1]){
				return true;
			}
		}
		return false;
	}

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
		].select(this.onBoard.bind(this));
		// select{|pos| this.onBoard(pos)};
		return neighborsPos;
	};

	Array.prototype.select = function(check){
		var selectedItems = [];
		for(var i = 0; i < this.length; i++){
			if(check(this[i])){
				selectedItems.push(this[i]);
			}
		}
		return selectedItems;
	};

	Board.prototype.onBoard = function(pos){
		if(pos[0] >= 0 && pos[0] < this.height && pos[1] >=0 && pos[1] < this.width){
			return true;
		}
		return false;
	};

	Board.prototype.neighborBombCount = function(pos){
		var count = 0;
		var neighbors = this.neighbors(pos);
		for(var i = 0; i<neighbors.length; i++){
			if(this.tiles[neighbors[i][0]][neighbors[i][1]].isBomb()){
				count++;
			}
		}
		return count;
	};

	Board.prototype.setFlag = function(pos){
		var tile = this.tiles[pos[0]][pos[1]];
		if(!tile.revealed){
			tile.setFlagged();
			tile.setMark('flagged')
		}
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

	Board.prototype.revealNeighbors = function(pos){
		var neighbors = this.neighbors(position);
    	for(var i = 0; i < neighbors.length; i++){
    		this.revealTile(neighbors[i]);
    	}
	};

	Board.prototype.revealTile = function(pos){
		var tile = this.tiles[pos[0]][pos[1]];
		if(!tile.flagged && !tile.revealed){
			tile.setRevealed();
			if(tile.isBomb()){
				tile.setMark('activatedBomb')
			} else {
				var neighbors = this.neighbors(pos);
				var count = this.neighborBombCount(pos);
				tile.setMark('revealed-' + count.toString());
				if(count ===0){
					var neighbor = "";
					for(var i = 0; i < neighbors.length; i++){
            			neighbor = neighbors[i]
            			this.revealTile([neighbor[0], neighbor[1]]);  
          			}
				}
			}
		}
	}

	Board.prototype.setBombs = function(placements){
		for (var i = 0; i<placements.length; i++){
			this.tiles[placements[i][0]][placements[i][1]].setBomb();
		}
	};

	Board.prototype.getTile = function(pos){
		return this.tiles[Math.round(pos[0])][Math.round(pos[1])];
	};
})(this);