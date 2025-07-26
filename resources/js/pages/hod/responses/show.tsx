import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Response } from '@/types';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface ShowResponseProps {
    response: Response;
}

export default function ShowResponse({ response }: ShowResponseProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Jawaban', href: '/hod/responses' },
        { title: `Detail: ${response.id}`, href: `/hod/responses/${response.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Jawaban #${response.id}`} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
                <h1 className="text-2xl font-bold my-3 mx-3">Detail Jawaban</h1>
                <a
                    href={`/hod/responses/${response.id}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    >
                    <Download className="w-5 h-5" />
                </a>
            </div>

            <div className="space-y-6 mx-3">
                <Card>
                    <CardContent className="py-4 space-y-2">
                        <h2 className="text-xl font-semibold">Informasi Reviewer</h2>
                        <p><strong>Nama Pengisi:</strong> {response.rating_link?.send_to_name}</p>
                        <p><strong>Email:</strong> {response.rating_link?.send_to_email}</p>
                        <p><strong>Kontak:</strong> {response.rating_link?.send_to_phone}</p>
                        <p><strong>Tanggal Submit:</strong> {new Date(response.submitted_at).toLocaleString()}</p>
                        <p><strong>Rata-rata Nilai:</strong> {response.average_rating ?? '-'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-4 space-y-2">
                        <h2 className="text-xl font-semibold">Informasi Pekerjaan</h2>
                        <p><strong>Pekerjaan:</strong> {response.project?.title}</p>
                        <p><strong>PM:</strong> {response.project?.pm_name}</p>
                        <p><strong>Angota Tim:</strong> {response.project?.team_members}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-4 space-y-4">
                        <h2 className="text-xl font-semibold">Informasi Kuesioner</h2>
                        <p><strong>Kuesioner:</strong> {response.questionnaire?.title}</p>
                        <p><strong>Deskripsi:</strong> {response.questionnaire?.description}</p>
                        <p><strong>Pertanyaan:</strong></p>
                        {[...response.response_details]
                        .sort((a, b) => (a.question?.order_number ?? 0) - (b.question?.order_number ?? 0))
                        .map((detail, index) => (
                            <div key={detail.id} className="border p-4 rounded-md space-y-2">
                                {detail.question ? (
                                    <>
                                        <Label className="font-semibold">
                                            {index + 1}. {detail.question.text}
                                            {Boolean(detail.question.is_required) && (
                                                <span className="text-red-600"> *</span>
                                            )}
                                        </Label>

                                        {detail.answer_option ? (
                                            <div className="space-y-1">
                                                {detail.question.answer_options?.map((opt) => (
                                                    <div
                                                        key={opt.id}
                                                        className={`flex items-center gap-2 ${
                                                            opt.id === detail.selected_option_id ? 'text-blue-600 font-semibold' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-4 h-4 rounded-full border ${
                                                                opt.id === detail.selected_option_id ? 'bg-blue-600' : 'bg-white'
                                                            }`}
                                                        ></div>
                                                        <span>{opt.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-800 bg-gray-50 border rounded-md p-2">
                                                {detail.answer_text || '-'}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-sm text-red-500">Pertanyaan tidak tersedia</p>
                                )}
                            </div>
                    ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 
