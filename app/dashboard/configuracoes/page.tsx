"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Globe, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ConfiguracoesPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 pb-16 md:p-6 md:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações da sua conta e preferências</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-5">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Alterar Foto
                  </Button>
                </div>
                <div className="w-full space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" defaultValue="Usuário Demo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input id="sobrenome" placeholder="Seu sobrenome" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" defaultValue="usuario@demo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea id="bio" placeholder="Conte um pouco sobre você" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="empresa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Atualize as informações da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-2">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Logo da Empresa
                  </Button>
                </div>
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                    <Input id="nome-empresa" placeholder="Nome da sua empresa" defaultValue="AgendaPro Demo" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone-empresa">Telefone</Label>
                      <Input id="telefone-empresa" placeholder="(00) 0000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Rua, número" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="Sua cidade" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select>
                        <SelectTrigger id="estado">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac">Acre</SelectItem>
                          <SelectItem value="al">Alagoas</SelectItem>
                          <SelectItem value="ap">Amapá</SelectItem>
                          <SelectItem value="am">Amazonas</SelectItem>
                          <SelectItem value="ba">Bahia</SelectItem>
                          <SelectItem value="ce">Ceará</SelectItem>
                          <SelectItem value="df">Distrito Federal</SelectItem>
                          <SelectItem value="es">Espírito Santo</SelectItem>
                          <SelectItem value="go">Goiás</SelectItem>
                          <SelectItem value="ma">Maranhão</SelectItem>
                          <SelectItem value="mt">Mato Grosso</SelectItem>
                          <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="pa">Pará</SelectItem>
                          <SelectItem value="pb">Paraíba</SelectItem>
                          <SelectItem value="pr">Paraná</SelectItem>
                          <SelectItem value="pe">Pernambuco</SelectItem>
                          <SelectItem value="pi">Piauí</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro</SelectItem>
                          <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                          <SelectItem value="ro">Rondônia</SelectItem>
                          <SelectItem value="rr">Roraima</SelectItem>
                          <SelectItem value="sc">Santa Catarina</SelectItem>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="se">Sergipe</SelectItem>
                          <SelectItem value="to">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>Configure os horários de funcionamento da sua empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Segunda-feira",
                  "Terça-feira",
                  "Quarta-feira",
                  "Quinta-feira",
                  "Sexta-feira",
                  "Sábado",
                  "Domingo",
                ].map((day, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-2">
                      <Switch id={`day-${index}`} defaultChecked={index < 6} />
                      <Label htmlFor={`day-${index}`}>{day}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue={index < 6 ? "08:00" : ""}>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Início" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>às</span>
                      <Select defaultValue={index < 6 ? "18:00" : ""}>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Fim" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pagamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>Gerencie os métodos de pagamento aceitos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Cartão de Crédito/Débito</p>
                      <p className="text-sm text-gray-500">Aceitar pagamentos com cartão</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Pix</p>
                      <p className="text-sm text-gray-500">Aceitar pagamentos via Pix</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Dinheiro</p>
                      <p className="text-sm text-gray-500">Aceitar pagamentos em dinheiro</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Boleto Bancário</p>
                      <p className="text-sm text-gray-500">Aceitar pagamentos via boleto</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados Bancários</CardTitle>
              <CardDescription>Configure suas informações bancárias para recebimentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="banco">Banco</Label>
                  <Select>
                    <SelectTrigger id="banco">
                      <SelectValue placeholder="Selecione o banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="001">Banco do Brasil</SelectItem>
                      <SelectItem value="104">Caixa Econômica Federal</SelectItem>
                      <SelectItem value="341">Itaú</SelectItem>
                      <SelectItem value="033">Santander</SelectItem>
                      <SelectItem value="237">Bradesco</SelectItem>
                      <SelectItem value="260">Nubank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-conta">Tipo de Conta</Label>
                  <Select>
                    <SelectTrigger id="tipo-conta">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corrente">Conta Corrente</SelectItem>
                      <SelectItem value="poupanca">Conta Poupança</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agencia">Agência</Label>
                  <Input id="agencia" placeholder="0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conta">Conta</Label>
                  <Input id="conta" placeholder="00000-0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titular">Nome do Titular</Label>
                <Input id="titular" placeholder="Nome completo do titular" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf-cnpj">CPF/CNPJ do Titular</Label>
                <Input id="cpf-cnpj" placeholder="000.000.000-00 ou 00.000.000/0000-00" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Configure como deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações por Email</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-agendamentos">Novos agendamentos</Label>
                      <p className="text-sm text-gray-500">Receba emails quando houver novos agendamentos</p>
                    </div>
                    <Switch id="email-agendamentos" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-lembretes">Lembretes de agendamentos</Label>
                      <p className="text-sm text-gray-500">Receba lembretes de agendamentos próximos</p>
                    </div>
                    <Switch id="email-lembretes" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-financeiro">Alertas financeiros</Label>
                      <p className="text-sm text-gray-500">Receba alertas sobre contas a pagar/receber</p>
                    </div>
                    <Switch id="email-financeiro" defaultChecked />
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium">Notificações por SMS</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-agendamentos">Novos agendamentos</Label>
                      <p className="text-sm text-gray-500">Receba SMS quando houver novos agendamentos</p>
                    </div>
                    <Switch id="sms-agendamentos" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-lembretes">Lembretes de agendamentos</Label>
                      <p className="text-sm text-gray-500">Receba lembretes de agendamentos próximos</p>
                    </div>
                    <Switch id="sms-lembretes" />
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium">Notificações para Clientes</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cliente-confirmacao">Confirmação de agendamento</Label>
                      <p className="text-sm text-gray-500">Envie confirmações de agendamento para os clientes</p>
                    </div>
                    <Switch id="cliente-confirmacao" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cliente-lembretes">Lembretes para clientes</Label>
                      <p className="text-sm text-gray-500">Envie lembretes de agendamentos para os clientes</p>
                    </div>
                    <Switch id="cliente-lembretes" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cliente-marketing">Comunicações de marketing</Label>
                      <p className="text-sm text-gray-500">Envie promoções e novidades para os clientes</p>
                    </div>
                    <Switch id="cliente-marketing" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>Atualize sua senha de acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
                <p className="text-xs text-gray-500">
                  A senha deve ter pelo menos 8 caracteres e incluir letras, números e caracteres especiais.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                <Input id="confirmar-senha" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Salvando..." : "Atualizar Senha"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-gray-500">Proteja sua conta com verificação em duas etapas</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
              <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">iPhone 13 - São Paulo, Brasil</p>
                      <p className="text-xs text-gray-500">Último acesso: Hoje, 10:45</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Encerrar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Chrome - Windows 10</p>
                      <p className="text-xs text-gray-500">Último acesso: Ontem, 18:30</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Encerrar
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="text-red-600">
                Encerrar Todas as Sessões
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
