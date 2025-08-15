import { useState, useMemo, useEffect } from "react";
import "../../styles/components/DislikeIngredientes.css";
import { useNavigate } from "react-router-dom";

import { quick, dislike as dislikeSeed } from "../../data/DislikeIngredientes";
import { categories } from "../../data/Categories";
// import type { Item } from "../../data/DislikeIngredientes";
import type { FormFieldConfig } from "../../types";
import { findSvgByName } from "../../utils/ingredientSvg";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DynamicForm from "../../components/common/DynamicForm";
import ItemList from "../../components/common/ItemList";
import { useProfileStore } from "../../store/useProfileStore";

// Tipo local consistente para esta pantalla
type UIItem = { id: string; name: string; svg: string };

function DislikeIngredients() {
  const navigate = useNavigate();
  const { profile, status, error, fetchProfile, saveBannedIngredients, clearError } = useProfileStore();

  const [adding, setAdding] = useState(false);
  const [items, setItems] = useState<UIItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const slugify = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  // Cargar perfil
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Mapear ingredientes del perfil
  useEffect(() => {
    const banned = profile?.banned_ingredients ?? [];

    if (banned.length) {
      const mapped: UIItem[] = banned.map(n => ({
        id: slugify(n),
        name: n,
        svg: findSvgByName(n),
      }));
      setItems(mapped);
    } else {
      // Normaliza el seed al shape UIItem
      const mappedSeed: UIItem[] = dislikeSeed.map(it => ({
        id: slugify(it.name),
        name: it.name,
        svg: it.svg,
      }));
      setItems(mappedSeed);
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

  // Guardado inmediato (optimista con rollback)
  const persist = async (nextItems: UIItem[]) => {
    const prevItems = items;
    setItems(nextItems);
    try {
      await saveBannedIngredients(nextItems.map(i => i.name));
    } catch {
      setItems(prevItems);
    }
  };

  const handleDelete = async (id: string) => {
    if (loading) return;
    await persist(items.filter(it => it.id !== id));
  };

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
    <main className="dislike-page">
      <div className="dislike-wrap">
        <header className="dislike-header">
          <button className="back-btn" onClick={() => navigate("/app/profile")} aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="dislike-title">Ingredientes<br />que no me gustan</h1>
        </header>

        {/* Lista */}
        <section className="dislike-list">
          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2" onClick={clearError}>
              {error}
            </div>
          )}

          {items.length === 0 && (
            <p className="text-sm text-gray-500 mb-3">
              Aún no has agregado ingredientes a evitar.
            </p>
          )}

          {items.map(it => (
            <ItemList
              key={it.id}
              item={{ id: it.id, name: it.name, svg: it.svg }}
              onDelete={() => handleDelete(it.id)}
              disabled={loading} // asegúrate que ItemList tenga disabled?: boolean
            />
          ))}

          {adding && (
            <Modal title="Añadir ingrediente a evitar" isOpen={adding} type="form">
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

        <section className="quick-list">
          {quick.map(q => (
            <button
              key={q.id}
              className={`quick-item ${loading ? "opacity-60 pointer-events-none" : ""}`}
              onClick={() => addItem(q.name, q.svg)}
              disabled={loading}
              aria-label={`Añadir ${q.name}`}
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

export default DislikeIngredients;
