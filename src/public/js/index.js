const $clientsContainer = document.querySelector(".clientsContainer");
const $formLeaveComment = document.forms.leavecomment;

$clientsContainer?.addEventListener("click", async (e) => {
  if (e.target.dataset.button === "deleteClient") {
    const client = e.target.closest("[data-id]");
    const clientId = client.dataset.id;
    const response = await fetch(`/clients/${clientId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      client.remove();
    }
  }
});

$clientsContainer?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  console.log(e.target);
  console.log('formData===>', formData);
  const clientId = e.target.closest("[data-id]").dataset.id;
  const response = await fetch(`/clients/comment/${clientId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: formData.body}),
  });
  const dataFromServer = await response.json();
  console.log('dataFromServer===>', dataFromServer);
  e.target.closest("[data-id]").querySelector(".comments").insertAdjacentHTML(
    "afterbegin",
    `<p>${dataFromServer.body}</p>
  <p>Дата комментария: ${dataFromServer.date}</p>
  <p>Автор комментария: ${dataFromServer.user}</p>
  <hr>`
  );
  e.target.reset()
});
