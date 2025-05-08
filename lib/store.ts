import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types for all entities
interface ItecEdition {
  id: string
  year: number
  theme: string
  description: string
  date: string
}

interface Event {
  id: string
  name: string
  editionId: string
  date: string
  venue: string
  status: "upcoming" | "ongoing" | "completed"
  description: string
}

interface Participant {
  id: string
  name: string
  email: string
  phone: string
  institution: string
  registrationDate: string
}

interface EventParticipant {
  id: string
  eventId: string
  participantId: string
  role: string
  registrationDate: string
  feeStatus: "paid" | "pending" | "waived"
}

interface Team {
  id: string
  name: string
  eventId: string
  institution: string
  creationDate: string
}

interface TeamParticipant {
  id: string
  teamId: string
  participantId: string
  role: string
}

interface CommitteeMember {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  joinDate: string
}

interface Committee {
  id: string
  name: string
  description: string
  editionId: string
  chairId: string // References a CommitteeMember
}

interface Duty {
  id: string
  title: string
  description: string
  assignedTo: string // References a CommitteeMember
  deadline: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
}

interface Sponsor {
  id: string
  name: string
  type: "platinum" | "gold" | "silver" | "bronze"
  contactPerson: string
  email: string
  phone: string
  amount: number
  editionId: string
  logo: string
}

// Define the store state
interface ItecState {
  // Data collections
  editions: ItecEdition[]
  events: Event[]
  participants: Participant[]
  eventParticipants: EventParticipant[]
  teams: Team[]
  teamParticipants: TeamParticipant[]
  committeeMembers: CommitteeMember[]
  committees: Committee[]
  duties: Duty[]
  sponsors: Sponsor[]

  // Actions
  addItecEdition: (edition: ItecEdition) => void
  addEvent: (event: Event) => void
  addParticipant: (participant: Participant) => void
  addEventParticipant: (eventParticipant: EventParticipant) => void
  addTeam: (team: Team) => void
  addTeamParticipant: (teamParticipant: TeamParticipant) => void
  addCommitteeMember: (committeeMember: CommitteeMember) => void
  addCommittee: (committee: Committee) => void
  addDuty: (duty: Duty) => void
  addSponsor: (sponsor: Sponsor) => void
}

// Create the store with persistence
export const useItecStore = create<ItecState>()(
  persist(
    (set) => ({
      // Initial data
      editions: [
        {
          id: "ITEC2022",
          year: 2022,
          theme: "Digital Transformation",
          description: "Exploring the future of digital technologies",
          date: "2022-05-15T00:00:00.000Z",
        },
        {
          id: "ITEC2023",
          year: 2023,
          theme: "AI Revolution",
          description: "Artificial Intelligence and its impact on society",
          date: "2023-06-20T00:00:00.000Z",
        },
        {
          id: "ITEC2024",
          year: 2024,
          theme: "Sustainable Tech",
          description: "Technology solutions for a sustainable future",
          date: "2024-07-10T00:00:00.000Z",
        },
      ],
      events: [
        {
          id: "EVT001",
          name: "Hackathon",
          editionId: "ITEC2022",
          date: "2022-05-16T00:00:00.000Z",
          venue: "Main Hall",
          status: "completed",
          description: "24-hour coding competition",
        },
        {
          id: "EVT002",
          name: "Tech Talk",
          editionId: "ITEC2022",
          date: "2022-05-17T00:00:00.000Z",
          venue: "Auditorium",
          status: "completed",
          description: "Industry experts sharing insights",
        },
        {
          id: "EVT003",
          name: "AI Hackathon",
          editionId: "ITEC2023",
          date: "2023-06-21T00:00:00.000Z",
          venue: "Innovation Lab",
          status: "completed",
          description: "Building AI solutions for real-world problems",
        },
        {
          id: "EVT004",
          name: "Robotics Competition",
          editionId: "ITEC2023",
          date: "2023-06-22T00:00:00.000Z",
          venue: "Main Hall",
          status: "completed",
          description: "Showcase of robotic innovations",
        },
        {
          id: "EVT005",
          name: "Green Tech Hackathon",
          editionId: "ITEC2024",
          date: "2024-07-11T00:00:00.000Z",
          venue: "Innovation Hub",
          status: "upcoming",
          description: "Developing sustainable technology solutions",
        },
        {
          id: "EVT006",
          name: "Blockchain Workshop",
          editionId: "ITEC2024",
          date: "2024-07-12T00:00:00.000Z",
          venue: "Tech Lab",
          status: "upcoming",
          description: "Hands-on blockchain development",
        },
      ],
      participants: [
        {
          id: "P001",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          institution: "Tech University",
          registrationDate: "2022-04-10T00:00:00.000Z",
        },
        {
          id: "P002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1234567891",
          institution: "Innovation College",
          registrationDate: "2022-04-12T00:00:00.000Z",
        },
        {
          id: "P003",
          name: "Robert Johnson",
          email: "robert.j@example.com",
          phone: "+1234567892",
          institution: "Tech University",
          registrationDate: "2022-04-15T00:00:00.000Z",
        },
        {
          id: "P004",
          name: "Emily Davis",
          email: "emily.d@example.com",
          phone: "+1234567893",
          institution: "Digital Academy",
          registrationDate: "2023-05-05T00:00:00.000Z",
        },
        {
          id: "P005",
          name: "Michael Brown",
          email: "michael.b@example.com",
          phone: "+1234567894",
          institution: "Innovation College",
          registrationDate: "2023-05-10T00:00:00.000Z",
        },
        {
          id: "P006",
          name: "Sarah Wilson",
          email: "sarah.w@example.com",
          phone: "+1234567895",
          institution: "Tech University",
          registrationDate: "2023-05-15T00:00:00.000Z",
        },
      ],
      eventParticipants: [
        {
          id: "EP001",
          eventId: "EVT001",
          participantId: "P001",
          role: "Competitor",
          registrationDate: "2022-04-20T00:00:00.000Z",
          feeStatus: "paid",
        },
        {
          id: "EP002",
          eventId: "EVT001",
          participantId: "P002",
          role: "Competitor",
          registrationDate: "2022-04-22T00:00:00.000Z",
          feeStatus: "paid",
        },
        {
          id: "EP003",
          eventId: "EVT002",
          participantId: "P001",
          role: "Attendee",
          registrationDate: "2022-04-25T00:00:00.000Z",
          feeStatus: "paid",
        },
        {
          id: "EP004",
          eventId: "EVT002",
          participantId: "P003",
          role: "Attendee",
          registrationDate: "2022-04-26T00:00:00.000Z",
          feeStatus: "waived",
        },
        {
          id: "EP005",
          eventId: "EVT003",
          participantId: "P004",
          role: "Competitor",
          registrationDate: "2023-05-20T00:00:00.000Z",
          feeStatus: "paid",
        },
        {
          id: "EP006",
          eventId: "EVT003",
          participantId: "P005",
          role: "Competitor",
          registrationDate: "2023-05-21T00:00:00.000Z",
          feeStatus: "paid",
        },
        {
          id: "EP007",
          eventId: "EVT004",
          participantId: "P006",
          role: "Competitor",
          registrationDate: "2023-05-25T00:00:00.000Z",
          feeStatus: "pending",
        },
      ],
      teams: [
        {
          id: "T001",
          name: "Tech Wizards",
          eventId: "EVT001",
          institution: "Tech University",
          creationDate: "2022-04-21T00:00:00.000Z",
        },
        {
          id: "T002",
          name: "Innovation Squad",
          eventId: "EVT001",
          institution: "Innovation College",
          creationDate: "2022-04-23T00:00:00.000Z",
        },
        {
          id: "T003",
          name: "AI Masters",
          eventId: "EVT003",
          institution: "Tech University",
          creationDate: "2023-05-22T00:00:00.000Z",
        },
        {
          id: "T004",
          name: "Digital Pioneers",
          eventId: "EVT003",
          institution: "Digital Academy",
          creationDate: "2023-05-23T00:00:00.000Z",
        },
        {
          id: "T005",
          name: "Robo Champions",
          eventId: "EVT004",
          institution: "Tech University",
          creationDate: "2023-05-26T00:00:00.000Z",
        },
      ],
      teamParticipants: [
        {
          id: "TP001",
          teamId: "T001",
          participantId: "P001",
          role: "Team Leader",
        },
        {
          id: "TP002",
          teamId: "T001",
          participantId: "P003",
          role: "Member",
        },
        {
          id: "TP003",
          teamId: "T002",
          participantId: "P002",
          role: "Team Leader",
        },
        {
          id: "TP004",
          teamId: "T003",
          participantId: "P004",
          role: "Team Leader",
        },
        {
          id: "TP005",
          teamId: "T003",
          participantId: "P006",
          role: "Member",
        },
        {
          id: "TP006",
          teamId: "T004",
          participantId: "P005",
          role: "Team Leader",
        },
        {
          id: "TP007",
          teamId: "T005",
          participantId: "P006",
          role: "Team Leader",
        },
      ],
      committeeMembers: [
        {
          id: "CM001",
          name: "Dr. Alan Johnson",
          email: "alan.j@example.com",
          phone: "+1234567896",
          position: "Professor",
          department: "Computer Science",
          joinDate: "2022-01-15T00:00:00.000Z",
        },
        {
          id: "CM002",
          name: "Dr. Lisa Brown",
          email: "lisa.b@example.com",
          phone: "+1234567897",
          position: "Associate Professor",
          department: "Information Technology",
          joinDate: "2022-01-20T00:00:00.000Z",
        },
        {
          id: "CM003",
          name: "Prof. Mark Wilson",
          email: "mark.w@example.com",
          phone: "+1234567898",
          position: "Professor",
          department: "Electrical Engineering",
          joinDate: "2022-02-10T00:00:00.000Z",
        },
        {
          id: "CM004",
          name: "Dr. Susan Miller",
          email: "susan.m@example.com",
          phone: "+1234567899",
          position: "Assistant Professor",
          department: "Computer Science",
          joinDate: "2023-01-10T00:00:00.000Z",
        },
        {
          id: "CM005",
          name: "Prof. David Clark",
          email: "david.c@example.com",
          phone: "+1234567900",
          position: "Professor",
          department: "Information Technology",
          joinDate: "2023-01-15T00:00:00.000Z",
        },
      ],
      committees: [
        {
          id: "C001",
          name: "Technical Committee",
          description: "Responsible for technical aspects of the events",
          editionId: "ITEC2022",
          chairId: "CM001",
        },
        {
          id: "C002",
          name: "Organizing Committee",
          description: "Responsible for overall organization and logistics",
          editionId: "ITEC2022",
          chairId: "CM002",
        },
        {
          id: "C003",
          name: "Technical Committee",
          description: "Responsible for technical aspects of the events",
          editionId: "ITEC2023",
          chairId: "CM003",
        },
        {
          id: "C004",
          name: "Organizing Committee",
          description: "Responsible for overall organization and logistics",
          editionId: "ITEC2023",
          chairId: "CM004",
        },
        {
          id: "C005",
          name: "Technical Committee",
          description: "Responsible for technical aspects of the events",
          editionId: "ITEC2024",
          chairId: "CM005",
        },
      ],
      duties: [
        {
          id: "D001",
          title: "Prepare Technical Requirements",
          description: "Prepare technical requirements for the Hackathon event",
          assignedTo: "CM001",
          deadline: "2022-04-30T00:00:00.000Z",
          status: "completed",
          priority: "high",
        },
        {
          id: "D002",
          title: "Arrange Venue",
          description: "Book and arrange the venue for all events",
          assignedTo: "CM002",
          deadline: "2022-04-25T00:00:00.000Z",
          status: "completed",
          priority: "high",
        },
        {
          id: "D003",
          title: "Prepare Judging Criteria",
          description: "Develop judging criteria for the AI Hackathon",
          assignedTo: "CM003",
          deadline: "2023-06-10T00:00:00.000Z",
          status: "completed",
          priority: "medium",
        },
        {
          id: "D004",
          title: "Coordinate with Sponsors",
          description: "Liaise with sponsors for the 2023 edition",
          assignedTo: "CM004",
          deadline: "2023-05-30T00:00:00.000Z",
          status: "completed",
          priority: "high",
        },
        {
          id: "D005",
          title: "Develop Technical Framework",
          description: "Create technical framework for the Green Tech Hackathon",
          assignedTo: "CM005",
          deadline: "2024-06-30T00:00:00.000Z",
          status: "in-progress",
          priority: "high",
        },
        {
          id: "D006",
          title: "Prepare Marketing Materials",
          description: "Design and prepare marketing materials for ITEC 2024",
          assignedTo: "CM004",
          deadline: "2024-06-15T00:00:00.000Z",
          status: "pending",
          priority: "medium",
        },
      ],
      sponsors: [
        {
          id: "S001",
          name: "TechCorp",
          type: "platinum",
          contactPerson: "James Wilson",
          email: "james.w@techcorp.com",
          phone: "+1234567901",
          amount: 10000,
          editionId: "ITEC2022",
          logo: "/placeholder.svg?height=50&width=150",
        },
        {
          id: "S002",
          name: "InnovateTech",
          type: "gold",
          contactPerson: "Maria Garcia",
          email: "maria.g@innovatetech.com",
          phone: "+1234567902",
          amount: 7500,
          editionId: "ITEC2022",
          logo: "/placeholder.svg?height=50&width=150",
        },
        {
          id: "S003",
          name: "Digital Solutions",
          type: "silver",
          contactPerson: "Robert Chen",
          email: "robert.c@digitalsolutions.com",
          phone: "+1234567903",
          amount: 5000,
          editionId: "ITEC2022",
          logo: "/placeholder.svg?height=50&width=150",
        },
        {
          id: "S004",
          name: "AI Innovations",
          type: "platinum",
          contactPerson: "Sarah Johnson",
          email: "sarah.j@aiinnovations.com",
          phone: "+1234567904",
          amount: 12000,
          editionId: "ITEC2023",
          logo: "/placeholder.svg?height=50&width=150",
        },
        {
          id: "S005",
          name: "TechCorp",
          type: "gold",
          contactPerson: "James Wilson",
          email: "james.w@techcorp.com",
          phone: "+1234567901",
          amount: 8000,
          editionId: "ITEC2023",
          logo: "/placeholder.svg?height=50&width=150",
        },
        {
          id: "S006",
          name: "GreenTech Solutions",
          type: "platinum",
          contactPerson: "Emma Davis",
          email: "emma.d@greentech.com",
          phone: "+1234567905",
          amount: 15000,
          editionId: "ITEC2024",
          logo: "/placeholder.svg?height=50&width=150",
        },
      ],

      // Actions
      addItecEdition: (edition) =>
        set((state) => ({
          editions: [...state.editions, edition],
        })),
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      addParticipant: (participant) =>
        set((state) => ({
          participants: [...state.participants, participant],
        })),
      addEventParticipant: (eventParticipant) =>
        set((state) => ({
          eventParticipants: [...state.eventParticipants, eventParticipant],
        })),
      addTeam: (team) =>
        set((state) => ({
          teams: [...state.teams, team],
        })),
      addTeamParticipant: (teamParticipant) =>
        set((state) => ({
          teamParticipants: [...state.teamParticipants, teamParticipant],
        })),
      addCommitteeMember: (committeeMember) =>
        set((state) => ({
          committeeMembers: [...state.committeeMembers, committeeMember],
        })),
      addCommittee: (committee) =>
        set((state) => ({
          committees: [...state.committees, committee],
        })),
      addDuty: (duty) =>
        set((state) => ({
          duties: [...state.duties, duty],
        })),
      addSponsor: (sponsor) =>
        set((state) => ({
          sponsors: [...state.sponsors, sponsor],
        })),
    }),
    {
      name: "itec-storage",
    },
  ),
)

