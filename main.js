//* Elementlere ulaşıp obje olarak kullanmak için

const shuffleButton = document.getElementById("shuffle");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const playlistButton = document.getElementById("playlist");
const closeButton = document.getElementById("close-button");
const audio = document.getElementById("audio");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const songImage = document.getElementById("song-image");

const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");

const progressBar = document.getElementById("progress-bar");
const currentProgress = document.getElementById("current-progress");
const playlistContainer = document.getElementById("playlist-container");
const playlistSongs = document.getElementById("playlist-songs");

//* index sıra tutumak için

let index;

//* Döngü için

let loop = true;

//* Liste için

const songList = [
  {
    name: "Daylight",
    artist: "David Kushner",
    audioLink:
      "assets/songs/David Kushner - Daylight (Official Music Video)(_MoN9ql6Yymw_).m4a",
    image: "assets/images/daylight.jpg",
  },
  {
    name: "Angels On My Side",
    artist: "Hippie Sabotage",
    audioLink:
      "assets/songs/Hippie Sabotage - _Angels On My Side_ _Official Audio_(_IuIWhP4FFeM_).m4a",
    image: "assets/images/angels-on-my-side.jpeg",
  },
  {
    name: "Lay Low",
    artist: "Tiësto",
    audioLink:
      "assets/songs/Tiësto - Lay Low (Official Music Video)(_EfWmWlW2PvM_).m4a",
    image: "assets/images/lay-low.jpeg",
  },
  {
    name: "Airwaves",
    artist: "Pashanim",
    audioLink: "assets/songs/Pashanim - Airwaves(_i5wsXLmWhCM_).m4a",
    image: "assets/images/airwaves.jpeg",
  },
  {
    name: "Set Fire To Rain",
    artist: "Adele",
    audioLink: "assets/songs/Set Fire to the Rain(_a2giXO6eyuI_).m4a",
    image: "assets/images/set-fire-to-rain.jpg",
  },
  {
    name: "White Mustang",
    artist: "Lana del Rey",
    audioLink:
      "assets/songs/Lana Del Rey - White Mustang (Official Music Video)(_F4ELqraXx-U_).m4a",
    image: "assets/images/white-mustang.jpeg",
  },
];

//* İçerik şarkı atama

const setSong = (arrayIndex) => {
  //* console.log(arrayIndex);
  //! Burada bütün değişkenlerin hepsinin tek tek yazmak yerine böyle ulaştık.
  let { name, artist, audioLink, image } = songList[arrayIndex];
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  audio.src = audioLink;
  songImage.src = image;

  //* Süreyi ayarlamak için

  audio.onloadedmetadata = () => {
    //! metadata : Bir video ve sesin yüklenmesi ve veritabanına gönderirken etiketi böyle.
    maxDuration.innerHTML = timeFormatter(audio.duration);
  };

  playlistContainer.classList.add("hide");
  playAudio();
};

//* Zamanı istenilen formatta yazmak için

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  //* minute = minute < 10 ? "0" + minute : minute;
  //! Burada 10 dan küçük ise önüne sıfır getirmesini değil ise olduğu gibi yazmasını istedik.
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  //! Burada 10 dan küçük ise önüne sıfır getirmesini değil ise önüne sıfır getirmesini ve yazmasını istedik.
  return `${minute}:${second}`;
};

//* Şarkıyı çalmak için

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//* Şarkıyı durdurmak için

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//* Sonraki şarkıya gitmek için

const nextSong = () => {
  if (loop) {
    if (index == songList.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
  //* Rastgele sıra oluşturmak için
  else {
    let randIndex = Math.floor(Math.random() * songList.length);
    index = randIndex;
  }
  setSong(index);
  playAudio();
};

//* Önceki şarkıya gitmek için

const prevSong = () => {
  pauseAudio();
  if (index > 0) {
    index--;
  } else {
    index = songList.length - 1;
  }
  setSong(index);
  playAudio();
};

//*

//* Play Butonuna tıklanıldığında

playButton.addEventListener("click", playAudio);

//* Pause Butonuna tıklanıldığında

pauseButton.addEventListener("click", pauseAudio);

//* Next Butonuna tıklanıldığında

nextButton.addEventListener("click", nextSong);

//* Previous Butonuna tıklanıldığında

prevButton.addEventListener("dblclick", prevSong);

//* Shuffle Butonuna tıklanıldığı zaman

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

//* Repeat Butonuna tıklanıldığı zaman

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

//* Progressbar a (gri alan) tıklanıldığı zaman

progressBar.addEventListener("click", () => {
  //* Başlangıç / Sol
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  //* Bitiş / Sağ
  let coordEnd = event.clientX;
  console.log(coordEnd);

  //* Progress bar ın Toplam uzunluğu .ofsetwidth

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  currentProgress.style.width = progress * 100 + "%";

  //* Zamanı güncelleyelim

  audio.currentTime = progress * audio.duration;

  //* Tıklanıldığı zaman oynatsın

  playAudio();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});
//* Ekran yüklenince

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
  //! .toFixed(3) 3 basamaklıya kadar gitmesini sağlayar.
}, 1000);

//* Zaman Güncellendiğinde

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
});

//* Şarkı bitince sonraki şarkıya geçme

audio.onended = () => {
  nextSong();
};

//* Playlist tıklanınca açılması

const initializePlaylist = () => {
  for (let i in songList) {
    playlistSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songList[i].image}" />
            </div>
            <div class="playlist-song-details">
              <span id="playlist-song-name">${songList[i].name}</span>
              <span id="playlist-song-artist-album">
                ${songList[i].artist}                
              </span>
            </div>
        </li>  `;
  }
};

playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playlistContainer.classList.add("hide");
});

//* Sayfa yüklenildiği zaman
/* window.addEventListener("load",); */
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  playlistContainer.classList.add("hide");
  initializePlaylist();
};
