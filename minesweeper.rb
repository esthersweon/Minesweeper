#!/usr/bin/env ruby
# encoding: utf-8

require 'yaml'
require_relative './board'

class Minesweeper

  attr_reader :board

  def initialize
    @board = Board.new
  end #initialize

  def play
    while (!@board.lost? && !@board.won?)
      @board.display

      puts "Enter 'r' for reveal or 'f' for flag (or 'save')"
      action = gets.chomp

      save if action == 'save'

      puts "Enter coordinates."
      row, col = gets.chomp.split(" ")                     #array
      row, col = row.to_i, col.to_i

      if action == "f"
        @board.flag(row, col)
      elsif action == "r"
        @board.reveal(row, col)
      end #if
    end #while

    finish
  end #play

  def save
    p "Enter a file name"
    file_name = gets.chomp
    File.open(file_name, 'w') { |file| file.write(self.to_yaml)}
    abort
  end

  def finish
    @board.display_actual
    puts @board.won? ? "You won!" : "You lost!"
  end
end #Minesweeper



if __FILE__ == $PROGRAM_NAME
  p "Enter a save file if you would like to resume (else ENTER)."
  save_file = gets.chomp

  if save_file.empty?
    game = Minesweeper.new
  else
    game = YAML::load_file(save_file)
  end

  game.play
end