import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RatingEntry {
  rating: number;
  count: number;
}

interface QuestionnaireData {
  id: number;
  title: string;
  top: number;
  least: number;
  average: number;
}

interface AverageTrend {
  current: number;
  previous: number;
}

interface DashboardProps {
  total_projects: number;
  total_responses: number;
  average_rating: number;
  latestResponseDate: string | null;
  ratingDistribution?: RatingEntry[];
  averageTrend?: AverageTrend;
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
    averageTrend,
    ratingDistribution = [],
    questionnaireData = [],
  } = props;

  const [isLoading] = useState(false);

  const totalRatingResponses = ratingDistribution.reduce((sum, entry) => sum + entry.count, 0);

  // Calculate min and max values across all questionnaires
  const getOverallMinMax = (data: QuestionnaireData[]) => {
    if (data.length === 0) return { overallMin: null, overallMax: null };
    
    const allBestValues = data.map(item => item.top);
    const allWorstValues = data.map(item => item.least);
    const allValues = [...allBestValues, ...allWorstValues];
    
    const overallMin = Math.min(...allValues);
    const overallMax = Math.max(...allValues);
    
    return { overallMin, overallMax };
  };

  const { overallMin, overallMax } = getOverallMinMax(questionnaireData);

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

  const isExtremeValue = (value: number) => {
    return value === overallMin || value === overallMax;
  };

  const getValueClass = (value: number) => {
    if (value === overallMax) return 'text-green-600 font-bold';
    if (value === overallMin) return 'text-red-600 font-bold';
    // Skala warna yang lebih natural
    if (value >= 4.5) return 'text-green-600';        // Sangat baik
    if (value >= 4.0) return 'text-green-500';        // Baik
    if (value >= 3.0) return 'text-yellow-600';       // Cukup
    if (value >= 2.0) return 'text-orange-500';       // Kurang
    return 'text-red-600';
  };

  // Hitung selisih dan arah tren
  const trendDifference = averageTrend
    ? averageTrend.current - averageTrend.previous
    : 0;

  const trendDirection = trendDifference > 0 ? 'up' : trendDifference < 0 ? 'down' : 'neutral';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">

        <h1 className="text-2xl font-bold">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Pekerjaan */}
          <div className="bg-blue-800 rounded-xl p-6 text-center text-white flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Total Pekerjaan</h2>
            <p className="text-4xl font-bold mt-2">{total_projects}</p>
            <p className="text-sm mt-1">per tahun</p>
          </div>

          {/* Total Responden */}
          <div className="bg-blue-600 rounded-xl p-6 text-center text-white flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Total Responden</h2>
            <p className="text-4xl font-bold mt-2">{total_responses}</p>
            <p className="text-sm mt-1">per tahun</p>
          </div>

          {/* Tren Rata-rata Bulanan */}
          <div className="bg-blue-400 rounded-xl p-6 text-white">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-semibold">Tren Rata-rata Bulanan</h2>
              <span className="text-sm mt-1">{latestResponseDate ?? '-'}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">
                {typeof averageTrend?.current === 'number' 
                  ? averageTrend.current.toFixed(1) 
                  : '-'}
              </span>


              {trendDirection === 'up' && (
                <span className="flex items-center text-green-100">
                  <TrendingUp className="w-5 h-5 text-green-200" />
                  <span className="ml-1 text-sm">+{trendDifference.toFixed(1)}</span>
                </span>
              )}

              {trendDirection === 'down' && (
                <span className="flex items-center text-red-100">
                  <TrendingDown className="w-5 h-5 text-red-200" />
                  <span className="ml-1 text-sm">{trendDifference.toFixed(1)}</span>
                </span>
              )}

              {trendDirection === 'neutral' && (
                <span className="text-sm text-white/70">Tidak berubah</span>
              )}
            </div>

            <p className="text-xs mt-2">
              Dibanding rata-rata bulan sebelumnya (
                {typeof averageTrend?.previous === 'number' 
                  ? averageTrend.previous.toFixed(1) 
                  : '-'}
              )
            </p>
          </div>
        </div>

        {/* Rating dan Ulasan & Tabel Kuesioner */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-6">
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

            {/* Min/Max Summary */}
            {questionnaireData.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3">
                {/* Highest Value */}
                {overallMax !== null && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-800">Nilai Tertinggi</span>
                    </div>
                    <div className="text-lg font-bold text-green-800">{overallMax.toFixed(1)}</div>
                    <div className="text-xs text-green-600">
                      Dari semua kuesioner
                    </div>
                  </div>
                )}
                
                {/* Lowest Value */}
                {overallMin !== null && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-semibold text-red-800">Nilai Terendah</span>
                    </div>
                    <div className="text-lg font-bold text-red-800">{overallMin.toFixed(1)}</div>
                    <div className="text-xs text-red-600">
                      Dari semua kuesioner
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/20">
                    <th className="text-left py-3 px-2 font-semibold text-black">No</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Judul Kuesioner</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Nilai Terbaik</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Rata-rata</th>
                    <th className="text-left py-3 px-2 font-semibold text-black">Nilai Terburuk</th>
                  </tr>
                </thead>
                <tbody>
                  {questionnaireData.map((item, index) => (
                    <tr key={item.id} className="border-b border-black/10 hover:bg-white/10 transition-colors">
                      <td className="py-3 px-2 text-black/80">
                        {index + 1}
                      </td>
                      <td
                        className="py-3 px-2 text-black/80 max-w-[200px]"
                        title={item.title}
                      >
                        <div className="font-medium">
                          {item.title.split(" ").slice(0, 2).join(" ")}
                          {item.title.split(" ").length > 2 && "…"}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-black/80">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getValueClass(item.top)}`}>
                            {item.top.toFixed(1)}
                          </span>
                          {isExtremeValue(item.top) && item.top === overallMax && (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          )}
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${
                                i < Math.round(item.top) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-black/80">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getValueClass(item.average)}`}>
                            {item.average.toFixed(1)}
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${
                                i < Math.round(item.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-black/80">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getValueClass(item.least)}`}>
                            {item.least.toFixed(1)}
                          </span>
                          {isExtremeValue(item.least) && item.least === overallMin && (
                            <TrendingDown className="w-3 h-3 text-red-600" />
                          )}
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${
                                i < Math.round(item.least) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {questionnaireData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-black/60">
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