export interface Futbolista {
    id?: number;
    nombre: string;
    ap_paterno: string;
    ap_materno?: string;
    alias?: string;
    no_camiseta: number;
}

export interface Estadio {
    id?: number;
    nombre: string;
    pais: string;
    capacidad: number;
} 

export interface Division {
    id?: number;
    nivel: number;
    liga: string;

}