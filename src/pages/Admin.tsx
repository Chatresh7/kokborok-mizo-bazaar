import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useMemo, useState } from "react";

const Admin = () => {
  type Quality = "High" | "Medium" | "Low";
  type Status = "Pending" | "Approved" | "Assigned";
  type Request = {
    id: number;
    farmerName: string;
    village: string;
    region: string;
    cropType: string;
    quantity: string;
    quality?: Quality;
    price?: number;
    status: Status;
    buyer?: string;
  };

  const [requests, setRequests] = useState<Request[]>([
    { id: 1, farmerName: "Lalhmin", village: "Ambassa", region: "Dhalai", cropType: "Latex", quantity: "600 kg", status: "Pending" },
    { id: 2, farmerName: "Riya", village: "Udaipur", region: "Gomati", cropType: "Mixed Crop", quantity: "1.2 ton", status: "Pending" },
    { id: 3, farmerName: "Jiten", village: "Melaghar", region: "Sepahijala", cropType: "High-Yield", quantity: "800 kg", status: "Approved", price: 130, quality: "High" },
  ]);

  const [filters, setFilters] = useState({ q: "", crop: "", region: "", status: "" as Status | "" });
  const [prices, setPrices] = useState<Record<Quality, number>>({ High: 140, Medium: 120, Low: 100 });
  const [groups, setGroups] = useState<{ id: number; name: string; village: string; members: string[] }[]>([]);
  const [groupForm, setGroupForm] = useState({ name: "", village: "", member: "" });
  const [log, setLog] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return requests.filter(r =>
      (!filters.q || r.farmerName.toLowerCase().includes(filters.q.toLowerCase())) &&
      (!filters.crop || r.cropType === filters.crop) &&
      (!filters.region || r.region.toLowerCase().includes(filters.region.toLowerCase())) &&
      (!filters.status || r.status === filters.status)
    );
  }, [requests, filters]);

  const updateRequest = (id: number, patch: Partial<Request>, activity?: string) => {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
    if (activity) setLog(prev => [activity, ...prev]);
  };

  const suggestAI = async (r: Request) => {
    const { suggestPrice } = await import("@/lib/ai");
    const base = await suggestPrice(r.cropType, r.region, r.quantity);
    const factor = r.quality === "High" ? 1.2 : r.quality === "Medium" ? 1.0 : 0.85;
    const price = Math.round(base * factor);
    updateRequest(r.id, { price }, `AI suggested ₹${price}/kg for #${r.id} (${r.quality ?? "Unrated"})`);
    toast.success(`AI price: ₹${price}/kg`);
  };

  const aiInsights = () => {
    const highDemand = ["Latex", "Latex + Wood"][Math.floor(Math.random()*2)];
    const topFarmers = requests.slice(0,2).map(r=>r.farmerName).join(", ");
    toast.message("AI Insights", { description: `Demand rising for ${highDemand}. Consider approving more. Top suppliers: ${topFarmers}.`});
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Admin – Crop Requests Management</h1>
          <p className="text-sm text-muted-foreground">Standardise rates, create groups, and allocate bulk orders</p>
        </header>

        <section className="rounded-xl border p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Search farmer" value={filters.q} onChange={(e)=>setFilters(f=>({...f,q:e.target.value}))}/>
            <Select value={filters.crop} onValueChange={(v)=>setFilters(f=>({...f,crop:v}))}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Crop type" /></SelectTrigger>
              <SelectContent>
                {['Latex','Latex + Wood','Monocrop','Mixed Crop','High-Yield'].map(c=>(<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
            <Input placeholder="Region" value={filters.region} onChange={(e)=>setFilters(f=>({...f,region:e.target.value}))}/>
            <Select value={filters.status} onValueChange={(v: Status)=>setFilters(f=>({...f,status:v}))}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                {(['Pending','Approved','Assigned'] as Status[]).map(s=>(<SelectItem key={s} value={s}>{s}</SelectItem>))}
              </SelectContent>
            </Select>
            <Button variant="secondary" onClick={aiInsights}>AI Insights</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">#</th>
                  <th>Farmer</th>
                  <th>Village</th>
                  <th>Region</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Quality</th>
                  <th>Rate (₹/kg)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r=> (
                  <tr key={r.id} className="border-t">
                    <td className="py-2">{r.id}</td>
                    <td>{r.farmerName}</td>
                    <td>{r.village}</td>
                    <td>{r.region}</td>
                    <td>{r.cropType}</td>
                    <td>{r.quantity}</td>
                    <td>
                      <Select value={r.quality} onValueChange={(v: Quality)=>updateRequest(r.id,{ quality: v }, `Quality set to ${v} for #${r.id}`)}>
                        <SelectTrigger className="w-36"><SelectValue placeholder="Set" /></SelectTrigger>
                        <SelectContent>
                          {(['High','Medium','Low'] as Quality[]).map(q=>(<SelectItem key={q} value={q}>{q}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Input className="w-24" type="number" value={r.price ?? ""} onChange={(e)=>updateRequest(r.id,{ price: Number(e.target.value) })} placeholder={r.price?"":"—"}/>
                        <Button size="sm" variant="outline" onClick={()=>suggestAI(r)}>AI</Button>
                      </div>
                    </td>
                    <td>{r.status}</td>
                    <td className="space-x-2">
                      <Button size="sm" onClick={()=>updateRequest(r.id,{ status: "Approved" }, `Approved #${r.id}`)}>Approve</Button>
                      <Button size="sm" variant="secondary" onClick={()=>updateRequest(r.id,{ status: "Assigned", buyer: "Demo Buyer Co." }, `Assigned #${r.id} to Demo Buyer Co.`)}>Assign</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="font-semibold">Village Farmers Group Creation</h2>
            <div className="flex gap-2">
              <Input placeholder="Group name" value={groupForm.name} onChange={(e)=>setGroupForm(f=>({...f,name:e.target.value}))} />
              <Input placeholder="Village" value={groupForm.village} onChange={(e)=>setGroupForm(f=>({...f,village:e.target.value}))} />
              <Input placeholder="Add member (name)" value={groupForm.member} onChange={(e)=>setGroupForm(f=>({...f,member:e.target.value}))} />
              <Button onClick={()=>{
                if(!groupForm.name || !groupForm.village) return toast.error("Group name & village required");
                setGroups(g=>[...g,{ id: Date.now(), name: groupForm.name, village: groupForm.village, members: groupForm.member? [groupForm.member]: [] }]);
                setLog(l=>[`Created group '${groupForm.name}' in ${groupForm.village}`, ...l]);
                setGroupForm({ name:"", village:"", member:"" });
              }}>Create</Button>
            </div>
            <ul className="text-sm space-y-2">
              {groups.map(g=> (
                <li key={g.id} className="border rounded-md p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{g.name} – {g.village}</div>
                    <div className="text-muted-foreground">Members: {g.members.join(", ") || "None"}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={()=>setLog(l=>[`Added group '${g.name}' to buyer pipeline`, ...l])}>Add to Buyer Pipeline</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold">Bulk Product Allocation to Buyers</h2>
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={()=>{}}>
                <SelectTrigger className="w-56"><SelectValue placeholder="Select group" /></SelectTrigger>
                <SelectContent>
                  {groups.map(g=> (<SelectItem key={g.id} value={String(g.id)}>{g.name} – {g.village}</SelectItem>))}
                </SelectContent>
              </Select>
              <Input placeholder="Buyer company" />
              <Select>
                <SelectTrigger className="w-44"><SelectValue placeholder="Quality" /></SelectTrigger>
                <SelectContent>
                  {(['High','Medium','Low'] as Quality[]).map(q=> (<SelectItem key={q} value={q}>{q}</SelectItem>))}
                </SelectContent>
              </Select>
              <Input className="w-32" type="number" placeholder="Rate (₹/kg)" />
              <Button onClick={()=>toast.success("Bulk allocation created (demo)")}>Allocate</Button>
            </div>
            <div className="text-xs text-muted-foreground">Use standardised prices for fairness. Adjust for logistics when needed.</div>
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="font-semibold mb-3">Quality-Based Pricing</h2>
          <div className="flex items-center gap-3 flex-wrap">
            {(['High','Medium','Low'] as Quality[]).map(q=> (
              <div key={q} className="flex items-center gap-2 border rounded-md p-2">
                <div className="w-20">{q}</div>
                <Input className="w-28" type="number" value={prices[q]} onChange={(e)=>setPrices(p=>({...p,[q]: Number(e.target.value)||0}))} />
                <div className="text-sm text-muted-foreground">₹/kg</div>
              </div>
            ))}
            <Button variant="secondary" onClick={()=>setLog(l=>[`Updated base prices: H${prices.High}/M${prices.Medium}/L${prices.Low}`, ...l])}>Save</Button>
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">Activity Log</h2>
          <ul className="text-sm space-y-2">
            {log.length === 0 && <li className="text-muted-foreground">No activity yet.</li>}
            {log.map((entry, i)=> (<li key={i} className="border rounded-md p-2">{entry}</li>))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Admin;
