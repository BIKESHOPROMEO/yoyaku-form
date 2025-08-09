// URLパラメータから選択された日時を取得
const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date");
const selectedTime = params.get("time");

if (selectedDate && selectedTime) {
  document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
}

// 予約フォーム送信処理
document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // 送信中ダイアログ表示
  document.getElementById("sendingDialog").style.display = "block";

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
  .then(res => {
    // ダイアログ非表示
    document.getElementById("sendingDialog").style.display = "none";

    if (res.ok) {
      alert("予約を送信しました！");
    } else {
      alert("送信に失敗しました");
    }
  })
  .catch(err => {
    document.getElementById("sendingDialog").style.display = "none";
    alert("エラーが発生しました");
  });
});