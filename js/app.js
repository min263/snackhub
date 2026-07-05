const productList = document.getElementById("product-list");

function formatRupiah(angka){
    return "Rp " + angka.toLocaleString("id-ID");
}

function displayProducts(data){

    productList.innerHTML="";

    data.forEach(product=>{

        productList.innerHTML += `
        
        <div class="product-card">

    <span class="badge">🔥 Promo</span>

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>
                <p style="color:#f59e0b;">
⭐⭐⭐⭐⭐ <span style="color:#555;">4.9</span>
</p>

                <p class="category">${product.category}</p>

                <p class="price">${formatRupiah(product.price)}</p>

            <div style="display:flex; gap:10px; justify-content:center;">

    <button onclick="showDetail(${product.id})">
        👁 Detail
    </button>

    <button onclick="addToCart(${product.id})">
        🛒 Beli
    </button>

</div>

            </div>

        </div>

        `;

    });

}

displayProducts(products);

function addToCart(id){

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            ...product,
            quantity:1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

trackEvent("Tambah Produk");

alert(product.name + " berhasil ditambahkan ke keranjang 🛒");
}
// ==========================
// SEARCH & FILTER
// ==========================

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

function filterProducts(){

    const keyword = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    const filtered = products.filter(product => {

        const matchName = product.name.toLowerCase().includes(keyword);

        const matchCategory =
            category === "all" ||
            product.category === category;

        return matchName && matchCategory;

    });

    displayProducts(filtered);

}

searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);
// ==========================
// MODAL DETAIL PRODUK
// ==========================

const modal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".close");

function showDetail(id) {

    const product = products.find(item => item.id === id);

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-name").innerText = product.name;
    document.getElementById("modal-price").innerText = formatRupiah(product.price);
    document.getElementById("modal-description").innerText = product.description;

    document.getElementById("modal-cart-btn").onclick = function () {
        addToCart(product.id);
    };

    modal.style.display = "block";
}
closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}