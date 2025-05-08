"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DutiesPage() {
  const router = useRouter()
  const duties = useItecStore((state) => state.duties)
  const committeeMembers = useItecStore((state) => state.committeeMembers)

  // Get assignee name for display
  const getAssigneeName = (assigneeId) => {
    const assignee = committeeMembers.find((cm) => cm.id === assigneeId)
    return assignee ? assignee.name : "Unknown"
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
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Duties" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Duties</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Duties</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duties.map((duty) => (
                      <TableRow key={duty.id}>
                        <TableCell className="font-medium">{duty.id}</TableCell>
                        <TableCell>{duty.title}</TableCell>
                        <TableCell>{duty.description}</TableCell>
                        <TableCell>{getAssigneeName(duty.assignedTo)}</TableCell>
                        <TableCell>{formatDate(duty.deadline)}</TableCell>
                        <TableCell>{getStatusBadge(duty.status)}</TableCell>
                        <TableCell>{getPriorityBadge(duty.priority)}</TableCell>
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

