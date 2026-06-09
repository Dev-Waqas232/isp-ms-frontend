import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"

import Input from "../shared/Input"
import Spinner from "../shared/Spinner"

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterData = z.infer<typeof registerSchema>

export type { RegisterData }

export default function RegisterForm({ onSubmit, isLoading = false }: { onSubmit: (data: RegisterData) => void, isLoading?: boolean }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          required
          placeholder="John"
          leftIcon={<User size={16} />}
          error={errors.firstName?.message}
          disabled={isLoading}
          {...register("firstName")}
        />
        <Input
          label="Last name"
          required
          placeholder="Doe"
          leftIcon={<User size={16} />}
          error={errors.lastName?.message}
          disabled={isLoading}
          {...register("lastName")}
        />
      </div>

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
        placeholder="Min. 8 characters"
        leftIcon={<Lock size={16} />}
        rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        onRightIconClick={() => setShowPassword(p => !p)}
        error={errors.password?.message}
        disabled={isLoading}
        {...register("password")}
      />

      <Input
        label="Confirm password"
        required
        type={showConfirm ? "text" : "password"}
        placeholder="Repeat your password"
        leftIcon={<Lock size={16} />}
        rightIcon={showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
        onRightIconClick={() => setShowConfirm(p => !p)}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
        {...register("confirmPassword")}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10.5 bg-primary hover:bg-primary-dark text-white font-bold text-[15px] rounded-[10px] cursor-pointer transition-colors duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner />
            Creating account...
          </span>
        ) : "Continue →"}
      </button>
    </form>
  )
}
