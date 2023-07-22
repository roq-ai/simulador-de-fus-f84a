import * as yup from 'yup';

export const gameLevelValidationSchema = yup.object().shape({
  level_name: yup.string().required(),
  difficulty: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
