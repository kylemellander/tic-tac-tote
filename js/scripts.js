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
    for (var x = 0; x < 3; x += 1) {
      for (var y = 0; y < 3; y += 1) {
        this.spaces.push(new Space(x, y, ""));
      }
    }
  }
  return this.spaces;
}

var Player = function(name,mark) {
  this.name = name;
  this.mark = mark;
  this.difficulty = "human";
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

Game.prototype.computerPick = function(difficulty, player) {
  if (difficulty === "easy") {
    var condition = false;
    while (condition === false) {
      var index = Math.floor(Math.random() * 9);
      if (this.board.spaces[index].mark === "") {
        this.board.spaces[index].createMark(player);
        condition = true;
        var space = this.board.spaces[index];
      }
    }
    return space;
  }
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

  $("#computer-form").submit(function(event) {
    event.preventDefault();

    playerOneMark = $("#humanPlayer-mark").val();
    if (playerOneMark === "x") {
      playerTwoMark = "o";
    } else {
      playerTwoMark = "x";
    }

    playerOne = new Player ($('#humanPlayer-name').val(), playerOneMark);
    playerTwo = new Player ("Computer", playerTwoMark);
    playerTwo.difficulty = $("#difficulty").val();

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
      if (otherPlayer.difficulty === "human") {
        if (turn % 2 === 0) {
          otherPlayer = playerOne;
          currentPlayer = playerTwo;
        }
        $('span.current-player').text(otherPlayer.name);
      }

      var index = parseInt($(this).attr('id'));
      currentSpace = game.board.spaces[index];
      currentSpace.createMark(currentPlayer);
      $(this).text(game.board.spaces[index].mark);
      $(this).unbind("click");

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
      } else {

        if (otherPlayer.difficulty !== "human") {
          currentSpace = game.computerPick(otherPlayer.difficulty, otherPlayer);
          $("." + currentSpace.x + currentSpace.y).text(playerTwo.mark);
          $("." + currentSpace.x + currentSpace.y).unbind("click");

          win = game.lineWin(currentSpace, 'x') ||
          game.lineWin(currentSpace, 'y') ||
          game.diagWin(currentSpace);

          turn += 1;
          if (win === true) {
            $('div.game-space').hide();
            $('div.game-over').show();
            $('h1.game-over-message').text(otherPlayer.name + " has defeated " +
            currentPlayer.name);
          } else if (turn === 10) {
            $('div.game-over').show();
            $('h1.game-over-message').text("CatScratch #!%*");
          }
        }
      }
    });
  });
});
