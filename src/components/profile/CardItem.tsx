
interface CardItemProps {
    label: string;
    icon: React.ReactNode;
    href: string;
}
function CardItem({ label, icon, href }: CardItemProps ) {
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

export default CardItem;