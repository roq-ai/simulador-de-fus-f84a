import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createGameProgress } from 'apiSdk/game-progresses';
import { gameProgressValidationSchema } from 'validationSchema/game-progresses';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { GameProgressInterface } from 'interfaces/game-progress';

function GameProgressCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GameProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGameProgress(values);
      resetForm();
      router.push('/game-progresses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GameProgressInterface>({
    initialValues: {
      race_won: 0,
      car_transformation: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: gameProgressValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Game Progresses',
              link: '/game-progresses',
            },
            {
              label: 'Create Game Progress',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Game Progress
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Race Won"
            formControlProps={{
              id: 'race_won',
              isInvalid: !!formik.errors?.race_won,
            }}
            name="race_won"
            error={formik.errors?.race_won}
            value={formik.values?.race_won}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('race_won', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Car Transformation"
            formControlProps={{
              id: 'car_transformation',
              isInvalid: !!formik.errors?.car_transformation,
            }}
            name="car_transformation"
            error={formik.errors?.car_transformation}
            value={formik.values?.car_transformation}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('car_transformation', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/game-progresses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'game_progress',
    operation: AccessOperationEnum.CREATE,
  }),
)(GameProgressCreatePage);
