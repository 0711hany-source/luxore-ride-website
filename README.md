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

Interner Android-Stand: Kunden-App 0.6.9 / Build 23, Fahrer-App 0.8.4 / Build 38: Die Fahrer-App startet nach der eigenen Anmeldung direkt im nativen Cockpit. Helle native Mapbox-3D-Karte, GPS, Schicht, Fahrzeugwechsel, Fahrtangebote, Statusgesten, Kassieren, Tagesumsatz, Fahrzeuge/Team und Bordbestand benötigen keine eingebettete Fahrer-Webseite mehr. Die Kunden-Fahrtenübersicht mit Reservierungen, festen Details und ausschließlich per Wischen bestätigter Stornierung ist ebenfalls nativ. Das Kunden-Buchungsformular mit Adresssuche, GPS-Abholort, Reservierungszeit, Kilometerangebot, Fahrtwünschen, Bordkarte und Wischbestätigung ist jetzt nativ. Die freie Kartenpunktwahl für Abholort und Ziel ist nativ. Die Kunden-Live-Karte ist nativ: exakte Fahrtauswahl, helle Route, frische Fahrerposition bzw. drei anonymisierte Suchfahrzeuge, einklappbares Fahrtdetailfeld und Sicherheitsseite. Details: `docs/NATIVE-CUSTOMER-LIVE-068.md`. Details: `docs/NATIVE-MAP-POINT-067.md`. Details: `docs/NATIVE-BOOKING-066.md`. Details: `docs/NATIVE-CUSTOMER-TRIPS-063.md`. Die Kunden-Fahrtenansicht verwirft und beendet alte Leseanfragen beim Wechsel in den Hintergrund und lädt beim Zurückkehren sofort neu; Schreibvorgänge werden dabei nicht abgebrochen. Prüfstand: `docs/NATIVE-READ-RECOVERY-065.md`. Native Fahrzeug-Speicherung, getrennte Rückmeldungen und sichere Dialogränder: `docs/NATIVE-FLEET-SAVE-064.md`. Erweiterte Betreiberfunktionen bleiben im eigenen Webportal. GPS-Geräteprüfung und Store-Freigaben stehen aus. Startabsturz-Korrektur und Android-Emulatortests: `docs/ANDROID-STARTUP-061.md`. Einmalig die neuen internen APKs installieren. App Store und Google Play: bald verfügbar.


## Native Kundenbuchung

`CustomerBookingScreen` verbindet die bestätigte native Adressauswahl mit dem vorhandenen Strecken-/Buchungsserver. Ausstehende Anfragen werden vor dem Versand kontogebunden in SecureStore gesichert; nach verlorener Antwort oder Neustart wird dieselbe Quote mit unverändertem Inhalt bestätigt. Acht neue Controller- und vier tatsächliche Komponententests, insgesamt 336 Tests. Keine reale Production-Testfahrt. Kunden-APK 0.6.6 benötigt Installation; Fahrer-APK bleibt 0.6.4. Reale angemeldete Geräteprüfungen bleiben offen. Siehe `docs/NATIVE-BOOKING-066.md` und `docs/NATIVE-ADDRESS-SEARCH.md`.

Server-Stornierung bestätigt nach verlorener Antwort dieselbe bereits stornierte eigene Fahrt, ohne Zeitstempel oder Protokoll zu duplizieren. Sechs echte Endpunkt-/libSQL-Tests, Gesamtstand 342 Tests; keine neue APK erforderlich. Details: `docs/BOOKING-CANCEL-RETRY.md`.

## Native Kartenpunktwahl · 10. Oktober

Abholort und Ziel lassen sich auf einer festen nativen Mapbox-Karte wählen. Bestätigung erst nach geladenen Karten, Straßenmaßstab und Ende der Kamerabewegung; Verschieben löst keine Adresssuche aus. 15 neue Prüfungen, insgesamt 357 Tests, TypeScript und gezieltes Lint bestanden. Kunden-APK 0.6.7 benötigt Installation, Fahrer-APK bleibt 0.6.4. Die Kunden-Live-Karte wurde danach nativ integriert; reale angemeldete Geräteprüfungen bleiben offen. Details: `docs/NATIVE-MAP-POINT-067.md`.

## Zuverlässige Karten-/GPS-Auswahl · 11. Oktober

Selbst gewählte gültige Karten-/GPS-Koordinaten bleiben bei ausgefallenem Reverse-Adressdienst oder erschöpftem Kontingent mit neutraler Bezeichnung bestätigbar. Textadressen und Sicherheits-/Speicherfehler werden weiterhin geprüft. Neun neue Endpunkt-/SQLite-Tests, insgesamt 366 Tests bestanden. Serveränderung ohne neue APK oder Budgetwechsel. Details: `docs/COORDINATE-GEOCODING-RECOVERY.md`.

## Native Kunden-Live-Karte: vorbereiteter Datenfluss

Kontogebundener Controller verwirft verspätete Antworten, schützt die gewählte Fahrt und zeigt nur frische zugeordnete GPS-Daten beziehungsweise maximal drei anonyme Suchfahrzeuge. Bei Netzverlust keine Live-Behauptung, bei verlorener Anmeldung keine alten Fahrtdetails. 16 zusätzliche Tests. Der Baustein ist inzwischen an App.tsx und die native Live-Karte angeschlossen. Aktueller Prüfstand: `docs/NATIVE-CUSTOMER-LIVE-068.md`. Details: `docs/NATIVE-CUSTOMER-LIVE-STATE.md`.


## Native Live-Ansicht · 11. Oktober

Native Kunden-Live-Karte mit eigener Fahrtauswahl, geschütztem SDK-Start, festen wischbaren Details und nativem Sicherheitsdialog integriert. Neun zusätzliche Prüfungen, Gesamtstand 391 Tests. Hintergrund stoppt tatsächliche Leseanfragen und Polls; veraltete Marker/Kontakte werden auch bei hängender Antwort entfernt. Zusätzliche Bordbestellungen während der Fahrt sind nativ mit vollständiger Wischbestätigung, einmaliger Anfragequittung und kontogebundener geschützter Wiederholung umgesetzt. Angemeldete physische Mehrgeräteprüfung bleibt offen. Details: `docs/NATIVE-CUSTOMER-BOARD-069.md`. Kunden-APK 0.6.9 benötigt Installation; Fahrer bleibt 0.6.4. Details: `docs/NATIVE-CUSTOMER-LIVE-068.md`.

Fahrerfreigaben in der Disposition prüfen Konten und aktuelle Flottenrechte im gemeinsamen Schreibzugriff. Freigabe, Angebotsrücknahme und Audit speichern atomar; wiederholte Freigabe erhält bestehende Online-/GPS-Schichten. Details: `docs/ATOMIC-DRIVER-APPROVAL.md`. Keine neue APK für diese Serverkorrektur.


## Native Disposition · 12. Oktober

Eigene native Dispositionsübersicht mit Flottenauswahl, Tagesumsatz, Team und aktuellen Fahrten. Festes Fahrerfenster bestätigt Freigaben ausschließlich per Wischen, aktuelle Serverrechte entscheiden. Netzverlust/Hintergrund/alte Antworten und unklare Speicherantworten sind abgesichert. Zwölf neue Controller-/Komponententests, insgesamt 425 Tests bestanden. Fahrer-APK 0.7.0 benötigt Installation; Kunden-APK bleibt 0.6.9. Nicht zugeordnete Profile und erweiterte Teamverwaltung bleiben im eigenen Webportal, physische angemeldete Geräteprüfungen offen. Details: `docs/NATIVE-OPERATIONS-070.md`.


Stellvertretungswahl und Besitzerübergabe prüfen die aktuellen Leitungsrechte/Kontosperren im gleichen Schreibzugriff wie Änderung und Audit. Speicherfehler hinterlassen keine teilweise geänderten Rechte; GPS-Schichten und bestehende Einsatz-/Zahlungssperren bleiben erhalten. Zehn zusätzliche echte Endpunkt-/libSQL-Tests, insgesamt 435 Tests. Keine neue APK oder Migration für diesen Serverfix; Details: `docs/ATOMIC-FLEET-LEADERSHIP.md`.


## Flotteneinladungen · 13. Oktober

Gültige Beitrittswiederholung bestätigt vorhandene Mitgliedschaft ohne Rücksetzung von Fahrzeug, Fahrerfreigabe oder GPS-Schicht. Einladung, Beitritt und Audit speichern mit aktuellen Konten-/Flottenrechten gemeinsam; Speicherfehler rollen Änderungen zurück. Zehn neue Endpunkt-/libSQL-Tests, insgesamt 445 Prüfungen bestanden. Keine Migration oder APK nötig; native Einladungsoberfläche und physische Geräteprüfungen bleiben offen. Details: `docs/FLEET-INVITE-RETRY.md`.


Teamzuordnung und Entfernung prüfen aktuelle Flotten-/Kontenrechte im gemeinsamen Schreibzugriff mit Fahrerreset, Angebotsrücknahme und Audit. Verlorene Leitungsrechte oder gelöschte Zielflotten können keine veraltete Änderung mehr erlauben. Zehn zusätzliche echte Endpunkt-/libSQL-Tests, insgesamt 455 Tests. Keine neue APK oder Migration; native Einladung-/Teamoberfläche bleibt offen. Details: `docs/ATOMIC-FLEET-MEMBERSHIP.md`.


## Native Flotteneinladungen · 13. Oktober

Fester nativer Menü-/Dispositionseinstieg zum Codebeitritt und Erstellen eigener Leitungseinladungen. Beide Bestätigungen ausschließlich per vollständiger Wischgeste; aktuelle Serverrechte entscheiden. Hintergrund/Kontowechsel/alte Antworten und unklare Speicherantworten abgesichert, keine automatische Wiederholung. Elf neue Controller-/echte Komponententests, Gesamtstand 466. Fahrer-Update 0.7.1 erforderlich, Kunde bleibt 0.6.9. Erweiterte Teamzuordnung und echte angemeldete Geräteprüfung offen. Details: `docs/NATIVE-FLEET-INVITATIONS-071.md`.


## Native Stellvertretung · 13. Oktober

Feste native Auswahl/Aufhebung einer Stellvertretung aus dem tatsächlichen Team der jeweiligen Flotte, nur für Besitzer oder vorhandenen Plattformbetreiber. Ausschließlich vollständige Wischbestätigung; bestehender atomarer Server entscheidet. Fahrerfreigabe und Stellvertretung teilen die Änderungssperre, unklare Antwort erlaubt nur gleiche Auswahl bis Serverklärung. Älterer Codebeitritt per Tippen im Fahrzeugbereich durch Einstieg zur nativen Einladungsseite ersetzt. Neun zusätzliche Tests, insgesamt 475. Fahrer-Update 0.7.2 nötig, Kunde unverändert 0.6.9; physische angemeldete Prüfungen offen. Details: `docs/NATIVE-DEPUTY-072.md`.


## Native Teamverwaltung · 14. Oktober

Feste native Mitarbeiterzuordnung/Entfernung in der Disposition mit tatsächlichem Team, bestehenden Rollen und Einsatzsperren. Zuordnung nur vorhandener Plattformbetreiber, Entfernung eigene Leitung/Betreiber; vollständiges Wischen, gemeinsamer Schutz vor parallelen/unklaren Änderungen. Acht Controller-/drei tatsächliche Komponententests, insgesamt 486. Fahrer-Update 0.7.3 erforderlich, Kunde bleibt 0.6.9; physische angemeldete Geräteprüfung offen. Details: `docs/NATIVE-TEAM-073.md`.


## Zuverlässige Flottengründung · 14. Oktober

Neue Flotte, Besitzerzuordnung und Audit speichern mit aktuellen Konten-/Leitungs-/Einsatzprüfungen atomar. Identischer aktueller Erstellungsretry mit derselben UUID verändert keine spätere GPS-Schicht und erzeugt keine zweite Flotte oder Auditkopie; andere Namen/Besitzer bleiben Konflikt. Zehn neue echte Endpunkt-/libSQL-Prüfungen, insgesamt 496 Tests. Keine neue APK oder Migration für diesen Serverfix; natives Gründungsformular und physische Geräteprüfungen bleiben offen. Details: `docs/ATOMIC-FLEET-CREATION.md`.

## Native Flottengründung · 14. Oktober

Fester Name-/Besitzerdialog in der Fahrer-Disposition mit bestehendem Plattformbetreiberzugriff und vollständiger Wischbestätigung. Kontogebundene UUID und Entwurf werden vor HTTP geschützt gespeichert; nach Netzverlust/Neustart bleibt derselbe Auftrag erhalten, aktueller GET kann die identische Gründung klären. Keine automatische Wiederholung oder neue Rechte. 16 neue Prüfungen, insgesamt 512 Tests. Fahrer-Update 0.7.4 erforderlich; Kunde 0.6.9 unverändert. Physische angemeldete Geräte-/Hintergrund-GPS-Prüfungen offen. Details: `docs/NATIVE-FLEET-CREATE-074.md`.

## GPS-Status nach Rückkehr · 14. Oktober

Verspätete native GPS-Statusantworten überschreiben keine inzwischen pausierte oder neu bestätigte Schichtanzeige. Eigene Abfragenreihenfolge, Hintergrund-/Neustart-/Unmountschutz und Erhalt des tatsächlichen Hintergrunddienstes. Sechs tatsächliche Hooktests, fünf scheitern im alten Stand; insgesamt 518 Tests. Fahrer-Update 0.7.5 nötig; physische angemeldete Straßen-/Hintergrundprüfung offen. Details: `docs/NATIVE-GPS-STATUS-075.md`.

## Fahrer und Route nach Rückkehr · 14. Oktober

Native Fahreransicht beendet veraltete Leseanfragen beim Hintergrund-/Seiten-/Phasenwechsel und lädt bei Rückkehr sofort neu. Fahrt-/Schichtbestätigungen bleiben unabhängige Schreibvorgänge; Kontowechsel und aktuelle 401/403 verwerfen alte Fahrtdaten. Acht tatsächliche Komponententests scheitern zuvor, Gesamtstand 526. Fahrer-Update 0.7.6 nötig; angemeldete physische Prüfung offen. Details: `docs/NATIVE-DRIVER-READ-076.md`.

Native Besitzerübergabe ist ausschließlich dem vorhandenen Plattformbetreiber zugänglich: tatsächliche freigegebene Offline-Zielperson, erwarteter bisheriger Besitzer und vollständige Wischgeste. Nach verlorener Antwort zuerst Serverstand, kein automatischer Übergabe-POST. Acht Controller- und drei echte Oberflächentests, Gesamtstand 537. Fahrer-Update 0.7.7 erforderlich; keine Production-Leitungsänderung, physische angemeldete Prüfung offen. Details: `docs/NATIVE-OWNER-TRANSFER-077.md`.

Die native einmalige GPS-Erstortung bleibt an ihren ursprünglichen Dienststart gebunden: verspätete Punkte nach Pause, Freigabeerneuerung oder Schichtwechsel werden weder unter neuer Freigabe hochgeladen noch in deren Cache gespeichert. Drei tatsächliche Regressionen scheitern zuvor; sechs neue Ortungsdiensttests sichern auch Netzverlust und alte Upload-Ablehnungen. Fahrer-Update 0.7.8 nötig, physische angemeldete Prüfung offen. Details: `docs/NATIVE-GPS-INITIAL-078.md`.

Native Fahrtalarme rechnen Wartezeiten der aktuellen Standortfreigabeprüfung in ihre verbleibende Dauer ein und prüfen nach dem Entfernen eines bisherigen Alarms erneut die ursprüngliche Deadline. Abgelaufene oder höchstens zwei Sekunden verbleibende Angebote erzeugen dann keinen neuen nativen Planungsaufruf. Sechs neue Tests, vier zuvor fehlgeschlagen. Fahrer-Update 0.7.9 nötig; tatsächliche angemeldete Geräte-/Hintergrundprüfung offen. Details: `docs/NATIVE-OFFER-DEADLINE-079.md`.

Native Fahrtalarme prüfen die aktuelle Standortfreigabe zusätzlich nach nativer Berechtigungs-/Kanalprüfung und Alarmbereinigung vor neuer Planung. Upload-Antworten bleiben an ursprüngliche Dienstversion, sessionId und Token gebunden. Sechs neue Tests, fünf zuvor fehlgeschlagen. Fahrer-Update 0.8.0 erforderlich; tatsächliche angemeldete Ton-/Schicht-/Hintergrundprüfung offen. Details: `docs/NATIVE-OFFER-SESSION-080.md`.

Native Standortfreigabe bleibt bei Fehlern der Benachrichtigungs-API nutzbar: Ortungsstatus und Wiederaufnahme liefern den tatsächlichen GPS-Stand, Alarmstatus wird bei Lesefehler als nicht verfügbar markiert. Echte Standortfehler und fehlende Rechte bleiben gesperrt; ausdrücklich angeforderter Testalarm meldet Fehler weiter. Neun zusätzliche Tests, sieben zuvor fehlgeschlagen. Fahrer-Update 0.8.1 erforderlich; physische angemeldete Prüfungen offen. Details: `docs/NATIVE-NOTIFICATION-RECOVERY-081.md`.

Native GPS-Starts prüfen nach Alarmbereinigung, Cachelöschung, Credentialspeicherung und nativem Dienststart erneut ihre ursprüngliche Lifecycle-Version. Überholte Starts speichern bzw. starten nicht weiter und bestätigen keine inzwischen beendete Freigabe. Sieben neue Tests, fünf zuvor fehlgeschlagen; Fahrer-Update 0.8.2 erforderlich. Bereits begonnene native Operationen müssen auslaufen; physische angemeldete Prüfungen offen. Details: `docs/NATIVE-LOCATION-TRANSITIONS-082.md`.

Native GPS-Verarbeitung sperrt alte Freigaben bereits beim Beginn von Pause/Neustart. Cache, HTTP und Alarmantworten prüfen ursprüngliche Version, Session und Token nach den Speicherabfragen; die passende erfolgreiche Startversion öffnet die Übertragung wieder. Gültige gespeicherte Freigaben bleiben in einer frischen Laufzeit wiederherstellbar. Acht neue Tests, sechs zuvor fehlgeschlagen. Fahrer-Update 0.8.3 erforderlich, physische angemeldete Prüfungen offen. Details: `docs/NATIVE-UPLOAD-AUTHORIZATION-083.md`.

Native Pause versucht nach zurückgewiesenen Speicher-/Dienstaufrufen weitere Bereinigung und die bestehende Servermeldung mit zuvor gelesenen Credentials. Nicht lesbare Credentials werden nicht ersetzt; lokale Fehler werden anschließend weiterhin gemeldet. Neun zusätzliche Tests, sechs zuvor fehlgeschlagen. Fahrer-Update 0.8.4 nötig, physische angemeldete Prüfung offen. Details: `docs/NATIVE-PAUSE-CLEANUP-084.md`.
