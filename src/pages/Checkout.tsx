import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  const upiId = "farmername@upi";
  const payee = "Farmer Name";
  const amount = 500; // sample
  const deeplink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR`;

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">UPI Checkout (Sample)</h1>
        <p className="text-sm text-muted-foreground mb-6">Use a supported UPI app to complete payment.</p>
        <div className="rounded-xl border p-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-muted-foreground">Payee</div>
              <div className="font-medium">{payee}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">UPI ID</div>
              <div className="font-mono">{upiId}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Amount</div>
            <div className="text-xl font-semibold">₹ {amount}</div>
          </div>
          <a href={deeplink}>
            <Button className="w-full">Pay via UPI</Button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
