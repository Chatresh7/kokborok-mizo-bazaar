import Layout from "@/components/layout/Layout";
import ListingForm from "@/components/marketplace/ListingForm";
import ListingCard from "@/components/marketplace/ListingCard";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

const MOCK_LISTINGS = [
  { id: 1, title: "Fresh Latex", cropType: "Latex", location: "Ambassa", price: 120, quantity: "500 kg", contact: { phone: "+91 9876543210", whatsapp: "+919876543210", email: "farmer@example.com" } },
  { id: 2, title: "Latex + Wood Bundle", cropType: "Latex + Wood", location: "Udaipur", price: 140, quantity: "1 ton", contact: { phone: "+91 9123456780", whatsapp: "+919123456780", email: "farmer2@example.com" } },
];

const Marketplace = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MOCK_LISTINGS.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.cropType.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Layout>
      <div className="grid gap-8">
        <section aria-label="Create listing" className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Post a product</h2>
          <ListingForm />
        </section>

        <section aria-label="Browse listings" className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Input placeholder="Search by rubber type, location, price..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(l => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Marketplace;
