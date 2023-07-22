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

import { createGameLevel } from 'apiSdk/game-levels';
import { gameLevelValidationSchema } from 'validationSchema/game-levels';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { GameLevelInterface } from 'interfaces/game-level';

function GameLevelCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GameLevelInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGameLevel(values);
      resetForm();
      router.push('/game-levels');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GameLevelInterface>({
    initialValues: {
      level_name: '',
      difficulty: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: gameLevelValidationSchema,
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
              label: 'Game Levels',
              link: '/game-levels',
            },
            {
              label: 'Create Game Level',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Game Level
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.level_name}
            label={'Level Name'}
            props={{
              name: 'level_name',
              placeholder: 'Level Name',
              value: formik.values?.level_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Difficulty"
            formControlProps={{
              id: 'difficulty',
              isInvalid: !!formik.errors?.difficulty,
            }}
            name="difficulty"
            error={formik.errors?.difficulty}
            value={formik.values?.difficulty}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('difficulty', Number.isNaN(valueNumber) ? 0 : valueNumber)
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
              onClick={() => router.push('/game-levels')}
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
    entity: 'game_level',
    operation: AccessOperationEnum.CREATE,
  }),
)(GameLevelCreatePage);
