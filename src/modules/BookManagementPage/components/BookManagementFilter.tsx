import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';
import { useGetAllAuthor } from '@/hooks/author/useGetAllAuthor';
import { useGetAllCategory } from '@/hooks/category/useGetAllCategory';
import { useGetAllPublisher } from '@/hooks/publisher/useGetAllPublisher';
import { defaultArray } from '@/lib/common';
import { limit_infinite } from '@/lib/const';
import { useBookManagementStore } from '@/stores/BookManagementStore';

import { bookManagementFilterSchema, type BookManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: BookManagementFilterType) => void;
}

const BookManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const setIsCreate = useBookManagementStore.use.setIsCreate();
  const setIsEdit = useBookManagementStore.use.setIsEdit();
  const setProductImg = useBookManagementStore.use.setProductImg();

  const { authorSelectOptions } = useGetAllAuthor(limit_infinite);
  const { categorySelectOptions } = useGetAllCategory(limit_infinite);
  const { publisherSelectOptions } = useGetAllPublisher(limit_infinite);
  const form = useForm<BookManagementFilterType>({
    resolver: zodResolver(bookManagementFilterSchema),
    defaultValues: {
      search: '',
      maxRating: '',
      minRating: '',
      maxPrice: '',
      minPrice: '',
      publisherId: '',
      authorId: '',
      categoryId: '',
    },
  });

  const handleResetForm = () => {
    form.reset({
      search: '',
      maxRating: '',
      minRating: '',
      maxPrice: '',
      minPrice: '',
      publisherId: '',
      authorId: '',
      categoryId: '',
    });
    handleSubmit({ ...form.getValues() });
  };

  const handleSubmit: SubmitHandler<BookManagementFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  const handleCreateBook = () => {
    setIsCreate(true);
    setIsEdit(false);
    setProductImg(null);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <SelectField
              className="h-11"
              fullWidth
              control={form.control}
              label="Author"
              name="authorId"
              data={defaultArray(authorSelectOptions)}
              placeholder="Author"
            />
          </div>

          <div className="col-span-1">
            <SelectField
              className="h-11"
              fullWidth
              control={form.control}
              label="Category"
              name="categoryId"
              data={defaultArray(categorySelectOptions)}
              placeholder="Category"
            />
          </div>

          <div className="col-span-1">
            <SelectField
              className="h-11"
              fullWidth
              control={form.control}
              label="Publisher"
              name="publisherId"
              data={defaultArray(publisherSelectOptions)}
              placeholder="Publisher"
            />
          </div>

          <div className="col-span-1">
            <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />
          </div>
        </div>

        <HStack spacing={16} pos={'right'} align={'end'}>
          <HStack noWrap spacing={12}>
            <Button type="button" variant={'secondary'} onClick={handleCreateBook}>
              Create Category
            </Button>
            <Button type="button" variant="outline" onClick={handleResetForm}>
              Clear Filter
            </Button>

            <Button type="submit">Apply Filter</Button>
          </HStack>
        </HStack>
      </div>
    </FormWrapper>
  );
};

export default BookManagementFilter;
