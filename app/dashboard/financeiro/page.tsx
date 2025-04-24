"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Plus, Search, ArrowUp, ArrowDown, MoreHorizontal, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Componentes carregados dinamicamente
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ 
  default: mod.Card,
  CardContent: mod.CardContent,
  CardDescription: mod.CardDescription,
  CardFooter: mod.CardFooter,
  CardHeader: mod.CardHeader,
  CardTitle: mod.CardTitle
})), {
  loading: () => <div className="h-[200px] w-full animate-pulse bg-muted rounded-lg" />
})

const Dialog = dynamic(() => import('@/components/ui/dialog').then(mod => ({
  Dialog: mod.Dialog,
  DialogContent: mod.DialogContent,
  DialogDescription: mod.DialogDescription,
  DialogFooter: mod.DialogFooter,
  DialogHeader: mod.DialogHeader,
  DialogTitle: mod.DialogTitle,
  DialogTrigger: mod.DialogTrigger
})), {
  ssr: false
})

const Calendar = dynamic(() => import('@/components/ui/calendar').then(mod => mod.Calendar), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full animate-pulse bg-muted" />
})

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo
const transactions = [
  {
    id: 1,
    date: new Date(2025, 3, 23),
    description: "Pagamento - Maria Silva",
    category: "Serviços",
    type: "entrada",
    amount: 120.0,
    status: "concluído",
  },
  {
    id: 2,
    date: new Date(2025, 3, 23),
    description: "Pagamento - João Pereira",
    category: "Serviços",
    type: "entrada",
    amount: 70.0,
    status: "concluído",
  },
  {
    id: 3,
    date: new Date(2025, 3, 24),
    description: "Fornecedor de produtos",
    category: "Produtos",
    type: "saida",
    amount: 350.0,
    status: "concluído",
  },
  {
    id: 4,
    date: new Date(2025, 3, 25),
    description: "Aluguel",
    category: "Despesas Fixas",
    type: "saida",
    amount: 1200.0,
    status: "pendente",
  },
  {
    id: 5,
    date: new Date(2025, 3, 26),
    description: "Pagamento - Fernanda Costa",
    category: "Serviços",
    type: "entrada",
    amount: 95.0,
    status: "concluído",
  },
  {
    id: 6,
    date: new Date(2025, 3, 27),
    description: "Conta de luz",
    category: "Despesas Fixas",
    type: "saida",
    amount: 180.0,
    status: "pendente",
  },
]

const categories = [
  { id: 1, name: "Serviços", type: "entrada" },
  { id: 2, name: "Produtos", type: "entrada" },
  { id: 3, name: "Despesas Fixas", type: "saida" },
  { id: 4, name: "Materiais", type: "saida" },
  { id: 5, name: "Salários", type: "saida" },
  { id: 6, name: "Outros", type: "ambos" },
]

const accounts = [
  { id: 1, name: "Conta Corrente", balance: 5280.45 },
  { id: 2, name: "Poupança", balance: 12500.0 },
  { id: 3, name: "Caixa", balance: 1850.75 },
]

export default function FinanceiroPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<"entrada" | "saida">("entrada")

  // Cálculos financeiros
  const totalReceitas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalDespesas = transactions
    .filter((t) => t.type === "saida")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const saldo = totalReceitas - totalDespesas

  return (
    <div className="container mx-auto p-4 pb-16 md:p-6 md:pb-6">
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Gerencie suas receitas, despesas e fluxo de caixa</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
                <DialogDescription>Registre uma nova entrada ou saída financeira.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Button
                      type="button"
                      variant={transactionType === "entrada" ? "default" : "outline"}
                      className={`w-full ${transactionType === "entrada" ? "bg-green-600 hover:bg-green-700" : ""}`}
                      onClick={() => setTransactionType("entrada")}
                    >
                      <ArrowUp className="mr-2 h-4 w-4" />
                      Entrada
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant={transactionType === "saida" ? "default" : "outline"}
                      className={`w-full ${transactionType === "saida" ? "bg-red-600 hover:bg-red-700" : ""}`}
                      onClick={() => setTransactionType("saida")}
                    >
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Saída
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Input id="description" className="col-span-3" placeholder="Descrição da transação" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Valor (R$)
                  </Label>
                  <Input id="amount" type="number" step="0.01" className="col-span-3" placeholder="0,00" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoria
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat.type === transactionType || cat.type === "ambos")
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account" className="text-right">
                    Conta
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="account">
                      <SelectValue placeholder="Selecione uma conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="col-span-3 justify-start text-left font-normal" id="date">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(date, "PPP", { locale: ptBR })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Observações
                  </Label>
                  <Textarea id="notes" className="col-span-3" placeholder="Observações adicionais" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewTransactionOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={
                    transactionType === "entrada" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <ArrowUp className="h-6 w-6 text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Receitas</p>
              <h3 className="text-2xl font-bold text-green-700">R$ {totalReceitas.toFixed(2)}</h3>
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
              <h3 className="text-2xl font-bold text-red-700">R$ {totalDespesas.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CalendarIcon className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Saldo</p>
              <h3 className={`text-2xl font-bold ${saldo >= 0 ? "text-blue-700" : "text-red-700"}`}>
                R$ {saldo.toFixed(2)}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transacoes" className="mt-6 w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="contas">Contas</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="pagar-receber">Contas a Pagar/Receber</TabsTrigger>
        </TabsList>

        <TabsContent value="transacoes" className="space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-1 flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar transações..." className="pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="expense">Despesas</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start sm:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Período</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Exportar</span>
              </Button>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
                <span className="sr-only">Imprimir</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Descrição</th>
                      <th className="px-4 py-3 text-left font-medium">Categoria</th>
                      <th className="px-4 py-3 text-left font-medium">Valor</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="px-4 py-3">{format(transaction.date, "dd/MM/yyyy")}</td>
                        <td className="px-4 py-3">{transaction.description}</td>
                        <td className="px-4 py-3">{transaction.category}</td>
                        <td
                          className={`px-4 py-3 font-medium ${transaction.type === "entrada" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "entrada" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={transaction.status === "concluído" ? "default" : "outline"}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Ações</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Duplicar</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contas" className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {account.balance.toFixed(2)}</div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Extrato
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fluxo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
              <CardDescription>Visualize o fluxo de entradas e saídas ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <p className="text-center text-gray-500">Gráfico de fluxo de caixa será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagar-receber" className="space-y-4">
          <Tabs defaultValue="pagar">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="pagar" className="flex-1">
                Contas a Pagar
              </TabsTrigger>
              <TabsTrigger value="receber" className="flex-1">
                Contas a Receber
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pagar" className="space-y-4">
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Conta a Pagar
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Vencimento</th>
                          <th className="px-4 py-3 text-left font-medium">Descrição</th>
                          <th className="px-4 py-3 text-left font-medium">Valor</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">25/04/2025</td>
                          <td className="px-4 py-3">Aluguel</td>
                          <td className="px-4 py-3 font-medium text-red-600">R$ 1.200,00</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">Pendente</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm">
                              Pagar
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">27/04/2025</td>
                          <td className="px-4 py-3">Conta de luz</td>
                          <td className="px-4 py-3 font-medium text-red-600">R$ 180,00</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">Pendente</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm">
                              Pagar
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receber" className="space-y-4">
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Conta a Receber
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Vencimento</th>
                          <th className="px-4 py-3 text-left font-medium">Cliente</th>
                          <th className="px-4 py-3 text-left font-medium">Descrição</th>
                          <th className="px-4 py-3 text-left font-medium">Valor</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">30/04/2025</td>
                          <td className="px-4 py-3">Roberto Alves</td>
                          <td className="px-4 py-3">Serviços de massagem</td>
                          <td className="px-4 py-3 font-medium text-green-600">R$ 120,00</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">Pendente</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm">
                              Receber
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
