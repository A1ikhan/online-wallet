import { useSelector } from 'react-redux';

export default function AuthStatus() {
  const auth = useSelector(state => state.auth);
  console.log("Current auth state:", auth);
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0 }}>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
}