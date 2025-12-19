import { Button } from "@essencia/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@essencia/ui/components/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-900 mb-4">
            Colégio Essência Feliz
          </h1>
          <p className="text-lg text-muted-foreground">
            Portal Digital - Bem-vindo!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Acesso ao Portal</CardTitle>
              <CardDescription>
                Faça login para acessar o portal do aluno, professor ou
                responsável
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button className="w-full">Entrar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Administração</CardTitle>
              <CardDescription>
                Acesso exclusivo para administradores do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href="http://localhost:3002">
                <Button variant="outline" className="w-full">
                  Painel Admin
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
