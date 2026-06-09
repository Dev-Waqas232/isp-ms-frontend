import { apiRequest } from "../lib/api";
import type { Store } from "../types/api";

export type CreateStorePayload = {
  providerName: string;
  contactNumber: string;
  address?: string;
  city: string;
  description?: string;
  logo?: FileList;
};

export function createStore(payload: CreateStorePayload) {
  const formData = new FormData();
  formData.append("providerName", payload.providerName);
  formData.append("contactNumber", payload.contactNumber);
  formData.append("city", payload.city);

  if (payload.address) {
    formData.append("address", payload.address);
  }

  if (payload.description) {
    formData.append("description", payload.description);
  }

  if (payload.logo?.[0]) {
    formData.append("logo", payload.logo[0]);
  }

  return apiRequest<{ store: Store }>("/stores", {
    method: "POST",
    body: formData,
    auth: true,
  });
}

type StoresResponse = Store[] | { data?: Store[] | Store; stores?: Store[]; store?: Store };

export async function getAdminStore() {
  const data = await apiRequest<StoresResponse>("/stores", {
    auth: true,
  });

  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  if (Array.isArray(data.data)) {
    return data.data[0] ?? null;
  }

  if (data.data) {
    return data.data;
  }

  return data.store ?? data.stores?.[0] ?? null;
}
