import styles from './ButtonColorCircle.module.css';

export type ButtonIconSize = 'small' | 'medium' | 'large';

interface ButtonColorCircleProps {
  size?: ButtonIconSize;
  color: string;
  onClick: () => void;
  ariaLabel: string;
}

export const ButtonColorCircle = ({
  color,
  onClick,
  ariaLabel,
  ...props
}: ButtonColorCircleProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const className = `${styles['button-color-circle']} ${styles[`button-color-circle--${props.size || 'medium'}`]}`;

  return (
    <button
      className={className}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    />
  );
};
