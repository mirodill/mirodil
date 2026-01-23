// src/components/Loader.jsx
import '../../assets/styles/style.css'; // agar custom CSS bor bo‘lsa

export default function Loader() {
  const letters = ['M', 'I', 'R', 'O', 'D', 'I', 'L'];

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="flex space-x-3 text-5xl font-bold text-sky-400">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="animate-bounce-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
