import { GetServerSidePropsContext } from 'next';

export default function getSession(context: GetServerSidePropsContext) {
  const { refresh_token, access_token, role } = context.req.cookies;

  return { isAuthenticated: !!refresh_token && !!access_token && !!role, role };
}
