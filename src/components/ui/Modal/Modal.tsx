import { FC } from 'react';

import styles from './Modal.module.scss';

interface IProps { 
  imgSrc: string,
  text: string;
  button: React.ReactNode;
  onClose: () => void;
  open: boolean
}

const Modal: FC<IProps> = (props) => {
  const { imgSrc, text, button, open } = props;
  
  return <>{ open ? <div className={styles.modal}>
    <div className={styles.container}>
      <h2 className={styles.text}>{text}</h2>
      <img src={imgSrc} alt='Иконка статуса' />
      {button}
    </div>
  </div> : null}</>
};

export { Modal };
