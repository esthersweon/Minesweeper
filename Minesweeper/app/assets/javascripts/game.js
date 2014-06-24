(function(root){
	var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

	var Game = Minesweeper.Game = function(){
		this.board = new Minesweeper.Board(15);
		this.firstMove = true; 
		this.leftMouseDown = false;
		this.rightMouseDown = false;
		this.gameOver = false;

		document.getElementById('bombCount').innerHTML = 'BOMBS LEFT: ' + (this.board.bombCount);

		document.getElementById('boardContainer').addEventListener('mousedown', handleMouseDown);

		document.getElementById('reset').addEventListener('mousedown', handleResetPress);
		document.getElementById('reset').addEventListener('mouseup', handleReset);
		
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mouseover', handleMouseOver);
	};

	Game.prototype.flagCount = function(){
		var count = 0;
		for(var i = 0; i<this.board.tiles.length; i++){
			row = this.board.tiles[i];
			for(var j = 0; j < row.length; j++){
				tile = row[j];
				if(tile.flagged){
					count+=1;
				}
			}
		}
		return count;
	}; 

	Game.prototype.checkGameDone = function(){
		this.gameOver = this.lost() || this.won();
		return this.gameOver;
	};

	Game.prototype.lost = function(){
		for(var i = 0; i<this.board.tiles.length; i++){
			row = this.board.tiles[i];
			for(var j = 0; j < row.length; j++){
				tile = row[j];
				if(tile.revealed && tile.bomb){
					window.game.displayResults(false);
					document.getElementById('reset').setAttribute('class', "loseFace");
					return true;
				}
			}
		}
		return false;
	}; 

	Game.prototype.won = function(){
		var hiddenTileCount = 0;
		for(var i = 0; i < this.board.tiles.length; i++){
			var row = this.board.tiles[i];
			for(var j = 0; j < row.length; j++){
				var tile = row[j];
				if(!tile.revealed){
					hiddenTileCount += 1;
				}
			}
		}
		if(hiddenTileCount === this.board.bombCount){
			window.game.displayResults(true);
			document.getElementById('reset').setAttribute('class', 'winFace');
			return true;
		}
		return false;

	};

	Game.prototype.displayResults = function(win) {
		for(var i = 0; i < this.board.tiles.length; i++){
			var row = this.board.tiles[i];
			for(var j = 0; j < row.length; j++){
				var tile = row[j]
				if(!tile.revealed && !tile.flagged && tile.bomb){
					if(win){
						tile.setMark('flagged');
					} else {
						tile.setMark('bomb');
					}
					
				} else if(tile.flagged && !tile.bomb){
					tile.setMark('incorrectFlag');
				}
			}
		}
	};

	function handleResetPress(event) {
		event.target.setAttribute('class', 'pressedFace');
	};

	function handleReset(event){
		event.target.setAttribute('class', 'normalFace');
		window.game.gameOver = false;
		window.game.rightMouseDown = false;
		window.game.firstMove = true;
		window.game.board.reset();
	};

	///////HERE
  function handleMouseOver(event){
    if(event.target.className.slice(0, 4) === 'tile'){
      var toTile = window.game.board.getTile([event.target.id.split(',')[0], event.target.id.split(',')[1]]);
    }

    if(event.relatedTarget && event.relatedTarget.className.slice(0, 4) === 'tile'){
	      var fromTile = window.game.board.getTile([event.relatedTarget.id.split(',')[0], event.relatedTarget.id.split(',')[1]])  
		}

    if(window.game.rightMouseDown && window.game.leftMouseDown){
    	if(event.relatedTarget){
		    if(fromTile && !fromTile.revealed && !fromTile.flagged){
		  		fromTile.setMark('concealed');
		  	}
	  	}
    } else if(window.game.leftMouseDown){
    	if(toTile && !toTile.revealed && !toTile.flagged){
	      toTile.setMark('revealed-0');
	  	}

  	if(event.relatedTarget){
	    if(fromTile && !fromTile.revealed && !fromTile.flagged){
	  		fromTile.setMark('concealed');
	  	}
	  }
	  	
    }
//   mouseover
// The element under the pointer is event.target(IE: srcElement).
// The element the mouse came from is event.relatedTarget(IE: fromElement)
  }

  function handleMouseDown(event){
    event.preventDefault();
    if(window.game.gameOver === true){
    	return false;
    }
    fixWhich(event);
    if(event.which === 1){
    	document.getElementById('reset').setAttribute('class', "dangerFace");
      window.game.leftMouseDown = true;
    } else if(event.which === 3) {
      window.game.rightMouseDown = true;
    }

    if(event.target.className.slice(0, 4) === 'tile'){    
      var tile = window.game.board.getTile([event.target.id.split(',')[0], event.target.id.split(',')[1]]);
      if(window.game.rightMouseDown === true && window.game.leftMouseDown === true){

      } else if(window.game.rightMouseDown === true && window.game.leftMouseDown === false){
        if(!tile.revealed){
          tile.setFlag();
        }
      } else if(window.game.leftMouseDown === true){
      	if(!tile.revealed && !tile.flagged){
      		tile.setMark('revealed-0');
      	}
      }
    }
  }

  function handleMouseUp(event){
    event.preventDefault();
    if(window.game.gameOver === true){
    	return false;
    }
    fixWhich(event);
    if(event.which === 1){
  		document.getElementById('reset').setAttribute('class', "normalFace");
      window.game.leftMouseDown = false;
    } else if(event.which === 3) {
      window.game.rightMouseDown = false;
    }

    if(event.target.className.slice(0, 4) === 'tile'){
      var position = [Math.round(event.target.id.split(',')[0]), Math.round(event.target.id.split(',')[1])]
      var tile = window.game.board.getTile([position[0], position[1]])
      if(window.game.firstMove){
	      while(window.game.board.tiles[position[0]][position[1]].bomb){
	      	window.game.board.reset();
	      }	
	      window.game.firstMove = false;
      }
      
      window.game.firstMove = false;
      if(event.which === 1 && window.game.rightMouseDown === false && !tile.revealed && !tile.flagged){
        window.game.board.revealTile([position[0], position[1]]);
		window.game.checkGameDone()
      } else if(((event.which === 1 &&
      					window.game.rightMouseDown === true) ||
      					(event.which === 3 &&
      					window.game.leftMouseDown === true)) &&
      					tile.revealed){
        if(window.game.board.neighborBombCount(position) === window.game.board.neighborFlagCount(position)){
	        window.game.board.revealNeighboringTiles(position);
	        window.game.checkGameDone()
	      }
	    } else if(event.which === 1 && window.game.rightMouseDown === true && !tile.revealed){
	     		tile.setMark('concealed');
      } 
    
    }
    document.getElementById('bombCount').innerHTML = '';
    if(!this.game.gameOver){
    	document.getElementById('bombCount').innerHTML = 'BOMBS LEFT: ' + (this.game.board.bombCount - this.game.flagCount());
	}
    return false;
  }

  function fixWhich(e) {
    if (!e.which && e.button) {
      if (e.button & 1) e.which = 1      // Left
      else if (e.button & 4) e.which = 2 // Middle
      else if (e.button & 2) e.which = 3 // Right
    }
  }

})(this);

