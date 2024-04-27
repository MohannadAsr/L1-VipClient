export class CreateVipInvitaionForm {
  eventId: string = '';
  vipId: string = '';
  peopleCount: number = 1;
  tableReservation: boolean = false;
  tableId: string | null = null;
  deliveryOption: boolean = false;
  deliveryDate: string | Date = new Date();
  deliveryAddress: string = '';
  productsOption: boolean = false;
  products: { id: string; quantity: number; name: string }[] = [];
  peopleNames: string[] = [];
  multiple: boolean = false;
}

export class CreateVipInvitaionDto {
  eventId: string = '';
  vipId: string = '';
  peopleCount: number = 1;
  tableReservation: boolean = false;
  tableId: string | null = null;
  deliveryOption: boolean = false;
  deliveryDate: string | Date = new Date();
  deliveryAddress: string = '';
  productsOption: boolean = false;
  products: { id: string; quantity: number; name: string }[] = [];
  peopleNames: string[] = [];
}
