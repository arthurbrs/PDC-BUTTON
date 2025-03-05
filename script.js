const audioList = document.getElementById("audio-list");
const audioPlayer = document.getElementById("audio-player");

// 🔹 Altere esta URL para o seu Blob Storage público
const blobStorageUrl = "https://SEU-STORAGE-ACCOUNT.blob.core.windows.net/audios";

async function fetchAudioFiles() {
    try {
        // 🔹 Chamar a API de listagem do Blob Storage (caso tenha um backend)
        // Aqui estamos assumindo que os arquivos são publicamente acessíveis
        const response = await fetch(blobStorageUrl);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar arquivos");
        }
        
        const data = await response.json();  // Ajuste se necessário

        // Suponha que o backend retorna uma lista JSON com URLs
        const audioFiles = data.files || [];

        audioFiles.forEach(file => {
            const li = document.createElement("li");
            li.textContent = file.name;
            li.onclick = () => playAudio(file.url);
            audioList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao buscar áudios:", error);
        audioList.innerHTML = "<li>Erro ao carregar áudios.</li>";
    }
}

function playAudio(url) {
    audioPlayer.src = url;
    audioPlayer.play();
}

// 🔹 Buscar os áudios ao carregar a página
fetchAudioFiles();
