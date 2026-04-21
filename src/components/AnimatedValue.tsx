import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

interface Props {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedValue({ value, decimals = 0, prefix = '', suffix = '', className = '' }: Props) {
  const animated = useAnimatedNumber(value);
  return (
    <span className={`font-data ${className}`}>
      {prefix}{animated.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
    </span>
  );
}
