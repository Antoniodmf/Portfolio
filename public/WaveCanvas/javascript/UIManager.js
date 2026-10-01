export class UIManager {
  constructor(app) {
    this.app = app;
    this.visualizationEngine = app.visualizationEngine;
    this.audioProcessor = app.audioProcessor;

    // Inicializar interface
    this.setupEventListeners();
    this.setupAudioLevels();
  }

  updateAudioInfo() {
    // TODO: atualizar informações de áudio
    const audioStatus = document.getElementById("audioStatus");
    const isPlaying = this.app.audioProcessor.getIsPlaying();

    audioStatus.textContent = isPlaying ? "Áudio: Ativo" : "Áudio: Parado";
    audioStatus.style.color = "#e6e6e6";
  }

  setButtonStates(playing) {
    // TODO: atualizar estados dos botões
    document.getElementById("startMic").disabled = playing;
    document.getElementById("stopAudio").disabled = !playing;
    this.updateAudioInfo();
  }

  showError(message) {
    // TODO: mostrar mensagem de erro
    const errorModal = document.getElementById("errorModal");
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = message;
    errorModal.classList.remove("hidden");

    document.querySelector(".close").onclick = () => {
      errorModal.classList.add("hidden");
    };

    window.onclick = (event) => {
      if (event.target === errorModal) {
        errorModal.classList.add("hidden");
      }
    };
  }

  setupEventListeners() {
    // TODO: configurar event listeners
    document.getElementById("startMic").addEventListener("click", () => {
      this.app.startMicrophone();
      document.getElementById("freqGenerator").value = 0;
    });

    document.getElementById("stopAudio").addEventListener("click", () => {
      document.getElementById("resumeAudio").disabled = true;
      document.getElementById("resumeAudio").querySelector("i").className =
        "fa-solid fa-lg fa-pause";
      document.getElementById("audioFile").value = "";
      document.getElementById("audioCanvas").value = "";
      document.getElementById("freqGenerator").value = 0;
      this.app.stopAudio();
    });

    const resumeBtn = document.getElementById("resumeAudio");
    const pausePlayIcon = resumeBtn.querySelector("i");
    resumeBtn.addEventListener("click", () => {
      pausePlayIcon.classList.toggle("fa-play");
      pausePlayIcon.classList.toggle("fa-pause");
      this.app.pausePlayAudio();
    });

    document.getElementById("audioFile").addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        this.app.loadAudioFile(e.target.files[0]);
        document.getElementById("resumeAudio").disabled = false;
      }
    });

    this.app.setVisualization(
      document.getElementById("visualizationType").value
    );

    document
      .getElementById("visualizationType")
      .addEventListener("change", (e) => {
        this.app.setVisualization(e.target.value);
      });

    document.getElementById("exportPNG").addEventListener("click", () => {
      this.app.exportManager.exportAsPNG();
    });

    document.getElementById("exportJPEG").addEventListener("click", () => {
      this.app.exportManager.exportAsJPEG(0.9);
    });

    document.getElementById("range4").addEventListener("input", (e) => {
      this.app.setVolume(e.target.value);
    });

    document.getElementById("freqGenerator").addEventListener("input", (e) => {
      this.app.setFreq(e.target.value);
      document.getElementById("startMic").disabled = false;
      document.getElementById("stopAudio").disabled = false;
      document.getElementById("resumeAudio").disabled = false;
      document.getElementById("resumeAudio").querySelector("i").className =
        "fa-solid fa-lg fa-pause";
    });

    const canvas = document.getElementById("audioCanvas");
    const fullscreenBtn = document.getElementById("fullScreenBtn");
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.getElementById("canvasWrapper").requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
    canvas.addEventListener("dblclick", () => {
      if (!document.fullscreenElement) {
        document.getElementById("canvasWrapper").requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
    window.addEventListener("resize", () =>
      this.app.visualizationEngine.resizeCanvas()
    );
  }

  setupAudioLevels() {
    // TODO: configurar monitorização de níveis de áudio
    const rangeInput = document.getElementById("range4");
    const rangeOutput = document.getElementById("rangeValue");

    // Set initial value
    rangeOutput.textContent = rangeInput.value;

    rangeInput.addEventListener("input", function () {
      rangeOutput.textContent = this.value;
    });
  }
}
