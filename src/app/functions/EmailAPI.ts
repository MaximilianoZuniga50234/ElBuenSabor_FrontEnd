export async function sendEmail(formData: FormData) {
  await fetch("http://localhost:9000/send-email", {
    method: "POST",
    body: formData,
  });
}
