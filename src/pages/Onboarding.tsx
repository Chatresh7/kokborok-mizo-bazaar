import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/language/LanguageProvider";

const Onboarding = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Kokborok Sathi Connect – Onboarding";
  }, []);

  return (
    <Layout>
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t("appTitle")}
        </h1>
        <p className="text-lg text-muted-foreground mt-3">{t("tagline")}</p>
      </header>

      <section className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold">Welcome!</h2>
          <p className="mt-2 text-muted-foreground">
            Post and discover farm produce, chat in Kokborok or English, and transact easily with UPI.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register/farmer"><Button variant="hero">{t("registerFarmer")}</Button></Link>
            <Link to="/register/buyer"><Button variant="outline">{t("registerBuyer")}</Button></Link>
            <Link to="/marketplace"><Button variant="ghost">{t("marketplace")}</Button></Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl" />
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-6" aria-label="How it works">
        <article className="rounded-xl border p-6">
          <h3 className="font-semibold">1. Create profile</h3>
          <p className="text-sm text-muted-foreground mt-2">Farmer or Buyer with your preferences.</p>
        </article>
        <article className="rounded-xl border p-6">
          <h3 className="font-semibold">2. List or discover</h3>
          <p className="text-sm text-muted-foreground mt-2">Post crops with photos, or search by crop, location, and price.</p>
        </article>
        <article className="rounded-xl border p-6">
          <h3 className="font-semibold">3. Connect & pay</h3>
          <p className="text-sm text-muted-foreground mt-2">Contact via phone/WhatsApp/email and pay with UPI.</p>
        </article>
      </section>
    </Layout>
  );
};

export default Onboarding;
