export type DeliveryCompany = {
  id: number;
  name: string;
  states: State[];
};

export type State = {
  id: number;
  name: string;
  municipalities: Municipality[];
};

export type Municipality = {
  id: number;
  name: string;
  prices: {
    home: number;
    deliveryOffice: number;
  };
};
