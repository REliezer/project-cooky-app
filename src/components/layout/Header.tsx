import graphic from '../../assets/images/graphics_1.png';

export default function Header() {
  return (
    <header className="hidden lg:flex justify-between items-center text-white">
      <div className="flex items-center">
        <img src={graphic} alt="Cooky Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold">Cooky</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}