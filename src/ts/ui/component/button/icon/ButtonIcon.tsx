import styles from './ButtonIcon.module.css';

export type ButtonIconSize = 'small' | 'medium' | 'large';

interface ButtonIconProps {
  size?: ButtonIconSize;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  offsetLeft?: string;
  offsetTop?: string;
  ariaLabel: string;
}

export const ButtonIcon = ({
  size = 'medium',
  onClick,
  children,
  icon,
  offsetLeft = '0rem',
  offsetTop = '0rem',
  ariaLabel,
  ...props
}: ButtonIconProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const className = `${styles['button-icon']} ${styles[`button-icon--${size}`]}`;

  const content = children || icon;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      <span style={{ transform: `translate(${offsetLeft}, ${offsetTop})` }}>
        {content}
      </span>
    </button>
  );
};
