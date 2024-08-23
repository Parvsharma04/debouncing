const search = document.getElementById('search');
const queryList = document.getElementById('query-list');

async function getData(query) {
  const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await response.json();
  return data.products;
}

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log(this, args)
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce(async function(query) {
  const data = await getData(query);
  queryList.innerHTML = "";
  if (data.length > 0) {
    data.forEach(element => {
      const li = document.createElement('li');
      li.innerText = element.title;
      queryList.append(li);
    });
  } else {
    const li = document.createElement('li');
    li.innerText = "No Results";
    queryList.append(li);
  }
}, 1000);



search.addEventListener("keyup", function() {
  const query = search.value.trim();
  if (query) {
    debouncedSearch(query);
  } else {
    queryList.innerHTML = "";
    const noData = document.createElement('li');
    noData.innerText = "No Results";
    queryList.append(noData);
  }
});
