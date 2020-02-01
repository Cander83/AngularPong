import { Position } from './position';

export class Paddle
{
    paddlePosition: Position = new Position();

    constructor(x: number, y: number)
    {
        this.paddlePosition.x = x;
        this.paddlePosition.y = y;
    }

}