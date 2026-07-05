const cart = JSON.parse(localStorage.getItem("cart")) || [];

const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
}, 0);

document.getElementById("checkout-total").innerHTML =
    "Total Pembayaran : Rp " +
    total.toLocaleString("id-ID");

const form = document.getElementById("checkout-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if(
        name==="" ||
        email==="" ||
        phone==="" ||
        address==="" ||
        payment===""){
            alert("Semua data harus diisi!");
            return;
    }
trackEvent("Checkout Berhasil");
    alert(
`🎉 Pembayaran Berhasil!

Terima kasih ${name}
Pesanan Anda sedang diproses.`
    );

    localStorage.removeItem("cart");

    window.location.href="index.html";

});