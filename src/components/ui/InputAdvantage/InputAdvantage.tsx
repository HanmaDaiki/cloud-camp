import { FC } from 'react';
import cn from 'classnames';

import { TInput } from '../../../types/TInput';
import styles from './InputAdvantage.module.scss';

interface IProps extends TInput {
  removeAdvantege: () => void;
  value: string;
}

const InputAdvantage: FC<IProps> = (props) => {
  const { register, name, option, placeholder, id, removeAdvantege, value, error } = props;

  return (
    <div className={styles.field_advantage}>
      <div className={styles.field}>
        <input
          {...(register && register(name, option))}
          name={name}
          id={id}
          className={cn(styles.input, error && styles.error)}
          placeholder={placeholder}
          defaultValue={value}
        />
        <button className={styles.remove_button} onClick={removeAdvantege} />
      </div>
      {error && <span className={styles.error}>{`${error.message}`}</span>}
    </div>
  );
};

export { InputAdvantage };
