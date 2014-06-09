# encoding: utf-8

require_relative "./tile"

class Board

  attr_reader :board

  def initialize
    @board = Array.new(9) { |row| Array.new(9){ |col| Tile.new(self, row, col)}}
    seed_bombs
    @blew_up = false
  end 

  def seed_bombs
    10.times do
      tile = @board.sample.sample

      while tile.bombed?
        tile = @board.sample.sample
      end

      tile.bomb
    end 
  end 

  def display
    @board.each do |row|
      display_row = []

      row.each do |tile|
        display_row << tile.display
      end 

      p display_row.join("   ")
      puts
    end 
  end 

  def display_actual
    @board.each do |row|
      display_row = []

      row.each do |tile|
        display_row << tile.true_display
      end #each

      p display_row.join("   ")
      puts
    end #each
  end #display_actual

  def reveal(row, col)
    @board[row][col].reveal
    @blew_up = @board[row][col].bombed?
  end #reveal

  def flag(row, col)
    @board[row][col].flag
  end #flag

  def lost?
    return @blew_up
  end #lost?

  def won?
    all_tiles = []

    @board.each do |row|
      row.each do |tile|
        all_tiles << tile
      end
    end

    unrevealed_tiles = all_tiles.select { |tile| !tile.revealed?}
    unrevealed_tiles.count == 10
  end 
end 
