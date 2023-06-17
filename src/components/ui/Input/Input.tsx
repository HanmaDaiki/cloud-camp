import { FC } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';

import { updateData } from '../../../redux/slice/userSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import styles from './Input.module.scss';


const Input: FC<TInput> = (props) => {
  const {
    name,
    id,
    label,
    placeholder,
    register,
    option,
    error
  } = props;

  const dispatch = useAppDispatch();

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        {...(register && register(name, option))}
        name={name}
        id={id}
        className={cn(styles.input, error && styles.error)}
        placeholder={placeholder}
        onChange={(event) => {
          const replaceName = name.replace('field-', '');
          const data = {[replaceName as keyof Object]: event.target.value};
          dispatch(updateData(data))
        }}
      />
      {
        error && <span className={styles.error}>{`${error.message}`}</span>
      }
    </div>
  );
};

export { Input };
