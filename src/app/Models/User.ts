export class User{
    constructor(
        public identificador: number,
        public nombre: string,
        public correo: string,
        public rol: number,
        public es_verificado: number,
        public token: string,
    ){}
}