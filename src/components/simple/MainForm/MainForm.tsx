import { FC } from 'react';
import { useSelector } from 'react-redux';

import { TFormState } from '../../../types/TFormState';


const MainForm: FC = () => {
  const Form = useSelector((state: { form: TFormState }) => state.form.form)

  return (
    <section>
      <Form />
    </section>
  );
};

export { MainForm };
