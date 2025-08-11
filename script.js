document.addEventListener("DOMContentLoaded", () => {
  // URLパラメータから選択された日時を取得
  const params = new URLSearchParams(window.location.search);
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");

  // ?? デバッグ用ログ（ここに追加！）
  console.log("selectedDate:", selectedDate);
  console.log("selectedTime:", selectedTime);


  // 日付を「8/12(月)」形式に整形する関数
  const formatDate = (isoDateStr) => {
  const [year, month, day] = isoDateStr.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  const days = ["日","月","火","水","木","金","土"];
  return `${month}/${day}(${days[d.getDay()]})`;
};

  // 表示処理
  if (selectedDate && selectedTime) {
    const formatted = `${formatDate(selectedDate)} ${selectedTime}`;
    document.getElementById("selectedDateTime").textContent = formatted;
  }

  // 送信ボタンのクリック処理
  document.getElementById("submitBtn").addEventListener("click", function() {
    this.disabled = true;
    document.getElementById("sendingDialog").style.display = "block";

    const form = document.getElementById("reservationForm");
    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      data.append(key, value);
    }

    // 日時未選択チェック
    if (!selectedDate || !selectedTime) {
      alert("日付と時間が選択されていません");
      this.disabled = false;
      document.getElementById("sendingDialog").style.display = "none";
      return;
    }

    // 送信データに日時を追加（ISO形式＋時間）
    data.append("action", "create");
    data.append("selectedDateTime", `${selectedDate} ${selectedTime}`);
   

    // Google Apps Script へ送信
    fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString()
    })
    .then(async res => {
  document.getElementById("sendingDialog").style.display = "none";

  const text = await res.text();
  console.log("レスポンス内容:", text);

  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    throw new Error("JSONの解析に失敗しました");
  }

  if (result.status === "success") {
    alert(result.message);
  } else {
    this.disabled = false;
    alert("送信に失敗しました：" + (result.error || "不明なエラー"));
  }
})
.catch(err => {
  document.getElementById("sendingDialog").style.display = "none";
  this.disabled = false;
  alert("通信エラー：" + err.message);
});
