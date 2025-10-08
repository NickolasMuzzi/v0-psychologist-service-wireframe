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

export default function DashboardPage() {
  const navigate = useRouter()
  return navigate.push('/dashboard')
}
