// pages/dashboard.tsx
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";

type Props = { user: { name?: string | null; email?: string | null; image?: string | null } };

export default function Dashboard({ user }: Props) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Hola {user?.name || user?.email}</p>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }
  return { props: { user: session.user } };
};
