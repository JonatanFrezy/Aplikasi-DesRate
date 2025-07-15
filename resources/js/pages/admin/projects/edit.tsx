import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import type { Project, Questionnaire } from '@/types';

interface EditProjectProps {
    project: Project;
    questionnaires: Questionnaire[];
}

export default function EditProject({ project, questionnaires }: EditProjectProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/projects' },
        { title: `Edit: ${project.title}`, href: `/projects/${project.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        pm_name: project.pm_name || '',
        team_members: project.team_members || '',
        pic_name: project.pic_name || '',
        pic_email: project.pic_email || '',
        pic_phone: project.pic_phone || '',
        questionnaire_id: project.questionnaire?.toString() || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/projects/${project.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project: ${project.title}`} />

            <h1 className="text-2xl font-bold my-3 mx-3">Edit Project</h1>

            <form onSubmit={submit} className="space-y-4 max-w-xl mx-3">
                <div className="grid gap-2">
                    <Label className="font-semibold">Title Project</Label>
                    <Input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">PM Name</Label>
                    <Input
                        type="text"
                        value={data.pm_name}
                        onChange={(e) => setData('pm_name', e.target.value)}
                    />
                    <InputError message={errors.pm_name} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">Team Members</Label>
                    <textarea
                        value={data.team_members}
                        onChange={(e) => setData('team_members', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                    />
                    <InputError message={errors.team_members} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">PIC Name</Label>
                    <Input
                        type="text"
                        value={data.pic_name}
                        onChange={(e) => setData('pic_name', e.target.value)}
                    />
                    <InputError message={errors.pic_name} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">PIC Email</Label>
                    <Input
                        type="email"
                        value={data.pic_email}
                        onChange={(e) => setData('pic_email', e.target.value)}
                    />
                    <InputError message={errors.pic_email} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">PIC Phone</Label>
                    <Input
                        type="text"
                        value={data.pic_phone}
                        onChange={(e) => setData('pic_phone', e.target.value)}
                    />
                    <InputError message={errors.pic_phone} />
                </div>

                <div className="grid gap-2">
                    <Label className="font-semibold">Questionnaire (Optional)</Label>
                    <select
                        value={data.questionnaire_id}
                        onChange={(e) => setData('questionnaire_id', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                    >
                        <option value="">-- Select Questionnaire --</option>
                        {questionnaires.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.questionnaire_id} />
                </div>

                <Button type="submit" className="mt-2 w-full" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Update
                </Button>
            </form>
        </AppLayout>
    );
}
