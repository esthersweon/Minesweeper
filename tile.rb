# encoding: utf-8
class Tile

  def initialize(board, row, col)
    @board = board
    @bombed = false
    @revealed = false
    @flagged = false
    @row = row
    @col = col
  end #initialize

  def display
    if flagged?
      return "💩"
    elsif revealed?
      if bombed?
        return "💣"
      elsif neighbor_bomb_count > 0
        return neighbor_bomb_count.to_s
      else
        return "_"
      end
    else
      return "█"
    end
  end #display

  def true_display
    bombed? ? "💣" : display
  end

  def bombed?
    @bombed
  end #bombed?

  def bomb
    @bombed = true
  end #bomb

  def flagged?
    @flagged
  end #flagged?

  def flag
    @flagged = !@flagged if !revealed?
  end #flag

  def revealed?
    @revealed
  end #revealed?

  def reveal
    flag if flagged?
    @revealed = true

    if (!bombed? && !(neighbor_bomb_count > 0))
      neighbors_to_expand = @neighbors.select { |neighbor| !neighbor.bombed? && !neighbor.revealed? }
      neighbors_to_expand.each do |neighbor|
        neighbor.reveal
      end # each
    end # if
  end #reveal

  def neighbors
    @neighbors ||= begin
      @neighbors = []
      deltas = [-1, 0, 1].product([-1, 0, 1])
      deltas.delete([0,0])

      deltas.each do |row_offset, col_offset|
        if ((@row + row_offset).between?(0, 8) && (@col + col_offset).between?(0, 8))
          @neighbors << @board.board[@row + row_offset][@col + col_offset]
        end #if
      end #each
      @neighbors
    end #begin
  end #neighbors

  def neighbor_bomb_count
    @neighboring_bomb_count ||= begin
      @neighboring_bomb_count = 0

      neighbors.each do |neighbor|
        @neighboring_bomb_count += 1 if neighbor.bombed?
      end #each

      @neighboring_bomb_count
    end
  end #neighbor_bomb_count
end #Tile
