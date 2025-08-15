import { useState, useMemo, useEffect } from "react";
import "../../styles/components/FavoriteIngredients.css"; 
import { useNavigate } from "react-router-dom";

import { categories } from "../../data/Categories";
import type { Item } from "../../data/DislikeIngredientes"; 
import type { FormFieldConfig } from "../../types";
import { findSvgByName } from "../../utils/ingredientSvg";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DynamicForm from "../../components/common/DynamicForm";
import ItemList from "../../components/common/ItemList";
import { useProfileStore } from "../../store/useProfileStore";

const ALLERGY_QUICK: { id: string; name: string; svg: string }[] = [
  { id: "gluten", name: "Gluten", svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="5" y="5" width="14" height="14" fill="#FDE68A"/></svg>` },
  { id: "lactosa", name: "Lactosa", svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="6" y="4" width="12" height="16" rx="2" fill="#BFDBFE"/></svg>` },
  { id: "mani", name: "Maní", svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="9" cy="12" r="4" fill="#FDE68A"/><circle cx="15" cy="12" r="4" fill="#F59E0B"/></svg>` },
  { id: "nueces", name: "Nueces", svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 12a5 5 0 0 1 10 0v4H7z" fill="#D1FAE5"/></svg>` },
  { id: "soya", name: "Soya", svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="9" cy="12" r="3" fill="#BBF7D0"/><circle cx="15" cy="12" r="3" fill="#86EFAC"/></svg>` },
];

export default function Allergies() {
  const navigate = useNavigate();
  const { profile, status, error, fetchProfile, saveAllergies, clearError } = useProfileStore();

  const [adding, setAdding] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Cargar perfil al montar
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const allergies = profile?.allergies ?? [];

    // Función personalizada que incluye ALLERGY_QUICK
    const findAllergySvg = (name: string): string => {
      // Primero buscar en la función centralizada
      const svg = findSvgByName(name);
      // Si no encuentra, buscar en alergias específicas
      if (svg.includes('#FFEDD5')) { // Es el SVG por defecto
        const q = ALLERGY_QUICK.find(x => x.name.toLowerCase() === name.toLowerCase());
        if (q) return q.svg;
        return `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#FFE4E6"/></svg>`;
      }
      return svg;
    };

    if (allergies.length) {
      const mapped: Item[] = allergies.map(n => ({
        id: n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"),
        name: n,
        svg: findAllergySvg(n),
      }));
      setItems(mapped);
    } else {
      setItems([]); 
    }
  }, [profile]);

  const loading = status === "loading";

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const getProductOptions = (categoryId: string) => {
    const selectedCat = categories.find(cat => cat.id === categoryId);
    return selectedCat?.products?.map(product => ({
      value: product.id,
      label: product.name
    })) || [];
  };

  const addProductFormFields: FormFieldConfig[] = useMemo(() => [
    {
      name: "categoria",
      type: "list",
      label: "Categoria",
      placeholder: "Selecciona una categoria",
      required: true,
      options: categoryOptions
    },
    {
      name: "productos",
      type: "list",
      label: "Productos",
      placeholder: selectedCategory ? "Selecciona un producto" : "Primero selecciona una categoria",
      required: true,
      options: getProductOptions(selectedCategory),
      disabled: !selectedCategory
    }
  ], [selectedCategory, categoryOptions]);

  const persist = async (nextItems: Item[]) => {
    const prev = items;
    setItems(nextItems);
    try {
      await saveAllergies(nextItems.map(i => i.name));
    } catch {
      setItems(prev);
    }
  };

  // Eliminar
  const handleDelete = async (id: string) => {
    if (loading) return;
    await persist(items.filter(it => it.id !== id));
  };

  // Agregar 
  const addItem = async (name: string, svg: string) => {
    if (loading) return;
    const cleaned = name.trim();
    if (!cleaned) return;

    const normalized = cleaned.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (items.some(x => x.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized)) {
      setAdding(false);
      setSelectedCategory("");
      return;
    }

    const id = normalized.replace(/\s+/g, "-");
    await persist([...items, { id, name: cleaned, svg }]);
    setAdding(false);
    setSelectedCategory("");
  };

  // Submit del DynamicForm 
  const handleFormSubmit = async (formData: Record<string, string | number | boolean>) => {
    const categoriaId = String(formData.categoria || "");
    const productoId  = String(formData.productos || "");
    const selectedCat = categories.find(cat => cat.id === categoriaId);
    const selectedProduct = selectedCat?.products?.find(prod => prod.id === productoId);
    if (selectedProduct) {
      await addItem(selectedProduct.name, selectedProduct.svg);
    }
  };

  return (
    <main className="fav-page">
      <div className="fav-wrap">
        <header className="fav-header">
          <button className="back-btn" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/app/profile"))} aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="fav-title">Alergias</h1>
        </header>

        <section className="fav-list">
          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2" onClick={clearError}>
              {error}
            </div>
          )}

          {items.length === 0 && (
            <p className="text-sm text-gray-500 mb-3">
              Aún no has agregado alérgenos.
            </p>
          )}

          {items.map(it => (
            <ItemList
              key={it.id}
              item={{ id: it.id, name: it.name, svg: it.svg }}
              onDelete={() => handleDelete(it.id)}
              disabled={loading}
            />
          ))}

          {adding && (
            <Modal title="Añadir alérgeno" isOpen={adding} type="form">
              <DynamicForm
                fields={addProductFormFields}
                onSubmit={handleFormSubmit}
                submitButtonText={loading ? "Guardando…" : "Agregar"}
                submitButtonVariant="secondary"
                resetOnSubmit={true}
                className="shadow-none p-0 m-0"
                isLoading={loading}
                onFieldChange={(fieldName, value) => {
                  if (fieldName === "categoria") {
                    setSelectedCategory(String(value));
                  }
                }}
              >
                <Button
                  label="Cerrar"
                  variant="outline"
                  onClick={() => { setAdding(false); setSelectedCategory(""); }}
                />
              </DynamicForm>
            </Modal>
          )}
        </section>

        {!adding && (
          <Button
            label={
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M12 2v20M2 12h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Añadir alérgeno
              </>
            }
            variant="secondary"
            size="medium"
            className="w-full mb-4"
            onClick={() => setAdding(true)}
            disabled={loading}
          />
        )}

        <section className="quick-list">
          {ALLERGY_QUICK.map(q => (
            <button
              key={q.id}
              className={`quick-item ${loading ? "opacity-60 pointer-events-none" : ""}`}
              onClick={() => addItem(q.name, q.svg)}
              disabled={loading}
            >
              <span className="quick-avatar" dangerouslySetInnerHTML={{ __html: q.svg }} />
              <span className="quick-name">{q.name}</span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}