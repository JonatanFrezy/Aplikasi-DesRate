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
    { title: 'Pekerjaan', href: '/hod/projects' },
    { title: `Detail: ${project.title}`, href: `/hod/projects/${project.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Detail Pekerjaan: ${project.title}`} />

      <div className="flex justify-center bg-[#f7f7fb] py-12 px-4 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detail Pekerjaan</h2>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Judul Pekerjaan</Label>
            <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
              {project.title}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-gray-700 font-medium">PM</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {project.pm_name}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-700 font-medium">Nama Anggota</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {project.team_members}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">PIC Pelanggan</Label>
            <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
              {project.pic_name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-gray-700 font-medium">Email Pelanggan</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {project.pic_email}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-700 font-medium">Kontak PIC Pelanggan</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {project.pic_phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
