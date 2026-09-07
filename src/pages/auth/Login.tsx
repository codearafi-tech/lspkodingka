import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });

            const resData = response.data;

            const accessToken = resData.accessToken || resData.access_token || resData.data?.accessToken || resData.data?.access_token;
            const refreshToken = resData.refreshToken || resData.refresh_token || resData.data?.refreshToken || resData.data?.refresh_token;
            const userRole = resData.role || resData.data?.role || resData.user?.role;

            if (accessToken) {
                localStorage.setItem("token", accessToken);
            }
            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }
            if (userRole) {
                localStorage.setItem("role", userRole); 
            }

            if (userRole?.toLowerCase() === "lembaga") {
                navigate("/admin/dashboard");
            } else if (userRole?.toLowerCase() === "asesor") {
                navigate("/asesor/dashboard");
            } else {
                navigate("/asesi/dashboard");
            }

        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
            const errorMsg = err.response?.data?.message || "Email atau password salah.";
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* PERBAIKAN 1: Tambahkan flex, items-center, dan justify-center di kontainer luar */
        <section className="min-h-svh p-6 flex flex-col items-center justify-center bg-linear-to-br from-sky-50 via-background to-indigo-50/40">
            {/* PERBAIKAN 2: Hapus 'my-auto md:mt-2' agar card tidak ditarik ke atas */}
            <div className="flex flex-col gap-6 w-full max-w-md border p-6 md:p-10 rounded-3xl bg-white shadow-xs">
                <img
                    src="/images/Logo.png"
                    alt="LSP KODINGKA LOGO"
                    className="h-8 w-auto object-contain mx-auto"
                />

                <div>
                    <h4 className="text-2xl tracking-tight font-medium text-center">Selamat Datang</h4>
                    <p className="text-sm text-gray-500 mt-1 text-center">Masuk menggunakan akun Anda.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {errorMessage && (
                            <div className="p-3 mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Field>

                        <Field>
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <a
                                    href="#lupa-password"
                                    className="text-xs text-sky-700 hover:underline"
                                >
                                    Lupa password?
                                </a>
                            </div>
                            <InputGroup>
                                <InputGroupInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <InputGroupAddon align="inline-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer mx-1"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Button
                            type="submit"
                            className="w-full mt-4 h-10 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="w-4 h-4" />
                                    Memproses...
                                </span>
                            ) : (
                                "Masuk"
                            )}
                        </Button>

                        <div className="text-center text-sm text-neutral-500">
                            Belum punya akun?{" "}
                            <Link to="/register" className="text-sky-700 font-medium hover:underline">
                                Registrasi
                            </Link>
                        </div>

                        <div className="text-center text-xs text-neutral-400 px-4">
                            Dengan melanjutkan, kamu menyetujui{" "}
                            <Link to="/terms" className="underline hover:text-neutral-600">
                                Syarat & Ketentuan
                            </Link>{" "}
                            serta{" "}
                            <Link to="/privacy" className="underline hover:text-neutral-600">
                                Kebijakan Privasi
                            </Link>
                            .
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </section>
    );
}