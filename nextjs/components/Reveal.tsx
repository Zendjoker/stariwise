"use client";
import { useEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({ children, className = "", as: Tag = "div" as keyof React.JSX.IntrinsicElements, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal${visible ? " visible" : ""}${className ? " " + className : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
