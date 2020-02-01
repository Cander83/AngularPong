export class BackgroundViewModel
{
    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(width: number, height: number)
    {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, width, height);
    }
}