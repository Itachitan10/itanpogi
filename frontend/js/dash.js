
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      toggleBtn.classList.toggle("open");
    });
  } else {
    console.error("Menu toggle or nav-links not found!");
  }
});


var section = "";
var count = 0;
   export var allitem = [
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




// display on dasboard page
allitem.forEach((item, index) => {
  section += `
    <div class="menu-items">
      <div class="item">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>PESOS :${item.price}</p>
        <button id="checkout_btn" class="checkout" data-index="${index}">checkout</button>
        <button class="add" data-index="${index}">Add to Cart</button>
      </div><br>
  `;
});
document.getElementById("menu").innerHTML = section;

// checkout page


  var btn_check = document.querySelectorAll("#checkout_btn");
  
  btn_check.forEach(btn => {
    btn.addEventListener('click', (e) => {
      var unique_index = e.target.dataset.index;

      if (confirm('Are you sure to check out?')) {
        const dataindx = allitem[unique_index];

        // Save selected item to localStorage
        localStorage.setItem('selectedItem', JSON.stringify(dataindx));
        // Redirect to checkout page

        setTimeout(() => {
          // window.location.href = "http://localhost:3000/checkout";
          window.location.href = "/checkout";
        },3000);
     
      }
    });
  });





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
        // fetch("/cart_items", {

      
        add(item2)


      }
    }
  });
});


export function add(item2){
         fetch("/cart_items", {
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
  })

}

 function displayname() {
  // fetch("http://localhost:3000/dash")
    fetch("/dash")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.error("Failed to fetch data");
      }
    })
    .then((data) => {
      if (typeof data === "object") {
        console.log("Username from session:", data.username);
        document.getElementById("username").innerHTML = data.username;
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        console.error("Error:", data);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

displayname();



// logout button to
document.getElementById("logout").addEventListener("click", () => {
  console.log("hellow");
  fetch("/logout")
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log("Successful logout:", data.msg);
      setTimeout(() => {
        window.location.href = '/login';
        // window.location.href = 'http://localhost:3000/register';
      }, 1000);
    })
    .catch((err) => console.error("Failed logout:", err.message));
}); 