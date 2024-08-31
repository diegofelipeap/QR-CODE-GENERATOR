const wrapper = document.querySelector(".wrapper"),
    qrInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code img"),
    copyLinkBtn = document.getElementById("copy-link"),
    shareQRBtn = document.getElementById("share-qr");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Gerando QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Gerar QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

copyLinkBtn.addEventListener("click", () => {
    const qrValue = qrInput.value.trim();
    if (!qrValue) return;

    const qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    navigator.clipboard.writeText(qrLink).then(() => {
        alert("Link do QR Code copiado para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar o link: ", err);
    });
});

shareQRBtn.addEventListener("click", async () => {
    if (navigator.share) {
        const qrLink = qrImg.src;
        try {
            await navigator.share({
                title: 'QR Code',
                text: 'Veja este QR Code que gerei!',
                url: qrLink,
            });
            console.log('QR Code compartilhado com sucesso');
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    } else {
        alert('A API de compartilhamento não é suportada neste navegador.');
    }
});
