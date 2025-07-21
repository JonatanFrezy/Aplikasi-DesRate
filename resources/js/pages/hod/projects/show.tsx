import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import type { Project } from '@/types';

interface ShowProjectProps {
    project: Project;
}

export default function ShowProject({ project }: ShowProjectProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pekerjaan', href: '/projects' },
        { title: `Detail: ${project.title}`, href: `/projects/${project.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pekerjaan: ${project.title}`} />

            <div className="flex flex-1 justify-center bg-[#f7f7fb] py-10">
                <div className="w-full max-w-4xl bg-white p-6 space-y-6 rounded-xl shadow">
                    <div>
                        <Label className="font-semibold text-base">Judul Pekerjaan</Label>
                        <p className="mt-1">{project.title}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="font-semibold text-base">PM</Label>
                            <p className="mt-1">{project.pm_name}</p>
                        </div>
                        <div>
                            <Label className="font-semibold text-base">Nama Anggota</Label>
                            <p className="mt-1">{project.team_members}</p>
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold text-base">PIC Pelanggan</Label>
                        <p className="mt-1">{project.pic_name}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="font-semibold text-base">Email Pelanggan</Label>
                            <p className="mt-1">{project.pic_email}</p>
                        </div>
                        <div>
                            <Label className="font-semibold text-base">Kontak PIC Pelanggan</Label>
                            <p className="mt-1">{project.pic_phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
