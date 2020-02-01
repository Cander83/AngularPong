import { Position } from './position';

export class Ball
{
    ballPosition: Position = new Position(50, 50);

    ballSpeedX: number = 10;
    ballSpeedY: number = 4;

    constructor() 
    {
        this.ballPosition.x = 50;
        this.ballPosition.y = 50;
    }

    move()
    {
        this.ballPosition.x = this.ballPosition.x + this.ballSpeedX;
        this.ballPosition.y = this.ballPosition.y + this.ballSpeedY;

    }

    reset(fieldWidth: number, fieldHeight: number)
    {
        console.log("Ball Reset!!!")

        this.ballPosition.x = fieldWidth / 2;
        this.ballPosition.y = fieldHeight / 2;

    }

    bounceHorizontal()
    {
        this.ballSpeedX = -this.ballSpeedX;

    }

    bounceVertical()
    {
        this.ballSpeedY = -this.ballSpeedY;

    }
}