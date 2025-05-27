    const speakBtn = document.getElementById('speakBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const loading = document.getElementById('loading');

    const API_ENDPOINT = "https://aws.example/invoke-url/replace-it";

    speakBtn.onclick = async () => {
      const text = document.getElementById('text').value.trim();
      const language_code = document.getElementById('language').value;
      const voice_id = document.getElementById('voice').value;

      if (!text) {
        alert("Please enter some text!");
        return;
      }

      loading.style.display = 'block';
      audioPlayer.src = '';
      downloadBtn.style.display = 'none'; // Hide it initially

      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text, language_code, voice_id })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'audio/mpeg' });
        const audioBlobUrl = URL.createObjectURL(blob);

        audioPlayer.src = audioBlobUrl;
        audioPlayer.play();

        // Update and show the download link
        downloadBtn.href = audioBlobUrl;
        downloadBtn.download = 'speech.mp3';
        downloadBtn.style.display = 'inline-block';

      } catch (err) {
        alert('Error: ' + err.message);
      } finally {
        loading.style.display = 'none';
      }
    };
