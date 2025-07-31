
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ShoppingBag, BarChart } from "lucide-react";

export default function AdminPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Users"
                    value="1,254"
                    icon={<Users className="h-6 w-6 text-primary" />}
                    description="+20% from last month"
                />
                <StatCard 
                    title="Total Tenants"
                    value="32"
                    icon={<ShoppingBag className="h-6 w-6 text-primary" />}
                    description="+5 new this month"
                />
                 <StatCard 
                    title="Monthly Revenue"
                    value="$1,250"
                    icon={<BarChart className="h-6 w-6 text-primary" />}
                    description="Target: $2,000"
                />
            </div>
             <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>An overview of the latest events in the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Activity feed is under construction...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
