import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import type { Questionnaire } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface CreateProjectProps {
    questionnaires: Questionnaire[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pekerjaan', href: '/projects' },
  { title: 'Tambah', href: '/projects/create' },
];

export default function CreateProject({ questionnaires }: CreateProjectProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        pm_name: '',
        team_members: '',
        pic_name: '',
        pic_email: '',
        pic_phone: '',
        questionnaire_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/projects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pekerjaan" />

            {/* Header dan Search */}
            <div className="bg-white border-b shadow-sm py-4 px-8 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-blue-700">DESRATE</h1>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-80 px-4 py-2 border rounded-full text-sm focus:outline-none"
                    />
                    <div className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm">
                        👤 Admin
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="flex min-h-screen bg-[#f7f7fb]">
                {/* Sidebar (otomatis dari AppLayout) */}

                <div className="flex-1 flex justify-center py-10">
                    <form
                        onSubmit={submit}
                        className="w-full max-w-4xl bg-[#f7f7fb] rounded-xl p-6 space-y-6"
                    >
                        <div>
                            <Label className="font-semibold text-base">Judul Pekerjaan</Label>
                            <Input
                                placeholder="Input Judul"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="rounded-xl mt-1"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label className="font-semibold text-base">PM</Label>
                                <Input
                                    placeholder="Input PM"
                                    value={data.pm_name}
                                    onChange={(e) => setData('pm_name', e.target.value)}
                                    className="rounded-xl mt-1"
                                />
                                <InputError message={errors.pm_name} />
                            </div>
                            <div>
                                <Label className="font-semibold text-base">Nama Anggota</Label>
                                <Input
                                    placeholder="Input Anggota"
                                    value={data.team_members}
                                    onChange={(e) => setData('team_members', e.target.value)}
                                    className="rounded-xl mt-1"
                                />
                                <InputError message={errors.team_members} />
                            </div>
                        </div>

                        <div>
                            <Label className="font-semibold text-base">PIC Pelanggan</Label>
                            <Input
                                placeholder="Input PIC"
                                value={data.pic_name}
                                onChange={(e) => setData('pic_name', e.target.value)}
                                className="rounded-xl mt-1"
                            />
                            <InputError message={errors.pic_name} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label className="font-semibold text-base">Email Pelanggan</Label>
                                <Input
                                    placeholder="Input Email"
                                    type="email"
                                    value={data.pic_email}
                                    onChange={(e) => setData('pic_email', e.target.value)}
                                    className="rounded-xl mt-1"
                                />
                                <InputError message={errors.pic_email} />
                            </div>
                            <div>
                                <Label className="font-semibold text-base">Kontak PIC Pelanggan</Label>
                                <Input
                                    placeholder="Input Kontak"
                                    value={data.pic_phone}
                                    onChange={(e) => setData('pic_phone', e.target.value)}
                                    className="rounded-xl mt-1"
                                />
                                <InputError message={errors.pic_phone} />
                            </div>
                        </div>

                        {/* Tombol Simpan */}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                            >
                                {processing && (
                                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
