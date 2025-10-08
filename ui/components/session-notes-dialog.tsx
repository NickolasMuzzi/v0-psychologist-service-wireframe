"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SessionNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: any
}

export function SessionNotesDialog({ open, onOpenChange, appointment }: SessionNotesDialogProps) {
  const [notes, setNotes] = useState("")
  const [completed, setCompleted] = useState(false)

  const handleSave = () => {
    console.log("Salvando anotações:", { appointment, notes, completed })
    onOpenChange(false)
  }

  if (!appointment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Anotações da Sessão
          </DialogTitle>
          <DialogDescription>Registre as observações e detalhes do atendimento</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Appointment Info */}
          <div className="p-4 rounded-lg bg-background border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(appointment.date).toLocaleDateString("pt-BR")} às {appointment.time}
                </p>
              </div>
              <Badge
                variant={appointment.status === "completed" ? "default" : "secondary"}
                className={appointment.status === "completed" ? "bg-accent text-accent-foreground" : ""}
              >
                {appointment.status === "completed" ? "Realizada" : "Agendada"}
              </Badge>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-muted-foreground">Duração: {appointment.duration}</span>
              <span className="text-muted-foreground">Valor: R$ {appointment.value.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes">Anotações do Atendimento</Label>
            <Textarea
              id="notes"
              placeholder="Registre aqui as observações sobre a sessão, evolução do paciente, técnicas utilizadas, próximos passos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background border-border min-h-[250px]"
            />
            <p className="text-xs text-muted-foreground">
              Estas anotações são confidenciais e protegidas por sigilo profissional
            </p>
          </div>

          {/* Quick Notes */}
          <div className="space-y-2">
            <Label>Notas Rápidas</Label>
            <div className="flex flex-wrap gap-2">
              {["Boa evolução", "Resistência", "Ansiedade", "Progresso significativo", "Necessita atenção"].map(
                (tag) => (
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
                ),
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <Label htmlFor="completed" className="text-sm cursor-pointer">
                Marcar atendimento como realizado
              </Label>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Anotações
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
