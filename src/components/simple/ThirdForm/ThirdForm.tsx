import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { InputArea } from '../../ui/InputArea';
import { Modal } from '../../ui/Modal';
import { SecondForm } from '../SecondForm';
import { Button } from '../../ui/Button';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateForm } from '../../../redux/slice/formSlice';
import { TUserState } from '../../../types/TUserState';
import { postData } from '../../../redux/slice/userSlice';
import { registerOptions } from '../../../utils/registerOptions';
import rejectedImg from '../../../images/icon-rejected.svg';
import fulfilledImg from '../../../images/icon-fulfilled.svg';
import styles from './ThirdForm.module.scss';

const ThirdForm: FC = () => {
  const { handleSubmit, formState, register } = useForm({ mode: 'onBlur' });
  const { errors } = formState;

  const navigate = useNavigate();

  const [openRejected, setOpenRejectedModal] = useState(false);
  const [openFulfilled, setOpenFulfilleddModal] = useState(false);
  const user = useSelector((state: { user: TUserState }) => state.user);

  const dispatch = useAppDispatch();

  const closeModal = () => {
    setOpenRejectedModal(false);
    setOpenFulfilleddModal(false);
  };

  return (
    <>
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();

          handleSubmit(() => {
            dispatch(postData(user)).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                console.log('Отправлено');
                setOpenFulfilleddModal(true);
              }

              if (res.meta.requestStatus === 'rejected') {
                console.log('Ошибка');
                setOpenRejectedModal(true);
              }
            });
          })(event);
        }}
      >
        <InputArea
          register={register}
          name='field-about'
          id='field-about'
          placeholder='Placeholder'
          type='textarea'
          label='About'
          error={errors['field-about']}
          option={registerOptions.about}
        />
        <div className={styles.buttons}>
          <Button
            id='button-back'
            typeButton='outline'
            onClick={() => {
              dispatch(updateForm({ form: SecondForm, step: 2 }));
            }}
          >
            Назад
          </Button>
          <Button id='button-next' type='submit' typeButton='fill'>
            Отправить
          </Button>
        </div>
      </form>

      <Modal
        open={openFulfilled}
        button={
          <Button
            id='button-to-main'
            typeButton='outline'
            onClick={() => {
              navigate('/');
              closeModal();
            }}
          >
            На главную
          </Button>
        }
        onClose={closeModal}
        text='Форма успешно отправлена'
        imgSrc={fulfilledImg}
      ></Modal>

      <Modal
        open={openRejected}
        button={
          <Button
            id='button-to-main'
            typeButton='outline'
            onClick={() => {
              closeModal();
            }}
          >
            Закрыть
          </Button>
        }
        onClose={closeModal}
        text='Ошибка'
        imgSrc={rejectedImg}
      ></Modal>
    </>
  );
};

export { ThirdForm };
