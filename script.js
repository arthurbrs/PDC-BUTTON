const audioList = document.getElementById("audio-list");
const audioPlayer = document.getElementById("audio-player");

// 🔹 URL do Azure Blob Storage
const blobStorageUrl = "https://eus2pdcbutton.blob.core.windows.net/audios";

// 🔹 Extensões permitidas
const allowedExtensions = [".mp3", ".ogg"];

// 🔹 Função para buscar arquivos de áudio automaticamente
async function fetchAudioFiles() {
    try {
        const response = await fetch(blobStorageUrl + "?restype=container&comp=list");

        if (!response.ok) {
            throw new Error("Erro ao acessar o Blob Storage. Verifique permissões.");
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const blobs = xml.getElementsByTagName("Name");

        if (blobs.length === 0) {
            audioList.innerHTML = "<p>Nenhum áudio encontrado.</p>";
            return;
        }

        // 🔹 Criar botões para cada arquivo de áudio
        audioList.innerHTML = "";
        Array.from(blobs).forEach(blob => {
            const fileName = blob.textContent;
            const fileUrl = `${blobStorageUrl}/${fileName}`;

            // 🔹 Verifica se o arquivo tem extensão permitida
            if (allowedExtensions.some(ext => fileName.toLowerCase().endsWith(ext))) {
                const button = document.createElement("button");
                button.textContent = fileName.replace(/\.(mp3|ogg)$/, ""); // Remove a extensão
                button.classList.add("audio-button"); // Adiciona classe CSS para estilizar
                button.onclick = () => playAudio(fileUrl);
                audioList.appendChild(button);
            }
        });

    } catch (error) {
        console.error("Erro ao buscar áudios:", error);
        audioList.innerHTML = `<p>Erro ao carregar áudios: ${error.message}</p>`;
    }
}

// 🔹 Função para tocar o áudio selecionado
function playAudio(url) {
    audioPlayer.src = url;
    audioPlayer.play();
}

// 🔹 Carregar áudios ao iniciar a página
fetchAudioFiles();
