export type NoteSubject = {
  name: string;
  semester: string;
  route?: string;
  aliases?: string[];
};

export const notesCatalog: NoteSubject[] = [
  // =====================================================
  // SEMESTER 1
  // =====================================================

  {
    name: "Matrices and Calculus",
    semester: "Semester 1",
    aliases: [
      "math",
      "maths",
      "mathematics",
      "matrix",
      "matrices",
      "calculus",
    ],
  },

  {
    name: "Physics",
    semester: "Semester 1",
    aliases: ["phy"],
  },

  {
    name: "Engineering Drawing and Design",
    semester: "Semester 1",
    aliases: [
      "drawing",
      "engineering drawing",
    ],
  },

  {
    name: "Electrical Technology",
    semester: "Semester 1",
    route: "/notes/electrical-technology",
    aliases: [
      "electrical",
      "electrical technology",
    ],
  },

  {
    name: "Problem Solving Techniques using C",
    semester: "Semester 1",
    aliases: [
      "c",
      "c programming",
      "programming",
      "problem solving",
    ],
  },

  {
    name: "Electronic Devices",
    semester: "Semester 1",
    route: "/notes/electronic-devices",
    aliases: [
      "electronics",
      "devices",
    ],
  },

  // =====================================================
  // SEMESTER 2
  // =====================================================

  {
    name: "Technical English",
    semester: "Semester 2",
    aliases: ["english"],
  },

  {
    name: "Advanced Calculus and Statistics",
    semester: "Semester 2",
    aliases: [
      "math",
      "maths",
      "mathematics",
      "calculus",
      "statistics",
    ],
  },

  {
    name: "Chemistry",
    semester: "Semester 2",
    route: "/notes/chemistry",
    aliases: ["chem"],
  },

  {
    name: "Electrical Circuits and Network Analysis",
    semester: "Semester 2",
    route: "/notes/electrical-circuits-and-network-analysis",
    aliases: [
      "circuits",
      "circuit",
      "network analysis",
      "electrical circuits",
    ],
  },

  {
    name: "Python Programming",
    semester: "Semester 2",
    aliases: ["python"],
  },

  {
    name: "Digital Logic Circuits",
    semester: "Semester 2",
    aliases: [
      "digital",
      "digital logic",
      "logic",
      "logic circuits",
    ],
  },

  // =====================================================
  // SEMESTER 3
  // =====================================================

  {
    name: "Transform Techniques and Complex Analysis",
    semester: "Semester 3",
    aliases: [
      "transform",
      "transforms",
      "complex analysis",
    ],
  },

  {
    name: "Electronic Circuits",
    semester: "Semester 3",
    aliases: [
      "electronics",
      "circuits",
    ],
  },

  {
    name: "Signals and Systems",
    semester: "Semester 3",
    route: "/notes/signals-and-systems",
    aliases: [
      "signals",
      "signal",
      "systems",
    ],
  },

  {
    name: "Electromagnetic Field Theory",
    semester: "Semester 3",
    route: "/notes/electromagnetic-field-theory",
    aliases: [
      "emft",
      "electromagnetic",
      "electromagnetics",
    ],
  },

  {
    name: "Data Structures using C",
    semester: "Semester 3",
    aliases: [
      "data structures",
      "dsa",
      "c",
    ],
  },

  {
    name: "Universal Human Values",
    semester: "Semester 3",
    aliases: [
      "uhv",
      "human values",
    ],
  },

  // =====================================================
  // SEMESTER 4
  // =====================================================

  {
    name: "Fourier Series and Numerical Methods",
    semester: "Semester 4",
    aliases: [
      "fourier",
      "numerical",
      "numerical methods",
    ],
  },

  {
    name: "Probability and Random Process",
    semester: "Semester 4",
    aliases: [
      "probability",
      "random process",
    ],
  },

  {
    name: "Analog Integrated Circuits",
    semester: "Semester 4",
    route: "/notes/analog-integrated-circuits",
    aliases: [
      "analog",
      "aic",
      "integrated circuits",
    ],
  },

  {
    name: "Analog and Digital Communication",
    semester: "Semester 4",
    aliases: [
      "communication",
      "analog communication",
      "digital communication",
    ],
  },

  {
    name: "Digital Signal Processing",
    semester: "Semester 4",
    aliases: [
      "dsp",
      "digital signal processing",
      "signal processing",
    ],
  },

  {
    name: "Design Thinking and Innovations",
    semester: "Semester 4",
    aliases: [
      "design thinking",
      "innovation",
      "innovations",
    ],
  },

  // =====================================================
  // SEMESTER 5
  // =====================================================

  {
    name: "Smart Antenna Systems",
    semester: "Semester 5",
    route: "/notes/smart-antenna-systems",
    aliases: [
      "antenna",
      "antennas",
      "smart antenna",
    ],
  },

  {
    name: "CMOS VLSI Design",
    semester: "Semester 5",
    route: "/notes/cmos-vlsi-design",
    aliases: [
      "vlsi",
      "cmos",
      "vlsi design",
    ],
  },

  {
    name: "Control Systems",
    semester: "Semester 5",
    route: "/notes/control-systems",
    aliases: [
      "control",
      "control system",
    ],
  },

  {
    name: "Microprocessor and Microcontroller",
    semester: "Semester 5",
    route: "/notes/microprocessor-and-microcontroller",
    aliases: [
      "microprocessor",
      "microprocessors",
      "microcontroller",
      "microcontrollers",
      "mpmc",
    ],
  },

  {
    name: "Industry 5.0 for Electronics Engineers",
    semester: "Semester 5",
    aliases: [
      "industry 5",
      "industry 5.0",
    ],
  },

  // =====================================================
  // SEMESTER 6
  // =====================================================

  {
    name: "Computer Networks",
    semester: "Semester 6",
    route: "/notes/computer-networks",
    aliases: [
      "network",
      "networks",
      "cn",
    ],
  },

  {
    name: "HDL Digital Design",
    semester: "Semester 6",
    aliases: [
      "hdl",
      "verilog",
      "digital design",
    ],
  },

  {
    name: "Embedded Systems",
    semester: "Semester 6",
    aliases: [
      "embedded",
      "embedded systems",
      "esp32",
    ],
  },

  // =====================================================
  // SEMESTER 7
  // =====================================================

  {
    name: "Microwave and Optical Communication",
    semester: "Semester 7",
    aliases: [
      "microwave",
      "optical",
      "optical communication",
    ],
  },

  {
    name: "Cognitive IoT",
    semester: "Semester 7",
    aliases: [
      "iot",
      "internet of things",
      "cognitive",
    ],
  },

  {
    name: "Project Work Phase I",
    semester: "Semester 7",
    aliases: [
      "project",
      "project work",
    ],
  },

  // =====================================================
  // SEMESTER 8
  // =====================================================

  {
    name: "Professional Elective 5",
    semester: "Semester 8",
    aliases: [
      "elective 5",
      "professional elective",
    ],
  },

  {
    name: "Professional Elective 6",
    semester: "Semester 8",
    aliases: [
      "elective 6",
      "professional elective",
    ],
  },

  {
    name: "Project Work Phase II",
    semester: "Semester 8",
    aliases: [
      "project",
      "project work",
    ],
  },
];