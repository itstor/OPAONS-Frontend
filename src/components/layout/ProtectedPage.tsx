import Router from 'next/router';

import LoadingPage from '@/components/LoadingPage';

import { useAuth } from '@/context/AuthProvider';

export default function ProtectedPage({ children, allowedRoles = [] }: { children: JSX.Element; allowedRoles?: string[] }): JSX.Element {
  const auth = useAuth();
  const role = auth.user?.role;

  if ((!auth.isAuthenticated || !allowedRoles.includes(role ?? '')) && typeof window !== 'undefined') {
    Router.replace('/auth/login');
  }

  if (auth.isAuthenticated && !auth.loading) {
    if (allowedRoles.includes(role ?? '')) {
      return children;
    } else {
      Router.replace('/');
    }
  }

  return <LoadingPage />;
}
