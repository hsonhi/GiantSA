export interface ICity {
  ID: number
  GRL_PAIS_ID: number
  SIGLA: string
  NOME: string
  INSERIDO_POR: number
  ACTUALIZADO_POR: number | null
  REMOVIDO_POR: number | null
  DATA_INSERCAO: Date
  DATA_ACTUALIZACAO: Date | null
  DATA_REMOCAO: Date | null
}
