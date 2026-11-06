"use client";

import { useEffect, useRef } from "react";

/**
 * Aura: the site's signature element. A WebGL field of soft pastel blobs that
 * drift, breathe and lean toward the cursor. On result pages the colours and
 * blob sizes are derived from the person's scores, so every result has its own aura.
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p,0.0,1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC[5];
uniform float uR[5];
uniform float uSeed;
uniform float uGrain;
uniform float uOpacity;

// 3D simplex noise (Ashima / Ian McEwan, MIT)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = uTime * 0.12;

  // organic warp of the whole field
  vec2 warp = vec2(snoise(vec3(p * 1.4, t + uSeed)), snoise(vec3(p * 1.4 + 7.3, t - uSeed)));
  vec2 q = p + warp * 0.08;

  vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);

  vec3 col = vec3(0.0);
  float wsum = 0.0;
  float csum = 0.0;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float sp = 0.6 + fi * 0.17;
    vec2 c = vec2(
      sin(t * sp * 2.0 + fi * 1.9 + uSeed) * 0.22 * aspect * 0.6,
      cos(t * sp * 1.6 + fi * 2.7 + uSeed * 1.3) * 0.17
    );
    c += (m - c) * 0.1;                        // lean toward the cursor
    float r = 0.11 + uR[i] * 0.17;
    float d = length(q - c);
    float w = exp(-(d * d) / (r * r));
    float cw = pow(w, 3.0) + 1e-5;             // sharper weights keep colours distinct
    col += uC[i] * cw;
    csum += cw;
    wsum += w;
  }
  col /= csum;
  float edge = snoise(vec3(q * 3.0, t * 1.5 + uSeed)) * 0.07;
  float a = smoothstep(0.22, 1.0, wsum + edge);
  // fade out well before the canvas border so the blob never looks cropped
  float e = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  a *= smoothstep(0.0, 0.2, e);
  a *= uOpacity;
  // soft inner glow
  col = mix(col, vec3(1.0), 0.06 * smoothstep(1.0, 2.4, wsum));
  // film grain against banding
  float g = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * uGrain;
  col += g;
  gl_FragColor = vec4(col * a, a);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  if (!/^#?[0-9a-f]{3,8}$/i.test(hex ?? "")) return [0.77, 0.7, 1];
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

import { DEFAULT_AURA } from "./auraMath";
export { DEFAULT_AURA };

export function Aura({
  colors = DEFAULT_AURA,
  sizes = [0.6, 0.5, 0.45, 0.4, 0.35],
  seed = 1,
  className = "",
  interactive = true,
  speed = 1,
  opacity = 0.9,
}: {
  colors?: string[];
  sizes?: number[];
  seed?: number;
  className?: string;
  interactive?: boolean;
  speed?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const colorKey = colors.join(",");
  const sizeKey = sizes.join(",");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      console.warn("aura: no webgl");
      canvas.style.display = "none";
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }
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
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("aura: shader link failed", gl.getProgramInfoLog(prog));
      canvas.style.display = "none";
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uSeed = gl.getUniformLocation(prog, "uSeed");
    const uGrain = gl.getUniformLocation(prog, "uGrain");
    const uOpacity = gl.getUniformLocation(prog, "uOpacity");
    const cols = colors.slice(0, 5);
    while (cols.length < 5) cols.push(colors[cols.length % colors.length] ?? "#c4b2ff");
    const flat = cols.flatMap(hexToRgb);
    gl.uniform3fv(gl.getUniformLocation(prog, "uC"), new Float32Array(flat));
    const rs = sizes.slice(0, 5);
    while (rs.length < 5) rs.push(0.3);
    gl.uniform1fv(gl.getUniformLocation(prog, "uR"), new Float32Array(rs));
    gl.uniform1f(uSeed, seed);
    gl.uniform1f(uGrain, 0.035);
    gl.uniform1f(uOpacity, opacity);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    if (interactive && !reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * 0.6));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * 0.6));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, ((now - start) / 1000) * speed + seed * 10);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reduce) {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, seed * 10);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      // free the GPU context only when the canvas really left the page
      // (React re-runs effects in dev; losing the context then would break the next run)
      setTimeout(() => {
        if (!canvas.isConnected) gl.getExtension("WEBGL_lose_context")?.loseContext();
      }, 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorKey, sizeKey, seed, interactive, speed, opacity]);

  return (
    <div className={/\b(absolute|fixed)\b/.test(className) ? className : `relative ${className}`} aria-hidden>
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div
        ref={fallbackRef}
        className="absolute inset-0 hidden rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors[0]}, transparent 60%), radial-gradient(circle at 70% 60%, ${colors[1] ?? colors[0]}, transparent 55%), radial-gradient(circle at 40% 80%, ${colors[2] ?? colors[0]}, transparent 50%)`,
        }}
      />
    </div>
  );
}

export { auraFromScores } from "./auraMath";
