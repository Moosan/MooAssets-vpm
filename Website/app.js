(function () {
  function copyText(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        flashButton(button, "コピーしました");
      }).catch(function () {
        fallbackCopy(text, button);
      });
      return;
    }
    fallbackCopy(text, button);
  }

  function fallbackCopy(text, button) {
    var field = document.getElementById("vccUrlField");
    field.removeAttribute("readonly");
    field.select();
    field.setSelectionRange(0, text.length);
    try {
      document.execCommand("copy");
      flashButton(button, "コピーしました");
    } catch (e) {
      flashButton(button, "コピーできませんでした");
    }
    field.setAttribute("readonly", "readonly");
  }

  function flashButton(button, message) {
    if (!button) return;
    var prev = button.textContent;
    button.textContent = message;
    button.classList.add("copied");
    setTimeout(function () {
      button.textContent = prev;
      button.classList.remove("copied");
    }, 1400);
  }

  function getListingUrl() {
    var field = document.getElementById("vccUrlField");
    return field ? field.value : "";
  }

  function openVccAdd() {
    var url = getListingUrl();
    if (!url) return;
    window.location.href = "vcc://vpm/addRepo?url=" + encodeURIComponent(url);
  }

  function openHelpDialog() {
    var dialog = document.getElementById("helpDialog");
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  function closeHelpDialog() {
    var dialog = document.getElementById("helpDialog");
    if (dialog && typeof dialog.close === "function") {
      dialog.close();
    }
  }

  document.getElementById("vccUrlCopy").addEventListener("click", function () {
    copyText(getListingUrl(), document.getElementById("vccUrlCopy"));
  });

  document.getElementById("vccAddRepo").addEventListener("click", openVccAdd);

  document.querySelectorAll(".rowAddToVcc").forEach(function (btn) {
    btn.addEventListener("click", openVccAdd);
  });

  document.getElementById("helpOpen").addEventListener("click", openHelpDialog);
  document.getElementById("helpClose").addEventListener("click", closeHelpDialog);

  var searchInput = document.getElementById("searchInput");
  var cards = document.querySelectorAll("#packageGrid .package-card");
  searchInput.addEventListener("input", function (event) {
    var q = (event.target.value || "").trim().toLowerCase();
    cards.forEach(function (card) {
      if (!q) {
        card.classList.remove("hidden");
        return;
      }
      var name = (card.getAttribute("data-package-name") || "").toLowerCase();
      var id = (card.getAttribute("data-package-id") || "").toLowerCase();
      card.classList.toggle("hidden", name.indexOf(q) === -1 && id.indexOf(q) === -1);
    });
  });
})();
