import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";
import { User, Heart, ThumbsDown, UtensilsCrossed, AlertTriangle,  } from "lucide-react";
import "../../styles/components/ProfileMenu.css"
function ProfileMenu() {
  return (
    <section className="pb-16 bg-[#FFF6ED] min-h-screen">
      <Graphics variant="left" title="Ajustes" subtitle="" />

      <div className="flex flex-col items-center -mt-30 md:-mt-20 mb-4">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Foto de perfil"
            className="w-36 h-36 rounded-full border-4 border-orange-500 shadow-md object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
            <svg
              className="w-4 h-4 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v3H4V3zM4 8h12v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
            </svg>
          </div>
        </div>
        <p className="text-base font-semibold mt-3 text-center text-[#381C08]">
          Albert Stevano Bajefski
        </p>
        <p className="text-sm text-[#381C08] text-center opacity-70">
          Albertstevano@gmail.com
        </p>
      </div>

<div className="profile-container">
  <div className="profile-stack">
    <CardSection title="Perfil">
      <CardItem
        label="Datos Personales"
        icon={<User size={18} />}
        href="/app/details"
      />
    </CardSection>

    <CardSection title="Comidas">
      <CardItem
        label="Ingredientes favoritos"
        icon={<Heart size={18} className="text-red-500" />}
        href="/app/favorites"
      />
      <CardItem
        label="Ingredientes que no me gustan"
        icon={<ThumbsDown size={18} className="text-gray-600" />}
        href="/app/dislikes"
      />
      <CardItem
        label="Comidas preferidas"
        icon={<UtensilsCrossed size={18} className="text-orange-500" />}
        href="/app/preferences"
      />
    </CardSection>

    <CardSection title="Salud">
      <CardItem
        label="Alergias"
        icon={<AlertTriangle size={18} className="text-yellow-500" />}
        href="/app/allergies"
      />
    </CardSection>

    <div className="logout-row">
      <Button
        label="Cerrar Sesión"
        variant="outline"
        size="medium"
        className="border-[#381C08] text-[#381C08]"
      />
    </div>
  </div>
</div>
    </section>
  );
}

export default ProfileMenu;

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm text-[#381C08] font-semibold mb-2">{title}</h2>

      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CardItem({
  label,
  icon,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between px-4 py-3 text-[#381C08] 
                 border border-[#E5E5E5] rounded-xl bg-white transition-all duration-200
                 hover:shadow-lg hover:shadow-orange-300/50 hover:border-orange-400
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
      aria-label={label}
    >
      <span className="flex items-center gap-3">
        <span className="grid place-items-center w-8 h-8 rounded-full bg-orange-100">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 opacity-60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
}