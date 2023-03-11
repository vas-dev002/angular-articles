export interface IPayService {
  name: string;
  id: number;
}

export const DEFAULT_PAY_SERVICE_LIST: IPayService[] = [
  {
    name: 'Service 1',
    id: 1,
  },
  {
    name: 'Service 2',
    id: 2,
  },
  {
    name: 'Service 3',
    id: 3,
  },
];
