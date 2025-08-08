import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const schema = z.object({
  title: z.string().min(2),
  cropType: z.string().min(2),
  location: z.string().min(2),
  quantity: z.string().min(1),
  price: z.coerce.number().positive(),
  availabilityFrom: z.string().optional(),
  availabilityTo: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const ListingForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting }, setValue, watch } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      // In demo mode, we just show a toast. Wire to Supabase 'listings' table when connected.
      toast.success("Listing posted (demo)");
      reset();
    } catch (e: any) {
      toast.error("Failed to post listing");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Title" {...register("title")} />
      <div className="md:col-span-1">
        <Select onValueChange={(v)=> setValue("cropType", v)} value={watch("cropType") || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Crop type (Rubber)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latex">Latex</SelectItem>
            <SelectItem value="Latex + Wood">Latex + Wood</SelectItem>
            <SelectItem value="Monocrop">Monocrop</SelectItem>
            <SelectItem value="Mixed Crop">Mixed Crop</SelectItem>
            <SelectItem value="High-Yield">High-Yield</SelectItem>
          </SelectContent>
        </Select>
        <input type="hidden" {...register("cropType")} />
      </div>
      <Input placeholder="Location" {...register("location")} />
      <Input placeholder="Quantity (e.g., 500 kg)" {...register("quantity")} />
      <Input type="number" step="0.01" placeholder="Price (₹/kg)" {...register("price")} />
      <div className="grid grid-cols-2 gap-3">
        <Input type="date" {...register("availabilityFrom")} />
        <Input type="date" {...register("availabilityTo")} />
      </div>
      <Button disabled={isSubmitting} className="md:col-span-2 hover-scale">Post</Button>
    </form>
  );
};

export default ListingForm;
