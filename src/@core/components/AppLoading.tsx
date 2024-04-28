import React from 'react';
import logo from '/logo.webp';
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

export const AppLoading = () => {
  return (
    <Paper
      elevation={0}
      className=" h-[100vh] flex items-center justify-center app-loading"
    >
      <div className=" flex flex-col gap-5 items-center justify-center">
        <div className=" bg-primary p-5 rounded-md">
          <motion.img
            initial={{ rotate: 360, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={logo}
            alt="Loading"
            loading="eager"
            className=" w-20 md:w-44 bg-primary relative"
          />
        </div>
      </div>
    </Paper>
  );
};
