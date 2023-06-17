import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './ProgressBar.module.scss';
import { useSelector } from 'react-redux';
import { TFormState } from '../../../types/TFormState';

const ProgressBar: FC = () => {
  const { step } = useSelector((state: { form: TFormState }) => state.form);
  const [lineStep, setLineStep] = useState<'step1' | 'step2' | 'step3'>('step1');

  useEffect(() => {
    if(step === 1) setLineStep('step1');
    if(step === 2) setLineStep('step2');
    if(step === 3) setLineStep('step3');
  }, [step]) 

  return <section className={styles.progress_bar}>

    <span className={cn(styles.line, styles[lineStep])}></span>
    
    <div className={styles.point}>
      <div className={cn(styles.circle, step === 1 ? '' : styles.end) } />
      <span className={cn(styles.step, step >= 1 && styles.end)}>1</span>
    </div>

    <div className={styles.point}>
      <div className={cn(styles.circle, step < 2 ? styles.disabel : step === 2 ? '' : styles.end)} />
      <span className={cn(styles.step, step >= 2 && styles.end)}>2</span>
    </div>

    <div className={styles.point}>
      <div className={cn(styles.circle, step === 3 ? '' : styles.disabel)} />
      <span className={cn(styles.step, step === 3 && styles.end)}>3</span>
    </div>
  </section>;
};

export { ProgressBar };