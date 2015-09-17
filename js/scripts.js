'use strict';

var Space = function(x, y, mark){
  this.x = x;
  this.y = y;
  this.mark = mark;
}

Space.prototype.createMark = function(player) {
  if (this.mark === "") {
    this.mark = player.mark;
  }
}

var Board = function(){
  this.spaces = [];
}

Board.prototype.fill = function() {
  if (this.spaces.length === 0) {
    for (var i = 0; i < 3; i += 1) {
      for (var j = 0; j < 3; j += 1) {
        this.spaces.push(new Space(i, j, ""));
      }
    }
  }
  return this.spaces;
}

var Player = function(name,mark) {
  this.name = name;
  this.mark = mark;
}

var Game = function(playerOne, playerTwo, board) {

  this.board = board;
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;

};

// Game.prototype.isOver = function() {
//   this.board.spaces.forEach(function() {
//
//   });
// }

Game.prototype.lineWin = function(currentSpace, axis) {
  var allSpaces = this.board.spaces;
  var win = true;
  axis = axis.toLowerCase();
  var filteredSpaces = allSpaces.filter(function(space) {
    return space[axis] === currentSpace[axis]
  });

  filteredSpaces.forEach(function(filteredSpace) {
    if (filteredSpace.mark !== currentSpace.mark) {
      win = false;
    }

  });
  return win;
}

Game.prototype.diagWin = function(currentSpace) {
  var allSpaces = this.board.spaces;
  var win = true;
  if ((currentSpace.x + currentSpace.y) % 2 !== 0) {
    win = false;
  } else {
    var filteredSpaces = allSpaces.filter(function(space) {
      return Math.abs(space.x - currentSpace.x) === Math.abs(space.y - currentSpace.y)
    });

    filteredSpaces.forEach(function(filteredSpace) {
      if (filteredSpace.mark !== currentSpace.mark) {
        win = false;
      }
    });
  }
  return win;
}

function playAgain() {
  location.reload();
}



$(document).ready(function(){

  var game,
  win,
  playerOne,
  playerOneMark,
  playerTwo,
  playerTwoMark,
  board,
  currentSpace,
  turn = 1;

  $('#player-form').submit(function(event){

    event.preventDefault();

    playerOneMark = $('#playerOne-mark').val();
    playerTwoMark = $('#playerTwo-mark').val();

    playerOne = new Player ($('#playerOne-name').val(), playerOneMark);
    playerTwo = new Player ($('#playerTwo-name').val(), playerTwoMark);
    board = new Board();
    board.fill();

    game = new Game(playerOne, playerTwo, board);

    $('#playerOne-displayMark').text(playerOne.mark);
    $('#playerTwo-displayMark').text(playerTwo.mark);

    $('#new-players').hide();
    $('.game-space').show();
    $('span.current-player').text(playerOne.name);
  });

  $('td.blank-space').each(function() {
    $(this).click(function() {
      var currentPlayer = playerOne;
      var otherPlayer = playerTwo;
      if (turn % 2 === 0) {
        otherPlayer = playerOne;
        currentPlayer = playerTwo;
      }
      $('span.current-player').text(otherPlayer.name);

      var index = parseInt($(this).attr('id'));
      currentSpace = board.spaces[index];
      currentSpace.createMark(currentPlayer);
      $(this).text(board.spaces[index].mark);

      win = game.lineWin(currentSpace, 'x') ||
            game.lineWin(currentSpace, 'y') ||
            game.diagWin(currentSpace);

      turn += 1;
      if (win === true) {
        $('div.game-space').hide();
        $('div.game-over').show();
        $('h1.game-over-message').text(currentPlayer.name + " has defeated " +
                                    otherPlayer.name);
      } else if (turn === 10) {
        $('div.game-over').show();
        $('h1.game-over-message').text("CatScratch #!%*");
      }
      $(this).unbind("click");
    });
  });

});
