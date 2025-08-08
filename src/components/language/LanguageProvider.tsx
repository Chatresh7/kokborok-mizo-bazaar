import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "hi" | "tr";

type Dict = Record<string, Record<Lang, string>>;

const DICT: Dict = {
  appTitle: { en: "Kiching Connect", hi: "किचिंग कनेक्ट", tr: "Kiching Connect" },
  tagline: { en: "Connecting Farmers and Buyers", hi: "किसानों और खरीदारों को जोड़ना", tr: "Farmers aro Buyers kwrwi" },
  getStarted: { en: "Get Started", hi: "शुरू करें", tr: "Start" },
  marketplace: { en: "Marketplace", hi: "मार्केटप्लेस", tr: "Bazaar" },
  registerFarmer: { en: "Register as Farmer", hi: "किसान के रूप में रजिस्टर करें", tr: "Farmer Register" },
  registerBuyer: { en: "Register as Buyer", hi: "खरीदार के रूप में रजिस्टर करें", tr: "Buyer Register" },
  login: { en: "Log in", hi: "लॉग इन", tr: "Login" },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const init = localStorage.getItem("lang") as Lang | null;
    return (init && (["en","hi","tr"] as Lang[]).includes(init as Lang)) ? (init as Lang) : "en";
  });
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
        {(["en","hi","tr"] as Lang[]).map(l => (
          <li key={l} role="option" aria-selected={l===lang}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${l===lang?"font-semibold":""}`}
              onClick={(e)=>{ setLang(l); (e.currentTarget.parentElement as HTMLElement).classList.add("hidden"); }}>
            {l === "en" ? "English" : l === "hi" ? "हिंदी" : "Tripuri"}
          </li>
        ))}
      </ul>
    </div>
  );
};
