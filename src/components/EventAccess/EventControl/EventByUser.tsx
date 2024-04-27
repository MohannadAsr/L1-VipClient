import CopyRight from '@components/CopyRight';
import { CircularProgress, Paper } from '@mui/material';
import { useEventByIdQueries } from '@src/actions/Events/useEventsQueries';
import { CreateVipInvitaionForm } from '@src/actions/Invitaions/Dto';
import {
  MutateCreateInvitation,
  useVipInvitaion,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { useProductsListQuery } from '@src/actions/Products/useProductsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { RootState } from '@src/store/store';
import { SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import EventDetailsCard from '../Custom/EventDetailsCard';
import DeliveryOption from './DeliveryOption';
import PeopleNames from './PeopleNames';
import ProductsOption from './ProductsOption';
import StatusHandler from './StatusHandler';
import TableOption from './TableOption';
import Confetti from 'react-confetti';
import { useToast } from '@src/hooks/useToast';

export type VipRequestType = {
  FormState: CreateVipInvitaionForm;
  setFormState: React.Dispatch<React.SetStateAction<CreateVipInvitaionForm>>;
};

export const VipRequest = React.createContext<undefined | VipRequestType>(
  undefined
);

function EventByUser() {
  const { id } = useParams();
  const { counter } = useCountDown();
  const { Auth } = useSelector((state: RootState) => state.App);
  // Event Data
  const { data, isError } = useEventByIdQueries(id);
  const {
    data: invitaion,
    refetch,
    isLoading,
  } = useVipInvitaion({
    eventId: id,
    vipId: Auth.UserInfo?.id,
  });
  // FormStateCreateVipInvitaionForm
  const [FormState, setFormState] = React.useState<CreateVipInvitaionForm>(
    new CreateVipInvitaionForm()
  );
  const { toast } = useToast();
  // Api Queries
  const { mutate: create, isPending: isCreating } = MutateCreateInvitation();
  const { data: productList, isLoading: isLoadingProduct } =
    useProductsListQuery();
  const [selectedItems, setSelectedItems] = React.useState<
    { id: string; quantity: number; name: string; price: number }[]
  >([]);

  // Count Down
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      tableId: FormState.tableReservation
        ? yup.string().required('Bitte wählen Sie einen Tisch aus.')
        : yup.string().nullable(),
      deliveryDate: FormState.deliveryOption
        ? yup.string().required()
        : yup.string().nullable(),
      deliveryAddress: FormState.deliveryOption
        ? yup.string().required('Bitte geben Sie Ihre Adresse an.')
        : yup.string().nullable(),
      peopleNames: FormState.multiple
        ? yup
            .array()
            .of(
              yup
                .string()
                .required(
                  'Bitte geben Sie einen Namen an oder löschen Sie dieses Feld.'
                )
            )
            .min(1)
            .required()
        : null,
      products:
        FormState.productsOption && CountDown?.day >= 1
          ? yup
              .array()
              .of(
                yup.object().shape({
                  id: yup.string(),
                  quantity: yup
                    .string()
                    .min(1)
                    .required('Bitte geben Sie eine Menge an.'),
                  name: yup.string(),
                  price: yup.string(),
                })
              )
              .min(1, 'Bitte wählen Sie Ihre Produkte aus.')
          : null,
    });
  }, [FormState, CountDown]);

  React.useEffect(() => {
    if (data?.event.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(data?.event.date));
      }, 1000);
    }
  }, [data]);

  // Is Ended
  const isEnded = React.useMemo(() => {
    if (CountDown) {
      return [
        CountDown.day,
        CountDown.hour,
        CountDown.minute,
        CountDown.second,
      ].every((item) => item == 0);
    }
    return false;
  }, [CountDown]);

  // Total Price
  const TotalPrice = React.useMemo(() => {
    if (productList && selectedItems.length > 0) {
      const total = selectedItems.reduce((acc, curr) => {
        return (acc =
          acc +
          productList.find((product) => product.id == curr.id)?.price *
            curr.quantity);
      }, 0);
      return total;
    }
    return 0;
  }, [productList, selectedItems]);

  const createInvitaion = (values) => {
    if (FormState.productsOption && CountDown?.day < 1)
      return toast(
        'Leider können Sie keine Produkte bestellen, wenn weniger als 24 Stunden bis zum Beginn der Veranstaltung verbleiben',
        'warning'
      );
    create(
      {
        ...FormState,
        eventId: id,
        vipId: Auth?.UserInfo?.id,
        peopleNames: FormState.multiple ? FormState.peopleNames : [],
        peopleCount: FormState.multiple ? FormState.peopleNames.length + 1 : 1,
        deliveryDate: FormState.deliveryOption ? FormState.deliveryDate : null,
        deliveryAddress: FormState.deliveryOption
          ? FormState.deliveryAddress
          : null,
        products:
          FormState.productsOption && CountDown?.day >= 1
            ? selectedItems
            : null,
        tableId: FormState.tableReservation ? FormState.tableId : null,
      },
      {
        onSuccess: (data) => {
          if (data.data.data.url) {
            return location.replace(data.data.data.url);
          }
          refetch();
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className=" my-10 flex items-center justify-center flex-col">
        <CircularProgress color="inherit" className=" text-white z-[2]" />
        <p> Bitte warten Sie...</p>
      </div>
    );

  if (isError)
    return (
      <Paper className=" p-4 mt-2 flex items-center justify-center">
        Ereignis nicht gefunden 404
      </Paper>
    );
  return (
    <VipRequest.Provider value={{ FormState, setFormState }}>
      <>
        <div className=" z-[2] relative px-1 container my-2 ">
          <EventDetailsCard
            invitaion={invitaion}
            CountDown={CountDown}
            data={data?.event}
            isEnded={isEnded}
          />
          {!invitaion && !isEnded && (
            <Paper className=" p-4 ">
              <Formik
                onSubmit={createInvitaion}
                initialValues={FormState}
                enableReinitialize
                validationSchema={validationSchema}
              >
                <Form>
                  <div className=" flex items-center justify-center">
                    <p className=" ">
                      Bitte füllen Sie dieses Formular aus, wenn Sie beitreten
                      möchten
                    </p>
                  </div>
                  <div className=" grid grid-cols-1  gap-2 my-4 lg:w-3/4 mx-auto ">
                    <PeopleNames />
                    <DeliveryOption />
                    <TableOption data={data} />
                    <ProductsOption
                      CountDown={CountDown}
                      productList={productList}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                  </div>
                  <Paper
                    elevation={0}
                    className="flex items-center justify-center   p-3 rounded-md shadow-md"
                  >
                    {TotalPrice == 0 || !FormState.productsOption ? (
                      <SuccessBtn type="submit" loading={isCreating}>
                        Beitrittsanfrage
                      </SuccessBtn>
                    ) : (
                      <SuccessBtn type="submit" loading={isCreating}>
                        {' '}
                        Kasse {TotalPrice} €{' '}
                      </SuccessBtn>
                    )}
                  </Paper>
                </Form>
              </Formik>
            </Paper>
          )}
          <Paper className=" p-4">
            <StatusHandler invitaion={invitaion} />
          </Paper>
          <div className=" mt-6">
            <CopyRight />
          </div>
        </div>
      </>
    </VipRequest.Provider>
  );
}

export default EventByUser;

export const useVipRequestContext = () => {
  return React.useContext(VipRequest);
};
