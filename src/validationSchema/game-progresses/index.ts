import * as yup from 'yup';

export const gameProgressValidationSchema = yup.object().shape({
  race_won: yup.number().integer().required(),
  car_transformation: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
