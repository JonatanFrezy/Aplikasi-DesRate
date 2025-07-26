import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Copy, Delete, Edit, Mail } from 'lucide-react';

type RatingLink = {
    id: number;
    token: string;
    link?: string; 
    send_to_name: string;
    send_to_email: string;
    send_to_phone: string;
    is_used: boolean;
    project?: {
        title: string;
    };
    questionnaire?: {
        title: string;
    };
};

type PageProps = {
    rating_links: RatingLink[];
    flash?: {
        link?: RatingLink;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Rating',
        href: '/admin/rating-links',
    },
];

export default function RatingLinks() {
    const { rating_links } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Link Rating" />

        <div className="flex justify-between items-center my-3 mx-3">
            <h1 className="text-2xl font-bold">Daftar Link Rating</h1>
            <Link
            href="/admin/rating-links/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
            Tambah Link Rating
            </Link>
        </div>

        <div className="overflow-x-auto mx-3">
            <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Link</th>
                <th className="border px-4 py-2 text-left">Pekerjaan</th>
                <th className="border px-4 py-2 text-left">Kuesioner</th>
                <th className="border px-4 py-2 text-left">Nama Penerima</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Kontak</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {rating_links.length > 0 ? (
                rating_links.map((rating_link, index) => (
                    <tr key={rating_link.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center gap-2">
                        {rating_link.link}
                            <button
                                onClick={() => {
                                    if (rating_link.link) {
                                        navigator.clipboard.writeText(rating_link.link);
                                        alert('Link berhasil disalin!');
                                    } else {
                                        alert('Link tidak tersedia!');
                                    }
                                }}
                                className="text-blue-600 hover:underline"
                                >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                    <td className="border px-4 py-2">
                        {rating_link.project?.title ?? '-'}
                    </td>
                    <td className="border px-4 py-2">
                        {rating_link.questionnaire?.title ?? '-'}
                    </td>
                    <td className="border px-4 py-2">{rating_link.send_to_name}</td>
                    <td className="border px-4 py-2">{rating_link.send_to_email}</td>
                    <td className="border px-4 py-2">{rating_link.send_to_phone}</td>
                    <td className="border px-4 py-2">{rating_link.is_used ? 'Sudah Terjawab' : 'Belum Terjawab'}</td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <Link
                                href={`/admin/rating-links/${rating_link.id}/resend`}
                                method="post"
                                as="button"
                                className="text-blue-600 hover:underline text-sm"
                                onClick={(e) => {
                                    if (!confirm(`Kirim ulang email ke ${rating_link.send_to_email || 'alamat yang tersedia'}?`)) {
                                    e.preventDefault();
                                    }
                                }}
                                >
                                <Mail className="w-4 h-4" />
                            </Link>
                            <Link
                            href={`/admin/rating-links/${rating_link.id}/edit`}
                            className="text-yellow-600 hover:underline text-sm"
                            >
                            <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                            href={`/admin/rating-links/${rating_link.id}`}
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
                    Tidak ada data link rating.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
