import { ReactNode } from 'react';
import styles from './button.module.scss';

export interface buttonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  icon?: () => ReactNode;
  disabled?: boolean;
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
  variant?: 'danger' | 'primary' | 'secondary' | 'link';
}

export const Button = ({ onClick, icon, text, variant, disabled, props }: buttonProps) => {
  const buttonProps = {
    onClick: onClick,
    disabled: disabled,
    className: styles.Button + ' ' + (variant ? styles[variant] : ''),
  };
  return (
    <button {...buttonProps}>
      {text}
      {icon && icon()}
    </button>
  );
};
