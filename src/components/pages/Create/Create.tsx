import { FC } from 'react';

import { Container } from '../../ui/Container';
import { ProgressBar } from '../../simple/ProgressBar';
import { MainForm } from '../../simple/MainForm';

import styles from './Create.module.scss';


const Create: FC = () => {
  return <main className={styles.create}>
    <Container className='create'>
      <ProgressBar />
      <MainForm />
    </Container>
  </main>;
};

export { Create };