import { FC, useState, useEffect } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';
import styles from './InputCheckBox.module.scss';

interface IProps extends TInput {
  updateCheckbox: (value: number) => void;
  checkboxData: Array<number>;
}

const InputCheckBox: FC<IProps> = (props) => {
  const {label, register, name, option, placeholder, updateCheckbox, checkboxData } = props;
  const [checkbox, toggleChecbox] = useState<boolean>(false);
  
  useEffect(() => {
    checkboxData.forEach((item) => {
      if(item === Number(label)) toggleChecbox(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <label className={styles.label_checkbox}>
      <input
        {...(register && register(name, option))}
        onClick={() => {
          toggleChecbox(!checkbox);
          updateCheckbox(Number(label));
        }}
        name={name}
        type="checkbox"
        className={styles.input}
        placeholder={placeholder}
      />{' '}
      <div className={cn(styles.checkbox, checkbox && styles.active)}></div>
      {label}
    </label>
  );
};

export { InputCheckBox };