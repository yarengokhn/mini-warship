import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;

    // birden fazla sinüs dalgasını üst üste bindirerek daha doğal bir hareket elde ediyoruz
    float wave1 = sin(pos.x * 0.5 + uTime * 1.2) * 0.12;
    float wave2 = sin(pos.y * 0.3 + uTime * 0.8) * 0.08;
    float wave3 = sin((pos.x + pos.y) * 0.4 + uTime * 1.5) * 0.05;

    float elevation = wave1 + wave2 + wave3;
    pos.z += elevation; // plane rotate edilmeden önce z ekseni = yükseklik

    vElevation = elevation; // fragment shader'da renk için kullanacağız
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vec3 deepColor = vec3(0.0, 0.15, 0.35);   // dalganın çukuru -> koyu mavi
    vec3 shallowColor = vec3(0.15, 0.5, 0.65); // dalganın tepesi -> açık mavi/turkuaz

    // elevation değerine göre iki renk arasında geçiş yap
    float mixFactor = smoothstep(-0.15, 0.15, vElevation);
    vec3 color = mix(deepColor, shallowColor, mixFactor);

    // hafif bir parlaklık/highlight efekti ekle
    float highlight = smoothstep(0.08, 0.15, vElevation) * 0.3;
    color += highlight;

    gl_FragColor = vec4(color, 1.0);
  }
`;

class Sea {
  constructor(listener) {
    // dalga görünmesi için yeterli segment sayısı şart, playable ad için 64x64 makul bir denge
    const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -0.2;

    this.sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    this.audioReady = false;
    this.playOnLoad = false;
    this.isPaused = false;

    audioLoader.load("/sounds/waves.mp3", (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.3);
      this.audioReady = true;
      if (this.playOnLoad) {
        this.sound.play();
      }
      // autoplay tarayıcıda genelde engellenir, kullanıcı etkileşimi bekleyeceğiz (aşağıda)
    });

    this.clock = new THREE.Clock();
  }

  stop() {
    this.isPaused = true;
    this.clock.stop();
    if (this.sound) {
      this.sound.stop();
    }
  }

  resume() {
    this.isPaused = false;
    this.clock.start();
    if (this.audioReady && this.sound && !this.sound.isPlaying) {
      this.sound.play();
    }
  }

  playAmbient() {
    if (!this.audioReady) {
      this.playOnLoad = true;
      return;
    }

    if (this.sound && !this.sound.isPlaying) {
      this.sound.play();
    }
  }

  update() {
    if (this.isPaused) return;
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}

export default Sea;
