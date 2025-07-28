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
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.logo}>DESRATE</h1>
      </div>

      <div style={styles.right}>
        <Head title="Register" />
        <h2 style={styles.title}>Register</h2>
        <p style={styles.subtitle}>
       Register by entering your personal information.
        </p>

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
              type="text"
              placeholder="User name"
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
            Log in
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <TextLink href={route('login')}>Log in</TextLink>
        </p>
      </div>
    </div>
  );
}


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  left: {
    backgroundColor: '#1e57c3',
    color: 'white',
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  right: {
    width: '55%',
    padding: '60px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#777',
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
  },
  button: {
    marginTop: 16,
    padding: '12px',
      width: '100%',
    backgroundColor: '#1e57c3',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 4,
    cursor: 'pointer',
    border: 'none',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color: '#666',
  },
};
