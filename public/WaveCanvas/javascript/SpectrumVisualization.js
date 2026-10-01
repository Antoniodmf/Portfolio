import { AudioVisualization } from "./AudioVisualization.js";

export class SpectrumVisualization extends AudioVisualization {
  constructor(canvas, audioProcessor) {
    super(canvas, audioProcessor);
    this.name = "Espectro de Frequências";
    // Inicializar propriedades específicas
    this.defaultBarHeight = 2;
  }

  async draw() {
    // TODO: desenhar espectro de frequências
    this.clearCanvas();
    // Implementação básica para teste
    const data = this.audioProcessor
      ? this.audioProcessor.getFrequencyData()
      : this.testData;
    const barWidth = (this.canvas.clientWidth / data.length) * 3;

    for (let i = 0; i < data.length; i++) {
      var barHeight =
        (data[i] / 255) * this.canvas.clientHeight * this.defaultBarHeight;
      const x = (i * barWidth) / 2;
      const y = this.canvas.height - barHeight;

      this.ctx.fillStyle = `hsla(${(i / data.length) * 360}, 100%, 60%, 1)`;
      this.ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
  }

  getProperties() {
    // TODO: obter propriedades específicas
    return super.getProperties();
  }
}
