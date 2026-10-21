export const REVEAL_TRANSITION = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
};

export function getRevealMotion(
  reducedMotion,
  { delay = 0, offset = 18 } = {},
) {
  return {
    initial: reducedMotion ? false : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: {
      ...REVEAL_TRANSITION,
      duration: reducedMotion ? 0 : REVEAL_TRANSITION.duration,
      delay: reducedMotion ? 0 : delay,
    },
  };
}
