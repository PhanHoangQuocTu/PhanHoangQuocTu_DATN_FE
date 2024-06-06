// ChatComponent.jsx
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { type IUser } from '@/api/auth';
import { Icons } from '@/assets/icons';
import { env } from '@/lib/const';
import { cn } from '@/lib/utils';

import { ShadowContainer } from '../ShadowContainer';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { HStack, VStack } from '../ui/Utilities';

interface IMessages {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  sender: IUser;
  senderName: string;
  text: string;
}

const ChatComponent = ({ userId, userName }: { userId: number; userName: string }) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [newMessage, setNewMessage] = useState<any>('');

  useEffect(() => {
    const newSocket = io(`${env.API_URL}/chat`);

    newSocket.emit('joinChat', { userId });

    newSocket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    newSocket.on('messageDeleted', ({ messageId }: { messageId: any }) => {
      setMessages((prevMessages: IMessages[]) =>
        prevMessages.map((msg: IMessages) =>
          msg.id === messageId
            ? { ...msg, text: 'This message is not available!!!', deletedAt: new Date().toISOString() }
            : msg
        )
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  const deleteMessage = (messageId: any) => {
    socket.emit('deleteMessage', { messageId });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { senderId: Number(userId), text: newMessage, senderName: userName });
      setNewMessage('');
    }
  };

  const renderMessage = React.useCallback(
    (deletedAt: string | null, msg: IMessages) => {
      if (!deletedAt) {
        return (
          <span
            className={cn('rounded max-w-96 break-words px-4 py-2 bg-gray-200 text-gray-800', {
              'bg-primary text-white': msg?.sender?.id === userId,
            })}
          >
            {msg?.sender?.id !== userId && <span className="font-bold mr-2">{msg?.senderName}:</span>}
            {msg?.text}
          </span>
        );
      }

      return (
        <span className={cn('rounded max-w-96 break-words px-4 py-2 bg-gray-200 text-gray-800')}>
          This message is not available!!!
        </span>
      );
    },
    [userId]
  );

  return (
    <ShadowContainer className="w-[35rem]">
      <VStack spacing={8}>
        <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
        <VStack className="p-3 max-h-96 overflow-y-auto">
          {messages.map((msg: IMessages, index: number) => {
            console.log('🚀 ~ {messages.map ~ msg.senderId:', msg);

            return (
              <VStack key={index}>
                <HStack
                  spacing={12}
                  pos={'left'}
                  className={cn({
                    'justify-start flex-row-reverse': msg?.sender?.id === userId,
                  })}
                >
                  {renderMessage(msg?.deletedAt, msg)}

                  {((msg?.sender?.id === userId && !msg?.deletedAt) || (userName === 'Admin' && !msg?.deletedAt)) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Icons.circleEllipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer hover:opacity-50"
                          onClick={() => deleteMessage(msg?.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {!msg?.deletedAt && (
                    <span className="text-xs font-medium">{format(new Date(msg?.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                  )}
                </HStack>
              </VStack>
            );
          })}
        </VStack>

        <HStack noWrap className="mt-4">
          <div className="flex-1">
            <Input
              size={'sm'}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
          </div>
          <Button onClick={sendMessage}>Send</Button>
        </HStack>
      </VStack>
    </ShadowContainer>
  );
};

export default ChatComponent;
