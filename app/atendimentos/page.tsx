"use client"

import { useState, useEffect } from "react"
import { Clock, Play, Pause, RotateCcw, Save, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SessionPage() {
  const [selectedView, setSelectedView] = useState("sessions")
  const [sessionTime, setSessionTime] = useState(50 * 60) // 50 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [notes, setNotes] = useState("")
  const [observations, setObservations] = useState<string[]>([])
  const [newObservation, setNewObservation] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")

  // Mock patients
  const patients = [
    { id: 1, name: "Maria Silva" },
    { id: 2, name: "João Santos" },
    { id: 3, name: "Ana Costa" },
    { id: 4, name: "Pedro Oliveira" },
  ]

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && sessionTime > 0) {
      interval = setInterval(() => {
        setSessionTime((time) => time - 1)
      }, 1000)
    } else if (sessionTime === 0) {
      setIsRunning(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, sessionTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleToggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const handleResetTimer = () => {
    setIsRunning(false)
    setSessionTime(50 * 60)
  }

  const handleAddObservation = () => {
    if (newObservation.trim()) {
      setObservations([...observations, newObservation.trim()])
      setNewObservation("")
    }
  }

  const handleRemoveObservation = (index: number) => {
    setObservations(observations.filter((_, i) => i !== index))
  }

  const handleSaveSession = () => {
    console.log("[v0] Saving session:", {
      patient: selectedPatient,
      duration: 50 * 60 - sessionTime,
      notes,
      observations,
    })
    // Reset form
    setNotes("")
    setObservations([])
    handleResetTimer()
  }

  const timePercentage = (sessionTime / (50 * 60)) * 100
  const isLowTime = sessionTime < 5 * 60 // Less than 5 minutes

  return (
   <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-8">
        <div className=" mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Atendimento</h1>
              <p className="text-muted-foreground mt-1">Registre a sessão em andamento</p>
            </div>
            <Button onClick={handleSaveSession} disabled={!selectedPatient}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Sessão
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timer Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Patient Selection */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Paciente</CardTitle>
                  <CardDescription>Selecione o paciente da sessão</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.name}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Timer Card */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Tempo da Sessão
                  </CardTitle>
                  <CardDescription>Cronômetro regressivo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer Display */}
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className={`text-6xl font-bold ${isLowTime ? "text-destructive" : "text-primary"} font-mono`}>
                      {formatTime(sessionTime)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{isRunning ? "Em andamento" : "Pausado"}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${isLowTime ? "bg-destructive" : "bg-primary"}`}
                      style={{ width: `${timePercentage}%` }}
                    />
                  </div>

                  {/* Timer Controls */}
                  <div className="flex gap-2">
                    <Button onClick={handleToggleTimer} className="flex-1" disabled={!selectedPatient}>
                      {isRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar
                        </>
                      )}
                    </Button>
                    <Button onClick={handleResetTimer} variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Low Time Warning */}
                  {isLowTime && sessionTime > 0 && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <p className="text-sm text-destructive">Tempo restante baixo!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Notes Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Notes */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Anotações da Sessão</CardTitle>
                  <CardDescription>Registre observações, técnicas utilizadas e evolução do paciente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Clínicas</Label>
                    <Textarea
                      id="notes"
                      placeholder="Descreva o que foi trabalhado na sessão, comportamentos observados, técnicas aplicadas, evolução do paciente..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-background border-border min-h-[300px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Estas anotações são confidenciais e protegidas por sigilo profissional
                    </p>
                  </div>

                  {/* Quick Tags */}
                  <div className="space-y-2">
                    <Label>Tags Rápidas</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Boa evolução",
                        "Resistência",
                        "Ansiedade",
                        "Depressão",
                        "Progresso significativo",
                        "Necessita atenção",
                        "Técnica CBT",
                        "Mindfulness",
                      ].map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setNotes(notes + (notes ? "\n" : "") + `• ${tag}`)}
                          className="text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Observations */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Pontos de Observação</CardTitle>
                  <CardDescription>Adicione tópicos importantes para acompanhar nas próximas sessões</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ex: Verificar evolução da ansiedade social"
                      value={newObservation}
                      onChange={(e) => setNewObservation(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddObservation()}
                      className="bg-background border-border"
                    />
                    <Button onClick={handleAddObservation} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {observations.length > 0 && (
                    <div className="space-y-2">
                      {observations.map((obs, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
                        >
                          <p className="text-sm text-foreground">{obs}</p>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveObservation(index)}>
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {observations.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      Nenhum ponto de observação adicionado ainda
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
