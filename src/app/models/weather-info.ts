export interface WeatherInfo {
    ts: number; // tiempo de adquisición (milisegundos)
    desc?: string; // descripción tiempo
    icon?: string; // icono para tiempo
    temp: number; // temperatura
    temp_max?: number; // temperatura máxima
    temp_min?: number; // temperatura mínima
    clouds?: number; // % de nubes
    humidity?: number; // % humedad
    pressure?: number; // presión
    wind?: number; // velocidad viento
    rain1h?: number; // volumen de lluvia mm/1h
    rain3h?: number; // volumen de lluvia mm/3h
    snow1h?: number; // volumen de nieve mm/1h
    snow3h?: number; // volumen de nieve mm/3h

}