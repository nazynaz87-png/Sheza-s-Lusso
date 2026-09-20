import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  rotate?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  rotate = true,
}) => {
  const getInitialProps = () => {
    const initial: any = {
      opacity: 0,
      scale: 0.95,
    };

    if (rotate) {
      initial.rotateX = -30;
      initial.translateZ = -100;
    }

    switch (direction) {
      case 'up': initial.y = 50; break;
      case 'down': initial.y = -50; break;
      case 'left': initial.x = 50; break;
      case 'right': initial.x = -50; break;
    }

    return initial;
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        translateZ: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay,
        },
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${className} preserve-3d`}
      style={{ perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
};
