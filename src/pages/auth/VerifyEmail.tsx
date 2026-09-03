import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");
    
    // State untuk fitur Resend
    const [email, setEmail] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setStatus("error");
                setErrorMessage("Token verifikasi tidak ditemukan di URL.");
                return;
            }

            try {
                await axios.post(`${apiUrl}/auth/verify-email`, { token });
                setStatus("success");
            } catch (err: any) {
                setStatus("error");
                setErrorMessage(err.response?.data?.message || "Tautan verifikasi tidak valid atau telah kedaluwarsa.");
            }
        };

        verifyToken();
    }, [token, apiUrl]);

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setResendLoading(true);
        try {
            // Berdasarkan dokumentasi, endpoint ini selalu mengembalikan 200
            await axios.post(`${apiUrl}/auth/verify-email/resend`, { email });
            setResendSuccess(true);
        } catch (err: any) {
            console.error("Gagal mengirim ulang:", err);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-linear-to-br from-sky-50 via-background to-indigo-50/40 items-center justify-center p-4">
            <div className="flex flex-col gap-6 w-full max-w-md p-8 border rounded-3xl bg-white shadow-xs text-center">
                {status === "loading" && (
                    <>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Spinner className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-xl tracking-tight font-semibold text-neutral-900">Memverifikasi Email...</h4>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                Mohon tunggu sebentar, kami sedang memvalidasi tautan verifikasi Anda.
                            </p>
                        </div>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-xl tracking-tight font-semibold text-neutral-900">Email Berhasil Diverifikasi!</h4>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                Akun Anda sudah aktif. Silakan masuk untuk melanjutkan ke halaman dashboard.
                            </p>
                        </div>
                        <Button onClick={() => navigate('/login')} className="w-full mt-2 h-10">
                            Masuk Sekarang
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <XCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-xl tracking-tight font-semibold text-neutral-900">Verifikasi Gagal</h4>
                            <p className="text-sm text-red-500 mt-2 leading-relaxed">
                                {errorMessage}
                            </p>
                        </div>

                        {/* Form Kirim Ulang Jika Token Expired / Error */}
                        {!resendSuccess ? (
                            <form onSubmit={handleResend} className="mt-4 space-y-3 text-left">
                                <p className="text-xs text-neutral-500">Masukkan email Anda untuk mendapatkan tautan verifikasi baru:</p>
                                <Input 
                                    type="email" 
                                    placeholder="email@domain.com" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                                <Button type="submit" variant="outline" className="w-full h-10" disabled={resendLoading}>
                                    {resendLoading ? <Spinner className="w-4 h-4 mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                    Kirim Ulang Tautan
                                </Button>
                            </form>
                        ) : (
                            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-md mt-2">
                                Jika alamat email terdaftar, tautan baru telah dikirimkan. Silakan cek inbox Anda.
                            </div>
                        )}

                        <Button onClick={() => navigate('/login')} variant="ghost" className="w-full mt-2 h-10">
                            Kembali ke Halaman Masuk
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}