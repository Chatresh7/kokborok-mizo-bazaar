import { Button } from "@/components/ui/button";

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    cropType: string;
    location: string;
    price: number;
    quantity: string;
    contact: { phone: string; whatsapp: string; email: string };
  };
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const waLink = `https://wa.me/${listing.contact.whatsapp.replace(/\D/g, '')}?text=Hi%20I%27m%20interested%20in%20${encodeURIComponent(listing.title)}`;
  const telLink = `tel:${listing.contact.phone}`;
  const mailLink = `mailto:${listing.contact.email}?subject=${encodeURIComponent("Inquiry: "+listing.title)}`;

  return (
    <article className="rounded-xl border p-5 hover:shadow-md transition-shadow">
      <header className="mb-2">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <p className="text-sm text-muted-foreground">{listing.cropType} • {listing.location}</p>
      </header>
      <p className="text-sm">Qty: {listing.quantity}</p>
      <p className="text-sm font-medium mt-1">₹ {listing.price}/kg</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <a href={telLink}><Button variant="outline" size="sm">Call</Button></a>
        <a href={waLink} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">WhatsApp</Button></a>
        <a href={mailLink}><Button variant="ghost" size="sm">Email</Button></a>
      </div>
    </article>
  );
};

export default ListingCard;
