import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  withAnimation?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: { 
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};

const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  bordered = true,
  withAnimation = true,
  className = '',
  ...props
}) => {
  const CardComponent = withAnimation ? motion.div : 'div';
  
  return (
    <CardComponent
      className={`
        bg-white rounded-lg overflow-hidden
        ${bordered ? 'border border-gray-200' : ''}
        ${hoverable ? 'transition-shadow duration-300 hover:shadow-lg' : 'shadow-md'}
        ${className}
      `}
      initial={withAnimation ? 'hidden' : undefined}
      animate={withAnimation ? 'visible' : undefined}
      whileHover={hoverable && withAnimation ? 'hover' : undefined}
      variants={withAnimation ? cardVariants : undefined}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;