const audioList = document.getElementById("audio-list");
const audioPlayer = document.getElementById("audio-player");

// 🔹 Substitua pelo seu Storage Account e container
const blobStorageUrl = "https://eus2pdcbutton.blob.core.windows.net/audios";

// 🔹 Se os blobs forem públicos, carregamos os arquivos diretamente
async function fetchAudioFiles() {
    try {
        // Lista de arquivos (se precisar de um backend, podemos adicionar depois)
        const audioFiles = [
            "audio1.mp3",
            "audio2.mp3",
            "audio3.mp3"
        ]; // 🔹 Se precisar listar os arquivos dinamicamente, usaremos uma API no futuro

        if (audioFiles.length === 0) {
            audioList.innerHTML = "<li>Nenhum áudio encontrado.</li>";
            return;
        }

        // Adiciona os arquivos na lista
        audioFiles.forEach(file => {
            const li = document.createElement("li");
            li.textContent = file;
            li.onclick = () => playAudio(`${blobStorageUrl}/${file}`);
            audioList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao buscar áudios:", error);
        audioList.innerHTML = "<li>Erro ao carregar áudios.</li>";
    }
}

// Função para tocar o áudio selecionado
function playAudio(url) {
    audioPlayer.src = url;
    audioPlayer.play();
}

// 🔹 Carregar áudios ao iniciar a página
fetchAudioFiles();
