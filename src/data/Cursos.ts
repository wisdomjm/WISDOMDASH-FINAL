export default interface Cursos{
    id?: string,
    nombreCurso: string,
    categoria: string,
    descripcionLarga: string,
    descripcionCorta: string,
    subclases: {},
    imagenCurso?:string,
    precio?:number
}