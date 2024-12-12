import React from 'react';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slide-up' | 'fade-in' | 'scale-in';
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0
}) => {
  return (
    <div
      className={`animate-${animation} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;