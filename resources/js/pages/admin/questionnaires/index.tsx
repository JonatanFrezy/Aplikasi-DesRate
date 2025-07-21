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

        <div className="flex justify-between items-center my-3 mx-3">
            <h1 className="text-2xl font-bold">Daftar Kuesioner</h1>
            <Link
            href="/admin/questionnaires/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
            Tambah Kuesioner
            </Link>
        </div>

        <div className="overflow-x-auto mx-3">
            <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Judul</th>
                <th className="border px-4 py-2 text-left">Deskripsi</th>
                <th className="border px-4 py-2 text-left">Jumlah Pertanyaan</th>
                <th className="border px-4 py-2 text-left">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {questionnaires.length > 0 ? (
                questionnaires.map((questionnaire, index) => (
                    <tr key={questionnaire.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{questionnaire.title}</td>
                    <td className="border px-4 py-2">{questionnaire.description}</td>
                    <td className="border px-4 py-2">{questionnaire.questions_count}</td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <Link
                            href={`/admin/questionnaires/${questionnaire.id}/edit`}
                            className="text-yellow-600 hover:underline text-sm"
                            >
                            <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                            href={`/admin/questionnaires/${questionnaire.id}`}
                            method="delete"
                            as="button"
                            className="text-red-600 hover:underline text-sm"
                            onClick={(e) => {
                                if (!confirm('Yakin ingin menghapus project ini?')) {
                                e.preventDefault();
                                }
                            }}
                            >
                            <Delete className="w-4 h-4" />
                            </Link>
                        </div>
                        </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={9} className="text-center px-4 py-6">
                    Tidak ada data kuesioner.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
