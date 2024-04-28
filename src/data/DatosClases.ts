export interface DatosClases{
    id?: string,
    nombreClase: string,
    categoria: string,
    descripcionLarga: string,
    descripcionCorta: string,
    profesorAsignado?: string,
    numeroClases: number,
    /*//Datos para las sub clases de la aplicacion
    contenidoClases:[{
        nombreContenido: string,
        descripcionContenido: string,
        video: string,
        duracionContenido?: string
    }]*/
}