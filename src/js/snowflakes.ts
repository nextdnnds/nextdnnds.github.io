class SnowEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private flakes: Array<[number, number, number, number, number]>; // [x, y, radius, drop, sway]

  constructor(flakeCount = 320) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.flakes = [];

    this.initCanvas();
    this.initFlakes(flakeCount);
    this.animate = this.animate.bind(this);

    window.addEventListener("resize", () => this.updateCanvasSize());
    requestAnimationFrame(this.animate);
  }

  private initCanvas(): void {
    this.canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999";
    document.body.appendChild(this.canvas);
    this.updateCanvasSize();
  }

  private updateCanvasSize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initFlakes(count: number): void {
    const { width, height } = this.canvas;
    this.flakes = Array.from({ length: count }, () => [
      Math.random() * width, // x
      Math.random() * height, // y
      Math.random() * 1.75 + 0.25, // radius
      Math.random() * 1.5 + 0.5, // drop speed
      Math.random() * 0.6 - 0.3, // sway
    ]);
  }

  private animate(): void {
    const { width, height } = this.canvas;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw flakes
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    this.ctx.beginPath();

    // Update and draw flakes
    for (const flake of this.flakes) {
      // Update position
      flake[1] += flake[3]; // y += drop
      flake[0] += flake[4]; // x += sway

      // Wrap horizontally
      if (flake[0] > width) flake[0] -= width;
      else if (flake[0] < 0) flake[0] += width;

      // Reset when below screen
      if (flake[1] > height) {
        flake[1] = -flake[2];
        flake[0] = Math.random() * width;
      }

      // Draw flake
      this.ctx.moveTo(flake[0], flake[1]);
      this.ctx.arc(flake[0], flake[1], flake[2], 0, Math.PI * 2);
    }

    this.ctx.fill();
    requestAnimationFrame(this.animate);
  }
}

// start
new SnowEffect();
