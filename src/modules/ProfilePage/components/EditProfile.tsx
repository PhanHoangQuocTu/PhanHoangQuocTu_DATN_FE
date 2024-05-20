import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editProfileRequest } from '@/api/user';
import TransitionLayout from '@/components/custom/TransitionLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { onMutateError } from '@/lib/common';
import { useUserStore } from '@/stores';

import { GENDER_OPTIONS } from '../types/const';
import { editProfileSchema, type EditProfileType } from '../types/schema';
import AddressField from './AddressField';

const EditProfile = () => {
  const setUser = useUserStore.use.setUser();
  const { user } = useAuth();
  const form = useForm<EditProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: '',
      address: '',
      dateOfBirth: '',
      email: '',
      gender: '',
      lastName: '',
      phoneNumber: '',
    },
    mode: 'onChange',
  });

  const {
    formState: { errors },
  } = form;

  const [firstName, address, dateOfBirth, email, gender, lastName, phoneNumber] = form.watch([
    'firstName',
    'address',
    'dateOfBirth',
    'email',
    'gender',
    'lastName',
    'phoneNumber',
  ]);

  const { mutate: editProfile } = useMutation(editProfileRequest, {
    onSuccess: (data) => {
      toast.success('Update profile successfully!');
      form.reset({
        email: data?.email,
        address: data?.address || '',
        dateOfBirth: data?.dateOfBirth ? format(new Date(data?.dateOfBirth), 'yyyy-MM-dd') : '',
        firstName: data?.firstName,
        gender: data?.gender || '',
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
      });

      setUser(data);
    },
    onError: onMutateError,
  });

  const handleSubmit: SubmitHandler<EditProfileType> = async (formData) => {
    editProfile({
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      firstName: formData.firstName,
      gender: formData.gender,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    });
  };

  React.useEffect(() => {
    form.reset({
      email: user?.email,
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth ? format(new Date(user?.dateOfBirth), 'yyyy-MM-dd') : '',
      firstName: user?.firstName,
      gender: user?.gender || '',
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    });
  }, [form, user]);

  return (
    <TransitionLayout>
      <ShadowContainer>
        <FormWrapper form={form} onSubmit={handleSubmit}>
          <VStack justify={'between'} className="gap-8">
            <VStack spacing={20}>
              <TextField
                size={'sm'}
                control={form.control}
                isError={!!errors?.email}
                label="Email"
                name="email"
                disabled
                placeholder="Please Enter Email"
              />
              <TextField
                size={'sm'}
                control={form.control}
                isError={!!errors?.firstName}
                label="First Name"
                name="firstName"
                placeholder="Please Enter First Name"
              />

              <TextField
                size={'sm'}
                control={form.control}
                isError={!!errors?.lastName}
                label="Last Name"
                name="lastName"
                placeholder="Please Enter Last Name"
              />

              <TextField
                size={'sm'}
                control={form.control}
                isError={!!errors?.phoneNumber}
                label="Phone Number"
                name="phoneNumber"
                placeholder="Please Enter Phone Number"
              />

              <SelectField
                className="h-11 w-full"
                control={form.control}
                data={GENDER_OPTIONS}
                label="Gender"
                name="gender"
                placeholder="Please Enter Gender"
              />

              <TextField
                type="date"
                size={'sm'}
                control={form.control}
                isError={!!errors?.phoneNumber}
                label="Date of Birth"
                name="dateOfBirth"
                placeholder="Please Enter Date of Birth"
              />

              <AddressField />

              <Button
                className="w-fit"
                type="submit"
                disabled={!email || !phoneNumber || !firstName || !lastName || !address || !dateOfBirth || !gender}
              >
                Save
              </Button>
            </VStack>
          </VStack>
        </FormWrapper>
      </ShadowContainer>
    </TransitionLayout>
  );
};

export default EditProfile;
