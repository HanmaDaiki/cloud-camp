import { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { TInput } from '../../../types/TInput';

import { updateData } from '../../../redux/slice/userSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import styles from './InputArea.module.scss';
import { TUserState } from '../../../types/TUserState';

const InputArea: FC<TInput> = (props) => {
  const {
    name,
    id,
    label,
    placeholder,
    register,
    option,
    error
  } = props;
  const { about } = useSelector((state: { user: TUserState}) => state.user.info)

  const dispatch = useAppDispatch();

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <textarea
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
      <span className={styles.length}>Количество символов {about.trim().length} </span>
      {
        error && <span className={styles.error}>{`${error.message}`}</span>
      }
    </div>
  );
};

export { InputArea };
