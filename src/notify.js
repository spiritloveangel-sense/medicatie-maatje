export function vraagMeldingToestemming() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

export function stuurMelding(tekst) {
  if (Notification.permission === "granted") {
    new Notification(tekst);
  }
}
