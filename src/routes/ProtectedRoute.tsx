import { useQuery } from "@tanstack/react-query"
import { Navigate, Outlet } from "react-router"

import { useAuth } from "../context/useAuth"
import { getStoredToken } from "../lib/auth-storage"
import { validateSession } from "../services/auth.service"
import PageLoader from "../components/shared/PageLoader"

export default function ProtectedRoute() {
  const auth = useAuth()
  const token = getStoredToken()

  const query = useQuery({
    queryKey: ["auth", "validate"],
    queryFn: validateSession,
    enabled: Boolean(token),
  })

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (query.isLoading) {
    return <PageLoader message="Validating your session" />
  }

  if (query.isError) {
    auth.logout()
    return <Navigate to="/login" replace />
  }

  if (query.data?.user && !auth.user) {
    auth.setUser(query.data.user)
  }

  return <Outlet />
}
