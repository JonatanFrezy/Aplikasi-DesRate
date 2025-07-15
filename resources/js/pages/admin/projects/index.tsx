import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Delete, Edit } from 'lucide-react';

type Project = {
    id: number;
    title: string;
    pm_name: string;
    team_members: string;
    pic_name: string;
    pic_email: string;
    pic_phone: string;
    user: {
        name: string;
    };
    questionnaire?: {
        title: string;
    };
};

type PageProps = {
    projects: Project[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Projects() {
    const { projects } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Projects" />

        <div className="flex justify-between items-center my-3 mx-3">
            <h1 className="text-2xl font-bold">Projects List</h1>
            <Link
            href="/projects/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
            Add Project
            </Link>
        </div>

        <div className="overflow-x-auto mx-3">
            <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">PM</th>
                <th className="border px-4 py-2 text-left">Team Members</th>
                <th className="border px-4 py-2 text-left">PIC</th>
                <th className="border px-4 py-2 text-left">PIC Email</th>
                <th className="border px-4 py-2 text-left">PIC Phone</th>
                <th className="border px-4 py-2 text-left">Questionnaire</th>
                <th className="border px-4 py-2 text-left">Admin</th>
                <th className="border px-4 py-2 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {projects.length > 0 ? (
                projects.map((project, index) => (
                    <tr key={project.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{project.title}</td>
                    <td className="border px-4 py-2">{project.pm_name}</td>
                    <td className="border px-4 py-2">{project.team_members}</td>
                    <td className="border px-4 py-2">{project.pic_name}</td>
                    <td className="border px-4 py-2">{project.pic_email}</td>
                    <td className="border px-4 py-2">{project.pic_phone}</td>
                    <td className="border px-4 py-2">
                        {project.questionnaire?.title ?? '-'}
                    </td>
                    <td className="border px-4 py-2">{project.user?.name}</td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <Link
                            href={`/projects/${project.id}/edit`}
                            className="text-yellow-600 hover:underline text-sm"
                            >
                            <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                            href={`/projects/${project.id}`}
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
                    Tidak ada data project.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
