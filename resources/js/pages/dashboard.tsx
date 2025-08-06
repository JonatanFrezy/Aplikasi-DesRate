import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Star } from 'lucide-react';

interface RatingEntry {
  rating: number;
  count: number;
}

interface TopRating {
  name: string;
  avg_rating: number;
}

interface QuestionnaireData {
  id: number;
  responden: string;
  tanggal: string;
  nilai: number;
  kategori: string;
}

interface DashboardProps {
  total_projects: number;
  total_responses: number;
  average_rating: number;
  latestResponseDate: string | null;
  ratingDistribution?: RatingEntry[];
  topRatings?: TopRating[];
  questionnaireData?: QuestionnaireData[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(count) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export default function Dashboard(props: DashboardProps) {
  const {
    total_projects,
    total_responses,
    average_rating,
    latestResponseDate,
    ratingDistribution = [],
    topRatings = [],
    questionnaireData = [],
  } = props;

  const maxCount = Math.max(...ratingDistribution.map(r => r.count), 1);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">

        <h1 className="text-2xl font-bold">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Pekerjaan */}
          <div className="bg-blue-800 rounded-xl p-6 text-center text-white">
            <h2 className="text-lg font-semibold">Total Pekerjaan</h2>
            <p className="text-4xl font-bold mt-2">{total_projects}</p>
            <p className="text-sm mt-1">per tahun</p>
          </div>

          {/* Total Responden */}
          <div className="bg-blue-600 rounded-xl p-6 text-center text-white">
            <h2 className="text-lg font-semibold">Total Responden</h2>
            <p className="text-4xl font-bold mt-2">{total_responses}</p>
            <p className="text-sm mt-1">per tahun</p>
          </div>

          {/* Top Rating */}
          <div className="bg-blue-400 rounded-xl p-6 text-white">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Rating</h2>
              <span className="text-sm">{latestResponseDate ?? '-'}</span>
            </div>
            <ul className="divide-y divide-blue-300">
              {topRatings.map((person, i) => (
                <li key={i} className="py-2 flex items-center justify-between">
                  <span>{person.name}</span>
                  <div className="font-bold">{person.avg_rating.toFixed(1)}</div>
                  <Stars count={person.avg_rating} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rating dan Ulasan & Tabel Kuesioner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating dan Ulasan */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-black/90 border border-blue-200">
            <h2 className="text-lg font-semibold text-black">Rating dan Ulasan</h2>
            <p className="text-sm mb-2 text-black/80">Rating dan ulasan diverifikasi dan berasal dari pengguna</p>

            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-black">{average_rating.toFixed(1)}</div>
              <div>
                <Stars count={average_rating} />
                <p className="text-sm mt-1 text-black/70">{latestResponseDate ?? '-'}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const entry = ratingDistribution.find(r => r.rating === star);
                const percentage = (entry?.count ?? 0) / maxCount * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm text-black">
                    <span className="w-4">{star}</span>
                    <div className="w-full bg-black/40 h-2 rounded">
                      <div className="bg-white h-2 rounded" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabel Nilai Kuesioner */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-black/90 border border-blue-200">
            <h2 className="text-lg font-semibold text-black mb-4">Nilai Kuesioner</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/20">
                    <th className="text-left py-2 px-1 font-semibold text-black">No</th>
                    <th className="text-left py-2 px-1 font-semibold text-black">Responden</th>
                    <th className="text-left py-2 px-1 font-semibold text-black">Tanggal</th>
                    <th className="text-left py-2 px-1 font-semibold text-black">Nilai</th>
                    <th className="text-left py-2 px-1 font-semibold text-black">Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {questionnaireData.map((item, index) => (
                    <tr key={item.id} className="border-b border-black/10 hover:bg-white/10 transition-colors">
                      <td className="py-2 px-1 text-black/80">{index + 1}</td>
                      <td className="py-2 px-1 text-black/80">{item.responden}</td>
                      <td className="py-2 px-1 text-black/80">{item.tanggal}</td>
                      <td className="py-2 px-1 text-black/80">
                        <span className={`font-semibold ${
                          item.nilai >= 4.5 ? 'text-green-600' : 
                          item.nilai >= 3.5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.nilai.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-2 px-1 text-black/80">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.kategori === 'Sangat Baik' ? 'bg-green-100 text-green-800' :
                          item.kategori === 'Baik' ? 'bg-blue-100 text-blue-800' :
                          item.kategori === 'Cukup' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.kategori}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {questionnaireData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-black/60">
                        Belum ada data kuesioner
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {questionnaireData.length > 0 && (
              <div className="mt-3 text-xs text-black/60">
                Total {questionnaireData.length} data kuesioner
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}