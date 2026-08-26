import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [role, setRole] = useState<"asesi" | "asesor">("asesi");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Data Pribadi
    const [nik, setNik] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");

    // State Wilayah
    const [provinces, setProvinces] = useState<{ id?: string; code?: string; name: string }[]>([]);
    const [regencies, setRegencies] = useState<{ id?: string; code?: string; name: string }[]>([]);
    const [districts, setDistricts] = useState<{ id?: string; code?: string; name: string }[]>([]);
    const [villages, setVillages] = useState<{ id?: string; code?: string; name: string }[]>([]);

    const [provinsi, setProvinsi] = useState("");
    const [kota, setKota] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");
    const [alamatKtp, setAlamatKtp] = useState("");

    // Khusus Asesor
    const [nomorMet, setNomorMet] = useState("");
    const [kodeLsp, setKodeLsp] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;

    // 1. Ambil Data Provinsi
    useEffect(() => {
        axios.get(`${apiUrl}/region/provinces`)
            .then((res) => {
                setProvinces(res.data.data || res.data);
            })
            .catch((err) => console.error("Gagal memuat data provinsi", err));
    }, [apiUrl]);

    // 2. Filter Kota berdasarkan provinceCode
    const handleProvinceChange = (provName: string) => {
        setProvinsi(provName);
        setKota("");
        setKecamatan("");
        setKelurahan("");
        setRegencies([]);
        setDistricts([]);
        setVillages([]);

        const selectedProv = provinces.find((p) => p.name === provName);
        if (selectedProv) {
            axios.get(`${apiUrl}/region/regencies?provinceCode=${selectedProv.code}`)
                .then((res) => setRegencies(res.data.data || res.data))
                .catch((err) => console.error("Gagal memuat data kota", err));
        }
    };

    // 3. Filter Kecamatan berdasarkan regencyCode
    const handleRegencyChange = (regName: string) => {
        setKota(regName);
        setKecamatan("");
        setKelurahan("");
        setDistricts([]);
        setVillages([]);

        const selectedReg = regencies.find((r) => r.name === regName);
        if (selectedReg) {
            axios.get(`${apiUrl}/region/districts?regencyCode=${selectedReg.code}`)
                .then((res) => setDistricts(res.data.data || res.data))
                .catch((err) => console.error("Gagal memuat data kecamatan", err));
        }
    };

    // 4. Filter Kelurahan berdasarkan districtCode
    const handleDistrictChange = (distName: string) => {
        setKecamatan(distName);
        setKelurahan("");
        setVillages([]);

        const selectedDist = districts.find((d) => d.name === distName);
        if (selectedDist) {
            axios.get(`${apiUrl}/region/villages?districtCode=${selectedDist.code}`)
                .then((res) => setVillages(res.data.data || res.data))
                .catch((err) => console.error("Gagal memuat data kelurahan", err));
        }
    };

    // Handler NIK
    const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 16) {
            setNik(val);
        }
    };

    // Handler nomor telpon
    const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 14) {
            setNoTelp(val);
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const payload: Record<string, any> = {
            role: role,
            email: email,
            password: password,
            nationalId: nik,
            fullName: namaLengkap,
            placeOfBirth: tempatLahir,
            dateOfBirth: tanggalLahir,
            gender: jenisKelamin,
            phoneNumber: noTelp,
            lastEducation: pendidikanTerakhir,
            occupation: pekerjaan,
            province: provinsi,
            cityOrRegency: kota,
            district: kecamatan,
            village: kelurahan,
            addressDetail: alamatKtp,
        };

        if (role === 'asesor') {
            payload.metNumber = nomorMet;
            payload.lspCode = kodeLsp;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, payload);
            console.log("Register berhasil:", response.data);
            setSuccessMessage("Registrasi berhasil!");

            if (role === 'asesor') {
                navigate('/asesor/dashboard');
            } else {
                navigate('/asesi/dashboard');
            }
        } catch (err: any) {
            console.error("Error register:", err.response?.data || err.message);
            setErrorMessage(err.response?.data?.message || "Terjadi kesalahan saat mendaftar.");
        } finally {
            setLoading(false);
        }
    };

    const jenis_Kelamin = [
        { label: "Laki-Laki", value: "Laki-Laki" },
        { label: "Perempuan", value: "Perempuan" },
    ];

    const pendidikan_Terakhir = [
        { label: "SMA / SMK / Sederajat", value: "SMA/SMK" },
        { label: "D3", value: "D3" },
        { label: "S1 / D4", value: "S1" },
        { label: "S2", value: "S2" },
        { label: "S3", value: "S3" },
    ];

    const pekerjaan_List = [
        { label: "Mahasiswa / Pelajar", value: "Mahasiswa" },
        { label: "Pegawai Swasta", value: "Pegawai Swasta" },
        { label: "PNS / BUMN", value: "PNS" },
        { label: "Wiraswasta", value: "Wiraswasta" },
        { label: "Lainnya", value: "Lainnya" },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col bg-background">
            <div className="p-8 pb-0">
                <div className="max-w-4xl flex items-center">
                    <img
                        src="/images/Logo.png"
                        alt="LSP KODINGKA LOGO"
                        className="h-10 w-auto object-contain"
                    />
                </div>
            </div>

            <section className="flex-1 flex px-8 py-8 items-center justify-center overflow-y-auto">
                {/* Lebar container diperbesar dari max-w-lg menjadi max-w-4xl agar leluasa ke samping */}
                <div className="flex flex-col gap-6 w-full max-w-4xl sm:p-10">
                    <div>
                        <h4 className="text-2xl tracking-tight font-semibold">Buat Akun Baru</h4>
                        <p className="text-sm text-gray-500 mt-1">Lengkapi data diri Anda untuk mendaftar.</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <FieldGroup>
                            {errorMessage && (
                                <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && (
                                <div className="p-3 mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                                    {successMessage}
                                </div>
                            )}

                            {/* Pilih Role */}
                            <Field className="mb-4">
                                <FieldLabel>Daftar Sebagai</FieldLabel>
                                <div className="flex gap-4 mt-1 max-w-xs">
                                    <button
                                        type="button"
                                        onClick={() => setRole("asesi")}
                                        className={`flex-1 py-2 border rounded-md font-medium text-sm transition ${role === "asesi" ? "bg-sky-900 text-primary-foreground shadow-xs" : "bg-background text-neutral-700 border-neutral-300 hover:bg-neutral-50"}`}
                                    >
                                        Asesi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("asesor")}
                                        className={`flex-1 py-2 border rounded-md font-medium text-sm transition ${role === "asesor" ? "bg-sky-900 text-primary-foreground shadow-xs" : "bg-background text-neutral-700 border-neutral-300 hover:bg-neutral-50"}`}
                                    >
                                        Lembaga
                                    </button>
                                </div>
                            </Field>

                            {role === "asesor" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 mb-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                                    <Field>
                                        <FieldLabel>Nomor MET</FieldLabel>
                                        <Input type="text" placeholder="Nomor MET" value={nomorMet} onChange={(e) => setNomorMet(e.target.value)} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Kode LSP</FieldLabel>
                                        <Input type="text" placeholder="Kode LSP" value={kodeLsp} onChange={(e) => setKodeLsp(e.target.value)} required />
                                    </Field>
                                </div>
                            )}

                            {/* 1. Data Akun (2 Kolom) */}
                            <div className="space-y-4 border-t border-neutral-200 pt-4">
                                <h5 className="text-sm font-semibold text-neutral-800">1. Data Akun</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input type="email" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Password</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Minimal 8 karakter"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer mr-1" tabIndex={-1}>
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                </div>
                            </div>

                            {/* 2. Data Pribadi (3 Kolom di layar besar agar melebar ke samping) */}
                            <div className="space-y-4 border-t border-neutral-200 pt-4 mt-4">
                                <h5 className="text-sm font-semibold text-neutral-800">2. Data Pribadi</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <Field>
                                        <FieldLabel>NIK</FieldLabel>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="16 Digit Angka"
                                            value={nik}
                                            onChange={handleNikChange}
                                            required
                                        />
                                        <span className="text-[11px] text-neutral-400 mt-0.5">{nik.length}/16 digit</span>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Nama Lengkap</FieldLabel>
                                        <Input type="text" placeholder="Sesuai KTP" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Tempat Lahir</FieldLabel>
                                        <Input type="text" placeholder="Kota kelahiran" value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Tanggal Lahir</FieldLabel>
                                        <Input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Jenis Kelamin</FieldLabel>
                                        <Select items={jenis_Kelamin} value={jenisKelamin} onValueChange={(val) => setJenisKelamin(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder="Pilih Jenis Kelamin" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {jenis_Kelamin.map((jenis) => (
                                                        <SelectItem key={jenis.value} value={jenis.value}>{jenis.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>No. Telepon / WhatsApp</FieldLabel>
                                        <Input type="tel" placeholder="08xxxxxxxxxx" value={noTelp} onChange={handlePhoneNumber} required />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Pendidikan Terakhir</FieldLabel>
                                        <Select items={pendidikan_Terakhir} value={pendidikanTerakhir} onValueChange={(val) => setPendidikanTerakhir(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder="Pilih Pendidikan" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {pendidikan_Terakhir.map((p) => (
                                                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Pekerjaan</FieldLabel>
                                        <Select items={pekerjaan_List} value={pekerjaan} onValueChange={(val) => setPekerjaan(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder="Pilih Pekerjaan" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {pekerjaan_List.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                            </div>

                            {/* 3. Alamat Sesuai KTP (Grid Layout Menyamping) */}
                            <div className="space-y-4 border-t border-neutral-200 pt-4 mt-4">
                                <h5 className="text-sm font-semibold text-neutral-800">3. Alamat Sesuai KTP</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Provinsi */}
                                    <Field>
                                        <FieldLabel>Provinsi</FieldLabel>
                                        <Select value={provinsi} onValueChange={(val) => handleProvinceChange(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder="Pilih Provinsi..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {provinces.map((p, index) => (
                                                        <SelectItem key={p.code || index} value={p.name}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Kota / Kabupaten */}
                                    <Field>
                                        <FieldLabel>Kota / Kabupaten</FieldLabel>
                                        <Select value={kota} onValueChange={(val) => handleRegencyChange(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder={provinsi ? "Pilih Kota/Kab..." : "Pilih provinsi dulu"} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {regencies.map((r, index) => (
                                                        <SelectItem key={r.code || index} value={r.name}>{r.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Kecamatan */}
                                    <Field>
                                        <FieldLabel>Kecamatan</FieldLabel>
                                        <Select value={kecamatan} onValueChange={(val) => handleDistrictChange(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder={kota ? "Pilih Kecamatan..." : "Pilih kota dulu"} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {districts.map((d) => (
                                                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Kelurahan / Desa */}
                                    <Field>
                                        <FieldLabel>Kelurahan / Desa</FieldLabel>
                                        <Select value={kelurahan} onValueChange={(val) => setKelurahan(val ?? "")}>
                                            <SelectTrigger><SelectValue placeholder={kecamatan ? "Pilih Kelurahan..." : "Pilih kecamatan dulu"} /></SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {villages.map((v, index) => (
                                                        <SelectItem key={v.code || index} value={v.name}>{v.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>

                                <div className="mt-4">
                                    <Field>
                                        <FieldLabel>Alamat Lengkap</FieldLabel>
                                        <Input type="text" placeholder="Nama jalan, RT/RW, No. Rumah" value={alamatKtp} onChange={(e) => setAlamatKtp(e.target.value)} required />
                                    </Field>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-6 h-10" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="w-4 h-4" />
                                        Memproses...
                                    </span>
                                ) : (
                                    "Daftar"
                                )}
                            </Button>

                            <div className="text-center text-sm text-neutral-500 mt-4">
                                Sudah punya akun? <a href="/login" className="text-blue-500 font-medium hover:underline">Masuk</a>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </section>
        </div>
    );
}