import { useState } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Link2,
  BarChart2,
} from 'lucide-react';

type AppPageProps = {
  auth?: {
    user?: {
      role?: string;
    };
  };
};

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUrl = usePage().url;
  const isActive = (path: string) => currentUrl.startsWith(path);
  const page = usePage<AppPageProps>();
  const userRole = page.props.auth?.user?.role ?? '';

  return (
    <AppShell variant="sidebar">
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-3 h-3" />
        </button>
      </div>

      <div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 z-40 h-full bg-blue-700 text-white transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col md:w-64 p-4 space-y-3`}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <img
              src="/logo-desrate1.png"
              alt="DesRate Logo"
              className="w-20 h-auto object-contain"
            />
            <img
              src="/logo_desnet.png"
              alt="DesNet Logo"
              className="w-20 h-auto object-contain"
            />
          </div>

          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {userRole === 'admin' && (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/dashboard')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/admin/projects"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/admin/projects')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Data Pekerjaan</span>
              </Link>

              <Link
                href="/admin/questionnaires"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/admin/questionnaires')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span>Kuesioner</span>
              </Link>

              <Link
                href="/admin/rating-links"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/admin/rating-links')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <Link2 className="w-5 h-5" />
                <span>Link Rating</span>
              </Link>
            </>
          )}

          {userRole === 'hod' && (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/dashboard')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/hod/projects"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/hod/projects')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Data Pekerjaan</span>
              </Link>

              <Link
                href="/hod/responses"
                className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
                  isActive('/hod/responses')
                    ? 'bg-white text-blue-700 font-bold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <BarChart2 className="w-5 h-5" />
                <span>Jawaban</span>
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => router.post(route('logout'))}
            className="flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-blue-600 mt-6 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </aside>
      </div>

      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
