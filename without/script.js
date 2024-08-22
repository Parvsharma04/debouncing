const search = document.getElementById('search');
const queryList = document.getElementById('query-list');
async function getData(item){
  const response = await fetch(`https://dummyjson.com/products/search?q=${item}`)
  const data = await response.json()
  return data.products;
}

async function lookUp(e){
  queryList.innerHTML = "";
  if(e.target.value != ""){
    let data = await getData(e.target.value);
    data.forEach(element => {
      const li = document.createElement('li')
      li.innerText = element.title
      queryList.append(li);
    });
  }
  else{
    let noData = document.createElement('li');
    noData.innerText = "No Result"
    queryList.append(noData)
  }
}

search.addEventListener("keyup", lookUp);

