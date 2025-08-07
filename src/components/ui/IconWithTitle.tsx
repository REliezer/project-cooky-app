import { useNavigate } from "react-router-dom";

interface IconWithTitleProps {
    title: string
}

function IconWithTitle({ title }: IconWithTitleProps) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-3 mb-2">
                    <button 
                        onClick={() => navigate('/list')}
                        className="w-10 h-10 bg-accent hover:bg-bg-primary/80 border border-[#461604] rounded-full flex items-center justify-center transition-colors duration-200 shadow-md shadow-[#461604]/50 flex-shrink-0 cursor-pointer"
                        aria-label="Volver a la lista de listas"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="#461604" 
                            className="w-5 h-5"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15.75 19.5 8.25 12l7.5-7.5" 
                            />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-bold mb-0">{title}</h1>
                </div>
    )
}

export default IconWithTitle;