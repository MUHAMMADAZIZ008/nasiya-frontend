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
  created_at: string;
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
  debts: IDebt[];
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
