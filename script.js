const inputBox = document.querySelector("#input");
const qrImage = document.querySelector("#qrimage");
const imageBox = document.querySelector("#image-box");
const downloadBtn = document.querySelector("#downloadBtn");

function generateQR(){
    if(inputBox.value.length > 0){
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputBox.value;
        imageBox.classList.add("show-img");
        downloadBtn.style.display = "Block";
    }
    else{
        inputBox.classList.add("error");

        setTimeout(()=>{
            inputBox.classList.remove("error")
        },1000)
    }
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const imageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputBox.value;
    const filename = 'QR-Code';
    downloadImage(imageUrl, filename);
});

function downloadImage(url, filename) {
    document.querySelector("#downloadBtn").innerHTML = "Downloading....";
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.querySelector("#downloadBtn").innerHTML = "Download QR";
            inputBox.value.innerText = "";
        })
        .catch(error => console.error('Error downloading image:', error));
}