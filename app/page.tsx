import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="bg-[#1a1a6c] text-white p-4 text-center">
        <h1 className="text-3xl font-bold">ITEC</h1>
        <h2 className="text-xl">Information Technology Exhibition and Competition</h2>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
        <LoginForm />
      </div>
    </main>
  )
}

