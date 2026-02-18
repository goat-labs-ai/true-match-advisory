import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <img src={logo} alt="TrueMatch Advisory" className="h-10 brightness-0 invert opacity-90 mb-4" />
          <p className="text-sm opacity-60 font-sans leading-relaxed max-w-xs">
            Butikowa firma executive search i strategic recruitment advisory.
          </p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest opacity-40 mb-6">Nawigacja</p>
          <div className="flex flex-col gap-3">
            {[
              { to: "/o-mnie", label: "O mnie" },
              { to: "/uslugi", label: "Usługi" },
              { to: "/proces", label: "Proces współpracy" },
              { to: "/dla-kandydatow", label: "Dla kandydatów" },
              { to: "/kontakt", label: "Kontakt" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-sans opacity-60 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest opacity-40 mb-6">Kontakt</p>
          <p className="text-sm font-sans opacity-60 leading-relaxed">
            kontakt@truematch.pl
          </p>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-sans opacity-40">
          © {new Date().getFullYear()} TrueMatch Advisory. Wszelkie prawa zastrzeżone.
        </p>
        <Link to="/polityka-prywatnosci" className="text-xs font-sans opacity-40 hover:opacity-70 transition-opacity">
          Polityka prywatności
        </Link>
      </div>
    </div>
    <div className="text-center pt-10 pb-6">
      <p className="text-xs font-sans font-light opacity-[0.55] hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-default">
        Podoba Ci się? To nasza robota. —{" "}
        <a
          href="https://goatlabs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          GOATLabs
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
