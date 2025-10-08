"use client"

import { useState } from "react"
import { Plus, Search, Edit, UserX, UserCheck, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { PatientDialog } from "@/components/patient-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function PatientsPage() {
  const [selectedView, setSelectedView] = useState("patients")
  const [patientDialogOpen, setPatientDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  // Mock data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      birthDate: "1985-03-15",
      cpf: "123.456.789-00",
      gender: "Feminino",
      active: true,
      registeredAt: "2024-01-15",
      lastSession: "2025-01-10",
      totalSessions: 12,
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 98765-4322",
      birthDate: "1990-07-22",
      cpf: "234.567.890-11",
      gender: "Masculino",
      active: true,
      registeredAt: "2024-02-20",
      lastSession: "2025-01-10",
      totalSessions: 8,
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 98765-4323",
      birthDate: "1988-11-30",
      cpf: "345.678.901-22",
      gender: "Feminino",
      active: true,
      registeredAt: "2024-03-10",
      lastSession: "2025-01-09",
      totalSessions: 15,
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 98765-4324",
      birthDate: "1992-05-18",
      cpf: "456.789.012-33",
      gender: "Masculino",
      active: false,
      registeredAt: "2024-04-05",
      lastSession: "2024-12-20",
      totalSessions: 6,
    },
  ])

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient)
    setPatientDialogOpen(true)
  }

  const handleToggleStatus = (patient: any) => {
    setSelectedPatient(patient)
    setStatusDialogOpen(true)
  }

  const confirmToggleStatus = () => {
    if (selectedPatient) {
      setPatients(patients.map((p) => (p.id === selectedPatient.id ? { ...p, active: !p.active } : p)))
    }
    setStatusDialogOpen(false)
    setSelectedPatient(null)
  }

  const activePatients = patients.filter((p) => p.active).length
  const inactivePatients = patients.filter((p) => !p.active).length

  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-8">
        <div className=" mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Pacientes</h1>
              <p className="text-muted-foreground mt-1">Gerencie seus pacientes e histórico</p>
            </div>
            <Button
              onClick={() => {
                setEditingPatient(null)
                setPatientDialogOpen(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">{patients.length}</div>
                <p className="text-xs text-muted-foreground mt-1">cadastrados no sistema</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-accent">{activePatients}</div>
                <p className="text-xs text-muted-foreground mt-1">em acompanhamento</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Inativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">{inactivePatients}</div>
                <p className="text-xs text-muted-foreground mt-1">desistências ou pausados</p>
              </CardContent>
            </Card>
          </div>

          {/* Patients Table */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Lista de Pacientes</CardTitle>
                  <CardDescription>Visualize e gerencie todos os pacientes</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar paciente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64 bg-background border-border"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Nome</TableHead>
                    <TableHead className="text-muted-foreground">Contato</TableHead>
                    <TableHead className="text-muted-foreground">Última Sessão</TableHead>
                    <TableHead className="text-muted-foreground">Total Sessões</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="border-border hover:bg-secondary/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.cpf}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {patient.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(patient.lastSession).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground font-medium">{patient.totalSessions}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.active ? "default" : "secondary"}
                          className={patient.active ? "bg-accent text-accent-foreground" : ""}
                        >
                          {patient.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(patient)}>
                            {patient.active ? (
                              <UserX className="w-4 h-4 text-destructive" />
                            ) : (
                              <UserCheck className="w-4 h-4 text-accent" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <PatientDialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen} patient={editingPatient} />

      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              {selectedPatient?.active ? "Desativar Paciente" : "Reativar Paciente"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPatient?.active
                ? `Tem certeza que deseja desativar ${selectedPatient?.name}? O paciente será marcado como inativo no sistema.`
                : `Tem certeza que deseja reativar ${selectedPatient?.name}? O paciente voltará a aparecer como ativo no sistema.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggleStatus}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
