import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Copy, Delete, Edit, Mail, ArrowLeft } from 'lucide-react';

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
};

export default function RatingLinks() {
  const { rating_links } = usePage<PageProps>().props;

  return (
    <AppLayout>
      <Head title="Link Rating" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-700">DESRATE</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
              <Link
                href="/admin/rating-links/create"
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
      {/* Content */}
      <div className="flex min-h-screen">
        {/* Content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Data Link Rating</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border">
                <thead className="bg-gray-100 text-blue-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 border">#</th>
                    <th className="px-4 py-3 border">Link</th>
                    <th className="px-4 py-3 border">Pekerjaan</th>
                    <th className="px-4 py-3 border">Kuesioner</th>
                    <th className="px-4 py-3 border">Nama Penerima</th>
                    <th className="px-4 py-3 border">Email</th>
                    <th className="px-4 py-3 border">Kontak</th>
                    <th className="px-4 py-3 border">Status</th>
                    <th className="px-4 py-3 border">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rating_links.length > 0 ? (
                    rating_links.map((link, index) => (
                      <tr key={link.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border">{index + 1}</td>
                        <td className="px-4 py-3 border">
                          <div className="flex items-center gap-2 text-blue-600">
                            <span className="truncate max-w-[140px]">{link.link ?? '-'}</span>
                            <button
                              onClick={() => {
                                if (link.link) {
                                  navigator.clipboard.writeText(link.link);
                                  alert('Link berhasil disalin!');
                                } else {
                                  alert('Link tidak tersedia!');
                                }
                              }}
                              className="hover:text-blue-800"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 border">{link.project?.title ?? '-'}</td>
                        <td className="px-4 py-3 border">{link.questionnaire?.title ?? '-'}</td>
                        <td className="px-4 py-3 border">{link.send_to_name}</td>
                        <td className="px-4 py-3 border">{link.send_to_email}</td>
                        <td className="px-4 py-3 border">{link.send_to_phone}</td>
                        <td className="px-4 py-3 border">
                          {link.is_used ? 'Sudah Terjawab' : 'Belum Terjawab'}
                        </td>
<td className="px-4 py-3 border">
  <div className="flex items-center gap-2 flex-wrap">
    {/* Tombol Kirim */}
    <Link
      href={`/admin/rating-links/${link.id}/resend`}
      method="post"
      as="button"
      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
      onClick={(e) => {
        if (
          !confirm(`Kirim ulang email ke ${link.send_to_email || 'alamat yang tersedia'}?`)
        ) {
          e.preventDefault();
        }
      }}
    >
      Kirim
    </Link>

    {/* Tombol Edit */}
    <Link
      href={`/admin/rating-links/${link.id}/edit`}
      className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
    >
      Edit
    </Link>

    {/* Tombol Hapus */}
    <Link
      href={`/admin/rating-links/${link.id}`}
      method="delete"
      as="button"
      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
      onClick={(e) => {
        if (!confirm('Yakin ingin menghapus link ini?')) {
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
                      <td colSpan={9} className="text-center text-gray-500 py-8">
                        Tidak ada data link rating.
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
