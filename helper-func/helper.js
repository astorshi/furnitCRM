const hbs = require('hbs');

function helperCheckAndAdd(creatorId, localId, thisId) {
 
  if (creatorId == localId ) {
    return new hbs.SafeString(`
    <a href="/clients/${thisId}" class="btn btn-primary">редактировать данные клиента</a>
    <button data-button='deleteClient' type="submit" class="btn btn-primary">удалить клиента</button>
`
    )
  }
  if (localId == "60d58ddbb004854c13902d97") {
    return new hbs.SafeString(`
    <a href="/clients/${thisId}" class="btn btn-primary">редактировать данные клиента</a>
    <button data-button='deleteClient' type="submit" class="btn btn-primary">удалить клиента</button>
`
    )
  }
}

module.exports = { helperCheckAndAdd }

