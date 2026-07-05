const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function rupiah(angka){
    return "Rp " + angka.toLocaleString("id-ID");
}

function displayCart(){

    cartItems.innerHTML="";

    let grandTotal = 0;

    if(cart.length===0){

        cartItems.innerHTML="<h3>Keranjang masih kosong.</h3>";
        total.innerHTML="";
        return;

    }

    cart.forEach(item=>{

        grandTotal += item.price * item.quantity;

        cartItems.innerHTML +=`

        <div class="product-card">

        <div class="product-info">

        <h3>${item.name}</h3>

        <p>${rupiah(item.price)}</p>

        <p>Jumlah : ${item.quantity}</p>

        <button onclick="increase(${item.id})">+</button>

        <button onclick="decrease(${item.id})">-</button>

        <button onclick="removeItem(${item.id})">
        Hapus
        </button>

        </div>

        </div>

        <br>

        `;

    });

    total.innerHTML="Total : "+rupiah(grandTotal);

}

displayCart();
function increase(id){

    cart.forEach(item=>{

        if(item.id===id){
            item.quantity++;
        }

    });

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function decrease(id){

    cart.forEach(item=>{

        if(item.id===id){

            if(item.quantity>1){
                item.quantity--;
            }

        }

    });

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function removeItem(id){

    cart = cart.filter(item=>item.id!==id);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}