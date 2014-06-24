(function(root){
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Tile = Minesweeper.Tile = function(row, col){
		this.row = row;
		this.col = col;

		this.bomb = false;
		this.flagged = false;
		this.revealed = false;
		
		this.classLabel = document.createElement('div');
		this.classLabel.setAttribute('id', row.toString() + "," + col.toString());
		this.classLabel.setAttribute('class', 'tile concealed');
	};

	Tile.prototype.setBomb = function(){
		this.bomb = !this.bomb;
	};

	Tile.prototype.setFlag = function(){
		this.flagged = !this.flagged;
		if(this.flagged){
			this.setClass('flagged');
		} else {
			this.setClass('concealed');
		}
	};

	Tile.prototype.setClass = function(classType){
		this.classLabel.setAttribute('class', "tile " + classType);
	};
})(this);

