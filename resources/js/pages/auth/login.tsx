import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      {/* Tambahkan global style untuk placeholder */}
      <style>
        {`
          input::placeholder {
            color: white;
            opacity: 1;
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.leftContent}>
            <img
              src="/logo-desrate.png"
              alt="Logo DESRATE"
              style={styles.logoImage}
            />
            <p style={styles.byText}>oleh PT. DES Teknologi Informasi</p>
          </div>
        </div>

        <div style={styles.right}>
          <Head title="Log in" />
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Enter your email and password below to log in</p>

          {status && <div style={styles.status}>{status}</div>}

          <form onSubmit={submit} style={styles.form}>
            <div>
              <input
                style={styles.input}
                type="email"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled={processing}
                required
              />
              <InputError message={errors.email} />
            </div>

            <div>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                disabled={processing}
                required
              />
              <InputError message={errors.password} />
            </div>

            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={data.remember}
                onChange={() => setData('remember', !data.remember)}
                disabled={processing}
              />
              <label htmlFor="remember" style={{ color: 'white' }}>Remember me</label>
              {canResetPassword && (
                <TextLink href={route('password.request')} style={{ marginLeft: 'auto', fontSize: 14, color: 'white' }}>
                  Forgot password?
                </TextLink>
              )}
            </div>

            <button type="submit" style={styles.button} disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Log in
            </button>
          </form>

          <p style={styles.loginText}>
            Don't have an account?{' '}
            <TextLink href={route('register')} style={{ color: 'white' }}>Sign up</TextLink>
          </p>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  left: {
    backgroundColor: '#ffffff', // Putih
    color: '#1e57c3',
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
  byText: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: 'normal',
    color: '#1e57c3',
  },
  right: {
    width: '55%',
    padding: '60px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#1e57c3', // Biru
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  subtitle: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 24,
  },
  status: {
    color: 'lightgreen',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    padding: '12px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
  },
  button: {
    marginTop: 16,
    padding: '12px',
    width: '100%',
    backgroundColor: '#ffffff', // Tombol putih
    color: '#1e57c3', // Teks tombol biru
    fontWeight: 'bold',
    borderRadius: 4,
    cursor: 'pointer',
    border: 'none',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color: '#e0e0e0',
  },
};
