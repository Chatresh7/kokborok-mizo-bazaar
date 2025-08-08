import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

import { useNavigate, Link } from "react-router-dom";

interface LoginForm { email: string; password: string; }

const Login = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (_data: LoginForm) => {
    toast.info("Connect Supabase to enable login in production.");
    navigate("/profile");
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="email" placeholder="Email" {...register("email", { required: true })} />
          <Input type="password" placeholder="Password" {...register("password", { required: true })} />
          <Button disabled={isSubmitting} className="w-full">Log in</Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          New here? <Link className="underline" to="/register/farmer">Create an account</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
