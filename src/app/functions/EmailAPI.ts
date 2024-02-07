export async function sendEmail() {
  await fetch("http://localhost:9000/send-email", { method: "POST" });
}
