import { useState, useMemo } from "react";
import "../../styles/components/DislikeIngredientes.css";
import { useNavigate } from "react-router-dom";

import { quick, dislike } from "../../data/DislikeIngredientes";
import { categories } from "../../data/Categories";
import type { Item } from "../../data/DislikeIngredientes";
import type { FormFieldConfig } from '../../types';

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DynamicForm from '../../components/common/DynamicForm';
import ItemList from "../../components/common/ItemList";

import { useAuthStore } from "../../store/useAuthStore";

function DislikeIngredients() {
  const { user } = useAuthStore();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [items, setItems] = useState<Item[]>(user?.banned_ingredients && user.banned_ingredients.length > 0 ? user.banned_ingredients : dislike);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();
  console.log('User: ', user )
  // Generate category options from imported categories
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  // Generate product options based on selected category
  const getProductOptions = (categoryId: string) => {
    const selectedCat = categories.find(cat => cat.id === categoryId);
    if (!selectedCat || !selectedCat.products) {
      return [];
    }
    return selectedCat.products.map(product => ({
      value: product.id,
      label: product.name
    }));
  };

  // Dynamic form fields that update when selectedCategory changes
  const addProductFormFields: FormFieldConfig[] = useMemo(() => [
    {
      name: 'categoria',
      type: 'list',
      label: 'Categoria',
      placeholder: 'Selecciona una categoria',
      required: true,
      options: categoryOptions
    },
    {
      name: 'productos',
      type: 'list',
      label: 'Productos',
      placeholder: selectedCategory ? 'Selecciona un producto' : 'Primero selecciona una categoria',
      required: true,
      options: getProductOptions(selectedCategory),
      disabled: !selectedCategory
    }
  ], [selectedCategory, categoryOptions]);

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const addItem = (name: string, svg: string) => {
    if (!name.trim()) return;
    const id = name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    setItems(prev => [...prev, { id, name, svg }]);
    setAdding(false);
    setNewName("");
  };

  // Handle form submission from DynamicForm
  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted with data:', formData);
    const selectedCat = categories.find(cat => cat.id === formData.categoria);
    const selectedProduct = selectedCat?.products?.find(prod => prod.id === formData.productos);

    if (selectedProduct) {
      addItem(selectedProduct.name, selectedProduct.svg);
    }
  };

  // Handle category change to update product options
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Reset modal state when closing
  const handleCloseModal = () => {
    setAdding(false);
    setSelectedCategory("");
  };

  return (
    <main className="dislike-page">
      <div className="dislike-wrap">
        {/* Header */}
        <header className="dislike-header">
          <button className="back-btn" onClick={() => navigate('/app/profile')} aria-label="Volver">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="dislike-title">Ingredientes<br />que no me gustan</h1>
        </header>

        {/* Lista con swipe */}
        <section className="dislike-list">
          {items.map(it => (
            <ItemList
              key={it.id}
              item={{ id: it.id, name: it.name, svg: it.svg }}
              onDelete={() => handleDelete(it.id)}
            />
          ))}
          {/* Modal para añadir manualmente */}
          {adding && (
            <Modal
              title="Añadir ingrediente"
              isOpen={adding}
              type="form"
            >
              <DynamicForm
                fields={addProductFormFields}
                onSubmit={handleFormSubmit}
                submitButtonText="Agregar"
                submitButtonVariant="secondary"
                resetOnSubmit={true}
                className="shadow-none p-0 m-0"
                onFieldChange={(fieldName, value) => {
                  if (fieldName === 'categoria') {
                    handleCategoryChange(value);
                  }
                }}
              >
                <Button
                  label='Cancelar'
                  variant='outline'
                  onClick={handleCloseModal}
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
            onClick={() => setAdding(true)}>
          </Button>
        )}

        {/* Sugerencias rápidas */}
        <section className="quick-list">
          {quick.map(q => (
            <button
              key={q.id}
              className="quick-item"
              onClick={() => addItem(q.name, q.svg)}
              aria-label={`Añadir ${q.name}`}
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

export default DislikeIngredients;