// ─── Constants ────────────────────────────────────────────────────────────────

// Total frames = sum(scene durations) - sum(transition overlaps)
// = (120+90+90+90+90+120) - (5×30) = 600 - 150 = 450
export const RESUME_CONSTANTS = {
  TOTAL_FRAMES: 450,
  FPS: 30,
  COMPOSITION_WIDTH: 1280,
  COMPOSITION_HEIGHT: 720,
} as const

// ─── Scene navigation ─────────────────────────────────────────────────────────
// Each entry: the frame to seek to when "landing" on that scene.
// These land after each transition completes, with core animations underway.

export type SceneSnap = {
  key: string
  label: string   // Chinese label for nav
  labelEn: string
  frame: number   // target frame when navigating here
  settleFrame: number // frame where the scene intro has reached a stable resting state
}

// Snap frames = global frame where each incoming transition finishes (scene fully visible).
// Each non-Hero scene's content animations are offset by +30 (TRANSITION_FRAMES) so
// they begin exactly when the snap frame is reached.
export const SCENE_SNAPS: SceneSnap[] = [
  { key: 'hero',       label: '首頁', labelEn: 'Hello',      frame: 0,   settleFrame: 90  },
  { key: 'about',      label: '關於', labelEn: 'About',      frame: 120, settleFrame: 145 },
  { key: 'education',  label: '學歷', labelEn: 'Education',  frame: 180, settleFrame: 208 },
  { key: 'experience', label: '經歷', labelEn: 'Experience', frame: 240, settleFrame: 268 },
  { key: 'skills',     label: '專長', labelEn: 'Skills',     frame: 300, settleFrame: 328 },
  { key: 'projects',   label: '專案', labelEn: 'Projects',   frame: 360, settleFrame: 420 },
]

// ─── Types ─────────────────────────────────────────────────────────────────────

export type PersonalInfo = {
  nameZh: string
  nameEn: string
  age: number
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
  github: string
  avatarUrl: string
  tags: string[]
  bio: string
}

export type Education = {
  schoolZh: string
  schoolEn: string
  degreeZh: string
  degreeEn: string
  period: string
  startYear: number
  endYear: number
}

export type WorkExperience = {
  company: string
  role: string
  location: string
  period: string
  durationLabel: string
  bullets: string[]
  tags: string[]
  logoColor: string
}

export type Skill = {
  name: string
  level: number
  tags: string[]
  description: string
  icon: string
  iconAsset?: string
}

export type Project = {
  title: string
  titleEn: string
  period: string
  description: string
  highlights: string[]
  techStack: string[]
  githubUrl?: string
  linkUrl?: string
  linkLabel?: string
  accentColor: string
}

// ─── Data ──────────────────────────────────────────────────────────────────────

export const personal: PersonalInfo = {
  nameZh: '李錦達',
  nameEn: 'Lee Jin-Da',
  age: 25,
  title: 'AI Engineer / Software Engineer',
  subtitle: 'AI工程師 · 軟體工程師',
  email: 'st49176@gmail.com',
  phone: '0975-479-223',
  location: '新北市新莊區',
  github: 'https://github.com/Tidy1245',
  avatarUrl: '/avatar.jpg',
  tags: ['細心', 'Harness Engineering', '演算法', '機器學習', '邏輯推理'],
  bio: '細心沉穩，有一個誠懇學習的心，擅用AI學習各方面應用和技術，能配合團隊、樂於自我提升。',
}

export const education: Education[] = [
  {
    schoolZh: '國立東華大學',
    schoolEn: 'National Dong Hwa University',
    degreeZh: '資訊工程學系 學士',
    degreeEn: 'B.S. Computer Science & Information Engineering',
    period: '2019/9 — 2023/6',
    startYear: 2019,
    endYear: 2023,
  },
  {
    schoolZh: '國立東華大學',
    schoolEn: 'National Dong Hwa University',
    degreeZh: '資訊工程學系 碩士',
    degreeEn: 'M.S. Computer Science & Information Engineering',
    period: '2023/9 — 2025/6',
    startYear: 2023,
    endYear: 2025,
  },
]

export const experiences: WorkExperience[] = [
  {
    company: '視旅科技股份有限公司',
    role: '軟體工程師',
    location: '台北市大同區',
    period: '2025/8 — 2026/3',
    durationLabel: '8個月',
    bullets: [
      '負責獨立的專案開發與維護，與PM溝通開發可行性',
      '協助訓練AI模型，微調參數，分析數據',
      'Vibe Coding 研究開發各種產品，串接TTS語音模型、VLM並設計UI/UX供公司內部使用',
      '支援其他專案小組開發',
    ],
    tags: ['Python', 'AI', '深度學習', '模組化系統設計'],
    logoColor: '#00D9FF',
  },
  {
    company: '國立東華大學智慧型系統實驗室',
    role: '研究助理',
    location: '花蓮縣壽豐鄉',
    period: '2024/9 — 2025/6',
    durationLabel: '10個月',
    bullets: [
      '協助教授的研究計畫做資料處理',
      '實驗室伺服器網路管理',
    ],
    tags: ['Python', 'Linux', '資料處理'],
    logoColor: '#00D9FF',
  },
]

export const skills: Skill[] = [
  {
    name: 'C++',
    level: 85,
    tags: ['C++', 'C', '軟體程式設計'],
    description: '資料結構、演算法開發、蟻群演算法',
    icon: '⚙️',
    iconAsset: 'skill-icons/cpp.png',
  },
  {
    name: 'Python',
    level: 90,
    tags: ['Machine Learning', 'TensorFlow', 'OpenCV'],
    description: 'ML / DL / CV、爬蟲、資料分析、碩士論文',
    icon: '🐍',
    iconAsset: 'skill-icons/python.png',
  },
  {
    name: 'UI/UX',
    level: 65,
    tags: ['HTML', 'CSS'],
    description: '網頁美化、最佳化使用者體驗',
    icon: '🎨',
  },
  {
    name: 'Linux',
    level: 70,
    tags: ['Linux'],
    description: '基本指令操作、遠端控制',
    icon: '🐧',
  },
  {
    name: 'Git',
    level: 75,
    tags: ['GitHub'],
    description: '基本指令、版本控制',
    icon: '🔀',
    iconAsset: 'skill-icons/git.png',
  },
  {
    name: 'Solidity',
    level: 60,
    tags: ['Blockchain', 'NFT'],
    description: '智能合約開發、區塊鏈平台串接',
    icon: '⛓️',
    iconAsset: 'skill-icons/solidity.png',
  },
]

export const projects: Project[] = [
  {
    title: 'ticket-debugger',
    titleEn: 'OCR Pipeline Inspector',
    period: '2025',
    description:
      'FastAPI + HTML/JS/Python OCR pipeline 除錯工具，支援圖片檢視、辨識框疊加、表格資料查看，整合 Qwen3-VL-30B VLM 分組分析與 LCS 字串比對。',
    highlights: [
      'Qwen3-VL-30B VLM 整合',
      'LCS 字串相似度比對',
      '互動式表格檢視 / CRUD',
    ],
    techStack: ['FastAPI', 'Python', 'HTML/JS', 'Qwen3-VL-30B'],
    githubUrl: 'https://github.com/Tidy1245/ticket-debugger',
    linkUrl: 'https://github.com/Tidy1245/ticket-debugger',
    linkLabel: 'Open GitHub',
    accentColor: '#00D9FF',
  },
  {
    title: 'voice-ai',
    titleEn: 'AI Voice Workflow Prototype',
    period: '2025',
    description:
      'AI 語音應用原型，聚焦語音模型串接、互動流程設計與產品化展示，將語音能力整合為可操作的工具介面。',
    highlights: [
      '語音模型整合流程',
      'TTS / 語音互動體驗',
      '產品原型與介面設計',
    ],
    techStack: ['Python', 'TTS', 'AI Workflow', 'Web UI'],
    githubUrl: 'https://github.com/Tidy1245/voice-ai',
    linkUrl: 'https://github.com/Tidy1245/voice-ai',
    linkLabel: 'Open GitHub',
    accentColor: '#34D399',
  },
  {
    title: 'Video-Box',
    titleEn: 'Mobile Video Viewer',
    period: '2025',
    description:
      '為手機使用情境設計的影片檢視器，支援本地影片匯入、橫向與直向內容分流、Shorts 式滑動播放，以及離線媒體瀏覽。',
    highlights: [
      'IndexedDB + Dexie 儲存本地影片 Blob',
      'Shorts 式全螢幕上下滑動播放',
      'PWA 與 Capacitor Android 打包',
    ],
    techStack: ['Vue 3', 'TypeScript', 'Dexie', 'PWA', 'Capacitor'],
    githubUrl: 'https://github.com/Tidy1245/Video-Box',
    linkUrl: 'https://github.com/Tidy1245/Video-Box',
    linkLabel: 'Open GitHub',
    accentColor: '#F97316',
  },
  {
    title: '碩士論文 LSTM / BiLSTM',
    titleEn: 'Vehicular Network Bandwidth Prediction',
    period: '2024/3 — 2025/1',
    description:
      '用於車載網路多媒體頻寬預測的單雙向長短期記憶模型。使用 RNN、GRU、LSTM、BiLSTM 預測次世代車載網路頻寬需求。',
    highlights: [
      'LSTM 5分鐘準確率 85.69%',
      'BiLSTM 滿足率 88.65%',
      'YouTube API 資料收集',
    ],
    techStack: ['Python', 'TensorFlow', 'LSTM', 'BiLSTM', 'YouTube API'],
    linkUrl: 'https://hdl.handle.net/11296/r7k9z3',
    linkLabel: 'Open Thesis',
    accentColor: '#8B5CF6',
  },
  {
    title: '一番賞智能合約',
    titleEn: 'NFT Lottery Smart Contract',
    period: '2024',
    description:
      '使用 Solidity 設計一番賞合約，包含 RewardNFT 編譯部署、合約連接及抽獎執行。',
    highlights: [
      'ERC-721 NFT',
      'RewardNFT contract',
      'On-chain randomness',
    ],
    techStack: ['Solidity', 'Ethereum', 'ERC-721'],
    linkUrl: 'https://youtu.be/kWvvfLG-Nig',
    linkLabel: 'Watch Demo',
    accentColor: '#F59E0B',
  },
]
