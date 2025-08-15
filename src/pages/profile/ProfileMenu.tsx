import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";
import CardItem from "../../components/profile/CardItem";

import { User, Heart, ThumbsDown, UtensilsCrossed, AlertTriangle, } from "lucide-react";
import "../../styles/components/ProfileMenu.css"
import CardSection from "../../components/profile/CardSection";
import ProfileAvatar from "../../components/ui/ProfileAvatar";

import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from "react-router-dom";

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
            route: '/app/saved/recipes',
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
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <section className="pb-16 bg-[#FFF6ED] min-h-screen">
      <div className="relative">
        <Graphics variant="left" title="Ajustes"/>
        
        {/* Espaciado para evitar superposición */}
        <div className="-mt-16 md:-mt-12 relative z-10">
          <ProfileAvatar
            src="https://randomuser.me/api/portraits/men/75.jpg"
            name={user?.name}
            email={user?.email}
            size="lg"
          />
        </div>
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
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileMenu;