import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Response = {
  id: number;
  project_id: number;
  questionnaire_id: number;
  rating_link_id: number;
  average_rating?: number;
  submitted_at: string;
  project?: {
    title: string;
  };
  questionnaire?: {
    title: string;
  };
  rating_link?: {
    send_to_name: string;
    send_to_email: string;
    send_to_phone: string;
  };
};

type PageProps = {
  responses: Response[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Jawaban',
    href: '/hod/responses',
  },
];

export default function Responses() {
  const { responses } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Jawaban" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-700">DESRATE</h1>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm text-center w-full sm:w-auto">
              HOD
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen">
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Data Jawaban</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border">
                <thead className="bg-gray-100 text-blue-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Pekerjaan</th>
                    <th className="px-4 py-3">Kuesioner</th>
                    <th className="px-4 py-3">Nama Pengisi</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Kontak</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Tanggal Submit</th>
                    <th className="px-4 py-3">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {responses.length > 0 ? (
                    responses.map((response, index) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{response.project?.title ?? '-'}</td>
                        <td className="px-4 py-3">{response.questionnaire?.title ?? '-'}</td>
                        <td className="px-4 py-3">{response.rating_link?.send_to_name ?? '-'}</td>
                        <td className="px-4 py-3">{response.rating_link?.send_to_email ?? '-'}</td>
                        <td className="px-4 py-3">{response.rating_link?.send_to_phone ?? '-'}</td>
                        <td className="px-4 py-3">
                          {response.average_rating !== undefined
                            ? response.average_rating.toFixed(2)
                            : '-'}
                        </td>
                        <td className="px-4 py-3">{response.submitted_at}</td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/hod/responses/${response.id}`}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                          >
                            View Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center text-gray-500 py-8">
                        Tidak ada data jawaban.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
