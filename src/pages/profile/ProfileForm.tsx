import { useEffect, useMemo, useRef, useState } from "react";
import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";
import { useProfileStore } from "../../store/useProfileStore";
import { useNavigate } from "react-router-dom";

export default function ProfileReadEdit() {
  const { profile, status, error, fetchProfile, saveProfile, clearError } = useProfileStore();
  const [editMode, setEditMode] = useState<boolean>(true);
  const navigate = useNavigate();

  // avatar (preview local)
  const [avatar, setAvatar] = useState<string>("/user-placeholder.png");
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchProfile(); }, []);

  // Relleno inicial desde profile
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (!profile) return;
    const parts = (profile.name || "").trim().split(" ").filter(Boolean);
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
    setEmail(profile.email || "");
   
  }, [profile]);

  const loading = status === "loading";

  const dirty = useMemo(() => {
    if (!profile) return false;
    const full = (profile.name || "").trim().replace(/\s+/g, " ");
    const local = `${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
    return full !== local;
  }, [firstName, lastName, profile]);

  const onSave = async () => {
    const name = `${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
    if (!name) return;
    await saveProfile({ name });
    setEditMode(false);
  };

  const onCancel = () => {
    const parts = (profile?.name || "").trim().split(" ").filter(Boolean);
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
    clearError();
    setEditMode(false);
  };

  const onBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/app/profile");
  };

  const onAvatarBtnClick = () => {
    if (!editMode) return;
    fileRef.current?.click();
  };

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setAvatar(url);
    }
  };

  return (
    <section className="relative">
      <div className="pointer-events-none">
        <Graphics
          variant="left"
          title="Datos Personales"
          subtitle="Consulta y edita tu información básica."
        />
      </div>

      <div className="absolute left-4 top-4 z-20">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mb-6 relative -mt-20 z-20">
        <div className="relative w-28 h-28">
          <img
            src={avatar}
            alt="Foto de perfil"
            className="w-36 h-36 rounded-full border-4 border-orange-500 shadow-md object-cover"
          />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatar}
          />

          <button
            type="button"
            onClick={onAvatarBtnClick}
            className={`absolute bottom-1 right-1 text-white p-2 rounded-full shadow-md
              ${editMode ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"}`}
          >
            📷
          </button>
        </div>
      </div>

      <div className="rounded-lg shadow-lg p-8 max-w-[80%] md:max-w-[60%] mx-auto mb-8 relative z-10">
        {error && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2" onClick={clearError}>
            {error}
          </div>
        )}

        <div className="grid gap-6 grid-cols-1">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre <span className="text-feedback-error ml-1">*</span>
            </label>
            <input
              className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-1
                ${editMode ? "bg-white" : "bg-gray-100"}
                ${editMode ? "focus:ring-[#FE6700]" : ""}
                border-gray-300`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!editMode || loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Apellido <span className="text-feedback-error ml-1">*</span>
            </label>
            <input
              className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-1
                ${editMode ? "bg-white" : "bg-gray-100"}
                ${editMode ? "focus:ring-[#FE6700]" : ""}
                border-gray-300`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!editMode || loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Correo</label>
            <input
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-300"
              value={email}
              disabled
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 justify-end pt-6">
          {!editMode ? (
            <Button label="Editar" variant="primary" onClick={() => setEditMode(true)} disabled={loading} />
          ) : (
            <>
              <Button label={loading ? "Guardando…" : "Guardar"} variant="primary" onClick={onSave} disabled={!dirty || loading} />
              <Button label="Cancelar" variant="outline" onClick={onCancel} disabled={loading} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}