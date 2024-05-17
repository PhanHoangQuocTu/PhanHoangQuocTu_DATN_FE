import { format } from 'date-fns';
import React from 'react';

import { type IGetReviewByBookIdUser, type IReview } from '@/api/review';
import { Icons } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';

import DeleteReviewDialog from './DeleteReviewDialog';

interface Props {
  user: IGetReviewByBookIdUser;
  review: IReview;
  reviewDeleteId: string;
  setReviewDeleteId: React.Dispatch<React.SetStateAction<string>>;
}
const RatingItem: React.FC<Props> = ({ user, review, reviewDeleteId, setReviewDeleteId }) => {
  const { user: currentUser } = useAuth();
  const fullName = React.useMemo(() => {
    if (!user) return '';

    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  return (
    <VStack className="w-full bg-[#fafafa] rounded-md pt-2 pb-4 px-4 shadow-[0rem_0rem_1.25rem_.125rem_rgba(185,185,185,0.25)]">
      <HStack noWrap pos={'apart'}>
        <HStack noWrap spacing={12}>
          <Avatar className="w-14 h-14">
            <Icons.user size={24} />
          </Avatar>

          <VStack spacing={4}>
            <span className="text-lg font-medium">{fullName}</span>
            <span>{user?.email}</span>
          </VStack>
        </HStack>

        <VStack>
          <HStack noWrap pos={'apart'}>
            <HStack noWrap>
              <span>Rating: {review?.ratings}</span>
              <Icons.star fill="#FFC107" size={16} />
            </HStack>
            {currentUser.id === user?.id && (
              <DeleteReviewDialog
                id={String(review.id)}
                reviewDeleteId={reviewDeleteId}
                setReviewDeleteId={setReviewDeleteId}
              >
                <Tooltip label="Delete review">
                  <Icons.x onClick={() => setReviewDeleteId(String(review.id))} size={16} />
                </Tooltip>
              </DeleteReviewDialog>
            )}
          </HStack>
          <span>{format(new Date(review.createdAt), 'dd/MM/yyyy HH:mm')}</span>
        </VStack>
      </HStack>

      <span className="text-base font-medium">{review?.comment}</span>
    </VStack>
  );
};

export default RatingItem;
