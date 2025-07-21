import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Delete, Edit } from 'lucide-react';

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
        href: '/responses',
    },
];

export default function Responses() {
    const { responses } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Jawaban" />

        <div className="flex justify-between items-center my-3 mx-3">
            <h1 className="text-2xl font-bold">Daftar Jawaban</h1>
        </div>

        <div className="overflow-x-auto mx-3">
            <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Pekerjaan</th>
                <th className="border px-4 py-2 text-left">Kuesioner</th>
                <th className="border px-4 py-2 text-left">Nama Pengisi</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Kontak</th>
                <th className="border px-4 py-2 text-left">Rating</th>
                <th className="border px-4 py-2 text-left">Tanggal Submit</th>
                <th className="border px-4 py-2 text-left">Detail</th>
                </tr>
            </thead>
            <tbody>
                {responses.length > 0 ? (
                responses.map((response, index) => (
                    <tr key={response.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                        {response.project?.title ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.questionnaire?.title ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.rating_link?.send_to_name ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.rating_link?.send_to_email ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.rating_link?.send_to_phone ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.average_rating !== undefined
                            ? response.average_rating.toFixed(2)
                            : '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {response.submitted_at}
                    </td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <Link
                            href={`/responses/${response.id}/show`}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                          >
                            View Detail
                          </Link>
                        </div>
                        </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={9} className="text-center px-4 py-6">
                    Tidak ada data jawaban.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
