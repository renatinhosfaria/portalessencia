import { Button } from "@essencia/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@essencia/ui/components/card";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-brand-700">
            Admin - Colégio Essência Feliz
          </h1>
          <Button variant="outline" size="sm">
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>Gerenciar usuários do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">0</p>
              <p className="text-sm text-muted-foreground">usuários ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alunos</CardTitle>
              <CardDescription>Total de alunos matriculados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">0</p>
              <p className="text-sm text-muted-foreground">alunos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professores</CardTitle>
              <CardDescription>Corpo docente ativo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">0</p>
              <p className="text-sm text-muted-foreground">professores</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
