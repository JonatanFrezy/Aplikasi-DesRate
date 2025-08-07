import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    return (
    <div style={styles.container}>
      <Head title="Welcome" />

      <div style={styles.left}>
        <div style={styles.leftContent}>
          <img
            src="/logo-desrate.png"
            alt="Logo DESRATE"
            style={styles.logoImage}
          />
          <p style={styles.byText}>Selamat Datang di DesRate</p>
          <p style={styles.byText}>Platform Rating oleh PT. DES Teknologi Informasi</p>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.buttonGroup}>
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
            <Link
                href={route('dashboard')}
                style={styles.button}
            >
                Dashboard
            </Link>
            ) : (
            <>
            <Link
                href={route('login')}
                style={styles.button}
            >
                Log in
            </Link>
            <Link
                href={route('register')}
                style={styles.button}
            >
                Register
            </Link>
            </>
            )}
          </nav>
        </div>
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  button: {
    marginTop: 16,
    padding: '12px',
    width: '100%',
    color: '#ffffff', // Teks tombol biru
    fontWeight: 'bold',
    borderRadius: 4,
    cursor: 'pointer',
    border: '2px solid #ffffff',
    textAlign: 'center',
    display: 'block', // Untuk memastikan block-level element
    backgroundColor: 'transparent', // Jika ingin transparan
    textDecoration: 'none', // Hilangkan underline
  },
};