"use client"

import { Button } from "@/components/ui/button"

export function Sidebar({ onNavigate, activePage = "" }) {
  const sections = [
    {
      title: "ITEC Editions Management",
      items: [{ name: "View All Editions", path: "/dashboard/editions" }],
    },
    {
      title: "Event Management",
      items: [{ name: "View All Events", path: "/dashboard/events" }],
    },
    {
      title: "Participant Registration /Fee Info",
      items: [
        { name: "View All Participants", path: "/dashboard/participants" },
        { name: "View All Event Participants", path: "/dashboard/event-participants" },
        { name: "View All Team Participants", path: "/dashboard/team-participants" },
        { name: "View All Teams", path: "/dashboard/teams" },
      ],
    },
    {
      title: "Committee /Role Management",
      items: [
        { name: "View All Committee Members", path: "/dashboard/committee-members" },
        { name: "View All Committee", path: "/dashboard/committees" },
      ],
    },
    {
      title: "Duty Assignment /Tracking",
      items: [{ name: "View All Duties", path: "/dashboard/duties" }],
    },
    {
      title: "Financial Management/Sponsorship",
      items: [{ name: "View All Sponsors", path: "/dashboard/sponsors" }],
    },
  ]

  return (
    <nav className="w-64 bg-[#1a1a6c] text-white p-4 space-y-6">
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="font-semibold text-lg border-b border-white/20 pb-2">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:text-white hover:bg-white/10 ${
                    activePage === item.name ? "bg-white/20" : ""
                  }`}
                  onClick={() => onNavigate(item.path)}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

