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
} from 'lucide-react';

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUrl = usePage().url;

  const isActive = (path: string) => currentUrl.startsWith(path);

  return (
    <AppShell variant="sidebar">
      {/* MOBILE TOPBAR BUTTON */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-3 h-3" />
        </button>
      </div>

      {/* Sidebar (overlay in mobile, fixed in desktop) */}
      <div>
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 z-40 h-full bg-blue-700 text-white transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col md:w-80 p-6 space-y-4`}
        >
          {/* Close button mobile */}
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu links */}
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
            href="/projects"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
              isActive('/projects')
                ? 'bg-white text-blue-700 font-bold'
                : 'hover:bg-blue-600'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Data Pekerjaan</span>
          </Link>

          <Link
            href="/questionnaires"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full ${
              isActive('/questionnaires')
                ? 'bg-white text-blue-700 font-bold'
                : 'hover:bg-blue-600'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>Kuesioner</span>
          </Link>

          {/* Tombol Logout */}
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

      {/* Konten utama */}
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
