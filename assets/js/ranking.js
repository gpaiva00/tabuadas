db.info().then((info) => {
  console.log('db info', info)
  totalUsers = info.doc_count
})

const newUser = ({user}) => {
  const newUser = {
    name: user.name,
    username: user.username,
    password: user.password,
    score: 0,
    _id: `${totalUsers+1}`
  } 

  db.put(newUser)

  totalUsers++

  closeModal.click()
}

const saveUser = () => {
  const user = {
    name: playerNameEl.value,
    username: finalUserName,
    password: playerPasswordEl.value
  }

  newUser({user})
}

const refreshUsers = () => {
  db.allDocs({include_docs: true, descending: true}, (err, doc) => {
    console.log('docs', doc.rows)
  
    refreshRankingTable(doc.rows)
  });
}

const tag = t => contents => `<${t}>${contents}</${t}>`

const refreshRankingTable = (rows) => {
  let items = rows.map(row => {
    
    const id    = (tag('th')(row.id))
    const name  = (tag('td')(row.doc.name))
    const score = (tag('td'))(row.doc.score)

    const item = [
      id, name, score
    ].join("")
    
    return tag('tr')(item)

  })

  // console.log('items', items);

  tBody.innerHTML = items.join("")
}

db.changes({
  since: 'now',
  live: true
}).on('change', refreshUsers)



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

