// ============================================================
//  curriculum.js — Full 40-day course data
//  Add new days here; app.js reads this to build the sidebar.
// ============================================================

const CURRICULUM = [
  {
    phase: 1,
    title: "Automation Fundamentals",
    subtitle: "Days 1–8",
    color: "#58a6ff",
    cssVar: "var(--phase1)",
    days: [
      { day: 1,  title: "Why Automate? + Environment Setup",   file: "pages/day1.html",  status: "available" },
      { day: 2,  title: "Variables, Data Types & First Script", file: "pages/day2.html",  status: "available" },
      { day: 3,  title: "Control Flow for Network Logic",       file: "pages/day3.html",  status: "available" },
      { day: 4,  title: "Functions: Reusable Building Blocks",  file: "pages/day4.html",  status: "available" },
      { day: 5,  title: "pip, Virtual Envs & Library Ecosystem",file: "pages/day5.html",  status: "coming-soon" },
      { day: 6,  title: "File I/O: Reading & Writing Test Logs",file: "pages/day6.html",  status: "coming-soon" },
      { day: 7,  title: "JSON & YAML: Config File Parsing",     file: "pages/day7.html",  status: "coming-soon" },
      { day: 8,  title: "Phase 1 Capstone: WLAN Config Parser", file: "pages/day8.html",  status: "coming-soon", capstone: true },
    ]
  },
  {
    phase: 2,
    title: "OS & Network Interfaces",
    subtitle: "Days 9–16",
    color: "#3fb950",
    cssVar: "var(--phase2)",
    days: [
      { day: 9,  title: "subprocess: Run OS Commands",          file: "pages/day9.html",  status: "coming-soon" },
      { day: 10, title: "Parse iwconfig / netsh Output",        file: "pages/day10.html", status: "coming-soon" },
      { day: 11, title: "Intro to Scapy",                       file: "pages/day11.html", status: "coming-soon" },
      { day: 12, title: "Monitor Mode & Frame Sniffing",        file: "pages/day12.html", status: "coming-soon" },
      { day: 13, title: "Changing Wi-Fi Channels Programmatically", file: "pages/day13.html", status: "coming-soon" },
      { day: 14, title: "Scapy: Filter by Frame Type",          file: "pages/day14.html", status: "coming-soon" },
      { day: 15, title: "Interface State Management",           file: "pages/day15.html", status: "coming-soon" },
      { day: 16, title: "Phase 2 Capstone: Multi-Channel Scanner", file: "pages/day16.html", status: "coming-soon", capstone: true },
    ]
  },
  {
    phase: 3,
    title: "Core WLAN Automation",
    subtitle: "Days 17–26",
    color: "#d29922",
    cssVar: "var(--phase3)",
    days: [
      { day: 17, title: "Scanning for SSIDs Programmatically", file: "pages/day17.html", status: "coming-soon" },
      { day: 18, title: "Parsing Beacon Frames",               file: "pages/day18.html", status: "coming-soon" },
      { day: 19, title: "Decoding 802.11 IEs",                 file: "pages/day19.html", status: "coming-soon" },
      { day: 20, title: "Automating WPA2-Personal Connections",file: "pages/day20.html", status: "coming-soon" },
      { day: 21, title: "WPA3 & SAE: Modern Security",         file: "pages/day21.html", status: "coming-soon" },
      { day: 22, title: "DHCP Verification Post-Connection",   file: "pages/day22.html", status: "coming-soon" },
      { day: 23, title: "DNS Resolution Testing Automation",   file: "pages/day23.html", status: "coming-soon" },
      { day: 24, title: "RSSI Monitoring & Logging",           file: "pages/day24.html", status: "coming-soon" },
      { day: 25, title: "Association Timing Measurement",      file: "pages/day25.html", status: "coming-soon" },
      { day: 26, title: "Phase 3 Capstone: Connection Validator", file: "pages/day26.html", status: "coming-soon", capstone: true },
    ]
  },
  {
    phase: 4,
    title: "Industrial Test Frameworks",
    subtitle: "Days 27–33",
    color: "#a371f7",
    cssVar: "var(--phase4)",
    days: [
      { day: 27, title: "Introduction to PyTest",              file: "pages/day27.html", status: "coming-soon" },
      { day: 28, title: "WLAN Test Cases with PyTest",         file: "pages/day28.html", status: "coming-soon" },
      { day: 29, title: "Fixtures & conftest.py",              file: "pages/day29.html", status: "coming-soon" },
      { day: 30, title: "Parameterized Testing: 50 SSIDs × 1 Script", file: "pages/day30.html", status: "coming-soon" },
      { day: 31, title: "HTML Reports with pytest-html",       file: "pages/day31.html", status: "coming-soon" },
      { day: 32, title: "Allure Reports: Professional Evidence",file: "pages/day32.html", status: "coming-soon" },
      { day: 33, title: "Phase 4 Capstone: Full Test Suite",   file: "pages/day33.html", status: "coming-soon", capstone: true },
    ]
  },
  {
    phase: 5,
    title: "Advanced Scenarios & CI/CD",
    subtitle: "Days 34–40",
    color: "#f85149",
    cssVar: "var(--phase5)",
    days: [
      { day: 34, title: "OTA Packet Capture Automation",       file: "pages/day34.html", status: "coming-soon" },
      { day: 35, title: "Throughput Testing with iPerf3",      file: "pages/day35.html", status: "coming-soon" },
      { day: 36, title: "Roaming Test Automation (802.11r/k/v)",file: "pages/day36.html", status: "coming-soon" },
      { day: 37, title: "Intro to GitHub Actions CI/CD",       file: "pages/day37.html", status: "coming-soon" },
      { day: 38, title: "WLAN Tests in Nightly CI Pipelines",  file: "pages/day38.html", status: "coming-soon" },
      { day: 39, title: "Secrets & Environment Config",        file: "pages/day39.html", status: "coming-soon" },
      { day: 40, title: "Final Capstone: Enterprise Framework", file: "pages/day40.html", status: "coming-soon", capstone: true },
    ]
  }
];
