"use client"

import { Clock, User, Calendar, DollarSign, FileText } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Appointment {
  id: number
  patient: string
  date: string
  time: string
  duration: number
  status: string
  value: number
  notes: string
}

interface AppointmentsGridViewProps {
  appointments: Appointment[]
}

export function AppointmentsGridView({ appointments }: AppointmentsGridViewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          className="border-border bg-card hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                  <p className="text-xs text-muted-foreground">Paciente</p>
                </div>
              </div>
              <Badge
                variant={appointment.status === "completed" ? "default" : "secondary"}
                className={appointment.status === "completed" ? "bg-accent text-accent-foreground" : ""}
              >
                {appointment.status === "completed" ? "Realizada" : "Agendada"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-foreground">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-foreground">
                {appointment.time} ({appointment.duration} min)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-foreground">R$ {appointment.value.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                {appointment.status === "completed" ? "Ver Anotações" : "Iniciar Consulta"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
