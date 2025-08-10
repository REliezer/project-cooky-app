
interface CardSectionProps {
  title: string;
  children: React.ReactNode;
}

function CardSection({ title, children, }: CardSectionProps ) {
  return (
    <section>
      <h2 className="text-sm text-[#381C08] font-semibold mb-2">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default CardSection;