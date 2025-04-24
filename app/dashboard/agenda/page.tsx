"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Search, MoreHorizontal } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados de exemplo
const appointments = [
  {
    id: 1,
    client: "Maria Silva",
    service: "Corte de Cabelo",
    professional: "Carlos Oliveira",
    date: new Date(2025, 3, 23, 10, 0),
    duration: 60,
    status: "confirmado",
    color: "green",
  },
  {
    id: 2,
    client: "João Pereira",
    service: "Barba",
    professional: "Ana Santos",
    date: new Date(2025, 3, 23, 11, 30),
    duration: 30,
    status: "confirmado",
    color: "green",
  },
  {
    id: 3,
    client: "Fernanda Costa",
    service: "Manicure",
    professional: "Juliana Lima",
    date: new Date(2025, 3, 23, 14, 0),
    duration: 45,
    status: "pendente",
    color: "yellow",
  },
  {
    id: 4,
    client: "Roberto Alves",
    service: "Massagem",
    professional: "Pedro Souza",
    date: new Date(2025, 3, 24, 9, 0),
    duration: 90,
    status: "confirmado",
    color: "green",
  },
  {
    id: 5,
    client: "Camila Dias",
    service: "Coloração",
    professional: "Carlos Oliveira",
    date: new Date(2025, 3, 24, 13, 0),
    duration: 120,
    status: "confirmado",
    color: "green",
  },
  {
    id: 6,
    client: "Lucas Mendes",
    service: "Corte de Cabelo",
    professional: "Ana Santos",
    date: new Date(2025, 3, 25, 16, 0),
    duration: 60,
    status: "cancelado",
    color: "red",
  },
]

const professionals = [
  { id: 1, name: "Carlos Oliveira", role: "Cabeleireiro", avatar: "/placeholder.svg" },
  { id: 2, name: "Ana Santos", role: "Barbeira", avatar: "/placeholder.svg" },
  { id: 3, name: "Juliana Lima", role: "Manicure", avatar: "/placeholder.svg" },
  { id: 4, name: "Pedro Souza", role: "Massagista", avatar: "/placeholder.svg" },
]

const clients = [
  { id: 1, name: "Maria Silva", phone: "(11) 98765-4321", email: "maria@email.com", avatar: "/placeholder.svg" },
  { id: 2, name: "João Pereira", phone: "(11) 91234-5678", email: "joao@email.com", avatar: "/placeholder.svg" },
  { id: 3, name: "Fernanda Costa", phone: "(11) 99876-5432", email: "fernanda@email.com", avatar: "/placeholder.svg" },
  { id: 4, name: "Roberto Alves", phone: "(11) 92345-6789", email: "roberto@email.com", avatar: "/placeholder.svg" },
  { id: 5, name: "Camila Dias", phone: "(11) 93456-7890", email: "camila@email.com", avatar: "/placeholder.svg" },
  { id: 6, name: "Lucas Mendes", phone: "(11) 94567-8901", email: "lucas@email.com", avatar: "/placeholder.svg" },
]

const services = [
  { id: 1, name: "Corte de Cabelo", duration: 60, price: 70.0 },
  { id: 2, name: "Barba", duration: 30, price: 40.0 },
  { id: 3, name: "Manicure", duration: 45, price: 50.0 },
  { id: 4, name: "Massagem", duration: 90, price: 120.0 },
  { id: 5, name: "Coloração", duration: 120, price: 150.0 },
]

export default function AgendaPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }))
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 0 }),
  })

  const handlePrevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1))
  }

  const handleNextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1))
  }

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((appointment) => isSameDay(appointment.date, day))
  }

  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8) // 8:00 - 19:00

  return (
    <div className="container mx-auto p-4 pb-16 md:p-6 md:pb-6">
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600">Gerencie seus agendamentos, clientes e serviços</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>Preencha os dados para criar um novo agendamento.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    Cliente
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="service" className="text-right">
                    Serviço
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} - {service.duration}min - R${service.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="professional" className="text-right">
                    Profissional
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="professional">
                      <SelectValue placeholder="Selecione um profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id.toString()}>
                          {professional.name}
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
                        {format(selectedDate, "PPP", { locale: ptBR })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Horário
                  </Label>
                  <Select className="col-span-3">
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Observações
                  </Label>
                  <Textarea id="notes" className="col-span-3" placeholder="Observações adicionais" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Agendar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
        </TabsList>

        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-semibold">{format(weekStart, "MMMM yyyy", { locale: ptBR })}</h2>
                  <Button variant="outline" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={view === "day" ? "bg-blue-100" : ""}
                    onClick={() => setView("day")}
                  >
                    Dia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={view === "week" ? "bg-blue-100" : ""}
                    onClick={() => setView("week")}
                  >
                    Semana
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={view === "month" ? "bg-blue-100" : ""}
                    onClick={() => setView("month")}
                  >
                    Mês
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === "week" && (
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day) => (
                        <div key={day.toString()} className="text-center">
                          <div className="mb-2 font-medium">{format(day, "EEEE", { locale: ptBR })}</div>
                          <div
                            className={`rounded-full p-2 text-center ${
                              isSameDay(day, new Date()) ? "bg-blue-100 font-bold text-blue-700" : ""
                            }`}
                          >
                            {format(day, "d", { locale: ptBR })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {weekDays.map((day) => {
                        const dayAppointments = getAppointmentsForDay(day)
                        return (
                          <div key={day.toString()} className="min-h-[300px] rounded-md border p-2">
                            {dayAppointments.length === 0 ? (
                              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                Sem agendamentos
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {dayAppointments.map((appointment) => (
                                  <div
                                    key={appointment.id}
                                    className={`rounded-md p-2 ${
                                      appointment.status === "confirmado"
                                        ? "bg-green-100"
                                        : appointment.status === "pendente"
                                          ? "bg-yellow-100"
                                          : "bg-red-100"
                                    }`}
                                  >
                                    <div className="font-medium">
                                      {format(appointment.date, "HH:mm")} - {appointment.service}
                                    </div>
                                    <div className="text-sm">{appointment.client}</div>
                                    <div className="text-xs text-gray-500">{appointment.professional}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {view === "day" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(selectedDate, "PPP", { locale: ptBR })}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {timeSlots.map((hour) => {
                      const hourAppointments = appointments.filter(
                        (appointment) =>
                          isSameDay(appointment.date, selectedDate) && appointment.date.getHours() === hour,
                      )
                      return (
                        <div key={hour} className="flex border-t py-2">
                          <div className="w-16 text-right font-medium">{hour}:00</div>
                          <div className="ml-4 flex-1">
                            {hourAppointments.length === 0 ? (
                              <div className="h-12 rounded-md border border-dashed border-gray-200"></div>
                            ) : (
                              <div className="space-y-2">
                                {hourAppointments.map((appointment) => (
                                  <div
                                    key={appointment.id}
                                    className={`rounded-md p-2 ${
                                      appointment.status === "confirmado"
                                        ? "bg-green-100"
                                        : appointment.status === "pendente"
                                          ? "bg-yellow-100"
                                          : "bg-red-100"
                                    }`}
                                  >
                                    <div className="font-medium">
                                      {format(appointment.date, "HH:mm")} - {appointment.service}
                                    </div>
                                    <div className="text-sm">{appointment.client}</div>
                                    <div className="text-xs text-gray-500">{appointment.professional}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {view === "month" && (
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar clientes..." className="pl-8" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Nome</th>
                      <th className="px-4 py-3 text-left font-medium">Telefone</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Avatar className="mr-2 h-8 w-8">
                              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                              <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{client.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{client.phone}</td>
                        <td className="px-4 py-3">{client.email}</td>
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
                              <DropdownMenuItem>Agendar</DropdownMenuItem>
                              <DropdownMenuItem>Ver histórico</DropdownMenuItem>
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

        <TabsContent value="servicos" className="space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar serviços..." className="pl-8" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Serviço
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duração:</span>
                      <span>{service.duration} minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preço:</span>
                      <span className="font-medium">R$ {service.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
