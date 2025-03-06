import 'leaflet';
import 'leaflet-rotatedmarker';

declare module 'leaflet' {
  interface MarkerOptions {
    rotationAngle?: number; // Ajouter rotationAngle aux options du marqueur
    rotationOrigin?: string; // Ajouter rotationOrigin aux options du marqueur
  }

  interface Marker {
    setRotationAngle(angle: number): this; // Ajouter setRotationAngle à la classe Marker
    setRotationOrigin(origin: string): this; // Ajouter setRotationOrigin à la classe Marker
  }
}
