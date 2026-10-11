"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

/*
 * Animated topographic contour lines, lifted from the background of the
 * Creator Bay logo. A noise field is drawn as iso-lines; the cursor raises a
 * "hill" that the contours bend around. One full-screen WebGL2 quad.
 */

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHill;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uScale;
uniform float uSeed;
out vec4 outColor;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec2 m = uMouse / uRes.y;
  float t = uTime * 0.035;
  float n = snoise(vec3(uv * uScale + uSeed, t)) * 0.62
          + snoise(vec3(uv * uScale * 2.3 - uSeed, t * 1.6)) * 0.22;
  float d = distance(uv, m);
  n += uHill * 0.55 * exp(-d * d * 9.0);

  float levels = 7.0;
  float v = n * levels;
  float f = fract(v);
  float dist = min(f, 1.0 - f);
  float w = fwidth(v);
  float line = 1.0 - smoothstep(w * 0.55, w * 1.6, dist);
  // every fifth contour is an index line, drawn heavier
  float idx = 1.0 - step(0.5, abs(mod(floor(v + 0.5), 5.0)));
  float lineIdx = 1.0 - smoothstep(w * 1.2, w * 2.6, dist);
  float a = max(line, lineIdx * idx) * uAlpha * (0.75 + idx * 0.5);
  outColor = vec4(uColor * a, a);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export default function Topo({
  color = "#ffffff",
  alpha = 0.22,
  scale = 1.15,
  seed = 0,
  className = "",
}: {
  color?: string;
  alpha?: number;
  scale?: number;
  seed?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // A fresh <canvas> per effect run: once a context has been lost it can never
    // be reused, so re-mounts (route changes, Strict Mode) must not inherit one.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "block h-full w-full";
    host.appendChild(canvas);

    const reduced = prefersReducedMotion();
    // Contours are soft lines, so a low-res buffer scaled up by CSS looks the
    // same and keeps GPU memory small (a full-bleed retina canvas was enough to
    // lose the context on slower machines).
    const dpr = Math.min(window.devicePixelRatio || 1, 1) * 0.75;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, hill: 0, thill: 0 };
    let disposed = false;
    let raf = 0;
    let visible = true;
    let lastDraw = 0;
    const start = performance.now() - seed * 10000;

    // GL state is rebuilt from scratch whenever the context is (re)created.
    let gl: WebGL2RenderingContext | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uHill: WebGLUniformLocation | null = null;

    const build = () => {
      gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false, alpha: true });
      if (!gl || gl.isContextLost()) return false;
      const g = gl;
      const compile = (type: number, src: string) => {
        const sh = g.createShader(type)!;
        g.shaderSource(sh, src);
        g.compileShader(sh);
        return sh;
      };
      const prog = g.createProgram()!;
      g.attachShader(prog, compile(g.VERTEX_SHADER, VERT));
      g.attachShader(prog, compile(g.FRAGMENT_SHADER, FRAG));
      g.linkProgram(prog);
      if (!g.getProgramParameter(prog, g.LINK_STATUS)) return false;
      g.useProgram(prog);

      const buf = g.createBuffer();
      g.bindBuffer(g.ARRAY_BUFFER, buf);
      g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
      const loc = g.getAttribLocation(prog, "p");
      g.enableVertexAttribArray(loc);
      g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);

      const u = (n: string) => g.getUniformLocation(prog, n);
      uRes = u("uRes");
      uTime = u("uTime");
      uMouse = u("uMouse");
      uHill = u("uHill");
      g.uniform3fv(u("uColor"), hexToRgb(color));
      g.uniform1f(u("uAlpha"), alpha);
      g.uniform1f(u("uScale"), scale);
      g.uniform1f(u("uSeed"), seed);
      resize();
      return true;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      if (gl && !gl.isContextLost()) {
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };

    const draw = (now: number) => {
      if (!gl || gl.isContextLost()) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.hill += (mouse.thill - mouse.hill) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHill, mouse.hill);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (disposed || !visible) return;
      raf = requestAnimationFrame(loop);
      if (now - lastDraw < 32) return; // ~30fps is plenty for slow contours
      lastDraw = now;
      draw(now);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(start + 4000);
      else raf = requestAnimationFrame(loop);
    };

    const onLost = (e: Event) => {
      e.preventDefault(); // lets the browser hand the context back
      cancelAnimationFrame(raf);
    };
    const onRestored = () => {
      if (!disposed && build()) play();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) * dpr;
      mouse.ty = (r.height - (e.clientY - r.top)) * dpr;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.thill = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
    };
    if (!reduced && !isCoarsePointer()) window.addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(start + 4000);
    });
    ro.observe(canvas);

    let io: IntersectionObserver | null = null;
    const onVisibility = () => {
      const was = visible;
      visible = !document.hidden && inView;
      if (visible && !was) play();
      if (!visible) cancelAnimationFrame(raf);
    };
    let inView = true;
    if (!reduced) {
      io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        onVisibility();
      });
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
    }

    if (build()) play();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      // Free the GPU context right away rather than waiting for GC, so
      // navigating between pages can't pile up contexts.
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [color, alpha, scale, seed]);

  return <div ref={hostRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
