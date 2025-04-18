const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  toggleBtn.classList.toggle('open');
});



var section = "";
var count = 0;
var allitem = [
  {
    img: "https://th.bing.com/th/id/OIP.cZr5G9HaDP59K1NNbyi1tAHaLb?rs=1&pid=ImgDetMain",
    name: "Espresso",
    price: "150",
  },
  {
    img: "https://static.vecteezy.com/system/resources/previews/036/519/800/non_2x/ai-generated-cardboard-coffee-cup-clipart-design-illustration-free-png.png",
    name: "Latte",
    price: "160",
  },
  {
    img: "https://th.bing.com/th/id/OIP.fYtD-Bxxl2lfPbA0iKheMAAAAA?w=391&h=626&rs=1&pid=ImgDetMain",
    name: "Cappuccino",
    price: "100",
  },
];



// dito ako nag lalagay ng usernmae at i lalay ko sa data base

function displayname() {
  fetch('/dash')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error('Failed to fetch data');
      }
    })
    .then(data => {
      if (typeof data === 'object') {
        console.log('Username from session:', data.username);
        document.getElementById('username').innerHTML = data.username;
        
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        console.error('Error:', data);
      }
    })
    .catch(err => {
      console.error('Error:', err)
}
  );
}

displayname();



// logout button to 
document.getElementById('logout').addEventListener("click", () => { 
  console.log('hellow');
  fetch('/logout')

    .then(res => { 
      if (!res.ok) { 
        return res.text().then(text => { throw new Error(text); });
      }
      return res.json(); 
    })
    .then(data => { 
      console.log('Successful logout:', data.msg);
      setTimeout(() => {
        window.location.href = '/login'; 
        // window.location.href = 'http://localhost:3000/register'; 
      }, 1000);
    })
    .catch(err => console.error("Failed logout:", err.message));
});





allitem.forEach((item, index) => {
  section += `
    <div class="menu-items">
      <div class="item">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>PESOS :${item.price}</p>
        <button class="checkout" data-index="${index}">checkout</button>
        <button class="add" data-index="${index}">Add to Cart</button>
      </div><br>
  `
});

document.getElementById("menu").innerHTML = section;



// adding to cart

var hol = document.querySelectorAll(".add");
hol.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    var index1 = e.target.dataset.index;

    if (confirm("Are you sure you want to add this item to the cart?")) {
      if (allitem && allitem[index1]) {
        count++;
        var item2 = {
          img: allitem[index1].img,
          name: allitem[index1].name,
          price: allitem[index1].price,
        };
        document.getElementById("count").innerHTML = count;

        
        fetch("/cart_items",{
        // fetch("http://localhost:3000/cart_items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item2),
        })
          .then((res) => {
            if (!res.ok) {

              throw new Error("Network response was not ok");
            }
            return res.json(); 
          })
          .then((data) => {
            console.log("Success:", data); 
          })
          .catch((error) => {
            console.error("Error:", error); 
          });
      }
    }
  });
});



