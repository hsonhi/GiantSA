export interface Arquivo {
  ID: number
  SINISTROS_ID: number
  ARQUIVO: string
  ARQUIVO_TAMANHO: number
  ARQUIVO_TIPO: string
  INSERIDO_POR: number
  ACTUALIZADOR_POR: number | null
  REMOVIDO_POR: number | null
  DATA_INSERCAO: Date
  DATA_ACTUALIZACAO: Date | null
  DATA_REMOCAO: Date | null
}
