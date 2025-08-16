import { useEffect, useMemo, useRef, useState } from "react";
import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";
import { useProfileStore } from "../../store/useProfileStore";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../components/ui/ProfileAvatar"; // <-- importa tu componente

export default function ProfileReadEdit() {
  const { profile, status, error, fetchProfile, saveProfile, clearError } = useProfileStore();
  const [editMode, setEditMode] = useState<boolean>(true);
  const navigate = useNavigate();

  // avatar (preview local)
  const [avatar, setAvatar] = useState<string>("/user-placeholder.png");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => { fetchProfile(); }, []);

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
    // Si el backend trae avatar, úsalo como base; si no, placeholder
    if (profile.avatarUrl) setAvatar(profile.avatarUrl);
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

    // TODO: si deseas subir avatar al backend, aquí adjunta el File y guarda
    await saveProfile({ name /*, avatar: file */ });
    setEditMode(false);
  };

  const onCancel = () => {
    const parts = (profile?.name || "").trim().split(" ").filter(Boolean);
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
    clearError();
    setEditMode(false);

    // revertir preview si había uno temporal
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
      setAvatar(profile?.avatarUrl || "/user-placeholder.png");
    }
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
    if (!f) return;

    // Limpia URL anterior si existía
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const url = URL.createObjectURL(f);
    objectUrlRef.current = url;
    setAvatar(url);
  };

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

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
          onClick={() => navigate("/app/profile")} 
          aria-label="Volver"
          className="w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6 relative -mt-20 z-20">
        <div className="relative w-36 h-36"> {/* wrapper consistente */}
          <ProfileAvatar
            src="https://randomuser.me/api/portraits/men/75.jpg"
            showBadge={false}
            status={editMode ? "online" : undefined}
            className="!mb-0" 
          />

          {/* Input de archivo */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatar}
          />

          {/* Botón de cámara */}
          <button
            type="button"
            onClick={onAvatarBtnClick}
            aria-label={editMode ? "Cambiar foto de perfil" : "Cambio deshabilitado"}
            className={`absolute bottom-1 right-1 text-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2
              ${editMode ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500" : "bg-gray-300 cursor-not-allowed"}`}
            disabled={!editMode}
          >
            📷
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="rounded-lg shadow-lg p-8 max-w-[80%] md:max-w-[60%] mx-auto mb-8 relative z-10">
        {error && (
          <div
            className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2"
            role="alert"
            onClick={clearError}
          >
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
                ${editMode ? "bg-white focus:ring-[#FE6700]" : "bg-gray-100"}
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
                ${editMode ? "bg-white focus:ring-[#FE6700]" : "bg-gray-100"}
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
              aria-readonly="true"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 justify-end pt-6">
          {!editMode ? (
            <Button label="Editar" className="bg-orange-400" onClick={() => setEditMode(true)} disabled={loading} />
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
