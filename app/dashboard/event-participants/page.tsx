"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EventParticipantsPage() {
  const router = useRouter()
  const eventParticipants = useItecStore((state) => state.eventParticipants)
  const events = useItecStore((state) => state.events)
  const participants = useItecStore((state) => state.participants)

  // Get event name for display
  const getEventName = (eventId) => {
    const event = events.find((e) => e.id === eventId)
    return event ? event.name : "Unknown"
  }

  // Get participant name for display
  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId)
    return participant ? participant.name : "Unknown"
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

  // Get fee status badge
  const getFeeStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "waived":
        return <Badge className="bg-blue-500">Waived</Badge>
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Event Participants" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Event Participants</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Event Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Participant</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Fee Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventParticipants.map((ep) => (
                      <TableRow key={ep.id}>
                        <TableCell className="font-medium">{ep.id}</TableCell>
                        <TableCell>{getEventName(ep.eventId)}</TableCell>
                        <TableCell>{getParticipantName(ep.participantId)}</TableCell>
                        <TableCell>{ep.role}</TableCell>
                        <TableCell>{formatDate(ep.registrationDate)}</TableCell>
                        <TableCell>{getFeeStatusBadge(ep.feeStatus)}</TableCell>
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

