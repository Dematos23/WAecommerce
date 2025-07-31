
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Check, X } from "lucide-react";

// Mock data for demonstration
const plans = [
    { id: 'plan_basic', name: 'Básico', price: 29, priceId: 'price_12345', features: { products: '100', customDomain: false, analytics: false } },
    { id: 'plan_prof', name: 'Profesional', price: 79, priceId: 'price_67890', features: { products: 'Unlimited', customDomain: true, analytics: true } },
    { id: 'plan_ent', name: 'Empresarial', price: 'Custom', priceId: 'price_abcde', features: { products: 'Unlimited', customDomain: true, analytics: true } },
];

export default function PlansPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Plan Management</h1>
                    <p className="text-muted-foreground">Manage the subscription plans offered to clients.</p>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Plan
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                     <CardDescription>A list of all subscription plans.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Plan Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>Custom Domain</TableHead>
                                <TableHead>Analytics</TableHead>
                                <TableHead>Stripe Price ID</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plans.map(plan => (
                                <TableRow key={plan.id}>
                                    <TableCell className="font-medium">{plan.name}</TableCell>
                                    <TableCell>{typeof plan.price === 'number' ? `$${plan.price}/mo` : plan.price}</TableCell>
                                    <TableCell>{plan.features.products}</TableCell>
                                    <TableCell>
                                        {plan.features.customDomain ? <Check className="text-green-500"/> : <X className="text-red-500" />}
                                    </TableCell>
                                     <TableCell>
                                        {plan.features.analytics ? <Check className="text-green-500"/> : <X className="text-red-500" />}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">{plan.priceId}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
