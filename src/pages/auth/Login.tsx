import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
            console.log("Login sukses response:", resData);

            const accessToken = resData.accessToken || resData.access_token || resData.data?.accessToken || resData.data?.access_token;
            const refreshToken = resData.refreshToken || resData.refresh_token || resData.data?.refreshToken || resData.data?.refresh_token;

            if (accessToken) {
                localStorage.setItem("token", accessToken);
            }
            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }

            navigate("/asesi/dashboard");

        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Email atau password salah.";
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full">
            <div className="p-8">
                <div className="flex items-center justify-between">
                    <img
                        src="/images/Logo.png"
                        alt="LSP KODINGKA LOGO"
                        className="h-10 w-auto object-contain"
                    />
                </div>
            </div>

            <section className="flex px-8 items-center justify-center bg-background pb-12">
                <div className="flex flex-col gap-6 w-full max-w-sm">
                    <div className="mt-2">
                        <h4 className="text-xl tracking-tight font-semibold">Selamat datang kembali!</h4>
                        <p className="text-sm text-gray-500 mt-1">Silakan masuk menggunakan akun Anda.</p>
                    </div>

                    <div className="mt-1">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 cursor-pointer">
                            <img src="/images/SiapKerja.png" alt="siapkerja" className="w-4 h-4 object-contain" />
                            <span>Masuk dengan SiapKerja</span>
                        </Button>
                    </div>

                    <div className="relative flex items-center justify-center my-1">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative bg-background px-3 text-xs text-neutral-500">
                            atau
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            {/* Kotak Pesan Error */}
                            {errorMessage && (
                                <div className="p-3 mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {errorMessage}
                                </div>
                            )}

                            <Field>
                                <FieldLabel>Email</FieldLabel>
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
                                    <FieldLabel>Password</FieldLabel>
                                    <a
                                        href="#lupa-password"
                                        className="text-xs text-sky-700 hover:underline"
                                    >
                                        Lupa password?
                                    </a>
                                </div>
                                <InputGroup>
                                    <InputGroupInput
                                        id="Password"
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

                            <div className="text-center text-sm text-neutral-500 mt-4">
                                Belum punya akun?{" "}
                                <a href="/register" className="text-sky-700 font-medium hover:underline">
                                    Registrasi
                                </a>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </section>
        </div>
    );
}