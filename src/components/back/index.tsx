import { useNavigate } from 'react-router-dom';
import styles from './back.module.css';

export function Back() {
  const navigate = useNavigate();
  return (
    <div className={styles.back} onClick={() => navigate(-1)}>
      <p>{'<'} back</p>
    </div>
  );
}
