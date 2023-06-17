import { REGEX } from "./constants"

export const registerOptions = {
  email: {
    required: 'Поле Email обязательное',
    pattern: {
      value: REGEX.EMAIL,
      message: 'Email введен некорректно',
    }
  },
  phone: {
    required: 'Поле телефона обязательное',
    minLength: {
      value: 18,
      message: 'Телефон введен не коректный',
    },
    maxLength: {
      value: 18,
      message: 'Телефон введен не коректный',
    },
    pattern: {
      value: REGEX.PHONE,
      message: `Телефон введен не коректный`,
    },
  },
  name: {
    maxLength: {
      value: 50,
      message: 'Не больше 50 символов',
    },
    pattern: {
      value: REGEX.NAME,
      message: 'Только буквы'
    }
  },
  nickname: {
    maxLength: {
      value: 30,
      message: 'Не больше 30 символов',
    },
    pattern: {
      value: REGEX.NICKNAME,
      message: 'Только буквы и цифры'
    }
  },
  about: {
    maxLength: {
      value: 200,
      message: 'Не больше 200 символов',
    }
  }
  
}