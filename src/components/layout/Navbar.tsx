import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { LanguageSwitcher } from "../language/LanguageProvider";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
  }`;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">
            Kokborok Sathi
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/marketplace" className={navLinkClass}>
              Marketplace
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher>
            <Button variant="outline" size="sm" aria-label="Switch language">
              <Languages className="mr-2" /> Lang
            </Button>
          </LanguageSwitcher>
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register/farmer">
              <Button variant="default" size="sm">Join</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
