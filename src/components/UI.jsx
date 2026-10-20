import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "../data";

export function WhatsAppButton({
  children = "WhatsApp En Aniq",
  message,
  className = "",
  ...props
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button button-primary ${className}`}
      {...props}
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={17} className="button-arrow" aria-hidden="true" />
    </a>
  );
}

export function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, light = false }) {
  return (
    <p className={`section-label ${light ? "section-label-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

export function TikTokIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16.7 2h-3.3v13.4a3 3 0 1 1-2.6-3V9a6.4 6.4 0 1 0 5.9 6.4V8.7a8.3 8.3 0 0 0 4.8 1.5V6.9A5 5 0 0 1 16.7 2Z" />
    </svg>
  );
}
