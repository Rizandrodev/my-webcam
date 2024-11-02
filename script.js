const video = document.querySelector('video');
const btn = document.querySelector('button');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();

            // Para liberar o stream quando não for mais necessário
            window.addEventListener('unload', () => {
                stream.getTracks().forEach(track => track.stop());
            });
        })
        .catch((error) => {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões.');
        });
} else {
    alert('Seu navegador não suporta acesso à câmera.');
}

btn.addEventListener('click', () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0);
    } else {
        alert('O vídeo não está pronto para captura. Tente novamente.');
    }
});
