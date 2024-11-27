import { animate, stagger } from "motion";

const elements = document.querySelectorAll("p, li");
animate(
  elements,
  { opacity: [0, 1] },
  {
    duration: 0.6,
    delay: stagger(0.6, { startDelay: 0.2 }),
    ease: "easeIn",
  },
);
