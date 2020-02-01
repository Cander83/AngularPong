import { Position } from './position';
import { RectangleDimensions } from './RectangleDimensions';

export class Paddle
{
    paddlePosition: Position = new Position();

    paddleSize: RectangleDimensions = new RectangleDimensions();

    constructor(x: number, y: number)
    {
        this.paddleSize = new RectangleDimensions();
        this.paddleSize.HEIGHT = 100;
        this.paddleSize.WIDTH = 10;

        this.paddlePosition.x = x;
        this.paddlePosition.y = y;
    }

}