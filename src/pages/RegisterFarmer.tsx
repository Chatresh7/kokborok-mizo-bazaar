import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";


const farmerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  location: z.string().min(2),
  cropType: z.string().min(2),
  quantity: z.string().min(1),
});

type FarmerForm = z.infer<typeof farmerSchema>;

const RegisterFarmer = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FarmerForm>({ resolver: zodResolver(farmerSchema)});

  const onSubmit = async (_data: FarmerForm) => {
    toast.info("Connect Supabase to enable account creation.");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Register as Farmer</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Phone" {...register("phone")} />
          <Input type="email" placeholder="Email" {...register("email")} className="md:col-span-2" />
          <Input type="password" placeholder="Password" {...register("password")} className="md:col-span-2" />
          <Input placeholder="Farm location" {...register("location")} className="md:col-span-2" />
          <Input placeholder="Crop type" {...register("cropType")} />
          <Input placeholder="Quantity available" {...register("quantity")} />
          <Button disabled={isSubmitting} className="md:col-span-2">Create account</Button>
        </form>
        {Object.values(errors).length > 0 && (
          <p className="text-sm text-destructive mt-3">Please fill all required fields correctly.</p>
        )}
      </div>
    </Layout>
  );
};

export default RegisterFarmer;
