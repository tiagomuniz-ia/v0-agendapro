"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Download, Printer, BarChart, PieChart, LineChart, ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function RelatoriosPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [period, setPeriod] = useState("month")

  return (
    <div className="container mx-auto p-4 pb-16 md:p-6 md:pb-6">
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Visualize estatísticas e dados da sua empresa</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mês</SelectItem>
            <SelectItem value="quarter">Este Trimestre</SelectItem>
            <SelectItem value="year">Este Ano</SelectItem>
            <SelectItem value="custom">Personalizado</SelectItem>
          </SelectContent>
        </Select>

        {period === "custom" && (
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start sm:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
            <span>até</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start sm:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <Tabs defaultValue="financeiro" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <ArrowUp className="h-6 w-6 text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Receitas</p>
                  <h3 className="text-2xl font-bold text-green-700">R$ 15.750,00</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <ArrowDown className="h-6 w-6 text-red-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Despesas</p>
                  <h3 className="text-2xl font-bold text-red-700">R$ 8.320,00</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LineChart className="h-6 w-6 text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Lucro</p>
                  <h3 className="text-2xl font-bold text-blue-700">R$ 7.430,00</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <BarChart className="h-6 w-6 text-purple-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
                  <h3 className="text-2xl font-bold text-purple-700">R$ 85,00</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receitas x Despesas</CardTitle>
                <CardDescription>Comparativo mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de barras será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Despesas</CardTitle>
                <CardDescription>Por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de pizza será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolução Financeira</CardTitle>
              <CardDescription>Receitas, despesas e lucro ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-gray-500">Gráfico de linha será exibido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agendamentos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <BarChart className="h-6 w-6 text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Agendamentos</p>
                  <h3 className="text-2xl font-bold text-blue-700">185</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <BarChart className="h-6 w-6 text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Concluídos</p>
                  <h3 className="text-2xl font-bold text-green-700">162</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <BarChart className="h-6 w-6 text-red-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cancelados</p>
                  <h3 className="text-2xl font-bold text-red-700">23</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <BarChart className="h-6 w-6 text-amber-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Taxa de Conversão</p>
                  <h3 className="text-2xl font-bold text-amber-700">87.5%</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos por Serviço</CardTitle>
                <CardDescription>Distribuição dos serviços mais procurados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de pizza será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agendamentos por Profissional</CardTitle>
                <CardDescription>Distribuição por profissional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de barras será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agendamentos ao Longo do Tempo</CardTitle>
              <CardDescription>Evolução mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-gray-500">Gráfico de linha será exibido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <BarChart className="h-6 w-6 text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
                  <h3 className="text-2xl font-bold text-blue-700">124</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <BarChart className="h-6 w-6 text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Novos Clientes</p>
                  <h3 className="text-2xl font-bold text-green-700">18</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <BarChart className="h-6 w-6 text-purple-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Taxa de Retenção</p>
                  <h3 className="text-2xl font-bold text-purple-700">78%</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clientes por Serviço</CardTitle>
                <CardDescription>Preferências de serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de pizza será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequência de Visitas</CardTitle>
                <CardDescription>Número de visitas por cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-gray-500">Gráfico de barras será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
