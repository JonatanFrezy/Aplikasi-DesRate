import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pekerjaan', href: '/admin/projects' },
  { title: 'Tambah', href: '/admin/projects/create' },
];

export default function CreateProject() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    pm_name: '',
    team_members: '',
    pic_name: '',
    pic_email: '',
    pic_phone: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/projects');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Pekerjaan" />

      <div className="flex justify-center bg-[#f7f7fb] py-12 px-4 min-h-screen">
        <form
          onSubmit={submit}
          className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Pekerjaan</h2>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Judul Pekerjaan</Label>
            <Input
              placeholder="Input Judul"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={errors.title} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-gray-700 font-medium">PM</Label>
              <Input
                placeholder="Input PM"
                value={data.pm_name}
                onChange={(e) => setData('pm_name', e.target.value)}
                className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={errors.pm_name} />
            </div>
            <div>
              <Label className="text-sm text-gray-700 font-medium">Nama Anggota</Label>
              <Input
                placeholder="Input Anggota"
                value={data.team_members}
                onChange={(e) => setData('team_members', e.target.value)}
                className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={errors.team_members} />
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">PIC Pelanggan</Label>
            <Input
              placeholder="Input PIC"
              value={data.pic_name}
              onChange={(e) => setData('pic_name', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={errors.pic_name} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-gray-700 font-medium">Email Pelanggan</Label>
              <Input
                placeholder="Input Email"
                type="email"
                value={data.pic_email}
                onChange={(e) => setData('pic_email', e.target.value)}
                className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={errors.pic_email} />
            </div>
            <div>
              <Label className="text-sm text-gray-700 font-medium">Kontak PIC Pelanggan</Label>
              <Input
                placeholder="Input Kontak"
                value={data.pic_phone}
                onChange={(e) => setData('pic_phone', e.target.value)}
                className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={errors.pic_phone} />
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <Button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
            >
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
