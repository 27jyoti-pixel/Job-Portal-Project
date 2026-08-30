let jobs_container = document.querySelector(".jobs");
let search = document.querySelector(".search")
let jobs = []

let reset = document.querySelector('.reset')
let top2 = document.querySelector(".top2")

let resetMssg = null
let applicationContainer = document.createElement('div')
applicationContainer.classList.add('application-container')
applicationContainer.style.display="none"
document.querySelector('main').appendChild(applicationContainer)


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


    apply.addEventListener('click',()=>{
      
      let x = document.querySelector('.application-form')
      console.log(x)
      if(x){
        return;
      }
      let form = document.createElement('form')
      form.classList.add('application-form')
      let heading = document.createElement('h1')
      heading.classList.add('heading')
      heading.style.fontFamily="Arial,sans-serif"
      heading.textContent = `Apply for ${ele.title}`
      form.appendChild(heading)

      let ipt1 = document.createElement('div')
      ipt1.classList.add('name-input')
      let label = document.createElement('label')
      label.textContent='Name'
      label.style.fontSize="20px"
      ipt1.appendChild(label)
      let name = document.createElement('input')
      name.classList.add('inputField')
      name.type="text"
      name.placeholder="Enter your full name"
      ipt1.appendChild(name)
      form.append(ipt1)
      let ipt2 = document.createElement('div')
      ipt2.classList.add('name-input2')
      label = document.createElement('label')
      label.textContent = "Email"
      ipt2.appendChild(label)
      let email = document.createElement('input')
      email.classList.add('inputField')
      email.type="email"
      email.placeholder="Enter your email"
      ipt2.appendChild(email)
      form.append(ipt2)
      let button = document.createElement('div')
      button.classList.add('form-button')
      let submit = document.createElement('button')
      submit.classList.add('submit')
      submit.textContent="Submit"
      submit.type="submit"
      button.appendChild(submit)
      let cancel = document.createElement('button')
      cancel.classList.add('cancel')
      cancel.textContent="Cancel"
      cancel.type="button"
      button.append(cancel)
      form.append(button)
      applicationContainer.appendChild(form)
      jobs_container.style.display="none"
      applicationContainer.style.display="flex"

    
      cancel.addEventListener('click',()=>{
        applicationContainer.style.display="none"
        jobs_container.style.display="grid"
        form.remove()
      })

      form.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(name.value.length===0 || email.value.length===0){
          applicationContainer.innerHTML=''
          let mssg  =document.createElement('p')
          mssg.textContent='Enter valid details'
          mssg.style.fontSize="25px"
          mssg.style.color="red"
          applicationContainer.appendChild(mssg)
          return;
        }
        fetch('/applications',{
          method : 'POST',
          headers : {
            'Content-type' : 'application/json'
          },
          body : JSON.stringify({
            name : name.value,
            email : email.value,
            job : ele.title
          })
        })
        .then((res)=>{
          console.log("response received")
          return res.json()
        })
        .then((data)=>{
          let mssg  =document.createElement('p')
          mssg.textContent=data.message
          mssg.style.fontSize="25px"
          mssg.style.color="#27A844"
          applicationContainer.appendChild(mssg)
          form.style.display="none"
          let viewApplication = document.createElement('button')
          viewApplication.classList.add('submit')
          viewApplication.textContent='View Application'
          applicationContainer.appendChild(viewApplication)
          viewApplication.style.width = "200px"
          let back = document.createElement('button')
          back.textContent="Back to Jobs"
          back.classList.add('submit')
          back.style.width="200px"
          applicationContainer.appendChild(back)

          viewApplication.addEventListener('click',()=>{
            fetch('/applications',{
              method : 'GET'
            })
            .then((res)=>{
              return res.json();
            })
            .then((data)=>{
              if(data.length===0){
                applicationContainer.innerHTML=''
                let mssg = document.createElement('p')
                mssg.textContent='No application found'
                applicationContainer.appendChild(mssg)
                return;
              } 
              applicationContainer.innerHTML=''
              data.forEach((ele)=>{
                let names = ele.name 
                let emails = ele.email 
                let job = ele.job
                
                let p = document.createElement('div')
                p.classList.add('p')
      
                let parent = document.createElement('div')
                parent.classList.add('parent')
                let n = document.createElement('div')
                n.classList.add('n')
                n.textContent='Name'
                parent.appendChild(n)
                let con = document.createElement('div')
                con.textContent=names 
                con.classList.add('con')
                parent.appendChild(con)
                p.appendChild(parent)


                parent = document.createElement('div')
                parent.classList.add('parent')
                let e = document.createElement('div')
                e.classList.add('e')
                e.textContent = 'Email'
                parent.appendChild(e)
                con = document.createElement('div')
                con.classList.add('con')
                con.textContent = emails
                parent.appendChild(con)
                p.appendChild(parent)

                parent = document.createElement('div')
                parent.classList.add('parent')
                let j = document.createElement('div')
                j.classList.add('j')
                j.textContent = 'Job Position'
                parent.appendChild(j)
                con = document.createElement('div')
                con.classList.add('con')
                con.textContent = job
                parent.appendChild(con)
                p.appendChild(parent)
                applicationContainer.appendChild(p)
                
              })
              
            })
          })


          back.addEventListener('click',()=>{
            applicationContainer.style.display="none"
            jobs_container.style.display="grid"
            form.remove()
          })
        })
      })
    })
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


reset.addEventListener('click',()=>{
  fetch('/applications',{
    method : "DELETE"
  })
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    if(resetMssg){
      resetMssg.remove()
    }
    resetMssg = document.createElement('p')
    resetMssg.textContent=data.message
    resetMssg.style.fontSize = "20px"
    resetMssg.style.color = "red"
    top2.appendChild(resetMssg)
    top2.style.display="flex"
    top2.style.gap = "20px"

    setTimeout(()=>{
      resetMssg.remove()
      resetMssg=null
    },3000)
  })
})