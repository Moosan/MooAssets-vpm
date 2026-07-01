const LISTING_URL = "{{ listingInfo.Url }}";

const PACKAGES = {
{{~ for package in packages ~}}
  "{{ package.Name }}": {
    name: "{{ package.Name }}",
    displayName: "{{ if package.DisplayName; package.DisplayName; end; }}",
    description: "{{ if package.Description; package.Description; end; }}",
    version: "{{ package.Version }}",
    author: {
      name: "{{ if package.Author.Name; package.Author.Name; end; }}",
      url: "{{ if package.Author.Url; package.Author.Url; end; }}",
    },
    dependencies: {
      {{~ for dependency in package.Dependencies ~}}
      "{{ dependency.Name }}": "{{ dependency.Version }}",
      {{~ end ~}}
    },
    license: "{{ package.License }}",
    licenseUrl: "{{ package.LicenseUrl }}",
  },
{{~ end ~}}
};

function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    if (!button) return;
    const prev = button.textContent;
    button.textContent = "コピーしました";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = prev;
      button.classList.remove("copied");
    }, 1200);
  });
}

(() => {
  const searchInput = document.getElementById("searchInput");
  const packageGrid = document.getElementById("packageGrid");
  const cards = packageGrid.querySelectorAll(".package-card");

  searchInput.addEventListener("input", ({ target: { value = "" } }) => {
    const q = value.trim().toLowerCase();
    cards.forEach((card) => {
      if (!q) {
        card.classList.remove("hidden");
        return;
      }
      const name = card.dataset.packageName?.toLowerCase() ?? "";
      const id = card.dataset.packageId?.toLowerCase() ?? "";
      card.classList.toggle("hidden", !(name.includes(q) || id.includes(q)));
    });
  });

  document.getElementById("vccUrlCopy").addEventListener("click", () => {
    copyText(document.getElementById("vccUrlField").value, document.getElementById("vccUrlCopy"));
  });

  const openVccAdd = () => {
    window.location.assign(`vcc://vpm/addRepo?url=${encodeURIComponent(LISTING_URL)}`);
  };
  document.getElementById("vccAddRepo").addEventListener("click", (e) => {
    e.preventDefault();
    openVccAdd();
  });
  document.querySelectorAll(".rowAddToVcc").forEach((btn) => {
    btn.addEventListener("click", openVccAdd);
  });

  const helpDialog = document.getElementById("helpDialog");
  document.getElementById("helpOpen").addEventListener("click", () => helpDialog.showModal());
  document.getElementById("helpClose").addEventListener("click", () => helpDialog.close());

  const packageDialog = document.getElementById("packageDialog");
  document.getElementById("packageDialogClose").addEventListener("click", () => packageDialog.close());

  document.querySelectorAll(".rowPackageInfo").forEach((button) => {
    button.addEventListener("click", () => {
      const packageId = button.dataset.packageId;
      const info = PACKAGES[packageId];
      if (!info) return;

      document.getElementById("packageInfoName").textContent = info.displayName || packageId;
      document.getElementById("packageInfoId").textContent = packageId;
      document.getElementById("packageInfoVersion").textContent = `v${info.version}`;
      document.getElementById("packageInfoDescription").textContent = info.description || "—";

      const authorCell = document.getElementById("packageInfoAuthorCell");
      authorCell.textContent = "";
      if (info.author?.name) {
        if (info.author.url) {
          const a = document.createElement("a");
          a.href = info.author.url;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = info.author.name;
          authorCell.appendChild(a);
        } else {
          authorCell.textContent = info.author.name;
        }
      } else {
        authorCell.textContent = "—";
      }

      const depsList = document.getElementById("packageInfoDependencies");
      depsList.innerHTML = "";
      const deps = Object.entries(info.dependencies ?? {});
      document.getElementById("packageInfoDepsRow").classList.toggle("hidden", deps.length === 0);
      deps.forEach(([name, version]) => {
        const li = document.createElement("li");
        li.textContent = `${name} @ ${version}`;
        depsList.appendChild(li);
      });

      const licenseRow = document.getElementById("packageInfoLicenseRow");
      const licenseCell = document.getElementById("packageInfoLicenseCell");
      licenseCell.textContent = "";
      if (info.license || info.licenseUrl) {
        licenseRow.classList.remove("hidden");
        if (info.licenseUrl) {
          const a = document.createElement("a");
          a.href = info.licenseUrl;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = info.license || "ライセンスを見る";
          licenseCell.appendChild(a);
        } else {
          licenseCell.textContent = info.license;
        }
      } else {
        licenseRow.classList.add("hidden");
      }

      packageDialog.showModal();
    });
  });
})();
