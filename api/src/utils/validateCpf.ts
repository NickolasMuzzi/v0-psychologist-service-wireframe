// src/utils/validators.ts

export function isValidCpf ( cpf: string ): boolean {
    // 1. Garante que o input é uma string
    if ( typeof cpf !== 'string' ) return false

    // 2. Remove caracteres não numéricos (pontos, traços, etc.)
    const cleanedCpf = cpf.replace( /[^\d]/g, '' )

    // 3. Verifica se o CPF tem 11 dígitos
    if ( cleanedCpf.length !== 11 ) return false

    // 4. Elimina CPFs com todos os dígitos iguais (ex: 111.111.111-11), que são inválidos
    if ( /^(\d)\1+$/.test( cleanedCpf ) ) return false

    // 5. Calcula os dígitos verificadores
    let sum = 0
    let remainder: number

    // Validação do primeiro dígito verificador
    for ( let i = 1;i <= 9;i++ ) {
        sum = sum + parseInt( cleanedCpf.substring( i - 1, i ) ) * ( 11 - i )
    }
    remainder = ( sum * 10 ) % 11
    if ( remainder === 10 || remainder === 11 ) {
        remainder = 0
    }
    if ( remainder !== parseInt( cleanedCpf.substring( 9, 10 ) ) ) {
        return false
    }

    // Validação do segundo dígito verificador
    sum = 0
    for ( let i = 1;i <= 10;i++ ) {
        sum = sum + parseInt( cleanedCpf.substring( i - 1, i ) ) * ( 12 - i )
    }
    remainder = ( sum * 10 ) % 11
    if ( remainder === 10 || remainder === 11 ) {
        remainder = 0
    }
    if ( remainder !== parseInt( cleanedCpf.substring( 10, 11 ) ) ) {
        return false
    }

    // 6. Se todas as verificações passaram, o CPF é válido
    return true
}
