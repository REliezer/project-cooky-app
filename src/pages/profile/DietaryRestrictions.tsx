import { useState, useMemo, useEffect } from "react";
import "../../styles/components/FavoriteIngredients.css"; 
import { useNavigate } from "react-router-dom";

import { categories } from "../../data/Categories";
import type { Item } from "../../data/DislikeIngredientes";
import type { FormFieldConfig } from "../../types";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DynamicForm from "../../components/common/DynamicForm";
import ItemListProfile from "../../components/common/ItemListProfile";
import { useProfileStore } from "../../store/useProfileStore";
import { normalizeDietaryRestriction, denormalizeDietaryRestriction } from "../../utils/dietaryUtils";

const DIET_QUICK: { id: string; name: string; svg: string }[] = [
  { id: "vegano",        name: "Vegano",        svg: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2L4 20h16L12 2z" fill="#4ADE80"/></svg>` },
  { id: "vegetariano",   name: "Vegetariano",   svg: `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#A3E635"/></svg>` },
  { id: "sin_gluten",    name: "Sin Gluten",    svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="4" y="4" width="16" height="16" fill="#FBBF24"/></svg>` },
  { id: "paleo",         name: "Paleo",         svg: `<svg viewBox="0 0 24 24" width="24" height="24"><ellipse cx="12" cy="12" rx="8" ry="6" fill="#F59E0B"/></svg>` },
  { id: "sin_lactosa",   name: "Sin Lactosa",   svg: `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="6" y="4" width="12" height="16" rx="2" fill="#60A5FA"/></svg>` },
];

export default function DietaryRestrictions() {
  const navigate = useNavigate();
  const { profile, status, error, fetchProfile, saveDietaryRestrictions, clearError } = useProfileStore();

  const [adding, setAdding] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Cargar perfil al montar
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const restrictions = profile?.dietary_restrictions ?? [];

    const findSvgByName = (name: string): string => {
      for (const cat of categories) {
        for (const p of (cat.products ?? [])) {
          if (p.name.toLowerCase() === name.toLowerCase()) return p.svg;
        }
      }
      const q = DIET_QUICK.find(x => x.name.toLowerCase() === name.toLowerCase());
      if (q) return q.svg;

      return `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#E5E7EB"/></svg>`;
    };

    const mapped: Item[] = restrictions.map(n => {
      // El backend devuelve las restricciones normalizadas, necesitamos convertirlas de vuelta
      // a formato legible para mostrar en la UI
      const displayName = denormalizeDietaryRestriction(n);
      return {
        id: n, // Usar el valor normalizado del backend como ID
        name: displayName,
        svg: findSvgByName(displayName),
      };
    });
    setItems(mapped);
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
      await saveDietaryRestrictions(nextItems.map(i => i.name));
    } catch {
      setItems(prev);
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Eliminando: ', id)
    if (loading) return;
    await persist(items.filter(it => it.id !== id));
  };

  const addItem = async (name: string, svg: string) => {
    if (loading) return;
    const cleaned = name.trim();
    if (!cleaned) return;

    // Verificar si ya existe usando normalización consistente
    const normalizedNew = normalizeDietaryRestriction(cleaned);
    if (items.some(x => x.id === normalizedNew)) {
      setAdding(false);
      setSelectedCategory("");
      return;
    }

    // Usar el valor normalizado como ID para consistencia
    const id = normalizedNew;
    await persist([...items, { id, name: cleaned, svg }]);
    setAdding(false);
    setSelectedCategory("");
  };

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
    <main className="fav-page relative">
     
      <div className="fav-wrap relative z-10 pt-6 md:pt-10">
        <header className="fav-header">
          <button
            className="back-btn"
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/app/profile"))}
            aria-label="Volver"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="fav-title">Restricciones dietéticas</h1>
        </header>

        {/* Lista */}
        <section className="fav-list">
          {error && (
            <div
              className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2"
              onClick={clearError}
            >
              {error}
            </div>
          )}

          {items.length === 0 && (
            <p className="text-sm text-gray-500 mb-3">
              Aún no has agregado restricciones dietéticas.
            </p>
          )}

          {items.map(it => (
            <ItemListProfile
              key={it.id}
              item={{ id: it.id, name: it.name, svg: it.svg }}
              onDelete={() => handleDelete(it.id)}
              disabled={loading}
            />
          ))}

          {adding && (
            <Modal title="Añadir restricción dietética" isOpen={adding} type="form">
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
                Añadir restricción
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
          {DIET_QUICK.map(q => (
            <button
              key={q.id}
              className={`quick-item ${loading ? "opacity-60 pointer-events-none" : ""}`}
              onClick={() => addItem(q.name, q.svg)}
              disabled={loading}
            >
              <span
                className="quick-avatar"
                dangerouslySetInnerHTML={{ __html: q.svg }}
              />
              <span className="quick-name">{q.name}</span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
