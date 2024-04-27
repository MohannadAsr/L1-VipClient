import React from 'react';
import { Button, FormLabel, IconButton, Paper, TextField } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import ApproveHandler from '../Custom/ApproveHandler';
import { useVipRequestContext } from './EventByUser';
import { ErrorMessage } from 'formik';

function TableOption({ data }) {
  const { FormState, setFormState } = useVipRequestContext();

  return (
    <>
      {data?.AvailableTables.length > 0 && (
        <>
          <div>
            <div className=" flex items-center justify-between flex-wrap gap-2 my-2">
              <FormLabel>Möchten Sie einen Tisch reservieren?</FormLabel>
              <ApproveHandler
                value={FormState.tableReservation}
                onChange={(val) => {
                  setFormState({
                    ...FormState,
                    tableReservation: val,
                  });
                }}
              />
            </div>
          </div>
          {FormState.tableReservation && (
            <>
              <div className=" grid grid-cols-2 md:grid-cols-3 gap-3">
                {data?.AllTablesDetails.filter((item) =>
                  data?.AvailableTables.includes(item.id)
                ).map((item, index) => {
                  return (
                    <Paper
                      elevation={0}
                      onClick={() => {
                        setFormState({
                          ...FormState,
                          tableId:
                            FormState.tableId == item.id ? null : item.id,
                        });
                      }}
                      key={index}
                      className={` ${
                        FormState.tableId == item.id &&
                        ' border-primary dark:border-success border-[2px]'
                      }  cursor-pointer p-3 rounded-md shadow-lg relative `}
                    >
                      {FormState.tableId == item.id && (
                        <span className=" z-[899] absolute -top-[0.5rem] left-1/2 -translate-x-1/2 bg-success  p-2 rounded-full w-7 h-7 flex items-center justify-center border-success border-[2px]">
                          <MuiIcon
                            name="Check"
                            color="inherit"
                            className=" text-white"
                          />
                        </span>
                      )}
                      <div className=" bg-secondary flex items-center justify-center rounded-md">
                        <MuiIcon
                          name="TableBar"
                          sx={{ fontSize: 60, color: '#fff' }}
                        />
                      </div>
                      <div className=" flex items-center justify-between mt-3 gap-3">
                        <div className=" flex-1 flex  items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                          <MuiIcon name="Chair" />
                          <p>{item.seats}</p>
                        </div>
                      </div>
                    </Paper>
                  );
                })}
              </div>
              <ErrorMessage
                name="tableId"
                component={'div'}
                className="error-msg"
              />
              {FormState.multiple &&
                data?.AllTablesDetails?.find(
                  (table) => table?.id == FormState?.tableId
                )?.seats <
                  FormState?.peopleNames?.length + 1 && (
                  <div className=" text-red-500 font-semibold text-[12px]">
                    * Warnung: Die Anzahl der Tischplätze ist geringer als die
                    ankommenden Personen.
                  </div>
                )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default TableOption;
