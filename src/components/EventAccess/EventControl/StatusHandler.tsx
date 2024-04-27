import MuiIcon from '@src/@core/components/MuiIcon';
import { InvitationByUserId } from '@src/actions/Events/Dto';
import { MutateDeleteInvite } from '@src/actions/Invitaions/useInvitationsQueries';
import { InvitationStatus } from '@src/enums/Enums';
import { SuccessBtn } from '@src/styles/styledComponents';
import React from 'react';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Height } from '@mui/icons-material';

function StatusHandler({ invitaion }: { invitaion: InvitationByUserId }) {
  const { mutate: deleteInvite, isPending: isDeleting } = MutateDeleteInvite();
  const [Dimens, setDimens] = React.useState({
    width: window.innerWidth,
    Height: window.innerHeight,
  });

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setDimens({ width: window.innerWidth, Height: window.innerHeight });
    });
  }, []);

  // Handle Delete Invite
  const handleDeleteInvite = () => {
    if (invitaion?.id) {
      deleteInvite(invitaion?.id, {
        onSuccess: (data) => {
          location.reload();
        },
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = invitaion?.qrCodeUrl;
    link.download = 'downloaded-photo.jpg';
    link.click();
  };

  // Completed
  if (invitaion?.status == InvitationStatus.Completed)
    return (
      <div className=" flex flex-col gap-2 justify-center items-center   overflow-hidden  relative">
        <span className=" absolute left-0 top-0 w-full h-full">
          <Confetti recycle className="z-[999]" />
        </span>
        <p className=" text-7  relative p-3">
          Vielen Dank, dass Sie an diesem Ereignis teilgenommen haben. Bitte
          bleiben Sie in Kontakt für neue Veranstaltungen.
        </p>
      </div>
    );
  // Missed
  if (invitaion?.status == InvitationStatus.Missed)
    return (
      <div className=" flex items-center justify-center flex-col gap-5 ">
        <MuiIcon name="SentimentDissatisfied" sx={{ fontSize: 60 }} />
        <p className=" text-7   ">
          Es tut uns leid, dass Sie nicht bei uns teilnehmen konnten. Wir
          hoffen, dass es Ihnen gut geht und Sie sich uns bei zukünftigen
          Veranstaltungen anschließen können.
        </p>
      </div>
    );
  //Approved
  if (invitaion?.status == InvitationStatus.Approved)
    return (
      <div>
        {'approved' == 'approved' && (
          <div className=" flex flex-col gap-2 justify-center items-center  p-3  relative overflow-hidden">
            <span className=" absolute left-0 top-0 w-full h-full">
              <Confetti recycle className="z-[999]" />
            </span>
            <p className=" text-7   ">
              Bitte speichern Sie Ihren QR-Code, um auf das Ereignis
              zuzugreifen. Hinweis: Sie können nicht auf das Ereignis zugreifen,
              wenn Sie keinen QR-Code haben.
            </p>
            <img src={invitaion?.qrCodeUrl} alt="" className=" h-[150px]" />
            <SuccessBtn onClick={handleDownload}>
              Laden Sie den QR-Code herunter
            </SuccessBtn>
          </div>
        )}
      </div>
    );
  //Pending
  if (invitaion?.status == InvitationStatus.Pending)
    return (
      <div className=" py-5">
        <p className=" text-7    p-2">
          Sie haben bereits eine ausstehende Anfrage, die bezahlt werden muss.
          Ihre Anfrage wird nach 10 Minuten nach Erstellung gelöscht, wenn Sie
          die Zahlung nicht abschließen.
        </p>
        <div className=" flex items-center justify-center gap-4 px-2">
          <a
            href={invitaion?.paymentUrl}
            target="_self"
            className=" text-center text-primary bg-success p-3 font-semibold rounded-md text-[12px] flex items-center gap-1"
          >
            <MuiIcon name="Payment" />
            Gehen Sie zur Zahlung
          </a>
          <button
            // disabled={isDeleting}
            onClick={handleDeleteInvite}
            className=" text-center text-white bg-error p-3 font-semibold rounded-md text-[12px] flex items-center gap-1"
          >
            <MuiIcon name="Cancel" />
            Meine Anfrage löschen
          </button>
        </div>
      </div>
    );
  return <></>;
}

export default StatusHandler;
