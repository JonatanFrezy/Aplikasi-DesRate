import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Project, Questionnaire, type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface CreateRatingLinkProps {
  projects: Project[];
  questionnaires: Questionnaire[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Link Rating', href: '/admin/rating-links' },
  { title: 'Tambah', href: '/admin/rating-links/create' },
];

export default function CreateRatingLink({ projects, questionnaires }: CreateRatingLinkProps) {
  const { data, setData, post, processing, errors } = useForm({
    send_to_name: '',
    send_to_email: '',
    send_to_phone: '',
    project_id: '',
    questionnaire_id: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/rating-links');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Link Rating" />

      <div className="flex justify-center bg-[#f7f7fb] py-12 px-4 min-h-screen">
        <form
          onSubmit={submit}
          className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Link Rating</h2>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Nama Penerima</Label>
            <Input
              placeholder="Masukkan Nama"
              value={data.send_to_name}
              onChange={(e) => setData('send_to_name', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={errors.send_to_name} />
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Email</Label>
            <Input
              placeholder="Masukkan Email"
              type="email"
              value={data.send_to_email}
              onChange={(e) => setData('send_to_email', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={errors.send_to_email} />
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Kontak</Label>
            <Input
              placeholder="Masukkan No. HP"
              value={data.send_to_phone}
              onChange={(e) => setData('send_to_phone', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={errors.send_to_phone} />
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Pekerjaan</Label>
            <select
              value={data.project_id}
              onChange={(e) => setData('project_id', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 text-sm"
            >
              <option value="">-- Pilih Pekerjaan --</option>
              {projects.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
            <InputError message={errors.project_id} />
          </div>

          <div>
            <Label className="text-sm text-gray-700 font-medium">Kuesioner</Label>
            <select
              value={data.questionnaire_id}
              onChange={(e) => setData('questionnaire_id', e.target.value)}
              className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 text-sm"
            >
              <option value="">-- Pilih Kuesioner --</option>
              {questionnaires.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
            <InputError message={errors.questionnaire_id} />
          </div>

          <div className="flex justify-end pt-6">
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
