"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { heroState } from "@/lib/heroState";

/* ── Geometry: the CreatorBay "B", rebuilt from the logo ────────────────── */

// Outer silhouette: rounded slab with the B's waist notch on the right.
function outerShape() {
  const s = new THREE.Shape();
  const x0 = -0.5, xb = 0.5, xt = 0.44, y0 = -0.73, y1 = 0.73, r = 0.2;
  s.moveTo(x0 + r, y0);
  s.lineTo(xb - r, y0);
  s.quadraticCurveTo(xb, y0, xb, y0 + r);
  s.lineTo(xb, -0.12);
  s.lineTo(xb - 0.21, 0.0);
  s.lineTo(xt, 0.15);
  s.lineTo(xt, y1 - r);
  s.quadraticCurveTo(xt, y1, xt - r, y1);
  s.lineTo(x0 + r, y1);
  s.quadraticCurveTo(x0, y1, x0, y1 - r);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}

// White face: inset panel; the wedge runs into the diagonal stroke from the logo.
function faceShape() {
  const s = new THREE.Shape();
  const x0 = -0.39, xb = 0.39, xt = 0.33, y0 = -0.62, y1 = 0.62, r = 0.12;
  const tip = new THREE.Vector2(0.06, -0.025);
  const end = new THREE.Vector2(-0.24, -0.28);
  const w = 0.026;
  const dir = end.clone().sub(tip).normalize();
  const n = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(w);
  const theta = Math.atan2(n.y, n.x);

  s.moveTo(x0 + r, y0);
  s.lineTo(xb - r, y0);
  s.quadraticCurveTo(xb, y0, xb, y0 + r);
  s.lineTo(xb, -0.105);
  // into the wedge, down the stroke, round the cap, back up
  s.lineTo(tip.x + n.x, tip.y + n.y);
  s.lineTo(end.x + n.x, end.y + n.y);
  for (let i = 1; i <= 12; i++) {
    const a = theta - (Math.PI * i) / 12;
    s.lineTo(end.x + Math.cos(a) * w, end.y + Math.sin(a) * w);
  }
  s.lineTo(tip.x - n.x, tip.y - n.y);
  s.lineTo(xt, 0.115);
  s.lineTo(xt, y1 - r);
  s.quadraticCurveTo(xt, y1, xt - r, y1);
  s.lineTo(x0 + r, y1);
  s.quadraticCurveTo(x0, y1, x0, y1 - r);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}

const DEPTH = 0.5;
const BEVEL = 0.035;

/* ── Scene ──────────────────────────────────────────────────────────────── */

const easeOutBack = (x: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function B({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const [body, face] = useMemo(() => {
    const b = new THREE.ExtrudeGeometry(outerShape(), {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 6,
      curveSegments: 28,
    });
    b.translate(0, 0, -DEPTH);
    const f = new THREE.ExtrudeGeometry(faceShape(), {
      depth: 0.014,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 24,
    });
    f.translate(0, 0, BEVEL - 0.002);
    return [b, f];
  }, []);

  useEffect(() => () => { body.dispose(); face.dispose(); }, [body, face]);

  const rot = useRef({ x: 0.32, y: -0.62 });

  useFrame((state, dt) => {
    const g = group.current, s = spin.current;
    if (!g || !s) return;
    const t = state.clock.elapsedTime;
    const { intro, progress: p, px, py } = heroState;

    // Head-follow: the mark turns toward the cursor, like it's watching you.
    const k = 1 - Math.exp(-dt * 4.5);
    const tx = 0.32 - py * 0.3 + Math.sin(t * 0.7) * 0.03;
    const ty = -0.62 + px * 0.6 + Math.sin(t * 0.45) * 0.05;
    rot.current.x += (tx - rot.current.x) * k;
    rot.current.y += (ty - rot.current.y) * k;

    const introE = 1 - Math.pow(1 - clamp01(intro), 4);
    const base = compact ? Math.min(0.74, viewport.width / 2.9) : 0.94;
    // Anchor in viewport fractions. Keep in sync with --bx / --by in Hero.
    const ax = compact ? 0.5 : 0.25, ay = compact ? 0.565 : 0.555;
    const cx = (ax - 0.5) * viewport.width, cy = (0.5 - ay) * viewport.height;

    g.rotation.x = rot.current.x + (1 - introE) * 1.1 - p * 0.35;
    g.rotation.y = rot.current.y + (1 - introE) * -2.4 + p * 2.6;
    g.rotation.z = (1 - introE) * 0.25 + p * -0.2;
    g.position.x = cx * (1 - p * 0.6);
    g.position.y = cy * (1 - p * 0.6) + (1 - introE) * -2.6 + Math.sin(t * 1.1) * 0.04;
    g.position.z = p * p * 4.6;
    g.scale.setScalar(base * (0.7 + 0.3 * introE));

    // Double-tap "like": a quick bounce-spin.
    const lt = clamp01((t - heroState.likeAt) / 0.95);
    if (lt < 1) {
      s.rotation.y = easeOutBack(lt) * Math.PI * 2;
      s.scale.setScalar(1 + Math.sin(lt * Math.PI) * 0.14);
    } else {
      s.rotation.y = 0;
      s.scale.setScalar(1);
    }
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        <mesh geometry={body} castShadow>
          <meshPhysicalMaterial color="#1d1d1d" roughness={0.32} metalness={0.15} clearcoat={1} clearcoatRoughness={0.18} />
        </mesh>
        <mesh geometry={face}>
          <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.28} roughness={0.3} metalness={0} clearcoat={0.7} clearcoatRoughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// R3F's clock lives in a different time base than performance.now(); keep the
// like timestamp in the scene's clock.
function LikeClock() {
  const { clock } = useThree();
  useEffect(() => {
    const onLike = () => (heroState.likeAt = clock.elapsedTime);
    window.addEventListener("cb:like", onLike);
    return () => window.removeEventListener("cb:like", onLike);
  }, [clock]);
  return null;
}

export default function BMark({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => setCompact(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-3, 4, 5]} intensity={2.2} />
        <directionalLight position={[4, -1, -3]} intensity={1.4} color="#ff6a6f" />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[-3, 3, 4]} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={2} position={[4, 0, 3]} scale={[2, 6, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#ff3b42" position={[0, -4, 2]} scale={[8, 2, 1]} />
          <Lightformer form="ring" intensity={1.5} position={[2, 4, -4]} scale={3} />
        </Environment>
        <B compact={compact} />
        <LikeClock />
      </Canvas>
    </div>
  );
}
