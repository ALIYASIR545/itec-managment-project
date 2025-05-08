"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeamParticipantsPage() {
  const router = useRouter()
  const teamParticipants = useItecStore((state) => state.teamParticipants)
  const teams = useItecStore((state) => state.teams)
  const participants = useItecStore((state) => state.participants)

  // Get team name for display
  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId)
    return team ? team.name : "Unknown"
  }

  // Get participant name for display
  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId)
    return participant ? participant.name : "Unknown"
  }

  // Get institution for display
  const getInstitution = (teamId) => {
    const team = teams.find((t) => t.id === teamId)
    return team ? team.institution : "Unknown"
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Team Participants" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Team Participants</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Team Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Participant</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Institution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamParticipants.map((tp) => (
                      <TableRow key={tp.id}>
                        <TableCell className="font-medium">{tp.id}</TableCell>
                        <TableCell>{getTeamName(tp.teamId)}</TableCell>
                        <TableCell>{getParticipantName(tp.participantId)}</TableCell>
                        <TableCell>{tp.role}</TableCell>
                        <TableCell>{getInstitution(tp.teamId)}</TableCell>
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

