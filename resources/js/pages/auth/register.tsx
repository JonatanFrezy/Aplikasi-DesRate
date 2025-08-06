import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <style>
        {`
          input::placeholder, select::placeholder {
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
          <Head title="Register" />
          <h2 style={styles.title}>Register</h2>
          <p style={styles.subtitle}>Register by entering your personal information.</p>

          <form onSubmit={submit} style={styles.form}>
            <div>
              <input
                style={styles.input}
                type="text"
                placeholder="Your Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                required
              />
              <InputError message={errors.name} />
            </div>

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
                placeholder="Type your password here"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                disabled={processing}
                required
              />
              <InputError message={errors.password} />
            </div>

            <div>
              <input
                style={styles.input}
                type="password"
                placeholder="Confirm password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                disabled={processing}
                required
              />
              <InputError message={errors.password_confirmation} />
            </div>

            <div>
              <select
                style={styles.input}
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
                disabled={processing}
                required
              >
                <option value="">Select Role</option>
                <option value="hod">Head of Department</option>
                <option value="admin">Admin</option>
              </select>
              <InputError message={errors.role} />
            </div>

            <button type="submit" style={styles.button} disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Register
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <TextLink href={route('login')} style={{ color: 'white' }}>
              Login
            </TextLink>
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
  button: {
    marginTop: 16,
    padding: '12px',
    width: '100%',
    backgroundColor: '#ffffff', // Tombol putih
    color: '#1e57c3', // Teks biru
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
