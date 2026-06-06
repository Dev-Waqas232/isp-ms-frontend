import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Building2, Phone, MapPin } from "lucide-react"

import Input from "../shared/Input"

const storeFormSchema = z.object({
  providerName: z.string().min(2, "Provider name is required"),
  contactNumber: z.string().min(10, "Enter a valid contact number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  description: z.string().optional(),
})

type StoreFormData = z.infer<typeof storeFormSchema>

export default function StoreForm({ onSubmit }: { onSubmit: (data: StoreFormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Provider / ISP name"
        required
        placeholder="e.g. Al-Noor Networks"
        leftIcon={<Building2 size={16} />}
        error={errors.providerName?.message}
        {...register("providerName")}
      />

      <Input
        label="Contact number"
        required
        type="tel"
        placeholder="+92 300 0000000"
        leftIcon={<Phone size={16} />}
        error={errors.contactNumber?.message}
        {...register("contactNumber")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Address"
          required
          placeholder="Street address"
          leftIcon={<MapPin size={16} />}
          error={errors.address?.message}
          {...register("address")}
        />
        <Input
          label="City"
          required
          placeholder="e.g. Lahore"
          leftIcon={<MapPin size={16} />}
          error={errors.city?.message}
          {...register("city")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-text">
          Short description <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          placeholder="Tell customers a little about your ISP..."
          rows={3}
          className="px-3 py-2.5 text-sm text-text bg-surface border-[1.5px] border-border rounded-[10px] outline-none resize-y transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-text-muted/50"
          {...register("description")}
        />
      </div>

      <button
        type="submit"
        className="mt-2 h-10.5 bg-primary hover:bg-primary-dark text-white font-bold text-[15px] rounded-[10px] cursor-pointer transition-colors duration-200 flex items-center justify-center"
      >
        Complete Setup →
      </button>
    </form>
  )
}
