import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface IProps extends  PropsWithChildren {
  typeButton: 'fill' | 'outline';
  type?: 'submit' | 'button';
  onClick?: () => void;
  id: string;
}

const Button: FC<IProps> = (props) => {
  const { typeButton, children, type = 'button', onClick = () => {}, id } = props;

  return <button id={id} onClick={onClick} type={type} className={cn(styles.button, styles[typeButton])}>{children}</button>;
};

export { Button };