import * as Yup from 'yup';

export const Validations = {
  User: {
    Signup: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    Login: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
  }
}
