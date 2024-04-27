import React from 'react';
import { format } from 'date-fns';
import logo from '/logo.webp';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store/store';
import { Paper } from '@mui/material';

const EventDetailsCard = ({ data, isEnded, CountDown, invitaion }) => {
  const { Auth } = useSelector((state: RootState) => state.App);

  return (
    <Paper>
      {!invitaion && (
        <Paper elevation={0} className="   p-5 ">
          Hey,{' '}
          <span className=" text-primary dark:text-success font-bold">
            {Auth?.UserInfo?.name}{' '}
          </span>{' '}
          ! Du interessierst dich für unsere Veranstaltung. Bitte lese die
          Veranstaltungsdetails und teile uns mit, ob Du dabei sein möchtest.
          Damit wir für dich ein QR Code erstellen können, den du dann als
          Eintrittskarte verwenden kannst.
        </Paper>
      )}
      <div className=" grid grid-cols-1 lg:grid-cols-2   ">
        <div className="  p-3 flex justify-center items-center bg-slate-900 ">
          <img
            src={data?.image || logo}
            alt=""
            className={` ${
              data?.image ? 'object-contain' : 'object-contain'
            }  max-h-[250px] md:max-h-[350px] h-full  w-full`}
          />
        </div>
        <Paper elevation={0}>
          <div className=" z-[2] flex  justify-between text-white p-5 flex-wrap">
            <p className=" text-6">{data?.name}</p>
            {data?.date && (
              <p className="   ">
                {format(new Date(data?.date), ' dd-MM-yyyy , HH:mm')}
              </p>
            )}
          </div>
          {isEnded ? (
            <div className=" text-center text-7   text-red-500 font-semibold">
              Dieses Ereignis hat sogar begonnen oder endete
            </div>
          ) : (
            <div className="bg-white py-3 px-2">
              <p className=" text-center text-7  text-primary uppercase">
                BEGINNT IN
              </p>
              {CountDown && (
                <div className=" flex justify-evenly items-center gap-3 text-6 text-center  text-white text-7">
                  <Paper
                    elevation={0}
                    className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2"
                  >
                    <span className="text-primary font-semibold dark:text-success text-6">
                      {CountDown.day}
                    </span>{' '}
                    Tage
                  </Paper>
                  <Paper
                    elevation={0}
                    className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2"
                  >
                    <span className="text-primary font-semibold dark:text-success text-6">
                      {' '}
                      {CountDown.hour}
                    </span>{' '}
                    Std.
                  </Paper>
                  <Paper
                    elevation={0}
                    className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2"
                  >
                    <span className="text-primary font-semibold dark:text-success text-6">
                      {CountDown.minute}
                    </span>{' '}
                    Min
                  </Paper>
                  <Paper
                    elevation={0}
                    className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2"
                  >
                    <span className="text-primary font-semibold dark:text-success text-6">
                      {CountDown.second}
                    </span>{' '}
                    Sek
                  </Paper>
                </div>
              )}
            </div>
          )}
          {data?.description && (
            <div className=" max-h-[190px] overflow-auto  p-3  my-2  capitalize ">
              <p className="  text-7  ">{data?.description}</p>
            </div>
          )}
        </Paper>
      </div>
    </Paper>
  );
};
export default EventDetailsCard;
