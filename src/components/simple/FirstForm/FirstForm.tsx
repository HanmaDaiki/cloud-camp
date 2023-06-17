import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { SecondForm } from '../SecondForm';

import { updateForm } from '../../../redux/slice/formSlice';
import { InputSelector } from '../../ui/InputSelector';
import { TUserState } from '../../../types/TUserState';
import styles from './FirstForm.module.scss';
import { updateData } from '../../../redux/slice/userSlice';
import { registerOptions } from '../../../utils/registerOptions';


const FirstForm: FC = () => {
  const { handleSubmit, formState, register, setValue, getValues } = useForm({ mode: 'onBlur' });
  const { errors } = formState;

  const { nickname, name, sername, sex } = useSelector((state: { user: TUserState}) => state.user.info);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('field-nickname', nickname);
    setValue('field-name', name);
    setValue('field-sername', sername);
    setValue('field-sex', sex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      className={styles.form}
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();

        handleSubmit(() => {
          const nickname = getValues('field-nickname');
          const name = getValues('field-name');
          const sername = getValues('field-sername');
          const sex = getValues('field-sex');

          dispatch(updateForm({ form: SecondForm, step: 2 }))
          dispatch(updateData({ nickname, name, sername, sex }))
        })(event);
      }}
    >
      <Input
        register={register}
        option={registerOptions.nickname}
        error={errors['field-nickname']}
        name='field-nickname'
        id='field-nickname'
        type='text'
        label='Nickname'
        placeholder='Placeholder'
      />
      <Input
        register={register}
        option={registerOptions.name}
        error={errors['field-name']}
        name='field-name'
        id='field-name'
        type='text'
        label='Name'
        placeholder='Placeholder'
      />
      <Input
        register={register}
        option={registerOptions.name}
        error={errors['field-sername']}
        name='field-sername'
        id='field-sername'
        type='text'
        label='Sername'
        placeholder='Placeholder'
      />

      <InputSelector
        register={register}
        error={errors['field-sex']}
        name='field-sex'
        id='field-sex'
        type='text'
        label='Sex'
        placeholder='Не выбрано'
        selectorValues={[{text: 'man', id: 'field-sex-option-man'}, {text: 'woman', id: 'field-sex-option-woman'}]}
        setValue={setValue}
      />
      <div className={styles.buttons}>
        <Button id='button-back' typeButton='outline' onClick={() => navigate('/')}>
          Назад
        </Button>
        <Button id='button-next' type='submit' typeButton='fill'>
          Вперед
        </Button>
      </div>
    </form>
  );
};

export { FirstForm };
