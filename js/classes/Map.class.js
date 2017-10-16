'use strict';

var Player = function(width,height,x, y, color)
{
    this.width= width;
    this.height= height;
    this.color = color;
    this.x = x;
    this.y = y;
};
//methode qui permet de dessiner les joueurs

Player.prototype.draw = function(context)
{
    //Dessine le rectangle en fond
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};