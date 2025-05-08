"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EditionsPage() {
  const router = useRouter()
  const editions = useItecStore((state) => state.editions)

  // Get current date for comparison
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  // Separate past and upcoming editions
  const pastEditions = editions.filter((edition) => edition.year < currentYear)
  const upcomingEditions = editions.filter((edition) => edition.year >= currentYear)

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
        <Sidebar onNavigate={handleNavigation} activePage="View All Editions" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Editions</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Add New Edition
              </Button>
            </div>

            {/* Upcoming Editions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Upcoming Editions</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEditions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ITEC ID</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Theme</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEditions.map((edition) => (
                        <TableRow key={edition.id}>
                          <TableCell className="font-medium">{edition.id}</TableCell>
                          <TableCell>{edition.year}</TableCell>
                          <TableCell>{edition.theme}</TableCell>
                          <TableCell>{edition.description}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Upcoming</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-gray-500">No upcoming editions found</div>
                )}
              </CardContent>
            </Card>

            {/* Past Editions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Past Editions</CardTitle>
              </CardHeader>
              <CardContent>
                {pastEditions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ITEC ID</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Theme</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastEditions.map((edition) => (
                        <TableRow key={edition.id}>
                          <TableCell className="font-medium">{edition.id}</TableCell>
                          <TableCell>{edition.year}</TableCell>
                          <TableCell>{edition.theme}</TableCell>
                          <TableCell>{edition.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Completed</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-gray-500">No past editions found</div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

