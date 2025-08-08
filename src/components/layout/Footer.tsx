export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-semibold">Kokborok Sathi Connect</h4>
          <p className="text-sm text-muted-foreground mt-2">
            Connecting Kokborok farmers and buyers with multilingual support.
          </p>
        </div>
        <nav className="text-sm">
          <ul className="space-y-2">
            <li><a className="hover:underline" href="/marketplace">Marketplace</a></li>
            <li><a className="hover:underline" href="/profile">Profile</a></li>
            <li><a className="hover:underline" href="/admin">Admin</a></li>
          </ul>
        </nav>
        <div className="text-sm text-muted-foreground md:text-right">
          © {year} Kokborok Sathi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
