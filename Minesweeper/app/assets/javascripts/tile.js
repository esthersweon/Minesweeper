(function(root){
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Tile = Minesweeper.Tile = function(row, col){
		this.row = row;
		this.col = col;
		this.bomb = false;
		this.flagged = false;
		this.revealed = false;
		this.mark = document.createElement('div');
		this.mark.setAttribute('id', row.toString() + "," + col.toString());
		this.mark.setAttribute('class', 'tile concealed');
	};

	Tile.prototype.setBomb = function(){
		this.bomb = !this.bomb;
	};

	Tile.prototype.setFlag = function(){
		this.flagged = !this.flagged;
		if(this.flagged){
			this.setMark('flagged');
		} else {
			this.setMark('concealed');
		}
	};

	Tile.prototype.setMark = function(classType){
		this.mark.setAttribute('class', "tile " + classType);
	};
})(this);

