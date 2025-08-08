import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";


const buyerSchema = z.object({
  businessName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  requirements: z.string().min(2),
  deliveryPrefs: z.string().min(2),
});

type BuyerForm = z.infer<typeof buyerSchema>;

const RegisterBuyer = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BuyerForm>({ resolver: zodResolver(buyerSchema)});

  const onSubmit = async (_data: BuyerForm) => {
    toast.info("Connect Supabase to enable account creation.");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Register as Buyer</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Business name" {...register("businessName")} className="md:col-span-2" />
          <Input placeholder="Phone" {...register("phone")} />
          <Input placeholder="Purchase requirements" {...register("requirements")} />
          <Input placeholder="Delivery preferences" {...register("deliveryPrefs")} className="md:col-span-2" />
          <Input type="email" placeholder="Email" {...register("email")} />
          <Input type="password" placeholder="Password" {...register("password")} />
          <Button disabled={isSubmitting} className="md:col-span-2">Create account</Button>
        </form>
        {Object.values(errors).length > 0 && (
          <p className="text-sm text-destructive mt-3">Please fill all required fields correctly.</p>
        )}
      </div>
    </Layout>
  );
};

export default RegisterBuyer;
