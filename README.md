# Interstellar Physics Lab

Aplicación Next.js 14 con tema interestelar para experimentar con doce simulaciones de física:
proyectiles, oscilaciones, ondas, colisiones, electromagnetismo, termodinámica y más.

## Características

- **12 módulos** con controles configurables, historial y panel paso a paso.
- **Simulación de proyectiles** con fondo infinito, modos de arrastre, cámara con seguimiento y HUD.
- **React Three Fiber** para el lienzo 3D, animaciones con GSAP y controles en vivo.
- **Blackboard matemático** basado en MathLive con exportación a PDF.
- **Bloc de notas global** estilo panel lateral sincronizado en toda la app.
- **Historial e IndexedDB/localStorage** para notas y corridas recientes.
- **Tailwind + Radix** para una UI accesible con estética interestelar.

## Scripts

```bash
pnpm dev      # Ejecuta el servidor de desarrollo
pnpm build    # Compila la aplicación para producción
pnpm start    # Inicia la app en modo producción
pnpm lint     # Ejecuta ESLint
pnpm test     # Ejecuta Vitest (integradores numéricos)
```

## Estructura principal

```
app/
  page.tsx                # Landing interestelar
  modules/                # Módulos y simuladores
  (panel)/notes/          # Bloc de notas lateral
  library/                # Biblioteca de fórmulas
  history/                # Historial global
  export/                 # Centro de exportación
components/               # UI compartida (Starfield, Blackboard...)
lib/                      # Física, almacenamiento, exportación PDF
```

## Estado actual

- Las simulaciones de **Proyectiles**, **Oscilador Armónico** y **Ondas** incluyen integración numérica.
- Los módulos restantes generan resultados analíticos simplificados como referencia inmediata.
- Worker dedicado por módulo garantiza que la interfaz no se bloquee.

> Nota: en entornos sin IndexedDB la app usa automáticamente localStorage como fallback.
