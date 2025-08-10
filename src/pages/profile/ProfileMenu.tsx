import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";
import CardItem from "../../components/profile/CardItem";

import { User, Heart, ThumbsDown, UtensilsCrossed, AlertTriangle, } from "lucide-react";
import "../../styles/components/ProfileMenu.css"
import CardSection from "../../components/profile/CardSection";

function ProfileMenu() {
  const navigationItems = {
    section: [
      {
        sectionName: 'Perfil',
        items: [
          {
            label: 'Datos Personales',
            route: '/app/details',
            icon: <User size={18} />
          }
        ]
      },
      {
        sectionName: 'Comidas',
        items: [
          {
            label: 'Ingredientes favoritos',
            route: '/app/favorites',
            icon: <Heart size={18} className="text-red-500" />
          },
          {
            label: 'Ingredientes que no me gustan',
            route: '/app/dislikes',
            icon: <ThumbsDown size={18} className="text-gray-600" />
          },
          {
            label: 'Comidas preferidas',
            route: '/app/preferences',
            icon: <UtensilsCrossed size={18} className="text-orange-500" />
          }
        ]
      },
      {
        sectionName: 'Salud',
        items: [
          {
            label: 'Alergias',
            route: '/app/allergies',
            icon: <AlertTriangle size={18} className="text-yellow-500" />
          }
        ]
      }
    ]
  };
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
          {navigationItems.section.map((section, index) => (
            <CardSection key={index} title={section.sectionName}>
              {section.items.map((item, itemIndex) => (
                <CardItem
                  key={itemIndex}
                  label={item.label}
                  icon={item.icon}
                  href={item.route}
                />
              ))}
            </CardSection>
          ))
          }
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