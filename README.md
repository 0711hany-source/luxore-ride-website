# LUXORÉ RIDE

Eigenständige Unternehmenswebsite, Kunden-App, Fahrer-App und Flottenverwaltung unter https://luxoreride.de.

## Technik

Next.js auf Node.js/Vercel, unabhängige SQLite-kompatible Datenbank über libSQL, eigene Luxóre-Konten mit verifiziertem E-Mail-Code. Kein externer Plattform-Login. Karten und Routen: Mapbox. Adresssuche mit kostenfreier Geoapify-Ersatzsuche bei deaktivierter oder ausgefallener permanenter Mapbox-Suche. Der kostenlose E-Mail-Versand über Resend ist mit Production verbunden; die Versanddomain ist verifiziert.

## Lokal starten

Node 24 und pnpm verwenden. `pnpm install --frozen-lockfile`. `.env.local` mit `DATABASE_URL=file:work/luxore-local.db` und den benötigten lokalen Einstellungen anlegen, `mkdir -p work`, `pnpm db:migrate`, anschließend `pnpm dev`.

Prüfen: `node --experimental-transform-types --test tests/*.test.ts tests/*.test.mjs`, `pnpm exec tsc --noEmit`, `pnpm build`. Die Mehrgeräte-API-Prüfung läuft lokal mit `TEST_BASE_URL=http://localhost:3000 python3 tests/mobile-api-local.py`; dazu den Server mit `LUXORE_ADMIN_EMAIL=owner@example.test` und derselben lokalen Datenbank starten. Sie verwendet ausschließlich synthetische Daten und entfernt ihre Profile nach Abschluss.

## Veröffentlichung

Die unabhängige Serverversion läuft über das vorhandene GitHub-/Vercel-Projekt unter luxoreride.de. Turso Production mit 21 Geschäftstabellen sowie die kostenlose Resend-Verbindung sind eingerichtet. Der Nutzer hat einen Neustart mit neuen Profilen bestätigt; der alte Bestand bleibt unangetastet. Konten und Buchungen sind nach konkreter Bestätigung aktiviert; der Live-Check bestätigt die Datenbankverbindung und den bereitstehenden E-Mail-Zugang. Die erste Betreiber-Anmelde-E-Mail wurde zugestellt; im Live-Browser ist inzwischen die eigene Betreiber-Flottenansicht mit drei Fahrzeugen bestätigt. Siehe `docs/INDEPENDENT-DEPLOYMENT.md` und `docs/ACTIVATION.md`.

Der aktuelle Vercel-Hobby-Tarif erlaubt laut Anbieter keinen kommerziellen Betrieb; ein geeigneter Tarif und weitere Betriebsprüfungen sind vor dem offiziellen Start erforderlich.

## Apps

Interner Android-Stand: Kunden-App 0.6.6 / Build 20, Fahrer-App weiterhin 0.6.4 / Build 18: Die Fahrer-App startet nach der eigenen Anmeldung direkt im nativen Cockpit. Helle native Mapbox-3D-Karte, GPS, Schicht, Fahrzeugwechsel, Fahrtangebote, Statusgesten, Kassieren, Tagesumsatz, Fahrzeuge/Team und Bordbestand benötigen keine eingebettete Fahrer-Webseite mehr. Die Kunden-Fahrtenübersicht mit Reservierungen, festen Details und ausschließlich per Wischen bestätigter Stornierung ist ebenfalls nativ. Das Kunden-Buchungsformular mit Adresssuche, GPS-Abholort, Reservierungszeit, Kilometerangebot, Fahrtwünschen, Bordkarte und Wischbestätigung ist jetzt nativ. Die Kunden-Live-Karte und freie Punktwahl auf der Karte bleiben eingebettet. Details: `docs/NATIVE-BOOKING-066.md`. Details: `docs/NATIVE-CUSTOMER-TRIPS-063.md`. Die Kunden-Fahrtenansicht verwirft und beendet alte Leseanfragen beim Wechsel in den Hintergrund und lädt beim Zurückkehren sofort neu; Schreibvorgänge werden dabei nicht abgebrochen. Prüfstand: `docs/NATIVE-READ-RECOVERY-065.md`. Native Fahrzeug-Speicherung, getrennte Rückmeldungen und sichere Dialogränder: `docs/NATIVE-FLEET-SAVE-064.md`. Erweiterte Betreiberfunktionen bleiben im eigenen Webportal. GPS-Geräteprüfung und Store-Freigaben stehen aus. Startabsturz-Korrektur und Android-Emulatortests: `docs/ANDROID-STARTUP-061.md`. Einmalig die neuen internen APKs installieren. App Store und Google Play: bald verfügbar.


## Native Kundenbuchung

`CustomerBookingScreen` verbindet die bestätigte native Adressauswahl mit dem vorhandenen Strecken-/Buchungsserver. Ausstehende Anfragen werden vor dem Versand kontogebunden in SecureStore gesichert; nach verlorener Antwort oder Neustart wird dieselbe Quote mit unverändertem Inhalt bestätigt. Acht neue Controller- und vier tatsächliche Komponententests, insgesamt 336 Tests. Keine reale Production-Testfahrt. Kunden-APK 0.6.6 benötigt Installation; Fahrer-APK bleibt 0.6.4. Reale angemeldete Geräteprüfungen bleiben offen. Siehe `docs/NATIVE-BOOKING-066.md` und `docs/NATIVE-ADDRESS-SEARCH.md`.

Server-Stornierung bestätigt nach verlorener Antwort dieselbe bereits stornierte eigene Fahrt, ohne Zeitstempel oder Protokoll zu duplizieren. Sechs echte Endpunkt-/libSQL-Tests, Gesamtstand 342 Tests; keine neue APK erforderlich. Details: `docs/BOOKING-CANCEL-RETRY.md`.
