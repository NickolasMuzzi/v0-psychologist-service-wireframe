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

export default function DashboardPage () {
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState( false )
  const [patientDialogOpen, setPatientDialogOpen] = useState( false )
  const [sessionDialogOpen, setSessionDialogOpen] = useState( false )
  const [selectedAppointment, setSelectedAppointment] = useState<any>( null )
  const navigate = useRouter()
  const todayAppointments = recentAppointments.filter( ( apt ) => apt.date === "2025-01-10" )

  const handleViewSession = ( appointment: any ) => {
    setSelectedAppointment( appointment )
    setSessionDialogOpen( true )
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-8">
        <div className=" mx-auto space-y-8">
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Bem-vindo de volta, Dr. Silva</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setPatientDialogOpen( true )} variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Novo Paciente
              </Button>
              <Button onClick={() => setAppointmentDialogOpen( true )}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">{todayAppointments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">consultas agendadas</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Esta Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">12</div>
                <p className="text-xs text-muted-foreground mt-1">consultas agendadas</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">28</div>
                <p className="text-xs text-muted-foreground mt-1">em acompanhamento</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">R$ 8.400</div>
                <p className="text-xs mt-1 text-muted-foreground">+12% vs mês anterior</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Agenda de Hoje</CardTitle>
                  <CardDescription>10 de Janeiro, 2025</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Buscar paciente..." className="pl-9 w-64 bg-background border-border" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAppointments.map( ( appointment ) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="text-lg font-semibold text-primary">{appointment.time}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{appointment.patient}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.duration}
                          </span>
                          <span className="text-sm text-muted-foreground">R$ {appointment.value.toFixed( 2 )}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={appointment.status === "completed" ? "success" : "info"}
                        className={appointment.status === "completed" ? "text-accent-foreground" : ""}
                      >
                        {appointment.status === "completed" ? "Realizada" : "Agendada"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleViewSession( appointment )}>
                        <FileText className="w-4 h-4 mr-2" />
                        {appointment.status === "completed" ? "Ver Anotações" : "Iniciar"}
                      </Button>
                    </div>
                  </div>
                ) )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Próximas Consultas</CardTitle>
                <CardDescription>Agendamentos futuros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointments
                    .filter( ( apt ) => apt.status === "scheduled" )
                    .map( ( appointment ) => (
                      <div key={appointment.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date( appointment.date ).toLocaleDateString( "pt-BR" )} às {appointment.time}
                          </p>
                        </div>
                        <Badge variant="info">Agendada</Badge>
                      </div>
                    ) )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Pacientes Recentes</CardTitle>
                <CardDescription>Últimos cadastros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Carlos Mendes</p>
                      <p className="text-sm text-muted-foreground">Cadastrado em 08/01/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver Perfil
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Beatriz Lima</p>
                      <p className="text-sm text-muted-foreground">Cadastrado em 05/01/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver Perfil
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Rafael Souza</p>
                      <p className="text-sm text-muted-foreground">Cadastrado em 03/01/2025</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AppointmentDialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen} />
      <PatientDialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen} />
      <SessionNotesDialog
        open={sessionDialogOpen}
        onOpenChange={setSessionDialogOpen}
        appointment={selectedAppointment}
      />
    </div>
  )
}
