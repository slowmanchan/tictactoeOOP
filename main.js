window.onload = function() {
  function Game() {
    this.winState = [
      [1,2,3],[4,5,6],[7,8,9],
      [1,4,7],[2,5,8],[3,6,9],
      [1,5,9],[3,5,7]
    ];
    this.board = new Board();
    this.p1 = new Player('p1');
    this.p2 = new Player('p2');
    this.turn = this.p1;

    this.checkWin = function() {
      for (var i = 0; i < this.winState.length; i++) {
        this.turn.winningMoves = 0;
        for (var j = 0; j < this.winState[i].length; j++) {
          if (this.turn.moves.indexOf(this.winState[i][j]) !== -1) {
            this.turn.winningMoves++
          }
          if (this.turn.winningMoves === 3) {
            if (this.turn.player == 'p1') {
              var score = document.getElementById('p1');
              score.innerHTML = 'P1: ' + ++scoreboard.p1;
            } else {
              var score = document.getElementById('p2');
              score.innerHTML = 'P2: ' + ++scoreboard.p2;
            }
            debugger;
            var alert = document.getElementById('alert');
            alert.style.display = 'inline-block';
            alert.innerHTML = this.turn.player + ' wins';
            setTimeout(function() {
              alert.style.display = 'none';
            }, 2000)
          }
        }
      }
    }
  }
  function ScoreBoard() {
    this.p1 = 0;
    this.p2 = 0;
  }

  function Player(player) {
    this.player = player
    this.moves = [];
    this.winningMoves = 0;
  }

  function Board() {
    if (document.getElementById('board')) {
      document.getElementById('board').remove();

    }
    this.board = document.createElement('div');
    this.board.id = 'board';
    document.body.append(this.board);

    for (var i = 1; i < 10; i++) {
      var cell = document.createElement('div');
      cell.id = i;
      this.board.append(cell);
    }

    this.board.addEventListener('click', function(e){
      if (!e.target.innerHTML) {
        e.target.innerHTML = game.turn == game.p1 ? 'X' : 'O';
        game.turn.moves.push(+e.target.id);
        game.checkWin();
        game.turn = game.turn == game.p1 ? game.p2 : game.p1;
      }
    });
  }

  var resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function() {
    game = new Game();
  });

  var game = new Game();
  var scoreboard = new ScoreBoard();
}
