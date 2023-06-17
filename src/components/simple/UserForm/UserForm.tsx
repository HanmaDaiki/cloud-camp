import { FC, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames'
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';

import { Button } from '../../ui/Button';

import { TUserState } from '../../../types/TUserState';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateData } from '../../../redux/slice/userSlice';
import { registerOptions } from '../../../utils/registerOptions';
import styles from './UserForm.module.scss';


const UserForm: FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const { email, phone } = useSelector((state: { user: TUserState }) => state.user.info)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue('email', email);
    setValue('phone', phone);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    handleSubmit(() => {
      navigate('/create');
    })(event)
  };

  return (
    <section className={styles.user_form}>
      <form
        onSubmit={onSubmit}
        className={styles.form}
      >
        <div className={styles.inputs}>
          <div className={styles.field}>
            <label className={styles.label}>Номер телефона</label>
            <InputMask
              {...register('phone', registerOptions.phone)}
              name='phone'
              type='tel'
              className={cn(styles.input, errors.phone && styles.error)}
              placeholder='+7 (999) 999-99-99'
              mask='+7\ (999) 999-99-99'
              onChange={(event) => {
                dispatch(updateData({ phone: event.target.value }))
              }}
            />
            <span className={styles.error}>{errors.phone && `${errors.phone?.message}`}</span>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              {...register('email', registerOptions.email)}
              name='email'
              type='email'
              className={cn(styles.input, errors.email && styles.error)}
              placeholder='tim.jennings@example.com'
              onChange={(event) => {
                dispatch(updateData({ email: event.target.value }))
              }}
            />
            <span className={styles.error}>{errors.email && `${errors.email?.message}`}</span>
          </div>
        </div>
        <Button id={'button-start'} typeButton='fill' type='submit'>
          Начать
        </Button>
      </form>
    </section>
  );
};

export { UserForm };
