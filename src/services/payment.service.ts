import { apiRequest } from "../lib/api";
import type { Payment, PaymentMethod } from "../types/api";

export type PaymentPayload = {
  customerId: string;
  amount: number;
  method: PaymentMethod;
  paidAt?: string;
  reference?: string;
  notes?: string;
};

export function getPayments(params: { month?: string; customerId?: string } = {}) {
  const searchParams = new URLSearchParams();
  if (params.month) searchParams.set("month", params.month);
  if (params.customerId) searchParams.set("customerId", params.customerId);
  const query = searchParams.toString();

  return apiRequest<{ payments: Payment[]; totals: { total: number; unappliedTotal: number } }>(`/payments${query ? `?${query}` : ""}`, {
    auth: true,
  });
}

export function recordPayment(payload: PaymentPayload) {
  return apiRequest<{ payment: Payment }>("/payments", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}
