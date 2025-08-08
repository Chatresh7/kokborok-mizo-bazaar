import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "kok" | "bn";

type Dict = Record<string, Record<Lang, string>>;

const DICT: Dict = {
  appTitle: { en: "Kokborok Sathi Connect", kok: "Kokborok Sathi Connect", bn: "কোকবরক সাথি কানেক্ট" },
  tagline: { en: "Connecting Farmers and Buyers", kok: "Farmers aro Buyers kwrwi", bn: "চাষি ও ক্রেতাদের সংযোগ" },
  getStarted: { en: "Get Started", kok: "Start", bn: "শুরু করুন" },
  marketplace: { en: "Marketplace", kok: "Bazaar", bn: "মার্কেটপ্লেস" },
  registerFarmer: { en: "Register as Farmer", kok: "Farmer Register", bn: "চাষি হিসেবে রেজিস্টার" },
  registerBuyer: { en: "Register as Buyer", kok: "Buyer Register", bn: "ক্রেতা হিসেবে রেজিস্টার" },
  login: { en: "Log in", kok: "Login", bn: "লগ ইন" },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang: (l: Lang) => { localStorage.setItem("lang", l); setLang(l); },
    t: (key) => DICT[key]?.[lang] ?? DICT[key]?.en ?? String(key),
  }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageSwitcher = ({ children }: { children: React.ReactNode }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="relative group">
      <div role="button" aria-haspopup="listbox" aria-expanded="false" className="inline-block">
        <div onClick={(e) => {
          const menu = (e.currentTarget.nextSibling as HTMLElement);
          if (menu) menu.classList.toggle("hidden");
        }}>{children}</div>
      </div>
      <ul className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow hidden" role="listbox">
        {(["en","kok","bn"] as Lang[]).map(l => (
          <li key={l} role="option" aria-selected={l===lang}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${l===lang?"font-semibold":""}`}
              onClick={(e)=>{ setLang(l); (e.currentTarget.parentElement as HTMLElement).classList.add("hidden"); }}>
            {l === "en" ? "English" : l === "kok" ? "Kokborok" : "বাংলা"}
          </li>
        ))}
      </ul>
    </div>
  );
};
