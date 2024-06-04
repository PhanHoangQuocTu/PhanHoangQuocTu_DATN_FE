import { useParams } from 'next/navigation';
import React from 'react';
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import { Icons } from '@/assets/icons';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { HStack } from '@/components/ui/Utilities';
import { useCopy } from '@/hooks/useCopy';
import { env } from '@/lib/const';
import { type FCC, ROUTE } from '@/types';

const SharePostDialog: FCC = ({ children }) => {
  const [copied, copy] = useCopy();
  const params = useParams();
  const postId = params?.postId;

  const postUrl = React.useMemo(() => {
    if (!postId) return '';

    return `${env.APP_URL}/${ROUTE.POST}/${postId}`;
  }, [postId]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Share this blog unique offfer:</AlertDialogHeader>

        <HStack noWrap>
          <FacebookMessengerShareButton url={postUrl} redirectUri={postUrl} appId="1410039959693094">
            <FacebookMessengerIcon />
          </FacebookMessengerShareButton>

          <LinkedinShareButton url={postUrl}>
            <LinkedinIcon />
          </LinkedinShareButton>

          <ViberShareButton url={postUrl}>
            <ViberIcon />
          </ViberShareButton>

          <WhatsappShareButton url={postUrl}>
            <WhatsappIcon />
          </WhatsappShareButton>

          <PinterestShareButton media="" url={postUrl}>
            <PinterestIcon />
          </PinterestShareButton>

          <TelegramShareButton url={postUrl}>
            <TelegramIcon />
          </TelegramShareButton>
        </HStack>
        <span>Share this link</span>
        <Input
          value={postUrl}
          readOnly
          suffix={
            !copied ? (
              <Icons.copy onClick={() => copy(postUrl)} className="w-5 h-5 cursor-pointer hover:opacity-50" />
            ) : (
              <Icons.check className="w-5 h-5" />
            )
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default SharePostDialog;
