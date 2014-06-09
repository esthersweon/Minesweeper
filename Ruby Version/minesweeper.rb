#!/usr/bin/env ruby
# encoding: utf-8

require 'yaml'
require_relative './board'

class Minesweeper

  attr_reader :board

  def initialize
    @board = Board.new
  end 

  def play
    while (!@board.lost? && !@board.won?)
      @board.display

      puts "Enter 'r' to reveal and 'f' to flag a tile. Enter 's' if you want to save your game and return later."
      action = gets.chomp

      save if action == 's'

      puts "Enter row number (1-9)."
      row = gets.chomp.to_i             
      puts "Enter column number (1-9)."
      col = gets.chomp.to_i

      if action == "f"
        @board.flag(row-1, col-1)
      elsif action == "r"
        @board.reveal(row-1, col-1)
      end 
    end 

    finish
  end 

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
end 



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