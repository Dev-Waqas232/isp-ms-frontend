import { apiRequest } from "../lib/api";
import type { Customer, PaginationMeta } from "../types/api";

export type CustomerPayload = {
  name: string;
  username: string;
  phoneNumber: string;
  address?: string;
  planId: string;
  activationDate: string;
};

export type CustomerListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "all";
};

function toQuery(params: CustomerListParams) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}

export function getCustomers(params: CustomerListParams = {}) {
  const query = toQuery(params);
  return apiRequest<{ customers: Customer[]; pagination: PaginationMeta }>(`/customers${query ? `?${query}` : ""}`, {
    auth: true,
  });
}

export function getCustomer(customerId: string) {
  return apiRequest<{ customer: Customer }>(`/customers/${customerId}`, {
    auth: true,
  });
}

export function createCustomer(payload: CustomerPayload) {
  return apiRequest<{ customer: Customer }>("/customers", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function updateCustomer(customerId: string, payload: Partial<CustomerPayload> & { status?: "active" | "inactive" }) {
  return apiRequest<{ customer: Customer }>(`/customers/${customerId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function deactivateCustomer(customerId: string) {
  return apiRequest<{ customer: Customer }>(`/customers/${customerId}/deactivate`, {
    method: "PATCH",
    auth: true,
  });
}
