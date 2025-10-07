"use client"

import { Clock, User, DollarSign, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

interface AppointmentsTableViewProps {
  appointments: Appointment[]
}

export function AppointmentsTableView({ appointments }: AppointmentsTableViewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Paciente</TableHead>
              <TableHead className="text-muted-foreground">Data</TableHead>
              <TableHead className="text-muted-foreground">Horário</TableHead>
              <TableHead className="text-muted-foreground">Duração</TableHead>
              <TableHead className="text-muted-foreground">Valor</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="border-border hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{appointment.patient}</span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{formatDate(appointment.date)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-foreground">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {appointment.time}
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{appointment.duration} min</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-foreground">
                    <DollarSign className="w-3 h-3 text-muted-foreground" />
                    R$ {appointment.value.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={appointment.status === "completed" ? "default" : "secondary"}
                    className={appointment.status === "completed" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {appointment.status === "completed" ? "Realizada" : "Agendada"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
