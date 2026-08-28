let jobs_container = document.querySelector(".jobs");
let search = document.querySelector(".search")
let jobs = []


fetch('/jobs')
.then((response)=>{
  return response.json();
})
.then((data)=>{
  // here data is an arr of objects
  jobs = data;
  createCards(data);
})

function createCards(jobs){
  jobs.forEach((ele)=>{
    let card = document.createElement('div')
    card.classList.add('card')
    let c_title = document.createElement('div')
    c_title.textContent = (ele.title)
    c_title.classList.add('c-top')
    card.appendChild(c_title)

    let date = document.createElement('div')
    date.textContent = ele.date
    date.classList.add('c-top2')
    card.appendChild(date)

    let mid = document.createElement('div')
    mid.classList.add('c-mid')
    let mid_top = document.createElement('div')
    mid_top.classList.add('c-mid-top')
    mid_top.textContent = ele.head
    mid.appendChild(mid_top) 

    let mid_bottom = document.createElement('div')
    mid_bottom.classList.add('c-mid-mid')
    let button = document.createElement('button')
    button.textContent = ele.skills[0]
    button.classList.add('c-but')
    mid_bottom.appendChild(button)
    button = document.createElement('button')
    button.classList.add('c-but')
    button.textContent = ele.skills[1]
    mid_bottom.appendChild(button)
    button = document.createElement('button') 
    button.classList.add('c-but')
    button.textContent = ele.skills[2]
    mid_bottom.appendChild(button)
    mid.appendChild(mid_bottom)
    card.appendChild(mid)

    let bottom = document.createElement('div')
    bottom.classList.add('c-bottom')
    let salary = document.createElement('div')
    salary.classList.add('l')
    salary.textContent = ele.salary
    bottom.appendChild(salary)

    let place = document.createElement('div')
    place.classList.add('m')
    place.textContent=ele.place
    bottom.appendChild(place)
    card.appendChild(bottom)

    let right = document.createElement('div')
    right.classList.add('r')
    let apply = document.createElement('button')
    apply.textContent = "Apply"
    right.appendChild(apply)
    card.appendChild(right)
    jobs_container.appendChild(card)
  })
}


search.addEventListener('input',()=>{
  let ipt = search.value 
  let filteredJobs = jobs.filter((ele)=>{
    return ele.title.includes(ipt);
  })
  
  jobs_container.innerHTML=""
  createCards(filteredJobs);
})