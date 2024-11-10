import { cn } from '@/shared/lib/twMerge';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  icon?: ReactNode;
  title: string;
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

const variatns = {
  primary: 'bg-purple-500',
  secondary: 'bg-gray-500',
};

const Button = ({
  icon,
  title,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'px-2 py-4 rounded-md flex-row items-center justify-center w-full',
        variatns[variant]
      )}
      {...props}
    >
      {icon}
      <Text className="font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
