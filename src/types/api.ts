export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Store = {
  id: string;
  adminId: string;
  providerName: string;
  contactNumber: string;
  address: string | null;
  city: string;
  description: string | null;
  logoUrl: string | null;
};

export type PaymentStatus = "pending" | "partial" | "paid" | "overdue";
export type CustomerStatus = "active" | "inactive";
export type PaymentMethod = "cash" | "bank" | "easypaisa";

export type Plan = {
  id: string;
  storeId: string;
  name: string;
  price: number;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BillingPeriod = {
  id: string;
  storeId: string;
  customerId: string;
  planId: string;
  periodStart: string;
  periodEnd: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  status: PaymentStatus;
};

export type Customer = {
  id: string;
  storeId: string;
  planId: string;
  name: string;
  username: string;
  phoneNumber: string;
  address: string | null;
  activationDate: string;
  expirationDate: string;
  status: CustomerStatus;
  creditBalance: number;
  plan?: Plan;
  currentPeriod?: BillingPeriod | null;
  totalOutstanding?: number;
  paymentStatus?: PaymentStatus;
  billingPeriods?: BillingPeriod[];
  payments?: Payment[];
};

export type Payment = {
  id: string;
  storeId: string;
  customerId: string;
  amount: number;
  unappliedAmount: number;
  method: PaymentMethod;
  paidAt: string;
  reference: string | null;
  notes: string | null;
  customer?: Customer;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
