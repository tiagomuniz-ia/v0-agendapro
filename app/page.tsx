import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://res.cloudinary.com/duantsyvy/image/upload/image-removebg-preview_11_jfsb9k.png"
            alt="AgendaPro Logo"
            width={200}
            height={80}
            priority
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-blue-700">AgendaPro</h1>
          <p className="mt-2 text-center text-gray-600">Gerencie sua agenda e finanças em um só lugar</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
