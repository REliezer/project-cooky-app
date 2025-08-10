import React, { useState } from "react";
import "../../styles/components/FavoriteIngredients.css";

type Item = { id: string; name: string; emoji: string };

function FavoriteIngredients() {
  const [items, setItems] = useState<Item[]>([
    { id: "cebolla", name: "Cebolla", emoji: "🧅" },
    { id: "tomate", name: "Tomate", emoji: "🍅" },
    { id: "arroz", name: "Arroz", emoji: "🌾" },
  ]);

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const quick: Item[] = [
    { id: "fresa", name: "Fresa", emoji: "🍓" },
    { id: "lechuga", name: "Lechuga", emoji: "🥬" },
    { id: "leche", name: "Leche", emoji: "🥛" },
    { id: "mantequilla", name: "Mantequilla", emoji: "🧈" },
    { id: "maiz", name: "Maíz", emoji: "🌽" },
  ];

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const addItem = (name: string, emoji: string) => {
    if (!name.trim()) return;
    const id = name.trim().toLowerCase().replace(/\s+/g, "-");
    setItems(prev => [...prev, { id, name, emoji }]);
    setAdding(false);
    setNewName("");
  };

  return (
    <main className="fav-page">
      <div className="fav-wrap">
        <header className="fav-header">
          <button className="back-btn" aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="fav-title">Ingredientes<br/>Favoritos</h1>
        </header>

        {/* Lista */}
        <section className="fav-list">
          {items.map(it => (
            <SwipeRow key={it.id} item={it} onDelete={() => handleDelete(it.id)} />
          ))}

          {adding && (
            <div className="fav-edit">
              <input
                className="fav-input"
                placeholder="Nuevo ingrediente"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem(newName, "🍽")}
              />
              <button className="confirm-btn" onClick={() => addItem(newName, "🍽")}>
                Añadir
              </button>
            </div>
          )}
        </section>

        {!adding && (
          <button className="add-btn" onClick={() => setAdding(true)}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Añadir ítem a lista
          </button>
        )}

        {/* Sugerencias */}
        <section className="quick-list">
          {quick.map(q => (
            <button
              key={q.id}
              className="quick-item"
              onClick={() => addItem(q.name, q.emoji)}
            >
              <span className="quick-avatar">{q.emoji}</span>
              <span className="quick-name">{q.name}</span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

/* -------- Swipe Row -------- */
function SwipeRow({ item, onDelete }: { item: Item; onDelete: () => void }) {
  const [offsetX, setOffsetX] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const delta = e.touches[0].clientX - startX;
    if (delta < 0) setOffsetX(Math.max(delta, -88));
  };
  const onTouchEnd = () => {
    setDragging(false);
    setStartX(null);
    setOffsetX(offsetX <= -50 ? -88 : 0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || startX === null) return;
    const delta = e.clientX - startX;
    if (delta < 0) setOffsetX(Math.max(delta, -88));
  };
  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    setStartX(null);
    setOffsetX(offsetX <= -50 ? -88 : 0);
  };

  return (
    <div className="swipe-wrapper" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <button className="swipe-delete-btn" onClick={onDelete}>
        🗑 Eliminar
      </button>
      <div
        className="swipe-content fav-card"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <span className="fav-avatar">{item.emoji}</span>
        <span className="fav-label">{item.name}</span>
      </div>
    </div>
  );
}

export default FavoriteIngredients;