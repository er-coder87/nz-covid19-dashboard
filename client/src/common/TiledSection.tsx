import React from 'react';

export const TitledSection = ({ children, title }: any) => {
  return (
    <>
      <h5
        className="text-light mb-3 pb-1"
        style={{ borderBottom: '1px solid grey' }}
      >
        {title}
      </h5>
      {children}
    </>
  );
};
