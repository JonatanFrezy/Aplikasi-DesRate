import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Delete, Edit } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  type: string;
  order_number?: number | null;
  is_required: boolean;
  questionnaire_id: number;
};

type Questionnaire = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  questions_count: number;
};

type PageProps = {
  questionnaires: Questionnaire[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kuesioner',
    href: '/admin/questionnaires',
  },
];

export default function Questionnaires() {
  const { questionnaires } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kuesioner" />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-700">DESRATE</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
              <Link
                href="/admin/questionnaires/create"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Edit className="w-5 h-5" /> 
              </Link>

              <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm text-center w-full sm:w-auto">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Data Kuesioner</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border">
                <thead className="bg-gray-100 text-blue-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Judul</th>
                    <th className="px-4 py-3">Deskripsi</th>
                    <th className="px-4 py-3">Jumlah Pertanyaan</th>
                    <th className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {questionnaires.length > 0 ? (
                    questionnaires.map((questionnaire, index) => (
                      <tr key={questionnaire.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{questionnaire.title}</td>
                        <td className="px-4 py-3">{questionnaire.description}</td>
                        <td className="px-4 py-3">{questionnaire.questions_count}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/questionnaires/${questionnaire.id}/edit`}
                              className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/admin/questionnaires/${questionnaire.id}`}
                              method="delete"
                              as="button"
                              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                              onClick={(e) => {
                                if (!confirm('Yakin ingin menghapus project ini?')) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              Hapus
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8">
                        Tidak ada data kuesioner.
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
