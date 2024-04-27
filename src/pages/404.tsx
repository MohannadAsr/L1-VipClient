import React from 'react';
import logo from '/logo.webp';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className=" min-h-[100vh] flex flex-col gap-4 items-center justify-center text-center">
      <div className=" bg-primary p-5 rounded-md">
        <img src={logo} alt="error-404" className=" xl:h-[250px] h-[180px]" />
      </div>
      <h1 className=" text-center text-2 text-red-500 drop-shadow-lg font-bold uppercase">
        Fehler 404
      </h1>
      <h1 className=" text-center text-1 drop-shadow-lg font-bold uppercase">
        Seite nicht gefunden
      </h1>
      <p className=" text-6">
        Hoppla! Die angeforderte URL wurde auf diesem Server nicht gefunden.
      </p>
    </div>
  );
}

export default Error404;
