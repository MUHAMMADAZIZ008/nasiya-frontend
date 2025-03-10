export interface ILogin {
  login: string;
  hashed_password: string;
}

// debt
export interface IDebtImage {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface IDebt {
  id: string;
  created_at: Date;
  debt_name: string;
  updated_at: string;
  total_debt_sum: string;
  total_month: string;
  next_payment_date: string;
  debt_status: string;
  debt_period: number;
  debt_sum: number;
  description: string;
  images: IDebtImage[];
}

// debtor
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

export interface IDebtorPhone {
  id: string;
  created_at: string;
  updated_at: string;
  phone_number: string;
}

export interface IDebtorImg {
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
  debts: IDebt[];
}

export interface IDebtorData {
  data: IDebtor;
  message: string;
  status_code: number;
}

export interface TableDataType {
  key: string;
  id: string;
  created_at: string;
  full_name: string;
  address: string;
  phone_numbers: string;
  images: string;
  total_debts: number;
  action?: any;
}
export interface IUploadedFileRes {
  filename: string;
  originalname: string;
  path: string;
}

export interface DebtTableType {
  key: string;
  id: string;
  debt_name: string;
  created_at: string;
  next_payment_date: string;
  debt_status: string;
  debt_sum: number;
  action?: any;
}

// likes
export interface LikeApiResponse {
  status_code: number;
  message: string;
  data: LikeData;
}

export interface LikeData {
  store: string;
  debtor: string;
  id: string;
  created_at: string;
  updated_at: string;
}


//store

export interface Store {
  id: string;
  full_name: string;
  login: string;
  phone_number: string;
  pin_code: number;
  image: string | null;
  wallet: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  status_code: number;
  message: string;
  data: Store;
}
