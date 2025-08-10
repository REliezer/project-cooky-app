interface ProfileAvatarProps {
  src: string;
  alt?: string;
  name: string;
  email?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeIcon?: React.ReactNode;
  className?: string;
}

export default function ProfileAvatar({ 
  src, 
  alt = "Foto de perfil", 
  name, 
  email, 
  size = 'lg',
  showBadge = true,
  badgeIcon,
  className = ""
}: ProfileAvatarProps) {
  
  const sizeClasses = {
    sm: {
      outerRing: 'w-24 h-24',
      innerRing: 'w-20 h-20', 
      image: 'w-16 h-16',
      badge: 'w-5 h-5 bottom-1 right-1',
      icon: 'w-2.5 h-2.5'
    },
    md: {
      outerRing: 'w-32 h-32',
      innerRing: 'w-28 h-28',
      image: 'w-24 h-24',
      badge: 'w-6 h-6 bottom-1.5 right-1.5',
      icon: 'w-3 h-3'
    },
    lg: {
      outerRing: 'w-40 h-40',
      innerRing: 'w-36 h-36',
      image: 'w-32 h-32',
      badge: 'w-7 h-7 bottom-2 right-2',
      icon: 'w-4 h-4'
    },
    xl: {
      outerRing: 'w-48 h-48',
      innerRing: 'w-44 h-44',
      image: 'w-40 h-40',
      badge: 'w-8 h-8 bottom-2 right-2',
      icon: 'w-5 h-5'
    }
  };

  const currentSize = sizeClasses[size];

  const defaultBadgeIcon = (
    <svg className={currentSize.icon + " text-orange-500"} fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v3H4V3zM4 8h12v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center mb-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Anillos de borde */}
        <div className={`absolute ${currentSize.outerRing} rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-30`}></div>
        <div className={`absolute ${currentSize.innerRing} rounded-full bg-gradient-to-br from-orange-300 to-orange-400 opacity-50`}></div>
        
        {/* Imagen principal */}
        <img
          src={src}
          alt={alt}
          className={`relative ${currentSize.image} rounded-full border-4 border-orange-500 shadow-xl object-cover z-10`}
        />
        
        {/* Badge */}
        {showBadge && (
          <div className={`absolute ${currentSize.badge} bg-white p-1.5 rounded-full shadow-lg border-2 border-orange-500 z-20`}>
            {badgeIcon || defaultBadgeIcon}
          </div>
        )}
      </div>
      
      {/* Información del usuario */}
      <p className="text-base font-semibold mt-3 text-center text-[#381C08]">
        {name}
      </p>
      {email && (
        <p className="text-sm text-[#381C08] text-center opacity-70">
          {email}
        </p>
      )}
    </div>
  );
}
