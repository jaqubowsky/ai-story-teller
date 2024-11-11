import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { cn } from '../lib/twMerge';

type BackgroundProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
} & Omit<LinearGradientProps, 'colors'>;

const Background = ({
  children,
  className,
  colors,
  ...props
}: BackgroundProps) => {
  return (
    <LinearGradient
      colors={colors ? colors : ['#7e3ea1', '#b83265']}
      className={cn('flex-1 px-3 py-6', className)}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default Background;
