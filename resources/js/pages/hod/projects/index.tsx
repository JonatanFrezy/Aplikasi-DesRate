import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  pm_name: string;
  team_members: string;
  pic_name: string;
  pic_email: string;
  pic_phone: string;
};

type PageProps = {
  projects: Project[];
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pekerjaan', href: '/hod/projects' },
];

export default function Projects() {
  const { projects } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-700">DESRATE</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm text-center w-full sm:w-auto">
                HOD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex min-h-screen">
        {/* Content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Pekerjaan</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 border-b text-blue-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Pekerjaan</th>
                    <th className="px-4 py-3">PM</th>
                    <th className="px-4 py-3">Anggota</th>
                    <th className="px-4 py-3">PIC</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Kontak</th>
                    <th className="px-4 py-3">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{project.title}</td>
                        <td className="px-4 py-3">{project.pm_name}</td>
                        <td className="px-4 py-3">{project.team_members}</td>
                        <td className="px-4 py-3">{project.pic_name}</td>
                        <td className="px-4 py-3">{project.pic_email}</td>
                        <td className="px-4 py-3">{project.pic_phone}</td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/hod/projects/${project.id}`}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                          >
                            View Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center text-gray-500 py-8">
                        Tidak ada data pekerjaan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t text-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-gray-600">Showing data 1 to 7 of 40 entries</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-gray-400">{'<'}</button>
                {[1, 2, 3, 4, 6].map((n) => (
                  <button
                    key={n}
                    className={`px-3 py-1 rounded ${
                      n === 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button className="px-2 py-1 text-gray-400">{'>'}</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}