import { useState, useMemo, useEffect } from "react";
import "../../styles/components/FavoriteIngredients.css";
import { useNavigate } from "react-router-dom";

import { categories } from "../../data/Categories";
import { quick, favorite as favoriteSeed } from "../../data/FavoriteIngredients";
import type { Item } from "../../data/DislikeIngredientes";
import type { FormFieldConfig } from "../../types";
import { findSvgByName } from "../../utils/ingredientSvg";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DynamicForm from "../../components/common/DynamicForm";
import ItemList from "../../components/common/ItemList";
import { useProfileStore } from "../../store/useProfileStore";

function FavoriteIngredients() {
  const navigate = useNavigate();
  const { profile, status, error, fetchProfile, saveFavorites, clearError } = useProfileStore();

  const [adding, setAdding] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Cargar perfil al montar
  useEffect(() => {
    fetchProfile();
  }, []);

  // Mapear favoritos del perfil a items con svg
  useEffect(() => {
    const favs = profile?.favorite_ingredients ?? null;

    if (favs && favs.length) {
      const mapped: Item[] = favs.map(n => ({
        id: n.trim().toLowerCase().replace(/\s+/g, "-"),
        name: n,
        svg: findSvgByName(n),
      }));
      setItems(mapped);
    } else {
      setItems(favoriteSeed);
    }
  }, [profile]);

  // Opciones de categoría / producto
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  // Generate product options based on selected category
  const getProductOptions = (categoryId: string) => {
    const selectedCat = categories.find(cat => cat.id === categoryId);
    if (!selectedCat || !selectedCat.products) return [];
    return selectedCat.products.map(product => ({
      value: product.id,
      label: product.name
    }));
  };

  // Campos del form del modal
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

  const loading = status === "loading";

  // Guardado inmediato helper
  const persist = async (nextItems: Item[]) => {
    setItems(nextItems);                       
    try {
      await saveFavorites(nextItems.map(i => i.name));
    } catch {
      // si falla, restaura a estado previo del perfil
      const prev = (profile?.favorite_ingredients ?? []).map(n => ({
        id: n.trim().toLowerCase().replace(/\s+/g, "-"),
        name: n,
        svg: findSvgByName(n)
      }));
      setItems(prev);
    }
  };

  // Eliminar 
  const handleDelete = async (id: string) => {
    if (loading) return;
    const next = items.filter(it => it.id !== id);
    await persist(next);
  };

  // Agregar 
  const addItem = async (name: string, svg: string) => {
    if (loading) return;
    const cleaned = name.trim();
    if (!cleaned) return;
    if (items.some(x => x.name.toLowerCase() === cleaned.toLowerCase())) {
      setAdding(false);
      setSelectedCategory("");
      return;
    }
    const next = [...items, {
      id: cleaned.toLowerCase().replace(/\s+/g, "-"),
      name: cleaned,
      svg
    }];
    await persist(next);
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
          <button className="back-btn" onClick={() => navigate("/app/profile")} aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="fav-title">Ingredientes Favoritos</h1>
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

          {items.map(it => (
            <ItemList
              key={it.id}
              item={{ id: it.id, name: it.name, svg: it.svg }}
              onDelete={() => handleDelete(it.id)}
              disabled={loading}
            />
          ))}

          {adding && (
            <Modal title="Añadir ingrediente" isOpen={adding} type="form">
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

        {/* Botón añadir */}
        {!adding && (
          <Button
            label={
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M12 2v20M2 12h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Añadir ítem a lista
              </>
            }
            variant="secondary"
            size="medium"
            className="w-full mb-4"
            onClick={() => setAdding(true)}
            disabled={loading}
          />
        )}

        {/* Sugerencias rápidas */}
        <section className="quick-list">
          {quick.map(q => (
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

export default FavoriteIngredients;