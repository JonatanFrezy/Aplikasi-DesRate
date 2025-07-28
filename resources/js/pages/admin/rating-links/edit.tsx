import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Project, Questionnaire, RatingLink, type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface EditRatingLinkProps {
  rating_link: RatingLink;
  projects: Project[];
  questionnaires: Questionnaire[];
}

export default function CreateRatingLink({ rating_link, projects, questionnaires }: EditRatingLinkProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Link Rating', href: '/admin/rating-links' },
    { title: `Edit: ${rating_link.id}`, href: `/admin/rating-links/${rating_link.id}/edit` },
  ];

  const { data, setData, put, processing, errors } = useForm({
    send_to_name: rating_link.send_to_name || '',
    send_to_email: rating_link.send_to_email || '',
    send_to_phone: rating_link.send_to_phone || '',
    project_id: rating_link.project_id?.toString() || '',
    questionnaire_id: rating_link.questionnaire_id?.toString() || '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/admin/rating-links/${rating_link.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Link Rating" />

      <div className="flex flex-1 justify-center bg-[#f7f7fb] py-10">
        <form onSubmit={submit} className="w-full max-w-2xl bg-white p-8 shadow rounded-2xl space-y-6">
          <h1 className="text-2xl font-bold">Edit Link Rating</h1>

          <div>
            <Label className="font-semibold text-base mb-1 block">Nama Penerima</Label>
            <Input
              type="text"
              required
              value={data.send_to_name}
              onChange={(e) => setData('send_to_name', e.target.value)}
              className="rounded-xl"
            />
            <InputError message={errors.send_to_name} />
          </div>

          <div>
            <Label className="font-semibold text-base mb-1 block">Email</Label>
            <Input
              type="email"
              required
              value={data.send_to_email}
              onChange={(e) => setData('send_to_email', e.target.value)}
              className="rounded-xl"
            />
            <InputError message={errors.send_to_email} />
          </div>

          <div>
            <Label className="font-semibold text-base mb-1 block">Kontak</Label>
            <Input
              type="text"
              required
              value={data.send_to_phone}
              onChange={(e) => setData('send_to_phone', e.target.value)}
              className="rounded-xl"
            />
            <InputError message={errors.send_to_phone} />
          </div>

          <div>
            <Label className="font-semibold text-base mb-1 block">Pekerjaan</Label>
            <select
              value={data.project_id}
              onChange={(e) => setData('project_id', e.target.value)}
              className="rounded-xl w-full border px-3 py-2 text-sm"
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
            <Label className="font-semibold text-base mb-1 block">Kuesioner</Label>
            <select
              value={data.questionnaire_id}
              onChange={(e) => setData('questionnaire_id', e.target.value)}
              className="rounded-xl w-full border px-3 py-2 text-sm"
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

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
            >
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />} Simpan
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
