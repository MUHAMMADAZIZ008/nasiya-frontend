export interface ILogin {
  login: string;
  hashed_password: string;
}

export interface IStoreStatistic {
  code_status: number;
  data: {
    debtorCount: number;
    image: string | null;
    lateDebtsCount: number;
    totalDebt: string;
  };
  message: string;
}

interface IDebtorPhone {
  id: string;
  created_at: string;
  updated_at: string;
  phone_number: string;
}

interface IDebtorImg {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface IDebtor {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  address: string;
  description: string;
  phone_numbers: IDebtorPhone[];
  images: IDebtorImg[];
}

export interface TableDataType {
  key: string;
  id: string;
  created_at: string;
  full_name: string;
  address: string;
  phone_numbers: string;
  images: string;
  action?: any;
}