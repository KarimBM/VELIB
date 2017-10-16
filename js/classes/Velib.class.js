'use strict';

var Ball  = function(x,y,radius,color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = {
        x: 4,
        y: 4
    };
};

Ball.prototype.draw = function(context)
{
    // console.log('ball');
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
};
