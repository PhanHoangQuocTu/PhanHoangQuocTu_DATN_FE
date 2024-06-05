import { Download } from 'lucide-react';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { Icons } from '@/assets/icons';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { VStack } from '@/components/ui/Utilities';
import { useCopy } from '@/hooks/useCopy';
import { useDownload } from '@/hooks/useDownload';
import { env } from '@/lib/const';
import { type FCC, ROUTE } from '@/types';

const SharePostDialog: FCC = ({ children }) => {
  const [copied, copy] = useCopy();
  const { download, isLoading } = useDownload();
  const params = useParams();
  const postId = params?.postId;

  const postUrl = React.useMemo(() => {
    if (!postId) return '';

    return `${env.APP_URL}/${ROUTE.POST}/${postId}`;
  }, [postId]);

  const handleDownload = () => {
    download('blog-qr-code', 'QR_postUrl.png');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Share this blog:</AlertDialogHeader>

        <VStack align={'center'} spacing={4}>
          <QRCodeSVG value={postUrl} size={256} />,
          <Button disabled={isLoading} onClick={handleDownload} className="gap-4 cursor-pointer">
            <span>Download QR</span>
            <Download />
          </Button>
        </VStack>
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
