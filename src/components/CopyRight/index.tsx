import React from 'react';
import { motion } from 'framer-motion';

function CopyRight() {
  return (
    <motion.div
      initial={{ left: '100%' }}
      animate={{ left: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="  drop-shadow-lg uppercase  text-xs md:text-sm text-center z-[2] font-semibold relative"
    >
      COPYRIGHT © 2024{' '}
      <a
        href="https://ddm-agentur.de/"
        className=" text-primary dark:text-success font-semibold"
      >
        DDM-Agentur
      </a>{' '}
      , All rights Reserved
    </motion.div>
  );
}

export default CopyRight;
