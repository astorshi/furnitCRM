const $clientsContainer = document.querySelector(".clientsContainer");
const $formLeaveComment = document.forms.leavecomment;

$clientsContainer.addEventListener("click", async (e) => {
  if (e.target.dataset.button === "deleteClient") {
    console.log(2222);
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

$formLeaveComment.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const clientId = e.target.closest("[data-id]").dataset.id;
  console.log("clientId===>", clientId);
  console.log("formData==>>", formData);
  const response = await fetch("/clients/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: formData.body, clientId }),
  });
  const dataFromServer = await response.json();
});
