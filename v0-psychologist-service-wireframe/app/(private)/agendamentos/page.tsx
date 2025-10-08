"use client"

import { useState } from "react"
import { CalendarIcon, LayoutGrid, Table, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { AppointmentDialog } from "@/components/appointment-dialog"
import { AppointmentsCalendarView } from "@/components/appointments-calendar-view"
import { AppointmentsTableView } from "@/components/appointments-table-view"
import { AppointmentsGridView } from "@/components/appointments-grid-view"
import { cn } from "@/lib/utils"

export default function AgendamentosPage() {
  const [selectedView, setSelectedView] = useState("appointments")
  const [viewMode, setViewMode] = useState<"calendar" | "table" | "grid">("calendar")
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      patient: "Maria Silva",
      date: "2025-01-10",
      time: "09:00",
      duration: 50,
      status: "completed",
      value: 150.0,
      notes: "Primeira sessão realizada com sucesso",
    },
    {
      id: 2,
      patient: "João Santos",
      date: "2025-01-10",
      time: "10:00",
      duration: 50,
      status: "completed",
      value: 150.0,
      notes: "Continuação do tratamento",
    },
    {
      id: 3,
      patient: "Ana Costa",
      date: "2025-01-10",
      time: "14:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
    {
      id: 4,
      patient: "Pedro Oliveira",
      date: "2025-01-11",
      time: "09:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
    {
      id: 5,
      patient: "Carla Mendes",
      date: "2025-01-11",
      time: "10:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
    {
      id: 6,
      patient: "Roberto Lima",
      date: "2025-01-12",
      time: "14:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
    {
      id: 7,
      patient: "Juliana Souza",
      date: "2025-01-13",
      time: "09:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
    {
      id: 8,
      patient: "Fernando Costa",
      date: "2025-01-13",
      time: "15:00",
      duration: 50,
      status: "scheduled",
      value: 150.0,
      notes: "",
    },
  ]

  const filteredAppointments = appointments.filter((apt) =>
    apt.patient.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
   <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-8">
        <div className=" mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Agendamentos</h1>
              <p className="text-muted-foreground mt-1">Gerencie sua agenda de consultas</p>
            </div>
            <Button onClick={() => setAppointmentDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">{appointments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">agendamentos</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Realizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">
                  {appointments.filter((a) => a.status === "completed").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">consultas concluídas</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Agendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">
                  {appointments.filter((a) => a.status === "scheduled").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">próximas consultas</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Receita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">
                  R$ {appointments.reduce((sum, apt) => sum + apt.value, 0).toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">valor total</p>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar paciente..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64 bg-background border-border"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className={cn(viewMode === "calendar" && "bg-primary text-primary-foreground")}
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={cn(viewMode === "table" && "bg-primary text-primary-foreground")}
                  >
                    <Table className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={cn(viewMode === "grid" && "bg-primary text-primary-foreground")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Views */}
          {viewMode === "calendar" && <AppointmentsCalendarView appointments={filteredAppointments} />}
          {viewMode === "table" && <AppointmentsTableView appointments={filteredAppointments} />}
          {viewMode === "grid" && <AppointmentsGridView appointments={filteredAppointments} />}
        </div>
      </main>

      <AppointmentDialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen} />
    </div>
  )
}
