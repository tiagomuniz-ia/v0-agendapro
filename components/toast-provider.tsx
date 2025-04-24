"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider() {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`w-full max-w-md overflow-hidden rounded-lg shadow-lg ${
            toast.variant === "destructive"
              ? "bg-red-100 text-red-900"
              : toast.variant === "success"
                ? "bg-green-100 text-green-900"
                : "bg-white text-gray-900"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <div>
              {toast.title && <h4 className="font-medium">{toast.title}</h4>}
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="rounded-full p-1 hover:bg-gray-200">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
