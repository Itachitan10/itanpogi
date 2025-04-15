
 document.getElementById("login_btn").onclick  =function (){
  const username1 = document.getElementById("username").value;
  const password1 = document.getElementById("password").value;

  
  if(!username1 || !password1){ 
    alert('pls inter username and password');
    document.getElementById('message').innerText ='pls enter password or username';
  }else
    try {
    response =  fetch("/login1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username1, password1 }),
    })
    .then(response => {
      if (!response.ok) {
        alert('invalid  allusernmae password')
  
      } else {
        setTimeout(() => {
          window.location.href='/dashboard'
        }, 2000);
        alert("hellow welcome ", )
  
        return;
        

      }
    })

  } catch (error) {
    alert("Invalid username or password")

  }
}


