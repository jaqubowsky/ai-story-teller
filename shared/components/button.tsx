import { cn } from '@/shared/lib/twMerge';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  icon?: ReactNode;
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
} & TouchableOpacityProps;

const variatns = {
  primary: 'bg-purple-500',
  secondary: 'bg-gray-500',
};

const sizes = {
  small: 'px-1 py-2',
  medium: 'px-2 py-4',
  large: 'px-3 py-6',
};

const Button = ({
  icon,
  title,
  className,
  variant = 'primary',
  size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        sizes[size],
        'rounded-md flex-row gap-3 items-center justify-center w-full disabled:opacity-50',
        variatns[variant],
        className
      )}
      {...props}
    >
      {icon}
      <Text className="font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

// ... existing code ...

export default Button;
