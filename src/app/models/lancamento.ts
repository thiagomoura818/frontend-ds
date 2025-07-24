import { Operacao } from "./operacao.enum";
import { Tipo } from "./tipo.enum";

export class Lancamento {
    id!: number;
    valor?: number;
    tipo?: Tipo;
    operacao?: Operacao;
    contaId?: number;
    data?: string;
}
