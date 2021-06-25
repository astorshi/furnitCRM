$table = document.querySelector(".tbody");

const printAll = ({
  orderNumber,
  furnType,
  deliveryService,
  deliveryDate,
  deliveryPrice,
  assemblePrice,
  assembler,
  Price,
  Comment,
}) => `
<tr>
<th scope="row">1</th>
<td>${orderNumber}</td>
<td>${furnType}</td>
<td>${deliveryService}</td>
<td>${deliveryDate}</td>
<td>${deliveryPrice}</td>
<td>${assemblePrice}</td>
<td>${assembler}</td>
<td>${Price}</td>
<td>${Comment}</td>
</tr>`;

const main = async () => {
  console.log("Hello!!!");
  const request = await fetch("/orders");
  const orders = await request.json();
  $table.innerHTML = orders.map((el) => printAll(el)).join("");
};
main();
