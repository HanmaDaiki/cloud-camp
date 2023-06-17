import { FC } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';
import styles from './InputRadio.module.scss';

interface IProps extends TInput {
  switchStatus: () => void;
  active: boolean;
}

const InputRadio: FC<IProps> = (props) => {
  const {register, option, name, placeholder, label, switchStatus, active} = props;

  return (
    <label className={styles.label_radio}>
      <input
        {...(register && register(name, option))}
        onClick={switchStatus}
        name={name}
        type='radio'
        className={styles.input}
        placeholder={placeholder}
      />{' '}
      <div className={cn(styles.radio, active && styles.active)}></div>
      {label}
    </label>
  );
};

export { InputRadio };
