import { Icons } from '@/assets/icons';

export const RATING_OPTIONS = [
  {
    label: '1',
    value: '1',
    image: <Icons.star fill="#FFC107" size={16} />,
  },
  {
    label: '2',
    value: '2',
    image: <Icons.star fill="#FFC107" size={16} />,
  },
  {
    label: '3',
    value: '3',
    image: <Icons.star fill="#FFC107" size={16} />,
  },
  {
    label: '4',
    value: '4',
    image: <Icons.star fill="#FFC107" size={16} />,
  },
  {
    label: '5',
    value: '5',
    image: <Icons.star fill="#FFC107" size={16} />,
  },
];

export const DEFAULT_FORM_REVIEW = {
  ratings: '5',
  comment: '',
};
