# LUXORÉ RIDE

Eigenständige Unternehmenswebsite, Kunden-App, Fahrer-App und Flottenverwaltung unter https://luxoreride.de.

## Technik

Next.js auf Node.js/Vercel, unabhängige SQLite-kompatible Datenbank über libSQL, eigene Luxóre-Konten mit verifiziertem E-Mail-Code. Kein externer Plattform-Login. Karten und Routen: Mapbox. Der E-Mail-Versand über Resend ist vorbereitet.

## Lokal starten

Node 24 und pnpm verwenden. `pnpm install --frozen-lockfile`. `.env.local` mit `DATABASE_URL=file:work/luxore-local.db` und den benötigten lokalen Einstellungen anlegen, `mkdir -p work`, `pnpm db:migrate`, anschließend `pnpm dev`.

Prüfen: `node --test tests/*.test.ts tests/*.test.mjs`, `pnpm exec tsc --noEmit`, `pnpm build`. Die Mehrgeräte-API-Prüfung läuft lokal mit `TEST_BASE_URL=http://localhost:3000 python3 tests/mobile-api-local.py`; dazu den Server mit `LUXORE_ADMIN_EMAIL=owner@example.test` und derselben lokalen Datenbank starten. Sie verwendet ausschließlich synthetische Daten und entfernt ihre Profile nach Abschluss.

## Veröffentlichung

Die unabhängige Serverversion ist über das vorhandene GitHub-/Vercel-Projekt unter luxoreride.de veröffentlicht und live geprüft. Die kostenlose Turso-Datenbank ist geschützt mit Vercel Production verbunden; 18 Migrationen und 21 Geschäftstabellen sind angelegt. Die vollständige Bestandsdatenübernahme und Live-Prüfung fehlen noch. Bis zur kontrollierten Aktivierung zeigt die App einen klaren Umstellungshinweis und nimmt keine Online-Buchungen an. Sie verwendet keinen Ersatzserver. Anmeldung bleibt bis zum E-Mail-Versand deaktiviert. Einzelheiten: `docs/INDEPENDENT-DEPLOYMENT.md`.

## Apps

Beide Apps verwenden ausschließlich https://luxoreride.de. Die Umstellung der fest eingebauten Adresse braucht einmalig neue APKs. Die interne Version 0.4.4 ist dafür vorgesehen; physische Geräteprüfung und offizielle Store-Freigaben bleiben erforderlich. App Store und Google Play: bald verfügbar.
