import styles from './ButtonIcon.module.css';

export type ButtonIconSize = 'small' | 'medium' | 'large';

interface ButtonIconProps {
  size?: ButtonIconSize;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: string;
}

export const ButtonIcon = ({
  size = 'medium',
  onClick,
  children,
  icon,
  ...props
}: ButtonIconProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const className = `${styles['button-icon']} ${styles[`button-icon--${size}`]}`;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children || icon}
    </button>
  );
};