import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FormEventHandler } from 'react';
import type { Question } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle, PlusCircle, Trash } from 'lucide-react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kuesioner',
    href: '/admin/questionnaires',
  },
  {
    title: 'Tambah',
    href: '/admin/questionnaires/create',
  },
];

export default function CreateQuestionnaire() {
  const { data, setData, processing, errors } = useForm({
    title: '',
    description: '',
    questions: [
      {
        text: '',
        type: 'text',
        order_number: 1,
        is_required: false,
        answer_options: [{ value: 1, label: '' }],
      },
    ],
  });

  const addQuestion = (afterIndex: number) => {
    const updated = [...data.questions];
    updated.splice(afterIndex + 1, 0, {
      text: '',
      type: 'text',
      order_number: 0,
      is_required: false,
      answer_options: [{ value: 1, label: '' }],
    });
    const reordered = updated.map((q, idx) => ({ ...q, order_number: idx + 1 }));
    setData('questions', reordered);
  };

  const removeQuestion = (index: number) => {
    const updated = [...data.questions];
    updated.splice(index, 1);
    setData('questions', updated);
  };

  const updateQuestion = <K extends keyof Question>(index: number, key: K, value: Question[K]) => {
    const updated = [...data.questions];
    updated[index] = { ...updated[index], [key]: value };
    if (key === 'type' && value === 'text') {
      updated[index].answer_options = [{ value: 1, label: '' }];
    }
    setData('questions', updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...data.questions];
    updated[qIndex].answer_options.push({ value: updated[qIndex].answer_options.length + 1, label: '' });
    setData('questions', updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...data.questions];
    updated[qIndex].answer_options[oIndex].label = value;
    setData('questions', updated);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updated = [...data.questions];
    updated[qIndex].answer_options.splice(oIndex, 1);
    setData('questions', updated);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const cleanedQuestions = data.questions.map((q) => ({
      ...q,
      answer_options: q.type === 'radio' ? q.answer_options : [],
    }));
    const formData = { ...data, questions: cleanedQuestions };
    router.post('/admin/questionnaires', formData);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Kuesioner" />
      
      <div className="flex flex-1 justify-center bg-[#f7f7fb] py-10">
        <form onSubmit={submit} className="w-full max-w-4xl bg-white p-8 shadow rounded-2xl space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Link Rating</h2>
          <div>
            <Label className="font-semibold text-base mb-1 block">Judul Kuesioner</Label>
            <Input
              placeholder="Input Judul"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="rounded-xl"
            />
            <InputError message={errors.title} />
          </div>

          <div>
            <Label className="font-semibold text-base mb-1 block">Deskripsi</Label>
            <textarea
              placeholder="Deskripsi Kuesioner"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="rounded-xl border w-full p-3 text-sm min-h-[100px]"
            />
            <InputError message={errors.description} />
          </div>

          {data.questions.map((q, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-6 bg-white space-y-4 relative shadow-sm">
              <button type="button" onClick={() => removeQuestion(index)} className="absolute top-3 right-3 text-red-600 hover:text-red-800">
                <Trash size={18} />
              </button>

              <div>
                <Label className="font-semibold text-sm mb-1 block">Pertanyaan</Label>
                <Input
                  placeholder="Tuliskan pertanyaan"
                  value={q.text}
                  onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold text-sm mb-1 block">Jenis</Label>
                  <select
                    value={q.type}
                    onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                    className="rounded-xl w-full border px-3 py-2 text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                  </select>
                </div>

                <div>
                  <Label className="font-semibold text-sm mb-1 block">Urutan</Label>
                  <Input
                    type="number"
                    value={q.order_number}
                    onChange={(e) => updateQuestion(index, 'order_number', Number(e.target.value))}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={q.is_required}
                  onCheckedChange={(checked) => updateQuestion(index, 'is_required', !!checked)}
                  id={`required-${index}`}
                />
                <Label htmlFor={`required-${index}`}>Wajib Diisi?</Label>
              </div>

              {q.type === 'radio' && (
                <div className="space-y-2">
                  <Label className="font-semibold text-sm mb-1 block">Opsi Jawaban</Label>
                  {q.answer_options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex gap-2 items-center">
                      <Input
                        type="number"
                        value={opt.value}
                        onChange={(e) => {
                          const updated = [...data.questions];
                          updated[index].answer_options[oIndex].value = Number(e.target.value);
                          setData('questions', updated);
                        }}
                        className="w-1/4 rounded-xl"
                      />
                      <Input
                        value={opt.label}
                        onChange={(e) => updateOption(index, oIndex, e.target.value)}
                        className="w-3/4 rounded-xl"
                      />
                      <button type="button" onClick={() => removeOption(index, oIndex)} className="text-red-600 hover:text-red-800">
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addOption(index)}
                    className="rounded-full text-sm mt-2"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Tambah Opsi
                  </Button>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => addQuestion(index)}
                className="w-full rounded-full mt-4"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Tambah Pertanyaan
              </Button>
            </div>
          ))}

          <div className="flex justify-end pt-8">
            <Button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
            >
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
