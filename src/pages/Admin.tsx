import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Admin = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage users, listings, and transactions</p>
        </header>

        <section className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">Pending Listings</h2>
          <div className="text-sm text-muted-foreground mb-4">No pending listings in demo.</div>
          <Button onClick={()=>toast.message("Approve flow will be wired to Supabase tables")}>
            Approve Selected
          </Button>
        </section>

        <section className="rounded-xl border p-6 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-muted-foreground">Registered Farmers</div>
            <div className="text-2xl font-semibold">—</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Registered Buyers</div>
            <div className="text-2xl font-semibold">—</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Transactions</div>
            <div className="text-2xl font-semibold">—</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Admin;
