import { AudioProcessor } from "./AudioProcessor.js";
import { VisualizationEngine } from "./VisualizationEngine.js";
import { UIManager } from "./UIManager.js";
import { ExportManager } from "./ExportManager.js";

// Classe principal da aplicação
export class App {
  constructor() {
    this.audioProcessor = new AudioProcessor();
    this.visualizationEngine = new VisualizationEngine(
      "audioCanvas",
      this.audioProcessor
    );
    this.uiManager = new UIManager(this);
    this.exportManager = new ExportManager(this.visualizationEngine);
    // Criação do contexto
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    // Estados do contexto
    console.log(this.audioContext.state); // 'suspended', 'running', 'closed'
    // Inicialização
    this.init();
  }

  init() {
    // TODO: inicializar a aplicação
    console.log("App inicializada");
  }

  async startMicrophone() {
    await this.audioProcessor.startMicrophone();
    document.getElementById("stopAudio").disabled = false;
    this.uiManager.setButtonStates(true);
  }

  async loadAudioFile(file) {
    // TODO: carregar ficheiro de áudio
    await this.audioProcessor.loadAudioFile(file);
    this.uiManager.setButtonStates(true);
    console.log("Carregando ficheiro de áudio...");
  }

  async stopAudio() {
    // TODO: parar áudio
    console.log("Parando áudio...");
    this.uiManager.setButtonStates(false);
    await this.audioProcessor.stop();
  }

  async pausePlayAudio() {
    await this.audioProcessor.resumeAudio();
  }

  setVisualization(type) {
    // TODO: definir tipo de visualização
    this.visualizationEngine.setVisualization(type);
  }

  async setVolume(value) {
    // TODO: aleterar volume audio
    this.audioProcessor.calculateAudioLevel(value);
  }

  setFreq(freq) {
    this.audioProcessor.generateFreq(freq);
  }

  exportFrame() {
    // TODO: exportar frame atual
    console.log("Exportando frame...");
  }

  destroy() {
    // TODO: limpar recursos
    console.log("Destruindo aplicação...");
  }
}

// Inicialização da aplicação quando o DOM estiver carregado
window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  window.app = app;
});
