"use client"

import { useState } from "react"
import { Users, FileText, Clock, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { AppointmentDialog } from "@/components/appointment-dialog"
import { PatientDialog } from "@/components/patient-dialog"
import { SessionNotesDialog } from "@/components/session-notes-dialog"
import { recentAppointments } from "@/mocks/DashboardMock"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/loader/loader"

export default function DashboardPage() {
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false)
  const [patientDialogOpen, setPatientDialogOpen] = useState(false)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const navigate = useRouter()
  const todayAppointments = recentAppointments.filter((apt) => apt.date === "2025-01-10")

  const handleViewSession = (appointment: any) => {
    setSelectedAppointment(appointment)
    setSessionDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
     <Loader/>
    </div>
  )
}
