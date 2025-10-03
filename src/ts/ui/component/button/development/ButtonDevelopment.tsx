import styles from './ButtonDevelopment.module.css';

interface ButtonDevelopmentProps {
  label: string;
  onClick?: () => void;
}

export const ButtonDevelopment = ({
  label,
  onClick,
  ...props
}: ButtonDevelopmentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={styles['button-development']}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
};
