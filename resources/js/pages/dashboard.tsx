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

interface DashboardProps {
  total_projects: number;
  total_responses: number;
  average_rating: number;
  latestResponseDate: string | null;
  ratingDistribution?: RatingEntry[];
  topRatings?: TopRating[];
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
  } = props;

  const maxCount = Math.max(...ratingDistribution.map(r => r.count), 1);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold">Total Pekerjaan</h2>
            <p className="text-4xl font-bold mt-2">{total_projects}</p>
            <p className="text-sm text-gray-500 mt-1">per {latestResponseDate ?? '-'}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold">Total Responden</h2>
            <p className="text-4xl font-bold mt-2">{total_responses}</p>
            <p className="text-sm text-gray-500 mt-1">per {latestResponseDate ?? '-'}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Rating</h2>
            <span className="text-sm text-gray-500">{latestResponseDate ?? '-'}</span>
          </div>
          <ul className="divide-y divide-gray-300">
            {topRatings.map((person, i) => (
              <li key={i} className="py-2 flex items-center justify-between">
                <span>{person.name}</span>
                <div className="font-bold">{person.avg_rating.toFixed(1)}</div>
                <Stars count={person.avg_rating} />
              </li>
            ))}
          </ul>
        </div>

          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold">Rating dan Ulasan</h2>
            <p className="text-sm text-gray-500 mb-2">Rating dan ulasan diverifikasi dan berasal dari pengguna</p>

            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold">{average_rating.toFixed(1)}</div>
              <div>
                <Stars count={average_rating} />
                <p className="text-sm text-gray-500 mt-1">{latestResponseDate ?? '-'}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const entry = ratingDistribution.find(r => r.rating === star);
                const percentage = (entry?.count ?? 0) / maxCount * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-4">{star}</span>
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div className="bg-blue-500 h-2 rounded" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
