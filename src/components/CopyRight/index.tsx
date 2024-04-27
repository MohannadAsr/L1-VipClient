import React from 'react';

function CopyRight() {
  return (
    <div className="  drop-shadow-lg uppercase  text-xs md:text-sm text-center z-[2] font-semibold">
      COPYRIGHT © 2024{' '}
      <a
        href="https://ddm-agentur.de/"
        className=" text-primary dark:text-success font-semibold"
      >
        DDM-Agentur
      </a>{' '}
      , All rights Reserved
    </div>
  );
}

export default CopyRight;
