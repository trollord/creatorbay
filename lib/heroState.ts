// Mutable, render-loop-friendly state shared between the hero DOM and the 3D
// scene. Plain object on purpose: written by GSAP/pointer handlers, read in
// useFrame, never part of React state.
export const heroState = {
  /** 0 to 1 entrance (driven by GSAP after the page curtain lifts). */
  intro: 0,
  /** 0 to 1 scroll progress through the pinned hero. */
  progress: 0,
  /** Pointer in [-1, 1], already normalised to the viewport. */
  px: 0,
  py: 0,
  /** Scene clock time (seconds) of the last double-tap "like". */
  likeAt: -10,
};
