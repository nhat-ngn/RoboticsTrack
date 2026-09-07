import type { MvaCourse } from "./types";

/**
 * Courses taken from the real M2 MVA catalogue (master-mva.com, 2026 listing).
 * `prepares` names the blocks in THIS plan that make the course sittable;
 * `readyBy` is the week after which you meet its prerequisites.
 *
 * MVA requires 8 validated modules out of ~48 offered. This is a target
 * shortlist for someone aiming at vision + robot learning, not the full list.
 */
export const mvaCourses: MvaCourse[] = [
  {
    name: "Convex optimization and applications in machine learning",
    teacher: "A. d'Aspremont",
    domain: "Theory · S1",
    prepares:
      "Boyd ch.1-5 and 9-11 in Phases 2-3, then Nocedal's numerical half in Phase 5. His past exams are used as your self-assessment in W33 and W96 — you should be scoring well before you ever enrol.",
    readyBy: "Week 42 · end of Phase 5",
    tracks: ["math"],
  },
  {
    name: "Object recognition and computer vision",
    teacher: "G. Varol, I. Laptev, J. Ponce, C. Schmid, J. Sivic, M. Aubry",
    domain: "Computer Vision · S1",
    prepares:
      "Classical CV in Phase 3, CNNs and ViT/DINOv2 in Phases 3-5, plus the CS231n/EECS 498 assignments. The strongest single signal for your profile.",
    readyBy: "Week 42 · end of Phase 5",
    tracks: ["cs", "ml"],
  },
  {
    name: "3D computer vision",
    teacher: "P. Monasse, L. Landrieu",
    domain: "Computer Vision · S1",
    prepares:
      "CS231A plus Hartley-Zisserman and TUM MVG in Phases 5-6, and the SfM/SLAM you build yourself in W60. This course is nearly free for you by then.",
    readyBy: "Week 62 · mid Phase 6",
    tracks: ["cs"],
  },
  {
    name: "Robotics",
    teacher: "J. Carpentier, S. Bonnabel, P.-B. Wieber, A. Sathya",
    domain: "Machine Learning · S1",
    prepares:
      "Modern Robotics ch.8-11 in Phase 5, Underactuated Robotics and MPC in Phase 6. Carpentier and Wieber's course is exactly the theory behind your arm and quadruped — the obvious course for you.",
    readyBy: "Week 66 · end of Phase 6",
    tracks: ["rob", "math"],
  },
  {
    name: "Reinforcement Learning",
    teacher: "D. Basu, E. Kaufmann, O. Maillard",
    domain: "Deep Learning · S2",
    prepares:
      "Sutton & Barto end to end in Phase 6 and CS285 in Phase 7. Note this course is bandit- and theory-heavy, so concentration inequalities (W62) matter as much as the algorithms.",
    readyBy: "Week 75 · mid Phase 7",
    tracks: ["ml", "math"],
  },
  {
    name: "Deep Learning",
    teacher: "V. Lepetit, M. Vakalopoulou",
    domain: "Deep Learning · S1",
    prepares:
      "The whole ML track from Karpathy's Zero-to-Hero (Phase 2) to transformers (Phase 4) and training infrastructure (Phase 5).",
    readyBy: "Week 42 · end of Phase 5",
    tracks: ["ml"],
  },
  {
    name: "Foundations of Large Language Models",
    teacher: "N. Fijalkow, D. Louapre",
    domain: "Deep Learning / NLP · S1",
    prepares:
      "CS336 in Phase 7 — tokenizer, transformer, training loop, scaling laws, alignment. After CS336 this course is revision.",
    readyBy: "Week 79 · Phase 7",
    tracks: ["ml", "cs"],
  },
  {
    name: "Training and deploying Large-Scale Models",
    teacher: "E. Oyallon",
    domain: "Deep Learning · S2",
    prepares:
      "CS336's systems assignments: profiling, Triton kernels, DDP/FSDP, tensor parallelism (W71-W73), plus CS:APP's memory hierarchy from Phase 6.",
    readyBy: "Week 79 · Phase 7",
    tracks: ["cs", "ml"],
  },
  {
    name: "Kernel methods for machine learning",
    teacher: "J. Mairal, M. Arbel, A. Rudi",
    domain: "Machine Learning · S2",
    prepares:
      "Bach ch.7 (RKHS, representer theorem, kernel ridge rates) in W81, on top of the functional-analysis-lite work in Phase 6. One of MVA's famously mathematical courses — do not enrol without W81 done.",
    readyBy: "Week 83 · Phase 7",
    tracks: ["math"],
  },
  {
    name: "Introduction to Probabilistic Graphical Models and Deep Generative Models",
    teacher: "P. Latouche, P.-A. Mattei, M. Even",
    domain: "Theory · S1",
    prepares:
      "Bayesian inference and Gaussian identities in W55, EM and variational reasoning from Murphy, diffusion models in W41 and W76.",
    readyBy: "Week 78 · Phase 7",
    tracks: ["math", "ml"],
  },
  {
    name: "Optimal Transport for Machine Learning",
    teacher: "G. Peyré, J. Delon",
    domain: "Data Science · S1",
    prepares:
      "Peyré's Computational Optimal Transport and the Numerical Tours notebooks in W79-W80, on a Boyd + measure-theory base.",
    readyBy: "Week 81 · Phase 7",
    tracks: ["math"],
  },
  {
    name: "Foundations of Distributed and Large Scale Computing Optimization",
    teacher: "E. Chouzenoux",
    domain: "Theory · S1",
    prepares:
      "Proximal methods and ISTA/FISTA in W41, augmented Lagrangian and ADMM-style splitting in W63-W64.",
    readyBy: "Week 64 · Phase 6",
    tracks: ["math"],
  },
  {
    name: "Fondements théoriques du deep learning",
    teacher: "S. Gerchinovitz, F. Malgouyres, E. Pauwels, G. Franchi, N. Thome",
    domain: "Deep Learning / Theory · S1",
    prepares:
      "Vershynin ch.1-10 in Phase 7 and Bach's generalization chapters (W83-W86), including NTK at statement level.",
    readyBy: "Week 86 · Phase 8",
    tracks: ["math", "ml"],
  },
  {
    name: "Grandes matrices aléatoires / Large Random Matrices",
    teacher: "J. Najim, H. Lebeau",
    domain: "Theory · S2",
    prepares:
      "Vershynin ch.4-9: nets, operator norms, matrix Bernstein, deviations of random matrices (W71-W78), plus Trefethen's spectral algorithms.",
    readyBy: "Week 79 · Phase 7",
    tracks: ["math"],
  },
  {
    name: "Nuages de points et modélisation 3D (NPM3D)",
    teacher: "J.-E. Deschaud, F. Goulette, T. Boubekeur",
    domain: "Computer Vision · S2",
    prepares:
      "Your SLAM work in Phase 6 (registration, ICP-adjacent reasoning, mapping) and the depth/point-cloud pipelines on the quadruped and drone.",
    readyBy: "Week 66 · end of Phase 6",
    tracks: ["cs", "rob"],
  },
  {
    name: "Graphs in machine learning",
    teacher: "D. Calandriello, M. Valko, A. Azize",
    domain: "Machine Learning · S2",
    prepares:
      "Spectral graph theory via SVD/eigen-solvers (Phase 5), concentration bounds (W62), and the graph algorithms from 6.006/6.046.",
    readyBy: "Week 79 · Phase 7",
    tracks: ["math", "cs"],
  },
  {
    name: "Sequential learning",
    teacher: "P. Gaillard, R. Degenne",
    domain: "Theory · S2",
    prepares:
      "Concentration inequalities (W62), bandits and exploration (W65, CS285 in W74), and Bach's online-learning-adjacent material.",
    readyBy: "Week 83 · Phase 7",
    tracks: ["math", "ml"],
  },
  {
    name: "Bayesian machine learning",
    teacher: "R. Bardenet, J. Arbel, G. Victorino Cardoso",
    domain: "Machine Learning · S2",
    prepares:
      "Bayesian inference in W55, measure theory in W58, MCMC-adjacent sampling reasoning from the diffusion work in W41.",
    readyBy: "Week 78 · Phase 7",
    tracks: ["math", "ml"],
  },
  {
    name: "Introduction to statistical learning",
    teacher: "N. Vayatis",
    domain: "Machine Learning · S1",
    prepares:
      "18.650 statistics in Phase 6 and Bach ch.1-6 in Phase 7 — ERM, consistency, Rademacher complexity, model selection.",
    readyBy: "Week 83 · Phase 7",
    tracks: ["math"],
  },
  {
    name: "Modèles de diffusion et multiéchelles en IA",
    teacher: "S. Mallat",
    domain: "Deep Learning / Image · S2",
    prepares:
      "Diffusion fundamentals in W41, diffusion policies in W76, and the harmonic-analysis flavour of Mallat's course — the one course here where you would still be stretching. Optional.",
    readyBy: "Week 90 · Phase 8 (stretch)",
    tracks: ["ml", "math"],
  },
];

/** The 8 modules that make the strongest, most coherent dossier for you. */
export const mvaShortlist = [
  "Convex optimization and applications in machine learning",
  "Object recognition and computer vision",
  "3D computer vision",
  "Robotics",
  "Reinforcement Learning",
  "Foundations of Large Language Models",
  "Kernel methods for machine learning",
  "Nuages de points et modélisation 3D (NPM3D)",
];

export const MVA_NOTE =
  "MVA asks for 8 validated modules from roughly 48 on offer, split across two semesters. Course names and teachers here are from the published 2026 catalogue and will drift year to year — the value of this page is the mapping from your work to each course's prerequisites, not the catalogue itself. Direction: Yann Gousseau and Laurent Oudre.";
