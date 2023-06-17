import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button } from '../../ui/Button';
import { InputAdvantage } from '../../ui/InputAdvantage';
import { InputCheckBox } from '../../ui/InputCheckBox';
import { InputRadio } from '../../ui/InputRadio';
import { FirstForm } from '../FirstForm';

import { TUserState } from '../../../types/TUserState';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateForm } from '../../../redux/slice/formSlice';
import { updateData } from '../../../redux/slice/userSlice';
import styles from './SecondForm.module.scss';
import { registerOptions } from '../../../utils/registerOptions';
import { ThirdForm } from '../ThirdForm';

const SecondForm: FC = () => {
  const { handleSubmit, formState, register, setValue, getValues } = useForm({ mode: 'onBlur' });
  const { errors } = formState;

  const { advantages, radioGroup, checkbox } = useSelector((state: { user: TUserState }) => state.user.info);

  const dispatch = useAppDispatch();

  const [checkBox, setCheckBox] = useState<Array<number>>(checkbox);
  const [currentAdvantages, setCurrentAdvantages] = useState<
    Array<{ id: number; text: string; name: string }>
  >(
    advantages.map((item) => {
      const id = generateRandomNumber();      
      return { id: id, text: item, name: `field-advantage-${id}` };
    })
  );

  const [radios, setRadios] = useState<Array<{ id: number; value: number; active: boolean }>>([
    { id: generateRandomNumber(), value: 1, active: false },
    { id: generateRandomNumber(), value: 2, active: false },
    { id: generateRandomNumber(), value: 3, active: false },
  ]);

  const removeAdvantege = (id: number, name: string) => {
    const updateAdvantages = currentAdvantages.filter((item) => item.id !== id);

    setValue(name, '');

    setCurrentAdvantages(updateAdvantages);
  };

  const addAdvantege = (id: number, name: string) => {
    setCurrentAdvantages([...currentAdvantages, { id, text: '', name }]);
  };

  const updateCheckBox = (value: number) => {
    if (!checkBox.includes(value)) {
      setCheckBox([...checkBox, value]);
    } else {
      const updatedCheckBox = checkBox.filter((item) => item !== value);
      setCheckBox(updatedCheckBox);
    }
  }
  

  const switchChekedRadio = (id: number) => {
    const updateRadios = radios.map((item) => {
      if (item.id === id){ 
        item.active = true;
        dispatch(updateData({ radioGroup: item.value }))
      };
      if (item.id !== id) item.active = false;
      return item;
    });

    setRadios(updateRadios);
  };

  useEffect(() => {
    setRadios(
      radios.map((item) => {
        if (item.value === radioGroup) {
          item.active = true;
        }

        return item;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {      
    dispatch(updateData({checkbox: checkBox}))
  }, [checkBox, dispatch]);

  return (
    <form
      className={styles.form}
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();

        handleSubmit((data) => {
          const updatedAdvantages = currentAdvantages.map((item) => {
            return getValues(item.name);
          });
          
          dispatch(updateData({ advantages: updatedAdvantages }));
          dispatch(updateForm({ form: ThirdForm, step: 3 }))
        })(event);
      }}
    >
      <div className={styles.advantages}>
        <h2 className={styles.title}>Advantages</h2>
        {currentAdvantages.map((item) => {
          return (
            <InputAdvantage
              placeholder='Placeholder'
              key={item.id}
              value={item.text}
              id={item.name}
              name={item.name}
              type='text'
              register={register}
              option={registerOptions.name}
              error={errors[item.name]}
              removeAdvantege={() => removeAdvantege(item.id, item.name)}
            />
          );
        })}
        <Button
          id='button-add'
          typeButton='outline'
          onClick={() => {
            const id = generateRandomNumber();
            addAdvantege(id, `field-advantage-${id}`);
          }}
        >
          <div className={styles.icon_add}></div>
        </Button>
      </div>

      <div className={styles.checkbox}>
        <h2 className={styles.title}>Checkbox group</h2>
        <InputCheckBox
          updateCheckbox={updateCheckBox}
          checkboxData={checkBox}
          placeholder='Placeholder'
          id='field-checkbox-option-1'
          name={'field-checkbox-option-1'}
          type='text'
          register={register}
          label='1'
        />
        <InputCheckBox
          updateCheckbox={updateCheckBox}
          checkboxData={checkBox}
          placeholder='Placeholder'
          id='field-checkbox-option-2'
          name={'field-checkbox-option-2'}
          type='text'
          register={register}
          label='2'
        />
        <InputCheckBox
          updateCheckbox={updateCheckBox}
          checkboxData={checkBox}
          placeholder='Placeholder'
          id='field-checkbox-option-3'
          name={'field-checkbox-option-3'}
          type='text'
          register={register}
          label='3'
        />
      </div>

      <div className={styles.radio}>
        <h2 className={styles.title}>Radio group</h2>
        {radios.map((item, index) => {
          return (
            <InputRadio
              key={item.id}
              placeholder='Placeholder'
              id={`field-checkbox-option-${index + 1}`}
              name={'field-radio-option'}
              type='text'
              register={register}
              label={`${item.value}`}
              active={item.active}
              switchStatus={() => switchChekedRadio(item.id)}
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <Button
          id='button-back'
          typeButton='outline'
          onClick={() => {
            dispatch(updateForm({ form: FirstForm, step: 1 }))
            const updatedAdvantages = currentAdvantages.map((item) => {
              return getValues(item.name);
            });
  
            dispatch(updateData({ advantages: updatedAdvantages }));
          }}
        >
          Назад
        </Button>
        <Button id='button-next' type='submit' typeButton='fill'>
          Вперед
        </Button>
      </div>
    </form>
  );
};

export { SecondForm };
