import SideBar from "../components/Admin/Sidebar/SideBar";
import AdminGuard from "../components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      {" "}
      <div className="flex bg-gray-50 min-h-screen">
        <SideBar />
        <main className="ml-60  pt-16 max-sm:ml-0 overflow-auto bg-gray-50 min-h-screen w-full">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
