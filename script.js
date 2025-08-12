document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  if (!submitBtn) {
    console.error("submitBtn が見つかりませんでした");
    return;
  }

  // URLパラメータから選択された日時を取得
  const params = new URLSearchParams(window.location.search);
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");

  console.log("selectedDate:", selectedDate);
  console.log("selectedTime:", selectedTime);

  const formatDate = (isoDateStr) => {
    const [year, month, day] = isoDateStr.split("-");
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    const days = ["日","月","火","水","木","金","土"];
    return `${month}/${day}(${days[d.getDay()]})`;
  };

  if (selectedDate && selectedTime) {
    const formatted = `${formatDate(selectedDate)} ${selectedTime}`;
    document.getElementById("selectedDateTime").textContent = formatted;
  }

  // ? ここが唯一のイベントリスナー定義！
  submitBtn.addEventListener("click", function() {
    this.disabled = true;
    document.getElementById("sendingDialog").style.display = "block";

    const form = document.getElementById("reservationForm");
    const formData = new FormData(form);

    if (!selectedDate || !selectedTime) {
      alert("日付と時間が選択されていません");
      this.disabled = false;
      document.getElementById("sendingDialog").style.display = "none";
      return;
    }

    const jsonData = Object.fromEntries(formData.entries());
    jsonData.action = "create";
    jsonData.selectedDateTime = `${selectedDate} ${selectedTime}`;

    fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData),
      mode: "cors"
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
  });
});