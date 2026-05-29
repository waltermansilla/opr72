# Cómo ver PROSEPORT en local

**Puerto fijo del proyecto: `3001`** (siempre el mismo)

## Desarrollo (con cambios en vivo)

```bash
cd /Users/osx/Desktop/proseport
npm run dev
```

## Versión compilada (más estable)

```bash
npm run restart
```

## URL

**http://127.0.0.1:3001**

Recarga forzada: `Cmd + Shift + R`

## Ver en el celular (misma WiFi)

Con `npm run dev` o `npm run restart` corriendo, la terminal muestra la URL con tu IP:

```bash
npm run mobile-url
```

Ejemplo: `http://192.168.0.105:3001`

## Si el puerto está ocupado

```bash
npm run free-port
npm run dev
```

O cerrá la terminal anterior donde corría el servidor (`Ctrl + C`).

---

## Publicar en Vercel (producción)

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub.
2. **Add New → Project** → elegí el repo `waltermansilla/proseport`.
3. Dejá la configuración por defecto:
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm ci`
4. Clic en **Deploy**.

Cada push a `main` vuelve a publicar solo.

### Dominio propio (opcional)

En el proyecto de Vercel: **Settings → Domains** → agregá tu dominio y seguí las instrucciones DNS.

### Región

El sitio se sirve desde **São Paulo (`gru1`)**, la región más cercana a Argentina.
