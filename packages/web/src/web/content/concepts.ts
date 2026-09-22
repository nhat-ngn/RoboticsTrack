import type { Concept, TrackId } from "./types";

/**
 * The concept-level checklist: what you must actually be able to do, grouped
 * by module. "Gate" means later material silently assumes it — those are the
 * ones you cannot postpone without paying interest.
 *
 * Authoring tuple: [name, why, phase, gate, resourceIds]
 */
type Row = [name: string, why: string, phase: number, gate: boolean, res: string[]];

const MATH: [string, Row[]][] = [
  [
    "Differential calculus",
    [
      ["Differential as a linear map", "Your stated weakness, and the definition every gradient in this plan rests on. If df(x) is not a linear map in your head, optimization stays symbol-pushing.", 1, true, ["rouviere"]],
      ["Jacobians and gradients of vector fields", "You will differentiate R^n → R^m maps constantly: IK Jacobians, backprop, bundle adjustment residuals.", 1, true, ["rouviere"]],
      ["Chain rule in several variables", "Backpropagation is this theorem on a DAG. Nothing more.", 1, true, ["rouviere", "karpathy"]],
      ["Differentiating matrix expressions", "Ubiquitous in ML derivations and almost never taught explicitly in prépa.", 1, false, ["rouviere", "18065"]],
      ["Inverse and implicit function theorems", "The reason IK is locally solvable and why singular Jacobians break robots.", 1, true, ["rouviere", "modern-robotics"]],
      ["Taylor expansions with remainder in R^n", "Second-order conditions, Newton's method and trust regions all start here.", 1, false, ["rouviere", "nocedal"]],
      ["Hessians, definiteness, second-order conditions", "Distinguishes a minimum from a saddle — the entire content of many optimization proofs.", 1, true, ["rouviere", "boyd"]],
      ["Submanifolds and tangent spaces", "Constrained optimization and rigid-body configuration spaces both live on manifolds.", 2, false, ["rouviere", "modern-robotics"]],
    ],
  ],
  [
    "Linear algebra (concurrent)",
    [
      ["Four fundamental subspaces, rank, elimination", "You already have this at 13/20-X level; kept here only so downstream SVD/PCA/NLA tasks have an explicit prerequisite to point at. Self-paced, not a new topic.", 1, false, ["1806"]],
      ["Eigendecomposition and diagonalization", "The picture Strang builds toward before the SVD; needed cold before Phase 5's numerical linear algebra deep dive.", 1, false, ["1806"]],
      ["Positive-definite matrices and the SVD, first pass", "Strang's own route into the SVD, ahead of Trefethen's more numerical treatment in Phase 5. Finish 18.06/Strang before W34.", 2, false, ["1806"]],
    ],
  ],
  [
    "Convex analysis",
    [
      ["Convex sets, hulls, cones, separating hyperplanes", "The vocabulary of every optimization paper you will read at MVA.", 2, true, ["boyd", "ee364a"]],
      ["Convex functions, first- and second-order conditions", "Recognising convexity is the skill; solving is then someone else's library.", 2, true, ["boyd"]],
      ["Operations preserving convexity", "How you prove a real problem is convex without starting from the definition.", 2, true, ["boyd"]],
      ["Conjugate functions and Fenchel duality", "The clean framing of duality, and the foundation of proximal methods.", 2, false, ["boyd", "bach"]],
      ["Standard problem classes: LP, QP, SOCP, SDP", "You need to name the class to pick the solver and to read a paper's method section.", 2, true, ["boyd", "ee364a"]],
      ["Lagrangian duality, weak and strong", "The single most examined topic in MVA optimization. Non-negotiable.", 2, true, ["boyd", "aspremon"]],
      ["KKT conditions", "Certificates of optimality; also the derivation behind SVMs, MPC and interior point.", 2, true, ["boyd", "aspremon"]],
      ["Slater's condition and constraint qualifications", "Where strong duality actually fails — the detail that separates fluency from recitation.", 2, false, ["boyd", "nocedal"]],
      ["Convex relaxations: l1, nuclear norm, SDP relaxation", "How intractable problems become tractable, and the honest cost of doing so.", 3, false, ["boyd", "aspremon"]],
    ],
  ],
  [
    "Optimization algorithms",
    [
      ["Descent methods and exact/backtracking line search", "The base case for everything; also where step-size intuition comes from.", 3, true, ["boyd", "nocedal"]],
      ["Newton's method and self-concordance", "Why Newton converges quadratically and why nobody uses it at scale.", 3, true, ["boyd", "nocedal"]],
      ["Equality-constrained Newton, KKT systems", "The linear algebra core of interior-point solvers and SQP.", 3, false, ["boyd", "nocedal"]],
      ["Barrier and primal-dual interior-point methods", "What CVX, ECOS and OSQP are doing behind the API.", 3, false, ["boyd", "ee364b"]],
      ["Wolfe conditions and convergence rates", "The formal version of 'my step size was wrong'.", 5, true, ["nocedal"]],
      ["Trust-region methods", "The other half of numerical optimization, and what Ceres uses on hard problems.", 5, false, ["nocedal"]],
      ["Quasi-Newton: secant condition, BFGS, L-BFGS", "The default solver in most scientific code; derive the update once and it is yours.", 5, true, ["nocedal"]],
      ["Gauss-Newton and Levenberg-Marquardt", "Bundle adjustment and pose-graph SLAM are exactly this.", 5, true, ["nocedal", "colmap"]],
      ["Nonlinear CG and Hessian-free methods", "How large problems get solved without ever forming a Hessian.", 5, false, ["nocedal", "trefethen"]],
      ["Proximal operators, ISTA/FISTA", "The modern workhorse for non-smooth regularised problems.", 5, false, ["bach", "boyd"]],
      ["SQP, penalty and augmented Lagrangian methods", "Constrained solvers in robotics: trajectory optimization runs on these.", 6, false, ["nocedal", "underactuated"]],
      ["Stochastic gradient descent, analysed", "You use it daily from Phase 2; you should be able to prove something about it by Phase 7.", 7, false, ["bach"]],
    ],
  ],
  [
    "Numerical linear algebra",
    [
      ["SVD: existence, geometry, Eckart-Young", "The master factorization. PCA, low-rank adapters, pose estimation and denoising are all one theorem.", 5, true, ["trefethen", "18065"]],
      ["QR, Householder, Gram-Schmidt stability", "Why you never form A^T A, stated precisely.", 5, true, ["trefethen"]],
      ["Condition number and backward stability", "The vocabulary for explaining why a solver produced garbage.", 5, true, ["trefethen"]],
      ["Least squares: normal equations vs QR vs SVD", "The most-reused computation in vision; know all three tradeoffs.", 5, true, ["trefethen", "18065"]],
      ["Krylov subspaces, Arnoldi, Lanczos", "How eigenvalue and linear solvers actually work at scale.", 5, false, ["trefethen"]],
      ["Conjugate gradient", "The algorithm behind large sparse solves in SLAM and physics.", 5, false, ["trefethen", "nocedal"]],
      ["Randomised SVD, sketching, Johnson-Lindenstrauss", "Where modern ML meets numerical linear algebra.", 5, false, ["18065", "vershynin"]],
      ["Sparse structure and the Schur complement", "The trick that makes bundle adjustment tractable. Do it by hand once.", 6, true, ["colmap", "nocedal"]],
    ],
  ],
  [
    "Statistics and inference",
    [
      ["Statistical models, estimators, bias-variance", "MVA assumes this vocabulary from day one; prépa does not teach it.", 6, true, ["wasserman", "18650"]],
      ["Maximum likelihood and exponential families", "Every loss function you will meet is a negative log-likelihood in disguise.", 6, true, ["wasserman", "18650", "murphy"]],
      ["Fisher information and Cramér-Rao", "The fundamental limit on estimation; also connects to natural gradient.", 6, false, ["wasserman", "18650"]],
      ["Asymptotic normality and the delta method", "How confidence statements get made, including about your own experiments.", 6, false, ["wasserman", "18650"]],
      ["Hypothesis testing, Neyman-Pearson, p-values", "Needed to read papers critically and to not misreport your own results.", 6, true, ["wasserman", "18650"]],
      ["Bootstrap and confidence intervals", "You will use this on your own policy success rates in Phase 8.", 6, true, ["wasserman", "18650"]],
      ["Bayesian inference: priors, conjugacy, MAP vs MLE", "Half of MVA's probabilistic courses speak this language.", 6, true, ["wasserman", "18650", "murphy"]],
      ["Linear regression theory, Gauss-Markov, ridge as MAP", "Least squares once more, with the distributional claims attached.", 6, false, ["wasserman", "18650", "murphy"]],
      ["Multivariate Gaussian identities", "Marginals, conditionals, precision form — reused endlessly in filters and PGMs.", 6, true, ["murphy", "probrob"]],
      ["PCA as maximum likelihood of a latent linear model", "Ties SVD to statistics and shows why PCA is not just a trick.", 6, false, ["18065", "murphy"]],
    ],
  ],
  [
    "Measure and probability",
    [
      ["σ-algebras, measurable functions, Lebesgue integral", "Le Gall ch.1. Real analysis prerequisite for everything downstream: probability as measure, expectation as integral, and eventually Vershynin and MVA's probability courses.", 2, true, ["legall", "kortchemski"]],
      ["Monotone and dominated convergence", "Le Gall ch.1-2. The two theorems you will actually cite when swapping limits and integrals.", 2, true, ["legall", "kortchemski"]],
      ["Fubini-Tonelli and change of variables", "Le Gall ch.2. Used constantly in ML derivations, especially generative models.", 2, false, ["legall", "kortchemski"]],
      ["Independence, product measures, Borel-Cantelli lemmas", "Le Gall ch.3. The formal definition every probability statement after this silently uses.", 3, true, ["legall", "kortchemski"]],
      ["Laws of large numbers, weak and strong", "Le Gall ch.3-4. Why averaging works, made precise; the base case Monte Carlo and SGD both lean on.", 3, true, ["legall", "kortchemski"]],
      ["Central limit theorem and characteristic functions", "Le Gall ch.4. Where confidence intervals and the Gaussian's ubiquity actually come from.", 3, true, ["legall", "kortchemski"]],
      ["Conditional expectation as an L² projection", "Le Gall ch.5. The most useful reframing in probability; makes filters and martingales obvious.", 6, true, ["legall", "kortchemski"]],
      ["Filtrations, martingales, Doob's inequality", "Le Gall ch.6. Prerequisite for concentration proofs and for stochastic-calculus courses at MVA.", 6, false, ["legall", "kortchemski"]],
      ["Modes of convergence and their relations", "Le Gall ch.4. Where 'converges' claims in papers become precise — a.s., in probability, in L^p, in distribution.", 3, false, ["legall", "18650"]],
    ],
  ],
  [
    "High-dimensional probability",
    [
      ["Sub-gaussian and sub-exponential tails, MGF bounds", "The workhorse tail bounds of learning theory.", 7, true, ["vershynin"]],
      ["Hoeffding, Bernstein, Chernoff, McDiarmid", "Proofs, not statements — this is what generalization bounds are made of. Needs only independence and LLN/CLT from Phase 3, not the full measure-theoretic machinery, so it can gate Phase 4's learning theory on schedule.", 3, true, ["vershynin", "bach"]],
      ["Concentration of the norm; near-orthogonality in high dimension", "Why high-dimensional geometry is counter-intuitive and why embeddings work.", 7, false, ["vershynin"]],
      ["Covering and packing numbers, ε-nets", "The bridge from geometry to uniform bounds.", 7, true, ["vershynin"]],
      ["Operator norms of random matrices, matrix Bernstein", "Random matrix theory at the level MVA's course expects.", 7, false, ["vershynin", "18065"]],
      ["Hanson-Wright and quadratic forms", "The inequality you reach for when Gaussians pass through a matrix.", 7, false, ["vershynin"]],
      ["Random processes, Dudley's inequality, generic chaining", "The deepest technique in the plan, and the direct entry to modern theory.", 7, true, ["vershynin"]],
      ["Gaussian width and its computation", "Turns abstract bounds into numbers for specific sets.", 7, false, ["vershynin"]],
      ["Sparse recovery, RIP, Lasso guarantees", "Where compressed sensing and l1 relaxation meet rigorously.", 7, false, ["vershynin", "boyd"]],
    ],
  ],
  [
    "Learning theory",
    [
      ["Learning problem, risk, ERM, consistency", "The formal setup of everything MVA calls 'apprentissage'.", 7, true, ["bach"]],
      ["No-free-lunch and the role of assumptions", "Stops you from believing method claims that cannot be true.", 7, false, ["bach"]],
      ["VC dimension, growth function, Sauer-Shelah", "Classical capacity control; still the standard interview question.", 7, true, ["bach", "vershynin"]],
      ["Rademacher complexity and uniform bounds", "The modern tool, and the one Bach builds most of the book on.", 7, true, ["bach"]],
      ["Kernels, RKHS, representer theorem", "Prerequisite for MVA's kernel methods course, which is heavily mathematical.", 7, true, ["bach"]],
      ["Kernel ridge regression rates, random Fourier features", "Theory with a working implementation attached.", 7, false, ["bach", "vershynin"]],
      ["Local averaging: kNN, Nadaraya-Watson, rates", "The non-parametric baseline that curses of dimensionality are stated against.", 8, false, ["bach"]],
      ["Convex vs non-convex guarantees for ML", "Where the theory stops and the practice keeps working anyway. Say so honestly.", 8, false, ["bach", "nocedal"]],
      ["Generalization of neural networks, NTK at statement level", "Be able to describe the state of the art without overclaiming it.", 8, false, ["bach"]],
      ["Computational optimal transport, Sinkhorn", "Peyré's MVA course; also a genuinely useful tool.", 7, false, ["cot", "numerical-tours"]],
    ],
  ],
];

const CS: [string, Row[]][] = [
  [
    "Toolchain and practice",
    [
      ["Shell, scripting, pipes, data wrangling", "You cannot debug a robot or a training run without this. It is the cheapest skill on the list.", 1, true, ["missing-semester"]],
      ["Git beyond commit: branches, rebase, bisect", "Bisect alone will save you days on the racing car.", 1, true, ["missing-semester"]],
      ["Debuggers, profilers, sanitizers", "Your project experience gap is mostly a debugging gap.", 1, true, ["missing-semester", "learncpp"]],
      ["CMake project structure and dependency management", "Every C++ robotics codebase you touch will be CMake.", 1, true, ["learncpp", "cs106l"]],
      ["Reproducible environments and config management", "Phase 8 research is worthless if runs cannot be reproduced from a clean clone.", 7, false, ["missing-semester", "cs336"]],
      ["Testing and CI for research code", "The cheap habit that makes results trustworthy.", 5, false, ["fluent-python", "missing-semester"]],
    ],
  ],
  [
    "Algorithms and data structures",
    [
      ["Asymptotic analysis and amortised cost", "Gates 6.046 and every interview you will sit.", 1, true, ["mit6006", "clrs"]],
      ["Arrays, hash tables, heaps, balanced trees", "The interview vocabulary; also what you reach for daily.", 1, true, ["mit6006", "neetcode"]],
      ["Sorting and order statistics", "Includes knowing when not to sort.", 1, false, ["mit6006", "clrs"]],
      ["Graph traversal, shortest paths, MST", "You have this from prépa — deepen it rather than repeat it.", 2, false, ["mit6006", "cp-algorithms"]],
      ["Dynamic programming: states, transitions, reconstruction", "The single most common interview failure mode. Volume is the only fix.", 2, true, ["mit6006", "cph", "cses"]],
      ["Divide and conquer, master theorem", "", 3, false, ["mit6046", "clrs"]],
      ["Max-flow, min-cut, matching", "Appears in vision (graph cuts) and in MVA's discrete optimization course.", 3, false, ["mit6046", "cp-algorithms"]],
      ["NP-completeness and reductions", "How you say 'this is hard' with authority instead of vibes.", 3, true, ["mit6046", "clrs"]],
      ["Approximation and randomised algorithms", "", 3, false, ["mit6046"]],
      ["Problem-solving under time pressure, spoken", "A separate trainable skill from solving. Train it separately.", 4, true, ["neetcode", "epi", "ml-interviews"]],
    ],
  ],
  [
    "C++ and Python craft",
    [
      ["Values, references, const-correctness, RAII", "The mental model that makes C++ safe rather than terrifying.", 1, true, ["learncpp", "cs106l"]],
      ["Move semantics and perfect forwarding", "Performance-critical robotics code depends on not copying images.", 5, false, ["effective-cpp", "cs106l"]],
      ["Templates, concepts, and the STL properly", "Reading Eigen, Ceres and ROS 2 headers requires it.", 5, false, ["effective-cpp"]],
      ["Eigen: expression templates, aliasing, sparse types", "The linear algebra library of robotics. Its footguns are well documented.", 5, true, ["effective-cpp", "trefethen"]],
      ["Concurrency: threads, atomics, false sharing", "Robot software is concurrent whether you planned for it or not.", 5, true, ["effective-cpp", "ostep"]],
      ["Undefined behaviour and how to detect it", "ASan/UBSan turn mysteries into stack traces.", 5, false, ["learncpp", "csapp"]],
      ["Idiomatic Python: dataclasses, protocols, decorators", "Kills prépa-style scripting and makes your research code readable.", 5, false, ["fluent-python"]],
      ["Python packaging, typing, and library design", "Your repos are your portfolio; they should install.", 5, false, ["fluent-python"]],
    ],
  ],
  [
    "Computer systems",
    [
      ["Bit-level and integer representation", "Two's complement edge cases cause real robot bugs.", 6, false, ["csapp"]],
      ["IEEE 754 floating point", "Read it twice. It explains your NaN losses and your drifting filters.", 6, true, ["csapp"]],
      ["x86-64 machine code and stack frames", "Reading disassembly is how you settle performance arguments.", 6, false, ["csapp"]],
      ["Memory hierarchy, locality, cache blocking", "The difference between 2 GFLOP/s and 40 GFLOP/s on the same code.", 6, true, ["csapp", "trefethen"]],
      ["Linking, symbols, and the loader", "Explains 90% of build errors in C++ robotics stacks.", 6, false, ["csapp"]],
      ["Virtual memory, page tables, allocators", "Prerequisite for reasoning about GPU transfers and memory pressure.", 6, true, ["csapp", "ostep"]],
      ["Processes, scheduling, signals", "Real-time robot loops need this.", 6, false, ["ostep"]],
      ["Concurrency primitives and race conditions", "", 6, true, ["csapp", "ostep"]],
      ["Sockets and network programming", "", 6, false, ["csapp"]],
    ],
  ],
  [
    "Classical computer vision",
    [
      ["Image formation, sampling, colour", "", 3, false, ["szeliski", "fpcv"]],
      ["Linear filtering, pyramids, scale space", "Still the foundation under learned vision.", 3, true, ["szeliski", "fpcv"]],
      ["Edges, corners, and feature detectors", "", 3, false, ["szeliski", "cs231a"]],
      ["Local descriptors and matching (SIFT-class)", "SfM and SLAM front-ends are built from these.", 3, true, ["szeliski", "hz"]],
      ["Optical flow and KLT tracking", "", 5, false, ["cs231a", "szeliski"]],
      ["Stereo matching and disparity", "", 3, true, ["szeliski", "cs231a"]],
      ["Camera calibration and distortion models", "Everything geometric is wrong until this is right.", 3, true, ["cs231a", "szeliski"]],
      ["RANSAC and robust estimation", "Know its failure modes, not just its API.", 5, true, ["cs231a", "hz"]],
    ],
  ],
  [
    "Multiple-view geometry",
    [
      ["Projective geometry, homogeneous coordinates", "The language; without it MVG papers are unreadable.", 5, true, ["hz", "tum-mvg"]],
      ["Pinhole model, intrinsics, extrinsics", "", 5, true, ["cs231a", "hz"]],
      ["Epipolar geometry, essential and fundamental matrices", "", 5, true, ["hz", "cs231a"]],
      ["Eight-point algorithm and normalisation", "Implement it once; the normalisation step teaches conditioning.", 5, false, ["hz", "trefethen"]],
      ["Triangulation and PnP / P3P", "", 5, true, ["cs231a", "hz"]],
      ["Structure from motion pipelines", "", 5, true, ["colmap", "hz"]],
      ["Bundle adjustment as sparse nonlinear least squares", "The single most important optimization in geometric vision.", 5, true, ["colmap", "nocedal"]],
      ["Trifocal tensor and n-view reconstruction", "", 6, false, ["hz", "tum-mvg"]],
      ["Rotation representations and Lie groups SO(3)/SE(3)", "Optimising over rotations badly is the classic beginner SLAM bug.", 6, true, ["tum-mvg", "modern-robotics"]],
    ],
  ],
  [
    "SLAM systems",
    [
      ["The SLAM problem: filtering vs smoothing", "", 6, true, ["stachniss", "probrob"]],
      ["EKF-SLAM and its scaling limits", "", 6, false, ["probrob", "stachniss"]],
      ["Pose-graph SLAM and information matrices", "", 6, true, ["stachniss", "orbslam3"]],
      ["Visual odometry: front-end design choices", "", 6, true, ["orbslam3", "hz"]],
      ["Loop closure and place recognition (DBoW-class)", "Without it your VO drifts and your map is a spiral.", 6, true, ["orbslam3", "stachniss"]],
      ["IMU preintegration and visual-inertial fusion", "", 6, false, ["orbslam3", "probrob"]],
      ["Benchmarking: ATE, RPE, and honest evaluation", "Numbers against ground truth, or it did not work.", 6, true, ["orbslam3"]],
      ["Occupancy grids and probabilistic mapping", "", 6, false, ["probrob", "stachniss"]],
    ],
  ],
  [
    "ML systems engineering",
    [
      ["Tokenizers: BPE from scratch", "", 7, true, ["cs336"]],
      ["Transformer implementation detail: RMSNorm, SwiGLU, RoPE", "", 7, true, ["cs336", "annotated-transformer"]],
      ["GPU architecture, memory bandwidth, roofline analysis", "Where 'my model is slow' becomes a measurable claim.", 7, true, ["cs336"]],
      ["Custom kernels: Triton, fused softmax, FlashAttention", "", 7, false, ["cs336"]],
      ["Distributed training: DDP, ZeRO/FSDP, tensor parallel", "", 7, true, ["cs336"]],
      ["Scaling laws and how to fit one", "", 7, false, ["cs336"]],
      ["Data curation, dedup, quality filtering", "The unglamorous half of LLM quality.", 7, false, ["cs336"]],
      ["Alignment: SFT, reward models, DPO", "", 7, false, ["cs336"]],
      ["Inference: KV cache, quantization, speculative decoding", "", 7, false, ["cs336"]],
      ["ML system design under latency budgets", "The interview round that separates engineers from students.", 7, true, ["sysdesign", "ddia"]],
    ],
  ],
  [
    "Data systems",
    [
      ["Storage engines, indexes, encoding formats", "", 7, false, ["ddia"]],
      ["Replication, partitioning, transactions", "", 7, false, ["ddia"]],
      ["Consistency models and consensus", "", 7, false, ["ddia"]],
      ["Designing pipelines for large robot log datasets", "You will generate terabytes of logs; design for replay from day one.", 7, false, ["ddia", "sysdesign"]],
    ],
  ],
];

const ML: [string, Row[]][] = [
  [
    "Foundations",
    [
      ["Supervised learning setup, train/val/test discipline", "Starting from zero, this is where the bad habits get prevented.", 2, true, ["cs229", "d2l"]],
      ["Linear and logistic regression from scratch", "", 2, true, ["cs229", "murphy"]],
      ["Loss functions as negative log-likelihoods", "Unifies everything and stops loss choice being folklore.", 3, true, ["murphy", "cs229"]],
      ["Regularization, bias-variance, model selection", "", 3, true, ["cs229", "bishop-dl"]],
      ["SVMs and the kernel trick, derived from duality", "Where your Boyd work pays off immediately.", 3, false, ["cs229", "boyd"]],
      ["Trees, ensembles, gradient boosting", "Still the best answer for tabular problems; know why.", 3, false, ["cs229", "murphy"]],
      ["Unsupervised: k-means, GMM, EM", "You know k-means from prépa; now derive EM properly.", 3, false, ["murphy", "cs229"]],
      ["Evaluation: ROC, PR, calibration, and what they hide", "", 3, true, ["murphy", "18650"]],
    ],
  ],
  [
    "Deep learning core",
    [
      ["Backpropagation derived and implemented by hand", "The gate for the entire ML track. Write micrograd; do not read about it.", 2, true, ["karpathy", "d2l"]],
      ["Automatic differentiation as a DAG computation", "Explains frameworks, memory use, and checkpointing.", 5, true, ["karpathy", "cs336"]],
      ["Initialisation, normalisation, and why training diverges", "", 3, true, ["d2l", "bishop-dl"]],
      ["Optimizers: SGD, momentum, Adam, schedules", "", 3, true, ["d2l", "nocedal"]],
      ["Convolutions, receptive fields, architectures", "", 3, true, ["cs231n", "eecs498"]],
      ["Residual connections and why depth became trainable", "", 3, true, ["resnet", "cs231n"]],
      ["Regularization in practice: dropout, augmentation, early stop", "", 3, false, ["cs231n", "d2l"]],
      ["Training diagnostics: overfit one batch, LR sweeps, ablations", "The practical skill that makes everything else faster.", 4, true, ["karpathy", "cs231n"]],
      ["Mixed precision, checkpointing, experiment tracking", "", 5, false, ["cs336", "d2l"]],
    ],
  ],
  [
    "Transformers and LLMs",
    [
      ["Attention: queries, keys, values, masking, shapes", "The gate for everything modern, including CS336 and VLAs.", 4, true, ["attention", "annotated-transformer"]],
      ["Multi-head attention and positional encoding schemes", "", 4, true, ["annotated-transformer", "cs224n"]],
      ["Writing a transformer from a blank file, twice", "The only proof you understand it. Do it once with references, once without.", 4, true, ["annotated-transformer", "karpathy"]],
      ["Tokenization effects and context extrapolation", "", 5, false, ["cs224n", "cs336"]],
      ["Pretraining objectives and data scaling", "", 7, false, ["cs336", "cs224n"]],
      ["Fine-tuning taxonomy: full, LoRA, adapters, prefix", "", 5, true, ["cs224n", "lilog"]],
      ["Evaluation of generative models, and its dishonesty", "Benchmarks are gamed; be able to say how.", 7, false, ["cs336"]],
    ],
  ],
  [
    "Vision and generative models",
    [
      ["Vision transformers and the inductive-bias tradeoff", "", 5, true, ["vit", "eecs498"]],
      ["Self-supervised learning: contrastive and DINOv2-style", "Where robot perception gets features without labels.", 5, true, ["dinov2", "lilog"]],
      ["Detection and segmentation heads, set prediction", "", 5, false, ["cs231n", "eecs498"]],
      ["Transfer learning and frozen-backbone policies", "", 5, false, ["dinov2", "act"]],
      ["Diffusion models: forward/reverse process, DDPM loss", "Needed before diffusion policies, and a whole MVA course.", 5, true, ["diffusion-policy", "lilog"]],
      ["VAEs, latent variable models, ELBO", "", 6, false, ["bishop-dl", "murphy"]],
    ],
  ],
  [
    "RL foundations",
    [
      ["MDPs, returns, value and action-value functions", "", 6, true, ["sutton", "silver"]],
      ["Bellman expectation and optimality equations, derived", "The gate for all of RL. Derive both from scratch.", 6, true, ["sutton", "silver"]],
      ["Dynamic programming: policy and value iteration", "", 6, true, ["sutton"]],
      ["Monte Carlo methods and importance sampling", "", 6, false, ["sutton"]],
      ["TD learning, TD(λ), eligibility traces", "", 6, true, ["sutton"]],
      ["Q-learning, SARSA, and off-policy subtleties", "", 6, true, ["sutton", "silver"]],
      ["Function approximation and the deadly triad", "Why deep RL is unstable, stated precisely.", 6, true, ["sutton", "silver"]],
      ["Exploration: ε-greedy, UCB, Thompson, RND", "", 6, false, ["sutton", "cs285"]],
    ],
  ],
  [
    "Deep RL",
    [
      ["DQN and its variants, implemented from scratch", "", 6, true, ["cleanrl", "sutton"]],
      ["Policy gradient theorem and REINFORCE", "", 6, true, ["sutton", "cs285"]],
      ["Baselines, advantage estimation, GAE", "", 6, true, ["cs285", "spinningup"]],
      ["Actor-critic and A2C", "", 6, false, ["cs285", "cleanrl"]],
      ["TRPO and PPO: trust regions and the clipped objective", "The default algorithm in robotics. Derive it, then implement it.", 6, true, ["cs285", "cleanrl", "spinningup"]],
      ["Maximum-entropy RL: SAC, DDPG, TD3", "", 6, false, ["cs285", "spinningup"]],
      ["Model-based RL and learned MPC", "", 7, false, ["cs285", "mujoco"]],
      ["Offline RL: distribution shift, CQL, IQL", "The closest sub-field to your own teleop dataset.", 7, true, ["cs285"]],
      ["Inverse RL and reward learning", "", 7, false, ["cs285"]],
    ],
  ],
  [
    "Robot learning",
    [
      ["Behaviour cloning and covariate shift, DAgger", "", 7, true, ["cs285", "act"]],
      ["Action chunking and transformer policies (ACT)", "Directly what you train on your own hand and arm.", 5, true, ["act"]],
      ["Diffusion policies for manipulation", "", 5, true, ["diffusion-policy"]],
      ["Vision-language-action models and finetuning them", "", 7, false, ["act", "diffusion-policy"]],
      ["Dataset design for robot learning", "Synchronisation, splits, and dataset cards. Boring and decisive.", 5, true, ["act"]],
      ["Sim-to-real: domain randomisation, system identification", "", 7, true, ["isaaclab", "cs285"]],
      ["Massively parallel RL training in Isaac", "", 7, false, ["isaaclab", "mujoco"]],
      ["Evaluation protocols: blind trials, bootstrap CIs", "The difference between a demo video and a result.", 8, true, ["18650", "act"]],
    ],
  ],
];

const ROB: [string, Row[]][] = [
  [
    "Robot software",
    [
      ["ROS 2 nodes, topics, services, actions", "", 1, true, ["ros2"]],
      ["Launch files, parameters, and namespaces", "", 1, true, ["ros2"]],
      ["TF2 transform trees and frame discipline", "Most robot bugs are frame bugs.", 1, true, ["ros2", "modern-robotics"]],
      ["rosbag recording and deterministic replay", "The only way to debug a robot that moves.", 1, true, ["ros2", "f1tenth"]],
      ["ros2_control and writing a hardware interface", "", 5, false, ["ros2", "modern-robotics"]],
      ["Real-time considerations and loop timing", "", 6, false, ["ros2", "ostep"]],
    ],
  ],
  [
    "Kinematics",
    [
      ["Rigid-body transforms, SO(3), SE(3)", "", 2, true, ["modern-robotics"]],
      ["Rotation representations and their singularities", "Euler angles will betray you; know when.", 2, true, ["modern-robotics", "tum-mvg"]],
      ["Product of exponentials and forward kinematics", "", 3, true, ["modern-robotics"]],
      ["Space and body Jacobians", "", 3, true, ["modern-robotics"]],
      ["Inverse kinematics: analytic and damped least squares", "", 5, true, ["modern-robotics", "trefethen"]],
      ["Singularities, manipulability, and workspace analysis", "", 5, false, ["modern-robotics"]],
    ],
  ],
  [
    "Dynamics",
    [
      ["Lagrangian dynamics: mass matrix, Coriolis, gravity", "The gate for torque control, MPC and everything legged.", 5, true, ["modern-robotics", "underactuated"]],
      ["Recursive Newton-Euler inverse dynamics", "", 5, true, ["modern-robotics", "articulated"]],
      ["Actuator models, gear ratios, reflected inertia", "This is what makes actuator sizing engineering rather than guessing.", 5, true, ["modern-robotics", "cs123"]],
      ["Friction, backlash, and unmodelled effects", "The gap between your model and your robot, named.", 5, false, ["modern-robotics"]],
      ["Contact dynamics and complementarity constraints", "", 6, true, ["underactuated", "mujoco"]],
      ["Floating-base dynamics and contact Jacobians", "", 6, false, ["underactuated", "cs123"]],
    ],
  ],
  [
    "Control",
    [
      ["PID in practice: tuning, saturation, anti-windup", "", 2, true, ["ros2", "brunton"]],
      ["State-space models, stability, controllability", "", 5, true, ["brunton", "underactuated"]],
      ["Computed-torque and feedforward control", "", 5, true, ["modern-robotics"]],
      ["Impedance and admittance control", "", 5, false, ["modern-robotics", "manipulation"]],
      ["LQR and the Riccati equation", "", 6, true, ["underactuated", "brunton"]],
      ["iLQR / DDP", "", 6, false, ["underactuated"]],
      ["Model-predictive control as receding-horizon optimization", "Where Boyd, Nocedal and robotics meet on the same page.", 6, true, ["underactuated", "boyd", "nocedal"]],
      ["Control allocation for redundant actuators", "The morphing wing's core problem.", 7, false, ["uavbook", "brunton"]],
    ],
  ],
  [
    "Estimation",
    [
      ["Bayes filter as the general recursion", "", 3, true, ["probrob", "kalman-py"]],
      ["Kalman filter derived from Gaussian conditioning", "", 3, true, ["kalman-py", "probrob"]],
      ["EKF, UKF, and linearisation error", "", 3, true, ["kalman-py", "probrob"]],
      ["Particle filters and localisation on a known map", "", 3, true, ["probrob", "f1tenth"]],
      ["Sensor models, noise characterisation, calibration", "Filters fail because covariances are lies. Measure them.", 3, true, ["probrob"]],
      ["Contact-aided legged state estimation", "", 6, false, ["cs123", "probrob"]],
      ["Time synchronisation across sensors", "Desync looks exactly like a control bug. Rule it out first.", 6, true, ["probrob", "ros2"]],
    ],
  ],
  [
    "Planning and locomotion",
    [
      ["Configuration space and obstacles", "", 7, true, ["lavalle"]],
      ["Sampling-based planning: RRT, RRT*, PRM", "", 7, true, ["lavalle"]],
      ["Grid and graph search for robots: A*, hybrid A*", "", 3, false, ["lavalle", "f1tenth"]],
      ["Trajectory optimization: direct collocation, shooting", "", 6, true, ["underactuated", "nocedal"]],
      ["Differential flatness and quadrotor trajectories", "", 7, false, ["uavbook", "underactuated"]],
      ["Legged gaits: SLIP, ZMP, capture point, Raibert", "", 6, true, ["underactuated", "cs123"]],
      ["Ground-reaction-force allocation as a QP", "", 6, true, ["cs123", "underactuated"]],
      ["Aerodynamics for gliders: polars, glide ratio, stability", "", 4, false, ["uavbook"]],
    ],
  ],
  [
    "Systems and practice",
    [
      ["Parametric CAD with real tolerances and fits", "The reason your first bracket did not fit.", 1, true, ["fusion"]],
      ["Design for 3D printing: anisotropy, inserts, stiffness", "", 1, false, ["fusion"]],
      ["Power electronics basics: budgets, BMS, protection", "", 5, true, ["cs123"]],
      ["Field-oriented control and motor drivers in practice", "", 5, false, ["cs123", "modern-robotics"]],
      ["Safety engineering: E-stop, tether, test protocol", "A torque-controlled arm and a quadcopter can both injure you.", 5, true, ["cs123", "px4"]],
      ["Simulation fidelity: MuJoCo, Isaac, and what they get wrong", "", 7, true, ["mujoco", "isaaclab"]],
      ["Hardware-in-the-loop testing", "", 7, false, ["px4", "uavbook"]],
      ["Flight-test discipline and log analysis", "", 7, true, ["px4", "uavbook"]],
    ],
  ],
];

function build(track: TrackId, groups: [string, Row[]][]): Concept[] {
  const out: Concept[] = [];
  groups.forEach(([group, rows], gi) => {
    rows.forEach(([name, why, phase, gate, res], i) => {
      out.push({
        id: `c-${track}-${gi + 1}-${i + 1}`,
        track,
        group,
        name,
        why,
        gate,
        phase,
        res,
      });
    });
  });
  return out;
}

export const concepts: Concept[] = [
  ...build("math", MATH),
  ...build("cs", CS),
  ...build("ml", ML),
  ...build("rob", ROB),
];

export const conceptsByTrack = (track: TrackId) =>
  concepts.filter((c) => c.track === track);

export function conceptGroups(track: TrackId): { group: string; items: Concept[] }[] {
  const order: string[] = [];
  const map = new Map<string, Concept[]>();
  for (const c of conceptsByTrack(track)) {
    if (!map.has(c.group)) {
      map.set(c.group, []);
      order.push(c.group);
    }
    map.get(c.group)!.push(c);
  }
  return order.map((group) => ({ group, items: map.get(group)! }));
}

export const gateConcepts = concepts.filter((c) => c.gate);
