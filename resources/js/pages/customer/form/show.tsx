import { useForm } from '@inertiajs/react';
import type { RatingLink } from '@/types';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface CreateRatingFormProps {
    rating_link: RatingLink; 
}

export default function RatingForm({ rating_link }: CreateRatingFormProps) {
    const { project, questionnaire } = rating_link;

    const { data, setData, post, processing, errors } = useForm<{
        response_details: {
            answer_text: string | null;
            selected_option_id: number | null;
            question_id: number;
        }[];
    }>({
        response_details: questionnaire?.questions.map((q) => ({
            answer_text: null,
            selected_option_id: null,
            question_id: q.id,
        })) ?? [], 
    });
    if (!project || !questionnaire) {
        return <div className="container my-4">Memuat data...</div>;
    }


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/rating/${rating_link.token}`);
    };

    return (
        <div className="container my-4">
            {/* Informasi Project */}
            <section className="mb-5">
                <h2 className="text-2xl font-bold mb-2">Informasi Pekerjaan</h2>
                <p><strong>Judul:</strong> {project.title}</p>
                <p><strong>Nama PM:</strong> {project.pm_name}</p>
                <p><strong>Anggota Tim:</strong> {project.team_members}</p>
            </section>

            {/* Informasi Kuesioner */}
            <section className="mb-5">
                <h2 className="text-xl font-semibold">Kuesioner: {questionnaire.title}</h2>
                <p className="text-muted">{questionnaire.description}</p>
            </section>

            {/* Form Pertanyaan */}
            <form onSubmit={submit}>
                {questionnaire.questions
                    .sort((a, b) => a.order_number - b.order_number)
                    .map((question, index) => (
                        <div className="mb-4" key={question.id}>
                            <Label className="form-label font-medium block mb-1">
                                {index + 1}. {question.text}
                                {Boolean(question.is_required) && (
                                    <span className="text-red-600"> *</span>
                                )}
                            </Label>

                            {question.type === 'text' && (
                                <>
                                    <Input
                                    type="text"
                                    name={`question_${question.id}`}
                                    required={question.is_required}
                                    value={data.response_details[index]?.answer_text ?? ''}
                                    onChange={(e) => {
                                        const newResponses = [...data.response_details];
                                        newResponses[index] = {
                                        ...newResponses[index],
                                        answer_text: e.target.value,
                                        selected_option_id: null,
                                        };
                                        setData('response_details', newResponses);
                                    }}
                                    />
                                    <InputError message={(errors as Record<string, string>)[`response_details.${index}.answer_text`] ?? ''} />
                                </>
                            )}

                            {question.type === 'radio' && (
                                <>
                                    {question.answer_options.map((option) => (
                                        <div className="form-check" key={option.id}>
                                            <Input
                                            className="form-check-input"
                                            type="radio"
                                            name={`question_${question.id}`}
                                            id={`option_${option.id}`}
                                            value={option.id}
                                            required={question.is_required}
                                            checked={data.response_details[index]?.selected_option_id === option.id}
                                            onChange={() => {
                                                const newResponses = [...data.response_details];
                                                newResponses[index] = {
                                                ...newResponses[index],
                                                selected_option_id: option.id,
                                                answer_text: null,
                                                };
                                                setData('response_details', newResponses);
                                            }}
                                            />
                                            <Label className="form-check-label" htmlFor={`option_${option.id}`}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                    <InputError message={(errors as Record<string, string>)[`response_details.${index}.selected_option_id`] ?? ''} />
                                </>
                            )}
                        </div>
                    ))}

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Kirim Jawaban
                </Button>
            </form>
        </div>
    );
}
