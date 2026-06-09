import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Building2, Phone, MapPin, ImageUp, UploadCloud } from "lucide-react"

import Input from "../shared/Input"

const storeFormSchema = z.object({
  providerName: z.string().min(2, "Provider name is required"),
  contactNumber: z.string().min(10, "Enter a valid contact number"),
  address: z.string().optional(),
  city: z.string().min(2, "City is required"),
  description: z.string().optional(),
  logo: z.instanceof(FileList).optional(),
})

type StoreFormData = z.infer<typeof storeFormSchema>

export type { StoreFormData }

export default function StoreForm({ onSubmit, isLoading = false }: { onSubmit: (data: StoreFormData) => void, isLoading?: boolean }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
  })
  const logoRegister = register("logo")
  const selectedLogo = useWatch({ control, name: "logo" })?.[0]

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
          Logo <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <label className="group flex cursor-pointer items-center gap-4 rounded-xl border-[1.5px] border-dashed border-border bg-primary-muted/40 px-4 py-4 transition-all duration-150 hover:border-primary hover:bg-primary-muted">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-surface text-primary shadow-sm">
            {selectedLogo ? <ImageUp size={20} /> : <UploadCloud size={20} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-text">
              {selectedLogo ? selectedLogo.name : "Upload ISP logo"}
            </span>
            <span className="mt-1 block text-xs text-text-muted">
              PNG, JPG, or WEBP. Keep it under 2MB.
            </span>
          </span>
          <span className="rounded-[10px] bg-surface px-3 py-2 text-xs font-bold text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
            Choose
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            {...logoRegister}
          />
        </label>
        {errors.logo?.message && (
          <span className="text-[12px] text-danger">{errors.logo.message}</span>
        )}
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
        disabled={isLoading}
        className="mt-2 h-10.5 bg-primary hover:bg-primary-dark text-white font-bold text-[15px] rounded-[10px] cursor-pointer transition-colors duration-200 flex items-center justify-center"
      >
        {isLoading ? "Creating ISP..." : "Complete Setup →"}
      </button>
    </form>
  )
}
