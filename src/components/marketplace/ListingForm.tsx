import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


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
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

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
      <Input placeholder="Crop type" {...register("cropType")} />
      <Input placeholder="Location" {...register("location")} />
      <Input placeholder="Quantity" {...register("quantity")} />
      <Input type="number" step="0.01" placeholder="Price (₹/kg)" {...register("price")} />
      <div className="grid grid-cols-2 gap-3">
        <Input type="date" {...register("availabilityFrom")} />
        <Input type="date" {...register("availabilityTo")} />
      </div>
      <Button disabled={isSubmitting} className="md:col-span-2">Post</Button>
    </form>
  );
};

export default ListingForm;
