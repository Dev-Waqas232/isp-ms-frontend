import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import Input from "../shared/Input"
import Spinner from "../shared/Spinner"

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginData = z.infer<typeof loginSchema>

export type { LoginData }

export default function LoginForm({ onSubmit, isLoading = false }: { onSubmit: (data: LoginData) => void, isLoading?: boolean }) {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email address"
        required
        type="email"
        placeholder="john@example.com"
        leftIcon={<Mail size={16} />}
        error={errors.email?.message}
        disabled={isLoading}
        {...register("email")}
      />

      <Input
        label="Password"
        required
        type={showPassword ? "text" : "password"}
        placeholder="Your password"
        leftIcon={<Lock size={16} />}
        rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        onRightIconClick={() => setShowPassword(p => !p)}
        error={errors.password?.message}
        disabled={isLoading}
        {...register("password")}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10.5 bg-primary hover:bg-primary-dark text-white font-bold text-[15px] rounded-[10px] cursor-pointer transition-colors duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner className="h-4.5 w-4.5 text-white" />
            Signing in...
          </span>
        ) : "Sign in"}
      </button>
    </form>
  )
}
