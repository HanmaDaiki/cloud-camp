import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../ui/Button';

import styles from './Page404.module.scss';


const Page404: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  }

  return <div className={styles.page404}>
    <h1 className={styles.text}>Page Not Found <br /> 404</h1>
    <Button id={'button-back'} typeButton='fill' onClick={onClick}>На главную</Button>
  </div>;
};

export { Page404 };