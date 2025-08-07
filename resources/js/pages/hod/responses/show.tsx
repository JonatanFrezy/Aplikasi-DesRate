import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Response } from '@/types';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';

interface ShowResponseProps {
  response: Response;
}

export default function ShowResponse({ response }: ShowResponseProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Jawaban', href: '/hod/responses' },
    { title: `Detail: ${response.id}`, href: `/hod/responses/${response.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Jawaban #${response.id}`} />

      <div className="flex justify-center bg-[#f7f7fb] py-12 px-4 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Detail Jawaban</h1>
            <a
              href={`/hod/responses/${response.id}/download`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>

          {/* Reviewer */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Informasi Reviewer</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-700 font-medium">Nama Pengisi</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.rating_link?.send_to_name}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-700 font-medium">Email</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.rating_link?.send_to_email}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-700 font-medium">Kontak</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.rating_link?.send_to_phone}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-700 font-medium">Tanggal Submit</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {new Date(response.submitted_at).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-700 font-medium">Rata-rata Nilai</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.average_rating ?? '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Pekerjaan */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Informasi Pekerjaan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-gray-700 font-medium">Pekerjaan</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.project?.title}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-700 font-medium">PM</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.project?.pm_name}
                </p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm text-gray-700 font-medium">Anggota Tim</Label>
                <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                  {response.project?.team_members}
                </p>
              </div>
            </div>
          </div>

          {/* Kuesioner */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Informasi Kuesioner</h2>

            <div>
              <Label className="text-sm text-gray-700 font-medium">Kuesioner</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {response.questionnaire?.title}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-700 font-medium">Deskripsi</Label>
              <p className="mt-2 rounded-xl border border-white shadow-sm px-4 py-2 bg-gray-50 text-gray-900">
                {response.questionnaire?.description}
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-sm text-gray-700 font-medium">Pertanyaan</Label>
              {[...response.response_details]
                .sort((a, b) => (a.question?.order_number ?? 0) - (b.question?.order_number ?? 0))
                .map((detail, index) => (
                  <div key={detail.id} className="mt-2 rounded-xl border border-white shadow-sm bg-gray-50 px-4 py-4">
                    {detail.question ? (
                      <>
                        <Label className="font-medium text-gray-800">
                          {index + 1}. {detail.question.text}
                          {Boolean(detail.question.is_required) && <span className="text-red-600"> *</span>}
                        </Label>

                        {detail.answer_option ? (
                        <div className="mt-2">
                          {detail.question.answer_options?.map((opt) => {
                            const isSelected = opt.id === detail.selected_option_id;
                            return (
                              <div
                                key={opt.id}
                                className="flex items-center gap-2 mb-1 text-gray-800"
                              >
                                <span className="relative flex items-center justify-center w-5 h-5">
                                  {/* Outer circle */}
                                  <span className={`w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center`}>
                                    {/* Inner dot */}
                                    {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                                  </span>
                                </span>
                                <span className={isSelected ? 'font-medium text-blue-600' : 'text-gray-700'}>
                                  {opt.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-800 bg-white border rounded-md p-2 mt-2">
                          {detail.answer_text || '-'}
                        </p>
                      )}
                      </>
                    ) : (
                      <p className="text-sm text-red-500">Pertanyaan tidak tersedia</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
