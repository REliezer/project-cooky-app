import React, { useState } from "react";
import "../../styles/components/DislikeIngredientes.css";

type Item = { id: string; name: string; emoji: string };

function DislikeIngredients() {
  const [items, setItems] = useState<Item[]>([
    { id: "cilantro",  name: "Cilantro",  emoji: "🌿" },
    { id: "aceituna",  name: "Aceituna",  emoji: "🫒" },
    { id: "brocoli",   name: "Brócoli",   emoji: "🥦" },
  ]);

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const quick: Item[] = [
    { id: "champiñon", name: "Champiñón", emoji: "🍄" },
    { id: "ajo",       name: "Ajo",       emoji: "🧄" },
    { id: "pimiento",  name: "Pimiento",  emoji: "🫑" },
    { id: "picante",   name: "Picante",   emoji: "🌶️" },
    { id: "pepino",    name: "Pepino",    emoji: "🥒" },
  ];

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const addItem = (name: string, emoji: string) => {
    if (!name.trim()) return;
    const id = name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-");
    setItems(prev => [...prev, { id, name, emoji }]);
    setAdding(false);
    setNewName("");
  };

  return (
    <main className="dislike-page">
      <div className="dislike-wrap">
        {/* Header */}
        <header className="dislike-header">
          <button className="back-btn" aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" href="/app/profile">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="dislike-title">Ingredientes<br/>que no me gustan</h1>
        </header>

        {/* Lista con swipe */}
        <section className="dislike-list">
          {items.map(it => (
            <SwipeRow key={it.id} item={it} onDelete={() => handleDelete(it.id)} />
          ))}

          {/* Fila para añadir manualmente */}
          {adding && (
            <div className="dislike-edit">
              <input
                className="dislike-input"
                placeholder="Nuevo ingrediente"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem(newName, "🚫")}
              />
              <button className="confirm-btn" onClick={() => addItem(newName, "🚫")}>
                Añadir
              </button>
            </div>
          )}
        </section>

        {/* Botón añadir */}
        {!adding && (
          <button className="add-btn" onClick={() => setAdding(true)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Añadir ítem a lista
          </button>
        )}

        {/* Sugerencias rápidas */}
        <section className="quick-list">
          {quick.map(q => (
            <button
              key={q.id}
              className="quick-item"
              onClick={() => addItem(q.name, q.emoji)}
              aria-label={`Añadir ${q.name}`}
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

/* --------- Fila con swipe-to-delete --------- */
function SwipeRow({ item, onDelete }: { item: Item; onDelete: () => void }) {
  const [offsetX, setOffsetX] = React.useState(0);
  const [startX, setStartX] = React.useState<number | null>(null);
  const [dragging, setDragging] = React.useState(false);

  // TOUCH
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

  // MOUSE (desktop)
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
  const onMouseLeave = onMouseUp;

  return (
    <div className="swipe-wrapper" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
      <button className="swipe-delete-btn" onClick={onDelete} aria-label={`Eliminar ${item.name}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M3 6h18M9 6v12m6-12v12M10 6l1-2h2l1 2m-7 0h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Eliminar</span>
      </button>

      <div
        className="swipe-content dislike-card"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <span className="dislike-avatar">{item.emoji}</span>
        <span className="dislike-label">{item.name}</span>
      </div>
    </div>
  );
}

export default DislikeIngredients;