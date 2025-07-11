const url = document.getElementById('url');
const generateBtn = document.getElementById('generateBtn');
const qrcodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

function clearQRCode() {
    qrcodeDiv.innerHTML = '';
    qrcodeDiv.classList.add('hidden');
    downloadBtn.classList.add('hidden');
}

generateBtn.addEventListener('click', () => {
    const text = url.value.trim();

    if (text === '') {
        alert('Por favor, digite uma URL para gerar o QR Code');
        return;
    }

    try {
        new URL(text);
    } catch (e) {
        alert('Digite uma URL válida (ex: https://exemplo.com)');
        return;
    }

    clearQRCode(); 

    new QRCode(qrcodeDiv, {
        text: text,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        qrcodeDiv.classList.remove('hidden');
        downloadBtn.classList.remove('hidden');
    }, 100);
});

downloadBtn.addEventListener('click', () => {
    const img = qrcodeDiv.querySelector('img') || qrcodeDiv.querySelector('canvas');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src || img.toDataURL("image/png");
        link.download = 'qrcode.png';
        link.click();
    }
});

