"use client"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage () {
    const navigate = useRouter()
    return ( <div className="w-full h-full flex flex-col justify-center items-center ">
        <Card className="w-6/12 h-6/12 flex-col justify-center items-center p-12">
            <CardTitle className="w-full h-1/12 text-center flex justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-foreground">PsicoManager</h2>
                        <p className="text-xs text-muted-foreground">Gestão Clínica</p>
                    </div>
                </div>
            </CardTitle>
            <div className="w-9/12 h-9/12 flex flex-col justify-center items-center gap-10 border-1 border-zinc-200 rounded-xl p-6">
                <Input placeholder="E-mail" type="text" className="w-6/12" />
                <Input placeholder="Senha" type="password" className="w-6/12" />
                <Button className="rounded-md" onClick={() => navigate.push('/dashboard')}>
                    Entrar
                </Button>
            </div>
        </Card>
    </div> )
}
