import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Features from "../components/Home/Features";
import HowItWork from "../components/Home/HowItWork";
import Footer from "../components/Home/Footer";
import CTA from "../components/Home/CTA";
import PageLoader from "../components/shared/PageLoader";
import { useAuth } from "../context/useAuth";
import { getStoredToken } from "../lib/auth-storage";
import { validateSession } from "../services/auth.service";

export default function LandingPage() {
  const navigate = useNavigate()
  const auth = useAuth()
  const token = getStoredToken()

  const query = useQuery({
    queryKey: ["auth", "validate-home"],
    queryFn: validateSession,
    enabled: Boolean(token),
  })

  useEffect(() => {
    if (!token) {
      return
    }

    if (query.data?.user) {
      auth.setUser(query.data.user)
      navigate("/dashboard", { replace: true })
    }

    if (query.isError) {
      auth.logout()
      navigate("/login", { replace: true })
    }
  }, [auth, navigate, query.data?.user, query.isError, token])

  if (token && query.isLoading) {
    return <PageLoader message="Checking your session" />
  }

  if (token) {
    return <PageLoader message="Opening dashboard" />
  }

  return (
    <div className="bg-bg text-text overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWork />
      <CTA />
      <Footer />
    </div>
  )
}
