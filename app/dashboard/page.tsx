"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useItecStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const addItecEdition = useItecStore((state) => state.addItecEdition)

  const [itecId, setItecId] = useState("")
  const [year, setYear] = useState("")
  const [theme, setTheme] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!itecId || !year || !theme || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Add new ITEC edition
    const newEdition = {
      id: itecId,
      year: Number.parseInt(year),
      theme,
      description,
      date: new Date().toISOString(),
    }

    addItecEdition(newEdition)

    toast({
      title: "Success",
      description: "ITEC edition added successfully",
    })

    // Reset form
    setItecId("")
    setYear("")
    setTheme("")
    setDescription("")
  }

  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#1a1a6c] text-white p-4 text-center">
        <h1 className="text-3xl font-bold">ITEC</h1>
        <h2 className="text-xl">Information Technology Exhibition and Competition</h2>
      </header>

      <div className="flex flex-1">
        <Sidebar onNavigate={handleNavigation} />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-[#1a1a6c]">ADD ITEC ADDITIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="itec_id">Enter Itec_ID</Label>
                  <Input
                    id="itec_id"
                    placeholder="Enter Itec ID"
                    value={itecId}
                    onChange={(e) => setItecId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Choose Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Enter Theme</Label>
                  <Input
                    id="theme"
                    placeholder="Enter theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Enter Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                  Enter
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

