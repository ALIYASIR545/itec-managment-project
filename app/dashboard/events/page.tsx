"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EventsPage() {
  const router = useRouter()
  const events = useItecStore((state) => state.events)
  const editions = useItecStore((state) => state.editions)

  // Get edition names for display
  const getEditionTheme = (editionId) => {
    const edition = editions.find((e) => e.id === editionId)
    return edition ? edition.theme : "Unknown"
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-green-500">Ongoing</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Events" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Events</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Edition</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.id}</TableCell>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{getEditionTheme(event.editionId)}</TableCell>
                        <TableCell>{formatDate(event.date)}</TableCell>
                        <TableCell>{event.venue}</TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>{event.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

