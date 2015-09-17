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

Game.prototype.computerPick = function(difficulty, player, otherPlayer) {
  if (difficulty === "easy") {
    var condition = false;
    while (condition === false) {
      var index = Math.floor(Math.random() * 9);
      if (this.board.spaces[index].mark === "") {
        this.board.spaces[index].createMark(player);
        condition = true;
        var space = this.board.spaces[index];
        return space;
      }
    }
  }

  if (difficulty === "hard" || difficulty === "impossible") {
    var block = false;

    for(var i = 0; i < this.board.spaces.length; ++i) {
      var originMark = this.board.spaces[i].mark;

      if (originMark === "") {
        this.board.spaces[i].mark = "o";
        var tempSpace = this.board.spaces[i];
        if (this.lineWin(tempSpace, "x") || this.lineWin(tempSpace, "y") || this.diagWin(tempSpace)) {
          block = true;
          var space = tempSpace;
          this.board.spaces[i].mark = "o";
          return space;
        } else {
          this.board.spaces[i].mark = "";
          this.board.spaces[i].mark = "x";
          tempSpace = this.board.spaces[i];
          if (this.lineWin(tempSpace, "x") || this.lineWin(tempSpace, "y") || this.diagWin(tempSpace)) {
            block = true;
            this.board.spaces[i].mark = "";
            this.board.spaces[i].mark = "o";
            var space = tempSpace;
            return space;
          } else {
            this.board.spaces[i].mark = originMark;
          }
        }
      }
    }

    if (block === false) {
      // Pick Center if available
      if (this.board.spaces[4].mark === "") {
        this.board.spaces[4].mark = "o";
        var space = this.board.spaces[4];
      // If "x" picked Center
      } else if (this.board.spaces[4].mark === "x" && this.board.spaces[0].mark ==="") {
        this.board.spaces[0].mark = "o";
        var space = this.board.spaces[0];
      } else if (this.board.spaces[0].mark === "o" && this.board.spaces[8].mark === "x" && this.board.spaces[4].mark === "x" && this.board.spaces[6].mark === "") {
        this.board.spaces[6].mark = "o";
        var space = this.board.spaces[6];
      } else if (difficulty === "impossible" && this.board.spaces[0].mark === "x" && this.board.spaces[8].mark === "x" && this.board.spaces[1].mark === "") {
        this.board.spaces[1].mark = "o";
        var space = this.board.spaces[1];
      } else if (difficulty === "impossible" && this.board.spaces[2].mark === "x" && this.board.spaces[6].mark === "x" && this.board.spaces[1].mark === "") {
        this.board.spaces[1].mark = "o";
        var space = this.board.spaces[1];
      } else if (difficulty === "impossible" && this.board.spaces[0].mark === "x" && this.board.spaces[5].mark === "x" && this.board.spaces[2].mark === "") {
        this.board.spaces[2].mark = "o";
        var space = this.board.spaces[2];
      } else if (difficulty === "impossible" && this.board.spaces[0].mark === "x" && this.board.spaces[7].mark === "x" && this.board.spaces[6].mark === "") {
        this.board.spaces[6].mark = "o";
        var space = this.board.spaces[6];
      } else if (difficulty === "impossible" && this.board.spaces[2].mark === "x" && this.board.spaces[3].mark === "x" && this.board.spaces[0].mark === "") {
        this.board.spaces[0].mark = "o";
        var space = this.board.spaces[0];
      } else if (difficulty === "impossible" && this.board.spaces[2].mark === "x" && this.board.spaces[7].mark === "x" && this.board.spaces[8].mark === "") {
        this.board.spaces[8].mark = "o";
        var space = this.board.spaces[8];
      } else if (difficulty === "impossible" && this.board.spaces[6].mark === "x" && this.board.spaces[1].mark === "x" && this.board.spaces[0].mark === "") {
        this.board.spaces[0].mark = "o";
        var space = this.board.spaces[0];
      } else if (difficulty === "impossible" && this.board.spaces[6].mark === "x" && this.board.spaces[5].mark === "x" && this.board.spaces[8].mark === "") {
        this.board.spaces[8].mark = "o";
        var space = this.board.spaces[8];
      } else if (difficulty === "impossible" && this.board.spaces[8].mark === "x" && this.board.spaces[3].mark === "x" && this.board.spaces[6].mark === "") {
        this.board.spaces[6].mark = "o";
        var space = this.board.spaces[6];
      } else if (difficulty === "impossible" && this.board.spaces[8].mark === "x" && this.board.spaces[1].mark === "x" && this.board.spaces[2].mark === "") {
        this.board.spaces[2].mark = "o";
        var space = this.board.spaces[2];
      } else {
        var condition = false;
        while (condition === false) {
          var index = Math.floor(Math.random() * 9);
          if (this.board.spaces[index].mark === "") {
            this.board.spaces[index].mark = "o";
            condition = true;
            var space = this.board.spaces[index];
            return space;
          }
        }
      }
    }
  }
  return space;
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

    playerOne = new Player ($('#playerOne-name').val() + " (X)", playerOneMark);
    if (playerOne.name === " (X)") {
      playerOne.name = "Boring Name (X)"
    }
    playerTwo = new Player ($('#playerTwo-name').val() + " (O)", playerTwoMark);
    if (playerTwo.name === " (O)") {
      playerTwo.name = "Too Lazy to type a name (O)"
    }
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

    playerOne = new Player ($('#humanPlayer-name').val() + " ("+playerOneMark+")", playerOneMark);
    if (playerOne.name === " ("+playerOneMark+")") {
      playerOne.name = "Boring Name ("+playerOneMark+")"
    }
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
        $('td.blank-space').unbind("click")
        $('div.game-over').fadeIn();
        $('h1.game-over-message').text(currentPlayer.name + " has defeated " +
                                    otherPlayer.name);
      } else if (turn === 10) {
        $('div.game-over').show();
        $('h1.game-over-message').text("CatScratch #!%*");
      } else {

        if (otherPlayer.difficulty !== "human") {
          currentSpace = game.computerPick(otherPlayer.difficulty, playerOne, playerTwo);
          $("." + currentSpace.x + currentSpace.y).text(playerTwo.mark);
          $("." + currentSpace.x + currentSpace.y).unbind("click");

          win = game.lineWin(currentSpace, 'x') ||
          game.lineWin(currentSpace, 'y') ||
          game.diagWin(currentSpace);

          turn += 1;
          if (win === true) {
            $('td.blank-space').unbind("click")
            $('h1.game-over-message').text(playerTwo.name + " has defeated " +
            playerOne.name);
            $('div.game-over').fadeIn();
          } else if (turn === 10) {
            $('h1.game-over-message').text("CatScratch #!%*");
            $('div.game-over').fadeIn();
          }
        }
      }
    });
  });
});
