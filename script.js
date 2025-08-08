const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date");
const selectedTime = params.get("time");

if (selectedDate && selectedTime) {
  document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
}

document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    data.append(key, value);
  }

  data.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

  fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString()
  })
  .then(res => res.ok ? alert("予約を送信しました！") : alert("送信に失敗しました"))
  .catch(err => alert("エラーが発生しました"));
});