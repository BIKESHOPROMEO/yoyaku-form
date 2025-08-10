// URLパラメータから選択された日時を取得
const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date");
const selectedTime = params.get("time");

if (selectedDate && selectedTime) {
  document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
}

// 送信ボタンのクリック処理
document.getElementById("submitBtn").addEventListener("click", function() {
  // 送信ボタンを無効化（連打防止）
  this.disabled = true;

  // 送信中ダイアログ表示
  document.getElementById("sendingDialog").style.display = "block";

  const form = document.getElementById("reservationForm");
  const formData = new FormData(form);
  const data = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    data.append(key, value);
  }

if (!selectedDate || !selectedTime) {
  alert("日付と時間が選択されていません");
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("sendingDialog").style.display = "none";
  return;
}

  data.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

  fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString()
  })
  .then(res => res.json())
.then(data => {
  document.getElementById("sendingDialog").style.display = "none";

  if (data.status === "success") {
    alert(data.message); // "登録完了" など
    // 必要なら画面遷移など
  } else {
    document.getElementById("submitBtn").disabled = false;
    alert("送信に失敗しました：" + (data.error || "不明なエラー"));
  }
})
.catch(err => {
  document.getElementById("sendingDialog").style.display = "none";
  document.getElementById("submitBtn").disabled = false;
  alert("通信エラーが発生しました");
});