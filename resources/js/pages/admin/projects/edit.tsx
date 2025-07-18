import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Trash2, Pencil } from 'lucide-react';
import InputError from '@/components/input-error';
import type { Project, Questionnaire } from '@/types';

interface EditProjectProps {
    project: Project;
    questionnaires: Questionnaire[];
}

export default function EditProject({ project, questionnaires }: EditProjectProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pekerjaan', href: '/projects' },
        { title: `Edit: ${project.title}`, href: `/projects/${project.id}/edit` },
    ];

    const {
        data,
        setData,
        put,
        delete: destroy, // rename because `delete` is a reserved word
        processing,
        errors,
    } = useForm({
        title: project.title || '',
        pm_name: project.pm_name || '',
        team_members: project.team_members || '',
        pic_name: project.pic_name || '',
        pic_email: project.pic_email || '',
        pic_phone: project.pic_phone || '',
        questionnaire_id: project.questionnaire?.toString() || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/projects/${project.id}`);
    };

    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            destroy(`/projects/${project.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Pekerjaan: ${project.title}`} />

            <div className="flex flex-1 justify-center bg-[#f7f7fb] py-10">
                <form
                    onSubmit={submit}
                    className="w-full max-w-4xl bg-[#f7f7fb] p-6 space-y-6"
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

                    {/* Tombol Aksi */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                        >
                            {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                            Simpan
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
