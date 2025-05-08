"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { useItecStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export default function SponsorsPage() {
  const router = useRouter()
  const sponsors = useItecStore((state) => state.sponsors)
  const editions = useItecStore((state) => state.editions)

  // Get edition theme for display
  const getEditionTheme = (editionId) => {
    const edition = editions.find((e) => e.id === editionId)
    return edition ? edition.theme : "Unknown"
  }

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Get sponsor type badge
  const getSponsorTypeBadge = (type) => {
    switch (type) {
      case "platinum":
        return <Badge className="bg-gray-300 text-gray-800">Platinum</Badge>
      case "gold":
        return <Badge className="bg-yellow-400 text-yellow-800">Gold</Badge>
      case "silver":
        return <Badge className="bg-gray-400 text-gray-800">Silver</Badge>
      case "bronze":
        return <Badge className="bg-amber-700 text-amber-100">Bronze</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
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
        <Sidebar onNavigate={handleNavigation} activePage="View All Sponsors" />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a1a6c]">View All Sponsors</h2>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#1a1a6c] hover:bg-[#2a2a8c]">
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1a1a6c]">Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Edition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sponsors.map((sponsor) => (
                      <TableRow key={sponsor.id}>
                        <TableCell>
                          <Image
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={`${sponsor.name} logo`}
                            width={80}
                            height={40}
                            className="object-contain"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{sponsor.name}</TableCell>
                        <TableCell>{getSponsorTypeBadge(sponsor.type)}</TableCell>
                        <TableCell>{sponsor.contactPerson}</TableCell>
                        <TableCell>{sponsor.email}</TableCell>
                        <TableCell>{formatCurrency(sponsor.amount)}</TableCell>
                        <TableCell>{getEditionTheme(sponsor.editionId)}</TableCell>
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

