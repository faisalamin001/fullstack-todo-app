import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    return (
      <div className='signin'>
        <img src={session.user.image} alt='user' width={50} />
        <p> Welcome, {session.user.name}!</p>
        <button className='out' onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className='signin'>
      <br />
      <button className='in' onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
