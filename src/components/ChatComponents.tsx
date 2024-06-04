import React from 'react';

import { useSocket } from '@/hooks/useSocket';

const ChatComponent = () => {
  const socket = useSocket('http://localhost:3001/chat');

  React.useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to the chat server');

        socket.emit('joinRoom', { userId: 1, roles: ['USER'] });
      });

      socket.on('receiveMessage', (message: string) => {
        console.log('New message:', message);
      });

      // Cleanup on component unmount
      return () => {
        socket.emit('leaveRoom');
        socket.off('connect');
        socket.off('receiveMessage');
      };
    }

    return () => {};
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', { text: 'Hello, admin!', senderId: 1, roles: ['USER'] });
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
