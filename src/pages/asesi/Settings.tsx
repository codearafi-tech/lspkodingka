import { useState } from "react";
import axios from "axios";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff, Lock, User, CheckCircle2 } from "lucide-react";

export default function SettingsAsesi() {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Tab State ('profile' | 'security')
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // Form State - Profil
  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [successProfile, setSuccessProfile] = useState("");
  const [errorProfile, setErrorProfile] = useState("");

  // Form State - Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successPassword, setSuccessPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Update Profil Asesi
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessProfile("");
    setErrorProfile("");
    setLoadingProfile(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/asesi/profile`,
        { name: nama, phoneNumber: noTelp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessProfile("Profil berhasil diperbarui!");
    } catch (err: any) {
      setErrorProfile(
        err.response?.data?.message || "Gagal memperbarui profil."
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  // Update Password Asesi
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPassword("");
    setErrorPassword("");

    if (newPassword !== confirmNewPassword) {
      setErrorPassword("Konfirmasi password baru tidak cocok.");
      return;
    }

    setLoadingPassword(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/auth/change-password`,
        {
          currentPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessPassword("Password berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      setErrorPassword(
        err.response?.data?.message || "Gagal mengubah password."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Pengaturan Akun
        </h1>
        <p className="text-sm text-neutral-500">
          Kelola informasi profil dan keamanan akun Asesi Anda.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "profile"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <User className="h-4 w-4" />
          Informasi Profil
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "security"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <Lock className="h-4 w-4" />
          Keamanan & Password
        </button>
      </div>

      {/* TAB 1: INFORMASI PROFIL */}
      {activeTab === "profile" && (
        <div className="rounded-2xl border bg-white p-6 shadow-xs">
          <form onSubmit={handleUpdateProfile}>
            <FieldGroup className="space-y-4">
              {successProfile && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {successProfile}
                </div>
              )}
              {errorProfile && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {errorProfile}
                </div>
              )}

              <Field>
                <FieldLabel>Nama Lengkap</FieldLabel>
                <Input
                  type="text"
                  placeholder="Nama sesuai identitas"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Nomor WhatsApp / Telepon</FieldLabel>
                <Input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </Field>

              <div className="pt-2">
                <Button type="submit" disabled={loadingProfile}>
                  {loadingProfile ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Menyimpan...
                    </span>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      )}

      {/* TAB 2: KEAMANAN & PASSWORD */}
      {activeTab === "security" && (
        <div className="rounded-2xl border bg-white p-6 shadow-xs">
          <form onSubmit={handleChangePassword}>
            <FieldGroup className="space-y-4">
              {successPassword && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {successPassword}
                </div>
              )}
              {errorPassword && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {errorPassword}
                </div>
              )}

              <Field>
                <FieldLabel>Password Saat Ini</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Masukkan password lama"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="mr-1 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Password Baru</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="mr-1 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Konfirmasi Password Baru</FieldLabel>
                <Input
                  type="password"
                  placeholder="Ulangi password baru"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </Field>

              <div className="pt-2">
                <Button type="submit" disabled={loadingPassword}>
                  {loadingPassword ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      Memproses...
                    </span>
                  ) : (
                    "Perbarui Password"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      )}
    </div>
  );
}