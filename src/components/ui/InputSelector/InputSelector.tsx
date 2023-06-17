import { FC, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';

import styles from './InputSelector.module.scss';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateData } from '../../../redux/slice/userSlice';

interface IProps extends TInput {
  selectorValues: Array<{ id: string, text: string }>;
  setValue: UseFormSetValue<FieldValues>;
}

const InputSelector: FC<IProps> = (props) => {
  const { label, selectorValues, register, option, name, id, placeholder, setValue } = props;
  const [openSelector, toggleSelector] = useState(false);
  const dispatch = useAppDispatch();

  return(
    <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div onClick={() => toggleSelector(!openSelector)} className={styles.input}>
          <input
            {...(register && register(name, option))}
            name={name}
            id={id}
            placeholder={placeholder}
            className={styles.input_field}
            disabled
          />
          <div className={cn(styles.icon_down, openSelector && styles.open)}></div>
        </div>
        {openSelector && (
          <ul onMouseLeave={() => toggleSelector(!openSelector)} className={styles.selector}>
            {selectorValues.map((item, index) => {
              return (
                <li
                  id={item.id}
                  key={index}
                  className={styles.item}
                  onClick={() => {
                    const replaceName = name.replace('field-', '');
                    const data = {[replaceName as keyof Object]: item.text};
                    dispatch(updateData(data))
                    setValue(name, item.text)
                  }}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
  );
};

export { InputSelector };