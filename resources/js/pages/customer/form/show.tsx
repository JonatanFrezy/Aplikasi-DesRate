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
    <div className="flex justify-center bg-[#f7f7fb] py-10 px-4 min-h-screen">
      <form
        onSubmit={submit}
        className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-8"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-6">
            <img src="/logo-desrate.png" alt="DesRate Logo" className="h-14" />
            <img src="/logo_desnet.png" alt="DesNet Logo" className="h-14" />
          </div>
          <p className="text-sm text-gray-500 mt-2">oleh PT DES Teknologi Informasi</p>
        </div>

        {/* Informasi Pekerjaan */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Pekerjaan</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Judul:</strong> {project.title}
            </p>
            <p className="text-gray-700">
              <strong>Nama PM:</strong> {project.pm_name}
            </p>
            <p className="text-gray-700">
              <strong>Anggota Tim:</strong> {project.team_members}
            </p>
          </div>
        </div>

        {/* Informasi Kuesioner */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Kuesioner: {questionnaire.title}
          </h2>
          <p className="text-sm text-gray-600">{questionnaire.description}</p>
        </div>

        {/* Pertanyaan */}
        <div className="space-y-6">
          {questionnaire.questions
            .sort((a, b) => a.order_number - b.order_number)
            .map((question, index) => (
              <div key={question.id}>
                <Label className="text-sm text-gray-700 font-medium">
                  {index + 1}. {question.text}
                  {Boolean(question.is_required) && <span className="text-red-600"> *</span>}
                </Label>

                {question.type === 'text' && (
                  <>
                    <Input
                      type="text"
                      className="mt-2 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-blue-500"
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
                      required={question.is_required}
                    />
                    <InputError
                      message={
                        (errors as Record<string, string>)[`response_details.${index}.answer_text`] ?? ''
                      }
                    />
                  </>
                )}

                {question.type === 'radio' && (
                  <>
                    <div className="mt-2 space-y-2">
                      {question.answer_options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between px-4 py-2 border rounded-xl hover:bg-gray-50"
                        >
                          <span className="text-sm text-gray-800">{option.label}</span>
                          <input
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
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
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
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
            Kirim Jawaban
          </Button>
        </div>
      </form>
    </div>
  );
}
