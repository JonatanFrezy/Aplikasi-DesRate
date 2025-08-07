import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Terima kasih!</h1>
        <p className="text-gray-600 text-sm">
          Jawaban Anda telah berhasil dikirim. Kami sangat menghargai waktu dan partisipasi Anda.
        </p>
      </div>
    </div>
  );
}
