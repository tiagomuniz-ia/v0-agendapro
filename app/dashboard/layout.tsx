"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'
import { Calendar, Home, DollarSign, BarChart, Settings, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Componentes carregados dinamicamente
const Sheet = dynamic(() => import('@/components/ui/sheet').then(mod => ({
  Sheet: mod.Sheet,
  SheetContent: mod.SheetContent,
  SheetTrigger: mod.SheetTrigger
})), {
  ssr: false,
  loading: () => null
})

const Avatar = dynamic(() => import('@/components/ui/avatar').then(mod => ({
  Avatar: mod.Avatar,
  AvatarFallback: mod.AvatarFallback,
  AvatarImage: mod.AvatarImage
})), {
  loading: () => <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const menuItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Agenda",
      href: "/dashboard/agenda",
      icon: Calendar,
    },
    {
      name: "Financeiro",
      href: "/dashboard/financeiro",
      icon: DollarSign,
    },
    {
      name: "Relatórios",
      href: "/dashboard/relatorios",
      icon: BarChart,
    },
    {
      name: "Configurações",
      href: "/dashboard/configuracoes",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    })
    // In a real app, we would redirect to login page
    window.location.href = "/"
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Mobile Header */}
      {isMobile && (
        <header className="flex h-14 items-center border-b bg-white px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Image
                    src="https://res.cloudinary.com/duantsyvy/image/upload/image-removebg-preview_11_jfsb9k.png"
                    alt="AgendaPro Logo"
                    width={40}
                    height={40}
                  />
                  <span className="text-lg font-bold text-blue-700">AgendaPro</span>
                </div>
                <nav className="flex-1">
                  <ul className="space-y-2 px-2">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            pathname === item.href
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t py-4">
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Sair
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-4 flex-1">
            <Image
              src="https://res.cloudinary.com/duantsyvy/image/upload/image-removebg-preview_11_jfsb9k.png"
              alt="AgendaPro Logo"
              width={30}
              height={30}
            />
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </header>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r bg-white">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <Image
                src="https://res.cloudinary.com/duantsyvy/image/upload/image-removebg-preview_11_jfsb9k.png"
                alt="AgendaPro Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold text-blue-700">AgendaPro</span>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t p-4">
              <div className="mb-4 flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">Usuário Demo</p>
                  <p className="truncate text-xs text-gray-500">usuario@demo.com</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
          <ul className="flex h-14 items-center justify-around">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center px-3 py-1 text-xs ${
                    pathname === item.href ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
