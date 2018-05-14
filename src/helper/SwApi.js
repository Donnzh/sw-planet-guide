
export function fetchSWApi () {
  return fetch('https://swapi.co/api/planets/')
    .then(res => res.json())
    .then(body => {
      const apiPromises = [];
      const totalPage = Math.ceil(body.count / body.results.length)
      const pagesRequired = totalPage;
      for (let i = pagesRequired; i > 0; i--) {
        apiPromises.push(fetch('https://swapi.co/api/planets/?page=' + i).then(res => res.json()));
      }
      return Promise.all(apiPromises)
        .then(res => {
          let results = [];
          res.map(r => results.push(...r.results))
          return results
        })
    })
    .catch((error) => {
      console.log('error', error)
    })
}


export function fetchResidentsApi (urls) {
  let apiPromises = urls.map(url => {
    return fetch(url).then(res => res.json())
  })
  return Promise.all(apiPromises)
    .then()
    .catch((error) => {
      console.log('error', error)
    })
}
