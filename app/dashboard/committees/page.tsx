"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CommitteesPage() {
  const router = useRouter()
  const committees = useItecStore((state) => state.committees)
  const committeeMembers = useItecStore((state) => state.committeeMembers)
  const editions = useItecStore((state) => state.editions)

  // Get chair name for display
  const getChairName = (chairId) => {
    const chair = committeeMembers.find((cm) => cm.id === chairId)
    return chair ? chair.name : "Unknown"
  }

  // Get edition theme for display
  const getEditionTheme = (editionId) => {
    const edition = editions.find((e) => e.id === editionId)
    return edition ? edition.theme : "Unknown"
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Committee" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Committees</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Committees</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Committee Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Edition</TableHead>
                      <TableHead>Chair</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {committees.map((committee) => (
                      <TableRow key={committee.id}>
                        <TableCell className="font-medium">{committee.id}</TableCell>
                        <TableCell>{committee.name}</TableCell>
                        <TableCell>{committee.description}</TableCell>
                        <TableCell>{getEditionTheme(committee.editionId)}</TableCell>
                        <TableCell>{getChairName(committee.chairId)}</TableCell>
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

