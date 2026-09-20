import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  glare?: boolean;
  scaleOnHover?: number;
  perspective?: number;
  id?: string;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  scaleOnHover = 1.02,
  perspective = 1000,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Use MotionValues for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth "weighty" feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  
  // Scale and Glare Motion Values
  const scale = useSpring(1, springConfig);
  const glareX = useSpring(50, springConfig);
  const glareY = useSpring(50, springConfig);
  const glareOpacity = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized coordinates (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);

    if (glare) {
      glareX.set((mouseX / width) * 100);
      glareY.set((mouseY / height) * 100);
      glareOpacity.set(0.25);
    }
  };

  const handleMouseEnter = () => {
    scale.set(scaleOnHover);
    if (glare) glareOpacity.set(0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    glareOpacity.set(0);
  };

  // Combine background gradient for glare using framer-motion useTransform
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 235, 175, 0.5) 0%, rgba(212, 175, 55, 0.1) 40%, transparent 70%)`
  );

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="w-full h-full preserve-3d"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Pass extra styles to children via context or just rely on translateZ in children */}
        <div className="w-full h-full preserve-3d">
          {children}
        </div>

        {/* Dynamic Specular 3D Glare */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 overflow-hidden"
            style={{
              opacity: glareOpacity,
              background: glareBg,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
