  // URLパラメータから選択された日時を取得
  //document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");

  function formatJapaneseDate(dateStr, timeStr) {
  const date = new Date(`${dateStr}T${timeStr}`);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  return `${month}/${day}（${weekday}） ${timeStr}`;
}

  if (selectedDate && selectedTime) {
  const displayText = formatJapaneseDate(selectedDate, selectedTime);
  document.getElementById("selectedDateTime").textContent = displayText;
}

  // 送信ボタンのクリック処理
  document.getElementById("submitBtn").addEventListener("click", function () {
	console.log("送信ボタンがクリックされました"); 
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
	
	console.log("fetch開始"); 

    fetch("https://script.google.com/macros/s/AKfycbwspV-0AlfTcuB3PlTMKmzot-a0b9h0Kv3zRyMpmJZWvRWorbfaNBVxNwvXm2DXMasO/exec", {
      method: "POST",
            body: data
    })
      .then(res => res.text())
      .then(text => {

	console.log("fetch成功:", text); 

        document.getElementById("sendingDialog").style.display = "none";
        alert(text);
        // 必要なら画面遷移などもここで
      })
      .catch(err => {

	console.error("fetchエラー:", err);

        document.getElementById("sendingDialog").style.display = "none";
        this.disabled = false;
        alert("エラーが発生しました：" + err.message);
      });
  });
