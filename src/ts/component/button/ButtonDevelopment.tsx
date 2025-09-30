import styles from './ButtonDevelopment.module.css';

interface ButtonDevelopmentProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const ButtonDevelopment = ({
  label,
  ...props
}: ButtonDevelopmentProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      {...props}
    >
      {label}
    </button>
  );
};
