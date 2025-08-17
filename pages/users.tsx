import { useEffect, useState } from "react";
import Layout from "../components/Layout";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
      setName("");
      setEmail("");
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            👥 Gestión de Usuarios
          </h1>

          {/* Formulario */}
          <form
            onSubmit={addUser}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              ➕ Agregar
            </button>
          </form>

          {/* Estado de carga / error */}
          {loading ? (
            <p className="text-gray-500">⏳ Cargando usuarios...</p>
          ) : error ? (
            <p className="text-red-500">❌ {error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No hay usuarios registrados</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-50 border rounded-xl shadow-sm p-6 hover:shadow-md transition"
                >
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    {user.name || "Usuario sin nombre"}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-2">ID: {user.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
