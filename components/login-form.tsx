"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if credentials match admin/admin
    if (username === "admin" && password === "admin") {
      // Redirect to dashboard on successful login
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <ITECLogo />
        </div>
        <CardTitle className="text-2xl font-bold text-[#1a1a6c]">LOGIN</CardTitle>
        <CardDescription>Enter your credentials to access the ITEC system</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#1a1a6c] hover:bg-[#2a2a8c]">
            Login
          </Button>
          <div className="text-sm text-center text-gray-500 mt-2">Default credentials: admin / admin</div>
        </form>
      </CardContent>
    </Card>
  )
}

function ITECLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#1a1a6c] font-bold text-5xl mb-2">ITEC</div>
    </div>
  )
}

