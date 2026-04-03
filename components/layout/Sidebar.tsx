export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="font-bold text-lg mb-6">Hospital System</h2>

      <nav className="space-y-2">
        <a href="/nurse" className="block">Dashboard</a>
        <a href="/nurse/patients" className="block">Patients</a>
        <a href="/nurse/diet" className="block">Diet</a>
      </nav>
    </div>
  );
}