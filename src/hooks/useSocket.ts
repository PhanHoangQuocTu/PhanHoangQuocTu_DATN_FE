import React from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = React.useState<any>(null);

  React.useEffect(() => {
    const socketIo = io(serverPath);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, [serverPath]);

  return socket;
};
