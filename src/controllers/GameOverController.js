class GameOverController {
  constructor(ship, sea) {
    this.ship = ship;
    this.sea = sea;

    this.installPrompt = document.getElementById("install-prompt");
    this.installButton = document.getElementById("install-button");

    this.elapsedSeconds = 0;
    this.lastTime = performance.now();
    this.installShown = false;

    this.installButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleInstallClick();
    });
  }

  getInstallUrl() {
    return (
      window.clickTag ||
      window.clickTAG ||
      window.clicktag ||
      this.installButton.dataset.href ||
      this.installButton.getAttribute("href") ||
      "https://example.com"
    );
  }

  //window.mraid — MRAID standardı (IAB'nin mobile reklam standardı, çoğu ağ bunu destekler: AdMob, Unity Ads vb.) → mraid.open(url)
  // window.dapi — bazı SDK'ların (ironSource gibi) kendi API'si → dapi.open(url)
  // window.ExitApi — Facebook/Meta'nın playable ad standardı, ExitApi.exit() çağrısı hem tıklamayı track eder hem yönlendirir (URL'e ihtiyaç duymuyor çünkü Facebook zaten kendi tarafında biliyor nereye gideceğini)
  // clickTag varsa ama yukarıdaki API'ler yoksa → düz window.open(url, "_blank")
  // window.parent.postMessage — eğer oyun bir <iframe> içinde çalışıyorsa (bazı ağlar playable'ı iframe'de gösterir), parent'a mesaj gönderip "kullanıcı tıkladı" bilgisini iletiyor
  // Hiçbiri yoksa → son çare window.open(url)

  handleInstallClick() {
    const url = this.getInstallUrl();

    if (window.mraid && typeof window.mraid.open === "function") {
      window.mraid.open(url);
      return;
    }

    if (window.dapi && typeof window.dapi.open === "function") {
      window.dapi.open(url);
      return;
    }

    if (window.ExitApi && typeof window.ExitApi.exit === "function") {
      window.ExitApi.exit();
      return;
    }

    if (window.clickTag || window.clickTAG || window.clicktag) {
      window.open(url, "_blank");
      return;
    }

    if (typeof window.parent?.postMessage === "function") {
      window.parent.postMessage({ type: "adClick", url }, "*");
    }

    window.open(url, "_blank");
  }

  update() {
    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (!this.ship.isGameOver) {
      this.elapsedSeconds += delta;
    }

    if (!this.installShown && this.elapsedSeconds >= 20) {
      this.showCTA();
    }

    if (this.ship.isGameOver) {
      if (this.sea && !this.sea.isPaused) {
        this.sea.stop();
      }

      this.showCTA();
    }
  }

  //Call To Action
  showCTA() {
    this.installShown = true;

    this.installPrompt.style.display = "flex";
  }
}

export default GameOverController;
