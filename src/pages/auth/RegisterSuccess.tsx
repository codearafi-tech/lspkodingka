import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface RegisterSuccessProps {
  email?: string;
  onResend?: () => void;
  onBackToLogin?: () => void;
}

export default function RegisterSuccess({ 
  email = "nama@email.com", 
  onResend, 
  onBackToLogin 
}: RegisterSuccessProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-slate-900">
            Cek Email Anda
          </CardTitle>
          <CardDescription className="text-sm text-slate-500 pt-1">
            Kami telah mengirimkan tautan verifikasi ke <span className="font-medium text-slate-700">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-4 text-center">
          <p className="text-sm text-slate-600 leading-relaxed">
            Silakan periksa kotak masuk (inbox) atau folder spam Anda dan klik tombol verifikasi di dalam email untuk mengaktifkan akun LSP KODINGKA Anda.
          </p>

          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500 border border-slate-100">
            Tidak menerima email? Pastikan alamat email yang Anda masukkan sudah benar atau coba kirim ulang.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2">
          <Button 
            variant="outline" 
            className="w-full gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={onResend}
          >
            <RefreshCw className="h-4 w-4" />
            Kirim Ulang Email Verifikasi
          </Button>

          <Button 
            variant="ghost" 
            className="w-full gap-2 text-slate-600 hover:text-slate-900"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Halaman Masuk
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}