-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "sexo" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Psicologo" (
    "id" SERIAL NOT NULL,
    "cfp" VARCHAR(25) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "nome_clinica" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Psicologo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" VARCHAR(25) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "dia" TIMESTAMP(3) NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "psicologo_id" INTEGER NOT NULL,
    "valor_consulta" DOUBLE PRECISION NOT NULL,
    "observacoes" TEXT,
    "inicio" TIMESTAMP(3) NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "anotacoes" TEXT,
    "realizado" BOOLEAN NOT NULL,
    "agendamento_id" INTEGER NOT NULL,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Psicologo_user_id_key" ON "Psicologo"("user_id");

-- AddForeignKey
ALTER TABLE "Psicologo" ADD CONSTRAINT "Psicologo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_psicologo_id_fkey" FOREIGN KEY ("psicologo_id") REFERENCES "Psicologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
