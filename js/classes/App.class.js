'use strict';

var Game= function(canvas)
{
    //canvas utilisé dans la partie
    this.canvas= document.getElementById('canvas');
    this.context= this.canvas.getContext('2d');
    //option du jeu
    this.options = {
        playerWidth: 5,
        playerHeight: 100,
        ballRadius: 5
    };


    //ajout de l'evt

    //this.currentLocation = {y: this.height/2};




    //plateau de jeu
    this.board = new Board(this.canvas.width, this.canvas.height,'black');

    //On fait dessiner le plateau de jeu
    //en appelant le méthode draw de la classe Board
    //en lui passant en paramètre le context
    this.board.draw(this.canvas.getContext("2d"));

    //Initialisation des joueurs
    this.player1 = new Player(this.options.playerWidth, this.options.playerHeight, 0, this.canvas.height / 2 - this.options.playerHeight  /2, '#FFB300');
    this.player2 = new Player(this.options.playerWidth, this.options.playerHeight, this.canvas.width - this.options.playerWidth, this.canvas.height / 2 - this.options.playerHeight  / 2, '#FFB300');
    this.player1.draw(this.context);
    this.player2.draw(this.context);

    //balle
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, this.options.ballRadius,'#FFB300');
    this.ball.draw(this.context);
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    //Mouvement du joueur grâce au touche 38 et 40
    document.addEventListener("keydown", this.keyArrow.bind(this));
    // document.addEventListener('collide',this.collide.bind(this));
    this.refresh();
    this.loop();
   // console.log(this.board.canvas);
};
// Game.prototype.collide = function(ball, player)
// {
//     if(
//         ((ball.y +  (ball.height.y / 2)) < (player.y - (player.height.y / 2))) || //ball is under paddle
//         ((ball.y -  (ball.height.y / 2)) > (player.y + (player.height.y / 2))) || //ball is over paddle
//         ((ball.x +  (ball.width.x / 2)) < (player.x - (player.width.x / 2))) || //ball is left from the paddle
//         ((ball.x -  (ball.width.x / 2)) > (player.x + (player.width.x / 2)))      //ball is right from the paddle
//     )
//     {
//         //no collision
//     }
//     else
//     {
//         alert("collision");
//         ball.speed.x = -ball.speed.x + (-ball.speed.x * 0.1);
//     }
//
// };
// fonction associée aux boutons 38 et 40
Game.prototype.keyArrow = function(e)
{
    if(e.keyCode == 38 || e.keyCode == 40){
    e.preventDefault();
    }

    if (e.keyCode == 38 && this.player2.y  >= 0) {
    this.player2.y -= 5;

    }
    else if (e.keyCode == 40 && this.player2.y < this.canvas.height-this.options.playerHeight) {
    this.player2.y += 5;

    }
};
// fonction associée aux mvt des players

Game.prototype.onMouseMove = function(event)
{
    var rectangle = this.canvas.getBoundingClientRect()
    var location = {
        x: event.clientX - rectangle.x,
        y: event.clientY - rectangle.y
    };

    if (location.y  < this.options.playerHeight/2)
    {
        location.y = this.options.playerHeight/2;
    }
    else if (location.y > this.canvas.height-this.options.playerHeight/2)
    {
        location.y = this.canvas.height - this.options.playerHeight /2;
    }
    this.player1.y = location.y - this.options.playerHeight / 2;

};


Game.prototype.loop = function()
{
        requestAnimFrame(this.loop.bind(this));
        this.updateSpeed();
        this.refresh();
};

Game.prototype.refresh = function()
{
    this.board.draw(this.context);
    this.player1.draw(this.context);
    this.player2.draw(this.context);
    this.ball.draw(this.context);
};

Game.prototype.updateSpeed = function()
{
    var player = null; //Représente le joueur qui va devoir réceptionner la balle

    if(this.ball.y >= this.canvas.height || this.ball.y <= 0)
    {
        this.ball.speed.y *= -1;
    }

    this.ball.x += this.ball.speed.x;
    this.ball.y += this.ball.speed.y;

    //Récupération du joueur qui va devoir taper la balle
    if(this.ball.x < this.options.playerWidth)
    {
        player = this.player1;
    }
    else if (this.ball.x > this.canvas.width - this.options.playerWidth)
    {
        player = this.player2;

    }

    //Est-ce qu'un joueur est suffisamment proche pour taper dans la balle ?
    if(player != null)
    {
        //Si la balle se trouve à portée de raquettte
        if(this.ball.y > player.y && this.ball.y < player.y + this.options.playerHeight)
        {
            //On renvoie la balle
            this.ball.speed.x *= -1;
        }
        else
        {
            //Le joueur a perdu le point
            //Balle au centre
            this.ball.x = this.canvas.width / 2;
            this.ball.Y = this.canvas.height / 2;
        }
    }



};


