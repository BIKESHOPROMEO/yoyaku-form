  // URLパラメータから選択された日時を取得
  document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");

  if (selectedDate && selectedTime) {
    document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
  }

  // 送信ボタンのクリック処理
  document.getElementById("submitBtn").addEventListener("click", function () {
    this.disabled = true;
    document.getElementById("sendingDialog").style.display = "block";

    const form = document.getElementById("reservationForm");
    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      data.append(key, value);
    }

    data.append("action", "create");
    data.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

    fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString()
    })
      .then(res => res.text())
      .then(text => {
        document.getElementById("sendingDialog").style.display = "none";
        alert(text);
        // 必要なら画面遷移などもここで
      })
      .catch(err => {
        document.getElementById("sendingDialog").style.display = "none";
        this.disabled = false;
        alert("エラーが発生しました：" + err.message);
      });
  });
});
