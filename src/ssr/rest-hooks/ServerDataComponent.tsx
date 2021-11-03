import React, { createContext, useContext } from 'react';

export const StoreIndexContext = createContext<number>(0);

const ServerDataComponent = ({ data }: { data: Record<string, any> }) => {
  const storeIndex = useContext(StoreIndexContext);

  return (
    <script
      type="application/json"
      id={`server-data-${storeIndex}`}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};

export default ServerDataComponent;
