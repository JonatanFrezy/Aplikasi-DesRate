import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    questionnaireData: initialQuestionnaireData = [],
  } = props;

  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData[]>(initialQuestionnaireData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestionnaireData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/questionnaire-data');
      if (response.ok) {
        const data = await response.json();
        setQuestionnaireData(data);
      }
    } catch (error) {
      console.error('Error fetching questionnaire data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuestionnaireData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalRatingResponses = ratingDistribution.reduce((sum, entry) => sum + entry.count, 0);

  const getRatingBarColor = (rating: number) => {
    switch (rating) {
      case 5:
        return 'bg-blue-800'; 
      case 4:
        return 'bg-blue-700';
      case 3:
        return 'bg-blue-600';
      case 2:
        return 'bg-blue-500';
      case 1:
        return 'bg-blue-400'; 
      default:
        return 'bg-blue-500';
    }
  };

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
                  <span className="flex-1 truncate">{person.name}</span>
                  <div className="font-bold mx-2">{person.avg_rating.toFixed(1)}</div>
                  <Stars count={person.avg_rating} />
                </li>
              ))}
              {topRatings.length === 0 && (
                <li className="py-2 text-center text-blue-200">
                  Belum ada data rating
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Rating dan Ulasan & Tabel Kuesioner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating dan Ulasan */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-black/90 border border-blue-200">
            <h2 className="text-lg font-semibold text-black">Rating dan Ulasan</h2>
            <p className="text-sm mb-4 text-black/80">Rating dan ulasan diverifikasi dan berasal dari pengguna</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-black">{average_rating.toFixed(1)}</div>
              <div>
                <Stars count={average_rating} />
                <p className="text-sm mt-1 text-black/70">{latestResponseDate ?? '-'}</p>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const entry = ratingDistribution.find(r => r.rating === star);
                const count = entry?.count ?? 0;
                const percentage = totalRatingResponses > 0 ? (count / totalRatingResponses * 100) : 0;
                
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-black font-medium">{star}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                    
                    <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${getRatingBarColor(star)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 min-w-[60px]">
                      <span className="text-black/70 font-medium">{count}</span>
                      <span className="text-black/50 text-xs">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                );
              })}
              
              {totalRatingResponses === 0 && (
                <div className="text-center py-4 text-black/60">
                  Belum ada data rating
                </div>
              )}
              
              {totalRatingResponses > 0 && (
                <div className="mt-4 pt-3 border-t border-black/20">
                  <p className="text-xs text-black/60">
                    Total {totalRatingResponses} responden memberikan rating
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tabel Nilai Kuesioner */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-black/90 border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black">Nilai Kuesioner</h2>
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-black/60">Memperbarui data...</span>
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/20">
                    <th className="text-left py-3 px-2 font-semibold text-black">No</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Responden</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Tanggal</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Nilai</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {questionnaireData.map((item, index) => (
                    <tr key={item.id} className="border-b border-black/10 hover:bg-white/10 transition-colors">
                      <td className="py-3 px-2 text-black/80">{index + 1}</td>
                      <td className="py-3 px-2 text-black/80 max-w-[120px] truncate" title={item.responden}>
                        {item.responden}
                      </td>
                      <td className="py-3 px-2 text-black/80 text-xs">
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-2 text-black/80">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${
                            item.nilai >= 4.5 ? 'text-green-600' : 
                            item.nilai >= 3.5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {item.nilai.toFixed(1)}
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${
                                i < Math.round(item.nilai) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-black/80">
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
                      <td colSpan={5} className="py-8 text-center text-black/60">
                        {isLoading ? 'Memperbarui data kuesioner...' : 'Belum ada data kuesioner'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}