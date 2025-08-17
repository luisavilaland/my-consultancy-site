import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">MyConsultancy</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/users"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            👥 Usuarios
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            📊 Reportes
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            ⚙️ Configuración
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Hola, Luis 👋</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
