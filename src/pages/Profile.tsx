import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useEffect, useState } from "react";

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Profile – Kokborok Sathi"; }, []);

  const onUpload = async (file: File) => {
    try {
      setLoading(true);
      const url = URL.createObjectURL(file);
      setAvatar(url);
      toast.info("Image preview only. Connect Supabase Storage to persist.");
    } catch (e: any) {
      toast.error("Upload failed");
    } finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Profile & Settings</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Name" />
          <Input placeholder="Phone" />
          <Input placeholder="Email" type="email" className="md:col-span-2" />
          <Input placeholder="Address" className="md:col-span-2" />
          <select className="md:col-span-2 h-10 rounded-md border bg-background px-3">
            <option>Language Preference: English</option>
            <option>Kokborok</option>
            <option>বাংলা</option>
          </select>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img src={avatar} alt="Profile picture" className="h-16 w-16 rounded-full border object-cover" />
            ) : (
              <div className="h-16 w-16 rounded-full border" />
            )}
            <label className="inline-flex items-center gap-2">
              <input type="file" accept="image/*" className="hidden" onChange={(e)=> e.target.files && onUpload(e.target.files[0])} />
              <Button disabled={loading}>Upload picture</Button>
            </label>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Button variant="secondary">Change password</Button>
          <Button variant="outline">Notification preferences</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
