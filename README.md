# AgendaPro - Sistema de Gerenciamento de Agendas e Finanças

AgendaPro é uma aplicação web e mobile responsiva para gerenciamento de agendas e finanças, desenvolvida com Next.js, React e Tailwind CSS.

## Funcionalidades

- **Login e Autenticação**: Sistema de login seguro com validação de formulários
- **Dashboard**: Visão geral das atividades, agendamentos e finanças
- **Agenda**: Gerenciamento de agendamentos com visualização de calendário (dia, semana, mês)
- **Clientes**: Cadastro e gerenciamento de clientes
- **Serviços**: Cadastro e gerenciamento de serviços oferecidos
- **Financeiro**: Controle de receitas, despesas, fluxo de caixa e contas a pagar/receber
- **Relatórios**: Dashboards e estatísticas para análise de desempenho
- **Configurações**: Personalização do perfil, empresa, pagamentos e notificações

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **date-fns**: Biblioteca para manipulação de datas
- **Lucide React**: Biblioteca de ícones

## Requisitos

- Node.js 18.17 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/seu-usuario/agenda-pro.git
   cd agenda-pro
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   # ou
   yarn
   \`\`\`

3. Execute o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

\`\`\`
agenda-pro/
├── app/                    # Diretório principal da aplicação (App Router)
│   ├── dashboard/          # Layout e páginas do dashboard
│   │   ├── agenda/         # Gerenciamento de agenda
│   │   ├── financeiro/     # Controle financeiro
│   │   ├── relatorios/     # Relatórios e estatísticas
│   │   └── configuracoes/  # Configurações do sistema
│   ├── layout.tsx          # Layout principal da aplicação
│   ├── page.tsx            # Página inicial (login)
│   └── globals.css         # Estilos globais
├── components/             # Componentes reutilizáveis
│   ├── ui/                 # Componentes de UI (shadcn)
│   └── login-form.tsx      # Formulário de login
├── hooks/                  # Hooks personalizados
├── lib/                    # Funções utilitárias
├── public/                 # Arquivos estáticos
└── tailwind.config.ts      # Configuração do Tailwind CSS
\`\`\`

## Próximos Passos

- Integração com PostgreSQL para armazenamento de dados
- Implementação de autenticação real
- Adição de gráficos para visualização de dados
- Desenvolvimento de API RESTful
- Implementação de tema escuro

## Licença

Este projeto está licenciado sob a licença MIT.
