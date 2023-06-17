import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type TInput = {
  name: string;  
  id: string;  
  type: 'email' | 'password' | 'text' | 'checkbox' | 'textarea' | 'radio';
  placeholder: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

