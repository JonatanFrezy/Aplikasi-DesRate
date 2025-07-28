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
    response_details:
      questionnaire?.questions.map((q) => ({
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
    <div className="flex flex-1 justify-center bg-[#f7f7fb] py-10">
      <form onSubmit={submit} className="w-full max-w-3xl bg-white p-8 shadow rounded-2xl space-y-6">
        {/* Informasi Project */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Informasi Pekerjaan</h2>
          <div className="text-sm space-y-1">
            <p><strong>Judul:</strong> {project.title}</p>
            <p><strong>Nama PM:</strong> {project.pm_name}</p>
            <p><strong>Anggota Tim:</strong> {project.team_members}</p>
          </div>
        </section>

        {/* Informasi Kuesioner */}
        <section>
          <h2 className="text-xl font-semibold">Kuesioner: {questionnaire.title}</h2>
          <p className="text-sm text-gray-600">{questionnaire.description}</p>
        </section>

        {/* Form Pertanyaan */}
        <section className="space-y-6">
          {questionnaire.questions
            .sort((a, b) => a.order_number - b.order_number)
            .map((question, index) => (
              <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-2 shadow-sm" key={question.id}>
                <Label className="font-medium text-sm block mb-1">
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
                      className="rounded-xl"
                    />
                    <InputError
                      message={
                        (errors as Record<string, string>)[
                          `response_details.${index}.answer_text`
                        ] ?? ''
                      }
                    />
                  </>
                )}

                {question.type === 'radio' && (
                  <>
                    <div className="space-y-1">
                      {question.answer_options.map((option) => (
                        <div key={option.id} className="flex items-center gap-2">
                          <Input
                            className="form-check-input"
                            type="radio"
                            name={`question_${question.id}`}
                            id={`option_${option.id}`}
                            value={option.id}
                            required={question.is_required}
                            checked={
                              data.response_details[index]?.selected_option_id === option.id
                            }
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
                          <Label className="text-sm" htmlFor={`option_${option.id}`}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <InputError
                      message={
                        (errors as Record<string, string>)[
                          `response_details.${index}.selected_option_id`
                        ] ?? ''
                      }
                    />
                  </>
                )}
              </div>
            ))}
        </section>

        {/* Tombol Kirim */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Kirim Jawaban
          </Button>
        </div>
      </form>
    </div>
  );
}
