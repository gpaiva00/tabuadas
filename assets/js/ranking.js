db.info().then(info => {
  console.log("db info", info)
  totalUsers = info.doc_count
})

const refreshUsers = () => {
  db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
    console.log("docs", doc.rows)
    doc.rows.sort((a,b) => (a.doc.score < b.doc.score) ? 1 : ((b.doc.score < a.doc.score) ? -1 : 0)); 

    refreshRankingTable(doc.rows)
  })
}

const tag = t => contents => `<${t}>${contents}</${t}>`

const refreshRankingTable = rows => {
  let items = rows.map((row, index) => {
    const id = tag("th")(index+1)
    const name = tag("td")(row.doc.name)
    const score = tag("td")(row.doc.score)

    const item = [id, name, score].join("")

    return tag("tr")(item)
  })

  // console.log('items', items);

  tBody.innerHTML = items.join("")
}

const refreshPlayerScore = score => {
  const _id = localStorage.getItem("_id")
  console.log("update score", _id)

  db.get(_id).then(doc => {
    doc.score = score
    return db.put(doc)
  })
}

db.changes({
  since: "now",
  live: true
}).on("change", refreshUsers)

{
  /* <tr>
    <th scope="row">1</th>
      <td>Mark</td>
      <td>30</td>
  </tr> */
}

// const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)

// const set = prop => obj => value => ((obj[prop] = value), obj)

// const setInnerHtml = set("innerHTML")
