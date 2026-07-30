"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

/*
 * The signature artifact: a sheet of oxblood velvet.
 *
 * A domain-warped fbm height field is lit by ONE directional source raking
 * in from the upper left, so the folds get real diffuse falloff and a
 * retroreflective sheen along their crests. No centred radial halo, no
 * symmetric bloom. The light direction leans toward the pointer, so the
 * fabric answers the user. Fine grain is dithered in at the end to kill
 * banding, and the bottom of the frame resolves into the page ink so the
 * hero hands off to the next section with no seam.
 */
const FRAG = `
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
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(13.7, 7.1);
    a *= 0.5;
  }
  return v;
}

// Height of the cloth at a point: fbm warped by another fbm, drifting slowly.
float cloth(vec2 p, float t) {
  vec2 q = vec2(fbm(p + 0.16 * t), fbm(p + vec2(5.2, 1.3) - 0.11 * t));
  vec2 r = vec2(
    fbm(p + 2.4 * q + vec2(1.7, 9.2) + 0.09 * t),
    fbm(p + 2.4 * q + vec2(8.3, 2.8) - 0.06 * t)
  );
  return fbm(p + 2.7 * r);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  // Anisotropic: the field varies faster across the frame than down it, so
  // the folds hang like drape instead of pooling into isotropic blobs.
  vec2 p = vec2(uv.x * aspect * 1.75, uv.y * 0.72);
  float t = u_time;

  // Surface normal from the height field, by finite difference.
  float e = 1.6 / u_res.y;
  float h  = cloth(p, t);
  float hx = cloth(p + vec2(e, 0.0), t);
  float hy = cloth(p + vec2(0.0, e), t);
  vec3 n = normalize(vec3((h - hx) / e, (h - hy) / e, 1.0) * vec3(0.045, 0.045, 1.0));

  // One light, raking in from the upper left, leaning toward the pointer.
  vec3 lightDir = normalize(vec3(-0.62 + (u_mouse.x - 0.5) * 0.5,
                                  0.70 + (u_mouse.y - 0.5) * 0.3,
                                  0.46));
  float diffuse = clamp(dot(n, lightDir), 0.0, 1.0);

  // Velvet answers the eye along the grazing angles, not head on.
  vec3 view = vec3(0.0, 0.0, 1.0);
  float grazing = 1.0 - clamp(dot(n, view), 0.0, 1.0);
  float sheen = pow(grazing, 2.6) * pow(diffuse, 0.6);

  vec3 shadow = vec3(0.026, 0.010, 0.017);
  vec3 velvet = vec3(0.175, 0.032, 0.058);
  vec3 lit    = vec3(0.40, 0.082, 0.125);
  vec3 rose   = vec3(0.75, 0.54, 0.50);

  vec3 col = mix(shadow, velvet, smoothstep(0.0, 0.78, diffuse));
  col = mix(col, lit, smoothstep(0.62, 1.0, diffuse) * 0.8);
  col += rose * sheen * 0.13;

  // Falloff along the light's own axis: brightest where it enters at the
  // upper left, deep in the far corner. Directional, never a ring.
  float axis = clamp(dot(vec2(uv.x - 0.10, uv.y - 0.94), normalize(vec2(0.62, -0.70))), 0.0, 1.6);
  col *= mix(1.18, 0.26, smoothstep(0.0, 1.15, axis));

  // Resolve into the page ink at the bottom edge, so there is no seam
  // where the canvas ends and the next section begins.
  col = mix(vec3(0.043, 0.016, 0.027), col, smoothstep(0.0, 0.34, uv.y));

  // Dither, so the long tonal ramps never band.
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.014;

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

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    let frame = 0;
    let running = true;
    const start = performance.now();
    const draw = () => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    draw();

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
