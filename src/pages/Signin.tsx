import { Alert, Paper } from '@mui/material';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { SuccessBtn } from '@src/styles/styledComponents';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import MuiIcon from '@src/@core/components/MuiIcon';
import { useAuth } from '@src/Auth/useAuth';
import VipRequest from '@components/EventAccess/VipRequest';
import CopyRight from '@components/CopyRight';
import { motion } from 'framer-motion';

export class vipLogin {
  email = '' as string;
  phone = '' as string;
}

function Signin() {
  const { Login, isLoggedIn } = useAuth();
  const [isLoggedin, setIsLoggedin] = React.useState<boolean>(isLoggedIn());
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [join, setJoin] = React.useState<boolean>(false);

  const validationSchema = yup.object({
    email: yup.string().nullable(),
    phone: yup.string().nullable(),
  });

  const submit = (values: vipLogin) => {
    setLoading(true);
    Login(values)
      .then(() => {
        setIsLoggedin(isLoggedIn());
      })
      .catch((error: AxiosError<any>) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (join) return <VipRequest join={join} setJoin={setJoin} />;
  return (
    <div className="  flex flex-col justify-start gap-7 min-h-[40vh] my-10  px-2 md:px-20 z-[2] container">
      <motion.div
        initial={{ left: -150 }}
        animate={{ left: 0 }}
        transition={{ duration: 1 }}
        className=" relative"
      >
        <Paper elevation={0} className=" z-[2]  px-5 w-full  py-8">
          <Formik
            onSubmit={submit}
            initialValues={{ ...new vipLogin() }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className=" flex flex-col gap-3 justify-center   ">
                <p className="    font-semibold text-[15px] z-[2] ">
                  Bitte melden Sie sich an, um auf die Veranstaltungsdetails
                  zuzugreifen
                </p>
                <FormikControl
                  InputProps={{
                    startAdornment: <MuiIcon name="Email" />,
                  }}
                  name="email"
                  label={'Email'}
                  Fieldtype="textField"
                  fullWidth
                />
                <p className=" text-center capitalize font-medium text-primary dark:text-success text-[15px] ">
                  Oder über die Telefonnummer
                </p>
                <FormikControl
                  InputProps={{
                    startAdornment: <MuiIcon name="Phone" />,
                  }}
                  name="phone"
                  label={'Telefon'}
                  Fieldtype="textField"
                  type="tel"
                  fullWidth
                />
                <div className=" flex items-center justify-center">
                  <SuccessBtn
                    loading={loading}
                    type="submit"
                    sx={{ maxWidth: 250 }}
                    fullWidth
                  >
                    Anmeldung
                  </SuccessBtn>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <div
                  className=" flex items-center justify-center  underline font-semibold text-[14px] cursor-pointer"
                  onClick={() => setJoin(true)}
                >
                  VIP -Mitglied werden
                </div>
              </div>
            </Form>
          </Formik>
        </Paper>
      </motion.div>

      <CopyRight />
    </div>
  );
}

export default Signin;
