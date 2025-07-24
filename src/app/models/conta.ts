import { Cliente } from "./cliente";

export class Conta {
    id!: number;
    numero!: string;
    saldo!: number;
    limiteSaldo!: number;
    chavePix!: string;
    clienteId!: number;
}
