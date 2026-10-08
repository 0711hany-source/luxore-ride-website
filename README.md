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

Interne Android-Version 0.6.2 / Build 16: Die Fahrer-App startet nach der eigenen Anmeldung direkt im nativen Cockpit. Helle native Mapbox-3D-Karte, GPS, Schicht, Fahrzeugwechsel, Fahrtangebote, Statusgesten, Kassieren, Tagesumsatz, Fahrzeuge/Team und Bordbestand benötigen keine eingebettete Fahrer-Webseite mehr. Die Kunden-Buchungsansicht bleibt vorerst eingebettet; ihre vollständige native Umstellung folgt. Erweiterte Betreiberfunktionen bleiben im eigenen Webportal. GPS-Geräteprüfung und Store-Freigaben stehen aus. Startabsturz-Korrektur und Android-Emulatortests: `docs/ANDROID-STARTUP-061.md`. Einmalig die neuen internen APKs installieren. App Store und Google Play: bald verfügbar.
