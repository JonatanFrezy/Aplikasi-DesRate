import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Project, Questionnaire, RatingLink, type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface EditRatingLinkProps {
    rating_link: RatingLink;
    projects: Project[];
    questionnaires: Questionnaire[];
}

export default function CreateRatingLink({ rating_link, projects, questionnaires }: EditRatingLinkProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Link Rating', href: '/admin/rating-links' },
        { title: `Edit: ${rating_link.id}`, href: `/admin/rating-links/${rating_link.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        send_to_name: rating_link.send_to_name || '',
        send_to_email: rating_link.send_to_email || '',
        send_to_phone: rating_link.send_to_phone || '',
        project_id: rating_link.project_id?.toString() || '',
        questionnaire_id: rating_link.questionnaire_id?.toString() || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/rating-links/${rating_link.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Link Rating" />

            <h1 className="text-2xl font-bold my-3 mx-3">Edit Link Rating</h1>

            <form onSubmit={submit} className="space-y-4 max-w-xl mx-3">
                <div className="grid gap-2">
                    <Label className="block font-semibold">Nama Penerima</Label>
                    <Input
                        type="text"
                        required
                        value={data.send_to_name}
                        onChange={(e) => setData('send_to_name', e.target.value)}
                        className="input"
                    />
                    <InputError message={errors.send_to_name}/>
                </div>

                <div className="grid gap-2">
                    <Label className="block font-semibold">Email</Label>
                    <Input
                        type="text"
                        required
                        value={data.send_to_email}
                        onChange={(e) => setData('send_to_email', e.target.value)}
                        className="input"
                    />
                    <InputError message={errors.send_to_email}/>
                </div>
                
                <div className="grid gap-2">
                    <Label className="block font-semibold">Kontak</Label>
                    <Input
                        type="text"
                        required
                        value={data.send_to_phone}
                        onChange={(e) => setData('send_to_phone', e.target.value)}
                        className="input"
                    />
                    <InputError message={errors.send_to_phone}/>
                </div>

                <div className="grid gap-2">
                    <Label className="block font-semibold">Pekerjaan</Label>
                    <select
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                    >
                        <option value="">-- Pilih Pekerjaan --</option>
                        {projects.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.project_id}/>
                </div>

                <div className="grid gap-2">
                    <Label className="block font-semibold">Kuesioner</Label>
                    <select
                        value={data.questionnaire_id}
                        onChange={(e) => setData('questionnaire_id', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                    >
                        <option value="">-- Pilih Kuesioner --</option>
                        {questionnaires.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.questionnaire_id}/>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Simpan
                </Button>
            </form>
        </AppLayout>
    );
}