Номер заказа Стоимость сборки Тип мебели Клиент

const printAll = ({orderNumber, furnType, deliveryService, deliveryDate, deliveryPrice, assemblePrice, assembler, Price, Comment}) => `
<div class="container">
  <div class="row">
    <div class="col-sm">
      ${orderNumber}
    </div>
    <div class="col-sm">
      ${furnType}
    </div>
    <div class="col-sm">
      ${deliveryService}
    </div>
    <div class="col-sm">
      ${deliveryDate}
    </div>
    <div class="col-sm">
      ${deliveryPrice}
    </div>
    <div class="col-sm">
      ${assemblePrice}
    </div>
    <div class="col-sm">
      ${assembler}
    </div>
    <div class="col-sm">
      ${Price}
    </div>
    <div class="col-sm">
      ${Comment}
    </div>
  </div>
</div>`


<tr>
<th scope="row">1</th>
<td>${orderNumber}</td>
<td>${furnType}</td>
<td>${deliveryService}</td>
<td>${deliveryDate}</td>
<td>${deliveryPrice}</td>
<td>${assembler}</td>
<td>${Price}</td>
<td>${Comment}</td>
</tr>



// <ul class="list-group">
//   <li class="list-group-item disabled">Cras justo odio</li>
//   <li class="list-group-item">Dapibus ac facilisis in</li>
//   <li class="list-group-item">Morbi leo risus</li>
//   <li class="list-group-item">Porta ac consectetur ac</li>
//   <li class="list-group-item">Vestibulum at eros</li>
// </ul>




const newOrder = `<form class="row g-3">
  <div class="col-12">
    <label class="form-label">Номер заказа</label>
    <input type="text" class="form-control" id="inputOrderNum" placeholder="12345">
  </div>
  <div class="col-md-6">
    <label class="form-label">Тип мебели</label>
    <input type="text" class="form-control" id="typeFyrn">
  </div>
  <div class="col-md-6">
    <label class="form-label">Служба доставки</label>
    <input type="text" class="form-control" id="constructDate">
  </div>
  <div class="col-md-6">
    <label class="form-label">Дата доставки</label>
    <input type="text" class="form-control" id="deliveryDate">
  </div>
  <div class="col-md-6">
    <label for="delivPrice" class="form-label">Стоимость доставки</label>
    <input type="text" class="form-control" id="delivPrice">
  </div>
  <div class="col-md-6">
    <label class="form-label">Стоимость сборки</label>
    <input type="text" class="form-control" id="constructPrice">
  </div>
  <div class="col-md-6">
    <label class="form-label">Сборщик</label>
    <input type="text" class="form-control" id="constructTeam">
  </div>
  <div class="col-md-6">
    <label class="form-label">Цена</label>
    <input type="text" class="form-control" id="typeFyrn">
  </div>
  <div class="col-md-6">
    <label class="form-label">Комментарии</label>
    <input type="text" class="form-control" id="Comments">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Отправить</button>
  </div>
</form>`


const fetchToAPI = async (method, body) =>
  fetch(apiAdress, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
