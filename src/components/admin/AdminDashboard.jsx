import { AdminDataProvider } from "./state/AdminDataContext";
import AdminLayout from "./layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminDataProvider>
      <AdminLayout />
    </AdminDataProvider>
  );
}
