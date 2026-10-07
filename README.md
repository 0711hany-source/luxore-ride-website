# LUXORÉ RIDE

Eigenständige Unternehmenswebsite, Kunden-App, Fahrer-App und Flottenverwaltung unter https://luxoreride.de.

## Technik

Next.js auf Node.js/Vercel, unabhängige SQLite-kompatible Datenbank über libSQL, eigene Luxóre-Konten mit verifiziertem E-Mail-Code. Kein externer Plattform-Login. Karten und Routen: Mapbox. Der kostenlose E-Mail-Versand über Resend ist mit Production verbunden; die Versanddomain ist verifiziert.

## Lokal starten

Node 24 und pnpm verwenden. `pnpm install --frozen-lockfile`. `.env.local` mit `DATABASE_URL=file:work/luxore-local.db` und den benötigten lokalen Einstellungen anlegen, `mkdir -p work`, `pnpm db:migrate`, anschließend `pnpm dev`.

Prüfen: `node --test tests/*.test.ts tests/*.test.mjs`, `pnpm exec tsc --noEmit`, `pnpm build`. Die Mehrgeräte-API-Prüfung läuft lokal mit `TEST_BASE_URL=http://localhost:3000 python3 tests/mobile-api-local.py`; dazu den Server mit `LUXORE_ADMIN_EMAIL=owner@example.test` und derselben lokalen Datenbank starten. Sie verwendet ausschließlich synthetische Daten und entfernt ihre Profile nach Abschluss.

## Veröffentlichung

Die unabhängige Serverversion läuft über das vorhandene GitHub-/Vercel-Projekt unter luxoreride.de. Turso Production mit 21 Geschäftstabellen sowie die kostenlose Resend-Verbindung sind eingerichtet. Der Nutzer hat einen Neustart mit neuen Profilen bestätigt; der alte Bestand bleibt unangetastet. Konten und Buchungen sind nach konkreter Bestätigung aktiviert; der Live-Check bestätigt die Datenbankverbindung und den bereitstehenden E-Mail-Zugang. Die erste Betreiber-Anmelde-E-Mail wurde zugestellt; im Live-Browser ist inzwischen die eigene Betreiber-Flottenansicht mit drei Fahrzeugen bestätigt. Siehe `docs/INDEPENDENT-DEPLOYMENT.md` und `docs/ACTIVATION.md`.

Der aktuelle Vercel-Hobby-Tarif erlaubt laut Anbieter keinen kommerziellen Betrieb; ein geeigneter Tarif und weitere Betriebsprüfungen sind vor dem offiziellen Start erforderlich.

## Apps

Beide Android-Apps 0.5.2 / Build 12 starten mit gemeinsamen nativen Start-, Konto- und Menüoberflächen. Die Wiederaufnahme bestehender Fahrerortung wartet nicht mehr auf die Konto-Netzwerkanfrage; wiederholte Vordergrundereignisse teilen laufende Anfragen. Karten, Fahrten und Flotten sind weiterhin eingebettet; vollständige native Umstellung und physische Geräteprüfung bleiben offen. Einmalig die neuen internen APKs installieren. Eigene Konten mit E-Mail-Code; keine Fremdanmeldung. App Store und Google Play: bald verfügbar.
