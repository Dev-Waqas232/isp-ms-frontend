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
