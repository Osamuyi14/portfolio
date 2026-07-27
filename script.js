// ==========================================================================
// Project data, grounded in the actual reports, code and slides supplied
// ==========================================================================
const PROJECTS = [
  {
    id: "p1",
    filter: "ml",
    cat: "Machine Learning · Regression",
    title: "Predicting Student Exam Performance",
    kpi: { num: "84.49%", lbl: "Test R² (SVR)" },
    kpis: [
      { num: "84.49%", lbl: "SVR test R²" },
      { num: "78.86%", lbl: "Random Forest R²" },
      { num: "6,607", lbl: "student records" }
    ],
    desc: "Three regression models go head-to-head to predict exam scores from a student's habits, attendance and support system.",
    overview: [
      "Can a student's end-of-year exam score be predicted before it happens? This project puts that question to the test using the Student Performance Factors dataset (6,607 records, sourced from Kaggle), looking at study hours, attendance, access to resources and home environment.",
      "After ordinal encoding, mode imputation and feature scaling, three regressors went through the wringer: a Decision Tree, a Random Forest and a Support Vector Regressor, each tuned with GridSearchCV and 5-fold cross-validation.",
      "The Support Vector Regressor came out on top, reaching a test R² of 84.49% with a polynomial kernel. Once tuned, it settled on a linear kernel at C=100 for a 71.17% cross-validated R², a sign that once the features are properly scaled, the relationship between a student's habits and their exam score is close to a straight line."
    ],
    stack: ["Python", "pandas", "scikit-learn", "GridSearchCV", "SVR", "Random Forest"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "report", label: "Report", type: "pdf", src: "assets/p1/report.pdf" },
      { key: "slides", label: "Slides", type: "pdf", src: "assets/p1/slides.pdf", download: "assets/p1/slides.pptx", downloadLabel: "Download .pptx" },
      { key: "code", label: "Code", type: "html", src: "assets/p1/code.html", download: "assets/p1/code.ipynb", downloadLabel: "Download .ipynb" },
      { key: "video", label: "Video", type: "video", src: "assets/p1/demo.mp4" }
    ]
  },
  {
    id: "p2",
    filter: "ml",
    cat: "Machine Learning · Classification",
    title: "Horsepower Category Classification",
    kpi: { num: "97.6%", lbl: "Accuracy (Random Forest)" },
    kpis: [
      { num: "97.6%", lbl: "Random Forest accuracy" },
      { num: "95.1%", lbl: "Neural network accuracy" },
      { num: "0.95", lbl: "Random Forest macro F1" }
    ],
    desc: "A tuned Random Forest takes on a feed-forward neural network to sort used cars into horsepower bands.",
    overview: [
      "Working from a 201-vehicle automobile dataset (pulled from the 1985 Ward's Automotive Yearbook), this report sorts every car into a horsepower category, Low, Medium or High, using nothing but its other specifications.",
      "The pipeline handled missing values with mean and mode imputation, corrected class imbalance with SMOTE oversampling, and deliberately excluded the raw horsepower field to stop it leaking straight into the label it was supposed to predict.",
      "The tuned Random Forest classifier came out narrowly ahead, hitting 97.6% test accuracy and a macro F1-score of 0.95, against 95.1% accuracy and a 0.93 macro F1 for the tuned neural network. The Random Forest also held up a little better on the rarer high-horsepower cars."
    ],
    stack: ["Python", "scikit-learn", "SMOTE", "Random Forest", "Neural Networks"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "report", label: "Report", type: "pdf", src: "assets/p2/report.pdf" },
      { key: "code", label: "Code", type: "html", src: "assets/p2/code.html", download: "assets/p2/code.ipynb", downloadLabel: "Download .ipynb" }
    ]
  },
  {
    id: "p3",
    filter: "ml",
    cat: "Machine Learning · Classification",
    title: "Term Deposit Subscription Prediction",
    kpi: { num: "88.8%", lbl: "Accuracy (Random Forest)" },
    kpis: [
      { num: "88.8%", lbl: "Random Forest accuracy" },
      { num: "0.776", lbl: "Random Forest ROC-AUC" },
      { num: "4,119", lbl: "customer records" }
    ],
    desc: "Predicting which bank telemarketing customers will actually subscribe to a term deposit, to help prioritise the call list.",
    overview: [
      "Using the UCI bank-additional telemarketing dataset (4,119 records, 21 variables), this project digs into what separates subscribers from non-subscribers, then builds models to flag likely subscribers before the call even happens.",
      "After cleaning the data, engineering new features and digging into contact timing, a Decision Tree and a Random Forest were trained side by side. With the dataset skewed roughly 89/11 toward non-subscribers, accuracy alone wasn't enough to trust, so precision, recall, F1-score and ROC-AUC all came into play.",
      "The Random Forest led on most fronts: 88.8% accuracy and a 0.776 ROC-AUC, ahead of the Decision Tree's 84.4% accuracy and 0.711 ROC-AUC. The Decision Tree did edge ahead on recall though, a reminder of the usual trade-off between a single tree and an ensemble."
    ],
    stack: ["Python", "pandas", "Decision Tree", "Random Forest", "Feature Engineering"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "report", label: "Report", type: "pdf", src: "assets/p3/report.pdf", download: "assets/p3/report.docx", downloadLabel: "Download .docx" },
      { key: "slides", label: "Slides", type: "pdf", src: "assets/p3/slides.pdf", download: "assets/p3/slides.pptx", downloadLabel: "Download .pptx" },
      { key: "code", label: "Code", type: "html", src: "assets/p3/code.html", download: "assets/p3/code.ipynb", downloadLabel: "Download .ipynb" }
    ]
  },
  {
    id: "p4",
    filter: "stats",
    cat: "Statistical Analysis",
    title: "Churn, Bayesian Inference & Time-Series Forecasting",
    kpi: { num: "3", lbl: "statistical methods applied" },
    kpis: [
      { num: "GLM", lbl: "Telco churn model" },
      { num: "λ", lbl: "Bayesian posterior for Poisson data" },
      { num: "10-step", lbl: "ARIMA forecast" }
    ],
    desc: "A three-part statistics assignment: logistic regression on telecom churn, Bayesian inference on Poisson data, and ARIMA forecasting on the NASDAQ Composite.",
    overview: [
      "Group coursework for Statistics for Data Analytics, built around three tasks. First, a Generalised Linear Model fitted to the Telco Customer Churn dataset to find out what actually drives customers to leave. Second, a full Bayesian derivation for Poisson-distributed data, right down to the conjugate prior, the posterior distribution and the minimum Bayes-risk estimator. Third, a time-series analysis of the NASDAQ Composite Index.",
      "The time-series work checked for stationarity, identified AR and MA orders, selected an ARIMA model, produced a ten-step-ahead forecast, and ran residual diagnostics to see how well the model actually fit.",
      "Completed with Purity Kwamboka Mirarwa and Ayomide Babatunde as part of the MSc Data Analytics programme (Module B9DA101)."
    ],
    stack: ["R", "Logistic Regression", "Bayesian Inference", "ARIMA", "Time Series"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "report", label: "Report", type: "pdf", src: "assets/p4/report.pdf" },
      { key: "code", label: "R Code", type: "html", src: "assets/p4/code.html", download: "assets/p4/code.R", downloadLabel: "Download .R" },
      { key: "data", label: "Data", type: "download-list", files: [
          { href: "assets/p4/nasdaq_dataset.csv", label: "nasdaq_dataset.csv" },
          { href: "assets/p4/telco_dataset.xlsx", label: "telco_dataset.xlsx" }
        ]
      }
    ]
  },
  {
    id: "p5",
    filter: "bi",
    cat: "Business Intelligence",
    title: "Financial Performance Dashboard",
    kpi: { num: "4", lbl: "linked visuals" },
    kpis: [
      { num: "Power BI", lbl: "Platform" },
      { num: "4", lbl: "linked visuals + slicer" }
    ],
    desc: "A single-page financial reporting dashboard with KPI cards, trend and breakdown charts, and a cross-filtering table.",
    overview: [
      "An interactive Power BI report built to track financial performance at a glance: headline KPI cards, a line chart for trends over time, a column chart for period comparisons, and a detail table, all wired to a shared slicer so a viewer can filter every visual at once.",
      "Power BI files are proprietary, so they won't open directly in a browser. Grab the file below and open it in Power BI Desktop to explore the live report and the data model behind it."
    ],
    stack: ["Power BI", "DAX", "Data Modelling"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "data", label: "Download", type: "download-list", files: [
          { href: "assets/p5/financials_power_bi.pbix", label: "financials_power_bi.pbix" }
        ]
      }
    ]
  },
  {
    id: "p6",
    filter: "bi",
    cat: "Business Intelligence",
    title: "Data Jobs Market Dashboard",
    kpi: { num: "4", lbl: "linked visuals" },
    kpis: [
      { num: "Power BI", lbl: "Platform" },
      { num: "Azure Maps", lbl: "Geo visual" }
    ],
    desc: "A geographic dashboard mapping data-role demand, combining KPI cards, a bar chart breakdown and an Azure Maps visual.",
    overview: [
      "A Power BI report exploring the data-analytics job market: KPI cards for headline figures, a bar chart breaking down roles, and an Azure Maps visual plotting where the roles are concentrated geographically.",
      "Same story as the financial dashboard: this is a proprietary .pbix file. Download it and open it in Power BI Desktop to play with the live map and filters."
    ],
    stack: ["Power BI", "Azure Maps", "Data Visualisation"],
    tabs: [
      { key: "overview", label: "Overview" },
      { key: "data", label: "Download", type: "download-list", files: [
          { href: "assets/p6/data_jobs.pbix", label: "data_jobs.pbix" }
        ]
      }
    ]
  }
];

const TICKER_ITEMS = [
  { txt: "SVR TEST R²", val: "84.49%" },
  { txt: "RF HORSEPOWER ACCURACY", val: "97.6%" },
  { txt: "TERM DEPOSIT ROC-AUC", val: "0.776", teal: true },
  { txt: "RANDOM FOREST F1", val: "0.95" },
  { txt: "STUDENT RECORDS MODELLED", val: "6,607", teal: true },
  { txt: "ARIMA FORECAST HORIZON", val: "10-step" },
  { txt: "TERM DEPOSIT ACCURACY", val: "88.8%", teal: true },
];

// ==========================================================================
// Render: ticker
// ==========================================================================
function renderTicker() {
  const track = document.getElementById("tickerTrack");
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  track.innerHTML = items.map(i =>
    `<span class="ticker-item${i.teal ? " teal" : ""}">${i.txt} <b>${i.val}</b></span>`
  ).join("");
}

// ==========================================================================
// Render: project cards
// ==========================================================================
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map(p => `
    <button class="pcard" data-filter="${p.filter}" data-id="${p.id}">
      <div class="pcard-top">
        <span class="pcard-cat">${p.cat}</span>
        <div class="pcard-kpi">
          <div class="num">${p.kpi.num}</div>
          <div class="lbl">${p.kpi.lbl}</div>
        </div>
      </div>
      <h3>${p.title}</h3>
      <p class="pcard-desc">${p.desc}</p>
      <div class="pcard-tags">
        ${p.stack.slice(0, 4).map(s => `<span class="tag">${s}</span>`).join("")}
      </div>
      <span class="pcard-cta">View project
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </button>
  `).join("");

  grid.querySelectorAll(".pcard").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
  });
}

// ==========================================================================
// Filters
// ==========================================================================
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".pcard").forEach(card => {
        card.style.display = (f === "all" || card.dataset.filter === f) ? "" : "none";
      });
    });
  });
}

// ==========================================================================
// Modal
// ==========================================================================
let activeProject = null;

function tabPanelHTML(tab) {
  if (tab.key === "overview") return ""; // filled separately
  if (tab.type === "pdf") {
    return `<iframe src="${tab.src}" loading="lazy" title="${tab.label}"></iframe>`;
  }
  if (tab.type === "html") {
    return `<iframe src="${tab.src}" loading="lazy" title="${tab.label}"></iframe>`;
  }
  if (tab.type === "video") {
    return `<video src="${tab.src}" controls preload="metadata"></video>`;
  }
  if (tab.type === "download-list") {
    return `<div class="download-row">
      <p class="note">Proprietary file format. Download it to open in the native application.</p>
      <div class="pbix-visual-list">
        ${tab.files.map(f => `<a class="btn btn-ghost" href="${f.href}" download>${f.label} ↓</a>`).join("")}
      </div>
    </div>`;
  }
  return "";
}

function overviewHTML(p) {
  return `
    <div class="tab-panel overview active" data-key="overview">
      ${p.overview.map(par => `<p>${par}</p>`).join("")}
      <h4>Stack</h4>
      <ul>${p.stack.map(s => `<span class="tag">${s}</span>`).join("")}</ul>
    </div>
  `;
}

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProject = p;

  document.getElementById("modalCat").textContent = p.cat;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalKpis").innerHTML = p.kpis.map(k =>
    `<div class="modal-kpi"><div class="num">${k.num}</div><div class="lbl">${k.lbl}</div></div>`
  ).join("");

  const tabbar = document.getElementById("modalTabs");
  tabbar.innerHTML = p.tabs.map((t, i) =>
    `<button class="tab-btn${i === 0 ? " active" : ""}" data-key="${t.key}">${t.label}</button>`
  ).join("");

  const body = document.getElementById("modalBody");
  body.innerHTML = p.tabs.map((t, i) => {
    if (t.key === "overview") return overviewHTML(p);
    const extra = t.download
      ? `<div class="download-row" style="padding:12px 24px;border-top:1px solid var(--line-soft);">
           <span class="note">Prefer the original file?</span>
           <a class="btn btn-ghost" href="${t.download}" download>${t.downloadLabel} ↓</a>
         </div>`
      : "";
    const cls = t.key === "code" ? "code-panel" : "";
    return `<div class="tab-panel ${cls}" data-key="${t.key}" style="display:flex;flex-direction:column;">
      <div style="flex:1;">${tabPanelHTML(t)}</div>
      ${extra}
    </div>`;
  }).join("");

  // show first tab
  body.querySelectorAll(".tab-panel").forEach((el, i) => el.classList.toggle("active", i === 0));

  tabbar.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabbar.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      body.querySelectorAll(".tab-panel").forEach(panel => {
        panel.classList.toggle("active", panel.dataset.key === btn.dataset.key);
      });
    });
  });

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
  // stop any playing video
  document.querySelectorAll("#modalBody video").forEach(v => v.pause());
}

// ==========================================================================
// Init
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderProjects();
  initFilters();

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
});
