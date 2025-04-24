import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, DollarSign, Users, Clock } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 pb-16 md:p-6 md:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao AgendaPro</h1>
        <p className="text-gray-600">Gerencie sua agenda e finanças em um só lugar</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CalendarCheck className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Agendamentos Hoje</p>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Receita do Dia</p>
              <h3 className="text-2xl font-bold text-gray-900">R$ 1.250,00</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
              <h3 className="text-2xl font-bold text-gray-900">124</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-6 w-6 text-amber-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Próximo Agendamento</p>
              <h3 className="text-lg font-bold text-gray-900">14:30 - Corte</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lembretes</CardTitle>
            <CardDescription>Seus próximos compromissos e tarefas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <CalendarCheck className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Reunião com fornecedores</p>
                  <p className="text-sm text-gray-500">Hoje, 15:00 - 16:00</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <DollarSign className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Pagamento de contas</p>
                  <p className="text-sm text-gray-500">Amanhã, vencimento</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Treinamento da equipe</p>
                  <p className="text-sm text-gray-500">Quinta-feira, 09:00 - 11:00</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
            <CardDescription>Visão geral das suas finanças</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-700" />
                  </div>
                  <span>Receitas do Mês</span>
                </div>
                <span className="font-bold text-green-600">R$ 15.750,00</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <DollarSign className="h-5 w-5 text-red-700" />
                  </div>
                  <span>Despesas do Mês</span>
                </div>
                <span className="font-bold text-red-600">R$ 8.320,00</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <DollarSign className="h-5 w-5 text-blue-700" />
                  </div>
                  <span className="font-medium">Saldo</span>
                </div>
                <span className="font-bold text-blue-700">R$ 7.430,00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
