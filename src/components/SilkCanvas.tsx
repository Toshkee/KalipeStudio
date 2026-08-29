"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Flowing velvet: domain-warped fbm noise in Kalipè burgundy,
// with a faint gold shimmer along the ridges.
//
// Cijena se plaća u sin(): jedan hash = jedan sin, noise zove hash četiri
// puta, fbm zove noise jednom po oktavi, a main zove fbm pet puta. Pet
// oktava je 100 sin() po pikselu. Zato telefon dobija četiri — peta oktava
// nosi 3% amplitude na frekvenciji koja je na 390px ekranu ispod piksela,
// pa se ne vidi, a košta kao i sve ostale.
const frag = (octaves: number) => `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < ${octaves}; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(13.7, 7.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 1.6;
  float t = u_time * 0.05;

  vec2 drift = (u_mouse - 0.5) * 0.18;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 2.6 * q + vec2(1.7, 9.2) + t * 0.7 + drift),
    fbm(p + 2.6 * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(p + 3.0 * r);

  vec3 base   = vec3(0.055, 0.016, 0.024);
  vec3 wine   = vec3(0.33, 0.05, 0.09);
  vec3 glow   = vec3(0.55, 0.11, 0.16);
  vec3 gold   = vec3(0.79, 0.63, 0.29);

  vec3 col = mix(base, wine, smoothstep(0.15, 0.75, f));
  col = mix(col, glow, smoothstep(0.55, 0.95, f) * 0.7);
  col += gold * pow(clamp(r.x * r.y, 0.0, 1.0), 4.0) * 0.10;

  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.42)));
  col *= mix(0.35, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function SilkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const phone = window.matchMedia("(max-width: 640px)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag(phone ? 4 : 5)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    // Na telefonu bez množenja piksela: 1.5× je 2,25 puta više posla za
    // šum koji je ionako mutan. Na desktopu 1.5 ostaje.
    const dprCap = phone ? 1 : 1.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, dprCap);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      // Bez ovog uslova skrivanje adresne trake na telefonu okida resize
      // pri svakom skrolu, a svaki upis u canvas.width iznova alocira i
      // briše GL bafer.
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    // `frame === 0` znači da frejm nije zakazan. Bez ovog čuvara je
    // moguće pokrenuti drugu rAF petlju paralelno s prvom i crtati dvaput.
    let frame = 0;
    let onScreen = true;
    let visible = document.visibilityState === "visible";
    const start = performance.now();

    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const schedule = () => {
      if (frame || reduce || !onScreen || !visible) return;
      frame = requestAnimationFrame(tick);
    };

    const tick = () => {
      frame = 0;
      render();
      schedule();
    };

    render();
    schedule();

    // Hero je 844px visok na stranici od 7700px. Bez ovoga shader nastavlja
    // da crta i kad je odavno iza nas — izmjereno 360 crtanja u 422 ms dok
    // je platno bilo 6777px iznad ekrana.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        schedule();
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      onScreen = false;
      visible = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
