import { getDashboardData } from "@/app/actions/admin";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
 const data = await getDashboardData();

 return <DashboardClient initialData={data} />;
}
