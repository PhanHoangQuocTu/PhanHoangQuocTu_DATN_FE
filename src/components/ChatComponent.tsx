// ChatComponent.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatComponent = ({ userId, userName }: { userId: number; userName: string }) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001/chat');

    newSocket.emit('joinChat', { userId });

    newSocket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { senderId: Number(userId), text: newMessage, senderName: userName });
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      <div className="flex flex-col space-y-2 p-3 max-h-96 overflow-y-auto">
        {messages.map((msg: any, index: any) => (
          <div key={index} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`inline-block rounded px-4 py-2 ${
                msg.senderId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.senderId !== userId && <span className="font-bold mr-2">{msg.senderName}:</span>}
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border-2 border-gray-300 rounded"
        />
        <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
