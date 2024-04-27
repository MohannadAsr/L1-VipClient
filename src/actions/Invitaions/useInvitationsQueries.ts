import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InvitationByUserId } from '../Events/Dto';
import { CreateVipInvitaionDto } from './Dto';
import { Invitations_API } from './EndPoints';

const { POST, GET, DELETE } = useApi();

// Create

const CreateInvitation = async (payload: CreateVipInvitaionDto) => {
  const response = await POST(Invitations_API.main, payload);
  return response;
};

export const MutateCreateInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: (payload: CreateVipInvitaionDto) => CreateInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaionVip'] });
    },
  });
};

// Get

const getVipInvitaion = async (payload: { eventId: string; vipId: string }) => {
  const response = await GET<{ data: InvitationByUserId }>(
    Invitations_API.VIPINvitaions,
    payload
  );
  return response.data.data;
};

export const useVipInvitaion = (payload: {
  eventId: string;
  vipId: string;
}) => {
  return useQuery({
    queryKey: ['invitaionVip'],
    queryFn: () => getVipInvitaion(payload),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

// Delete

const DeleteInvitation = async (id: string) => {
  const response = await DELETE(Invitations_API.main, {}, { id: id });
  return response.data;
};

export const MutateDeleteInvite = () => {
  return useMutation({
    mutationKey: ['DeleteInvite'],
    mutationFn: (id: string) => DeleteInvitation(id),
  });
};
