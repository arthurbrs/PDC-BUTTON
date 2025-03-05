const audioList = document.getElementById("audio-list");
const audioPlayer = document.getElementById("audio-player");

// 🔹 URL do Azure Blob Storage (substitua pelo nome do seu Storage Account e container)
const blobStorageUrl = "https://eus2pdcbutton.blob.core.windows.net/audios";

// 🔹 Função para buscar arquivos de áudio automaticamente
async function fetchAudioFiles() {
    try {
        const response = await fetch(blobStorageUrl + "?restype=container&comp=list");

        if (!response.ok) {
            throw new Error("Erro ao acessar o Blob Storage. Verifique permissões.");
        }

        const text = await response.text();

        // 🔹 Extrair os nomes dos arquivos XML retornados pelo Blob Storage
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const blobs = xml.getElementsByTagName("Name");

        if (blobs.length === 0) {
            audioList.innerHTML = "<li>Nenhum áudio encontrado.</li>";
            return;
        }

        // 🔹 Criar lista de áudios dinamicamente
        audioList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
        Array.from(blobs).forEach(blob => {
            const fileName = blob.textContent;
            const fileUrl = `${blobStorageUrl}/${fileName}`;

            const li = document.createElement("li");
            li.textContent = fileName.replace(".mp3", ""); // Remove a extensão do nome
            li.style.cursor = "pointer";
            li.onclick = () => playAudio(fileUrl);
            audioList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao buscar áudios:", error);
        audioList.innerHTML = `<li>Erro ao carregar áudios: ${error.message}</li>`;
    }
}

// 🔹 Função para tocar o áudio selecionado
function playAudio(url) {
    audioPlayer.src = url;
    audioPlayer.play();
}

// 🔹 Carregar áudios ao iniciar a página
fetchAudioFiles();
