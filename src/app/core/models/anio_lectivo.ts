export interface AnioLectivo {
  id_anio_lectivo: number;
  anio: number;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: string;
  observaciones: string;
  eliminado: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}
