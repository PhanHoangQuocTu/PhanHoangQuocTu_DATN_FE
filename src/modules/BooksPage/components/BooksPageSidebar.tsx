import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetAllAuthor } from '@/hooks/author/useGetAllAuthor';
import { useGetAllCategory } from '@/hooks/category/useGetAllCategory';
import { useGetAllPublisher } from '@/hooks/publisher/useGetAllPublisher';
import { defaultArray } from '@/lib/common';
import { limit_infinite } from '@/lib/const';

import { booksPageFilterSchema, type BooksPageFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: BooksPageFilterType) => void;
}

const BooksPageSidebar: React.FC<Props> = ({ handleSearchChange }) => {
  const { authorSelectOptions } = useGetAllAuthor(limit_infinite);
  const { categorySelectOptions } = useGetAllCategory(limit_infinite);
  const { publisherSelectOptions } = useGetAllPublisher(limit_infinite);
  const form = useForm<BooksPageFilterType>({
    resolver: zodResolver(booksPageFilterSchema),
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

  const handleSubmit: SubmitHandler<BooksPageFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="col-span-2">
      <VStack className="w-full border border-primary rounded-sm py-5 px-2">
        <div className="text-lg font-medium text-primary py-2 border-b border-b-primary w-full">Filter By</div>

        <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />

        <VStack>
          <label>Price</label>
          <HStack noWrap spacing={12}>
            <TextField size={'sm'} control={form.control} name="minPrice" placeholder="Min" />
            <span>to</span>
            <TextField size={'sm'} control={form.control} name="maxPrice" placeholder="Max" />
          </HStack>
        </VStack>

        <SelectField
          className="h-11"
          fullWidth
          control={form.control}
          label="Category"
          name="categoryId"
          data={defaultArray(categorySelectOptions)}
          placeholder="Category"
        />

        <SelectField
          className="h-11"
          fullWidth
          control={form.control}
          label="Author"
          name="authorId"
          data={defaultArray(authorSelectOptions)}
          placeholder="Author"
        />

        <SelectField
          className="h-11"
          fullWidth
          control={form.control}
          label="Publisher"
          name="publisherId"
          data={defaultArray(publisherSelectOptions)}
          placeholder="Publisher"
        />

        <Button type="submit">Apply Filter</Button>
      </VStack>
    </FormWrapper>
  );
};

export default BooksPageSidebar;
