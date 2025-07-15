import { Head, useForm } from '@inertiajs/react';
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

interface CreateQuestionnaireProps {
    questions: Question[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kuesioner',
    href: '/questionnaires',
  },
  {
    title: 'Tambah',
    href: '/questionnaires/create',
  },
];

export default function CreateQuestionnaire({ questions }: CreateQuestionnaireProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        questions: [
        {
            text: '',
            type: 'text',
            order_number: 1,
            is_required: false,
            options: [''], 
        },
        ],
    });

    const addQuestion = () => {
    setData('questions', [
        ...data.questions,
        {
            text: '',
            type: 'text',
            order_number: data.questions.length + 1,
            is_required: false,
            options: [''],
        },
        ]);
    };

    const removeQuestion = (index: number) => {
        const updated = [...data.questions];
        updated.splice(index, 1);
        setData('questions', updated);
    };

    const updateQuestion = <K extends keyof Question>(
    index: number,
    key: K,
    value: Question[K]
    ) => {
    const updated = [...data.questions];
    updated[index] = {
        ...updated[index],
        [key]: value,
    };

        // Reset options if type changed to 'text'
        if (key === 'type' && (value === 'text')) {
        updated[index].options = [''];
        }

        setData('questions', updated);
    };

        const addOption = (qIndex: number) => {
        const updated = [...data.questions];
        updated[qIndex].options.push('');
        setData('questions', updated);
    };

    const updateOption = (qIndex: number, oIndex: number, value: string) => {
        const updated = [...data.questions];
        updated[qIndex].options[oIndex] = value;
        setData('questions', updated);
    };

    const removeOption = (qIndex: number, oIndex: number) => {
        const updated = [...data.questions];
        updated[qIndex].options.splice(oIndex, 1);
        setData('questions', updated);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/questionnaires'); 
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kuesioner" />

            <h1 className="text-2xl font-bold my-3 mx-3">Tambah Kuesioner</h1>

            <form onSubmit={submit} className="space-y-4 max-w-xl mx-3">
                <div className="grid gap-2">
                    <Label className="block font-semibold">Judul Kuesioner</Label>
                    <Input
                        type="text"
                        required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="input"
                    />
                    <InputError message={errors.title}/>
                </div>

                <div className="grid gap-2">
                    <Label className="block font-semibold">Deskripsi</Label>
                    <textarea
                        required
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                    />
                    <InputError message={errors.description}/>
                </div>
                {data.questions.map((q, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3 relative">
                        <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                        <Trash size={18} />
                        </button>

                        <div>
                        <Label>Pertanyaan</Label>
                        <Input
                            value={q.text}
                            onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                            required
                        />
                    </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Jenis</Label>
                        <select
                        value={q.type}
                        onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                        className="input w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                        >
                        <option value="text">Text</option>
                        <option value="radio">Radio</option>
                        </select>
                    </div>

                    <div>
                        <Label>Urutan</Label>
                        <Input
                        type="number"
                        value={q.order_number}
                        onChange={(e) => updateQuestion(index, 'order_number', Number(e.target.value))}
                        required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={q.is_required}
                        onCheckedChange={(checked) => updateQuestion(index, 'is_required', !!checked)}
                        id={`required-${index}`}
                    />
                    <Label htmlFor={`required-${index}`}>Wajib Diisi?</Label>
                    </div>

                    {(q.type === 'radio') && (
                    <div className="space-y-2">
                        <Label>Opsi Jawaban</Label>
                        {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex gap-2">
                            <Input
                            value={opt}
                            onChange={(e) => updateOption(index, oIndex, e.target.value)}
                            className="w-full"
                            />
                            <button
                            type="button"
                            onClick={() => removeOption(index, oIndex)}
                            className="text-red-600 hover:text-red-800"
                            >
                            <Trash size={18} />
                            </button>
                        </div>
                        ))}
                        <Button
                        type="button"
                        variant="outline"
                        onClick={() => addOption(index)}
                        size="sm"
                        >
                        <PlusCircle size={16} className="mr-2" />
                        Tambah Opsi
                        </Button>
                    </div>
                    )}
                </div>
                ))}
                <div className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addQuestion}
                        className="w-full"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tambah Pertanyaan
                    </Button>
                </div>
                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Simpan
                </Button>
            </form>
        </AppLayout>
    );
}
