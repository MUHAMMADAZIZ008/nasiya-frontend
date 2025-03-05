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

