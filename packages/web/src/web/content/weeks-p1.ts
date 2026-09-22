import type { RawWeek } from "./raw";

/**
 * Weeks 1-38 — Phases 1-4 (14 Sep 2026 → ...).
 * Syntax: "!" prefix = prerequisite gate. "@a,b" suffix = resource ids.
 * W17-21 inserted: Le Gall measure theory, integration, independence, LLN/CLT
 * — moved ahead of statistics and learning theory, which both assume it.
 */
export const weeksP1: RawWeek[] = [
  [
    1,
    "Zero week",
    "Fix the toolchain before touching theory. Nothing here is intellectual — all of it is what stops projects from finishing.",
    {
      math: [
        "!Differential as a linear map: definition, uniqueness, chain rule, differentiating matrix expressions @rouviere",
        "Set up a LaTeX proof notebook + reading log you will keep for 2 years @rouviere",
      ],
      cs: [
        "!Missing Semester lectures 1-5: shell, scripting, editors, data wrangling, command-line env @missing-semester",
        "!Git properly: branches, rebase, bisect, hooks; put every project under version control from day 1 @missing-semester",
        "C++ toolchain: CMake project skeleton, clang-format, ASan/UBSan, gdb, VS Code/CLion debugging @learncpp",
      ],
      ml: [
        "Install PyTorch + CUDA (or CPU), run one tensor tutorial, confirm the environment works @d2l",
      ],
      rob: [
        "Club: pin down your exact deliverable on the racing car and who owns what @f1tenth",
        "Fusion 360: model, print and fit one parametric bracket with real tolerances @fusion",
      ],
    },
    "A public GitHub repo `roadmap-lab` with a working C++ CMake hello-world, a Python env, and your first printed part photographed in the README.",
  ],
  [
    2,
    "Differentials and debugging",
    "Close the calcul différentiel gap while the semester is still light.",
    {
      math: [
        "!Partial vs total derivatives, Jacobians, gradients of f: R^n→R and R^n→R^m; 10 Rouvière exercises @rouviere",
        "Directional derivatives, C^1 ⇒ differentiable, counterexamples that break the intuition @rouviere",
      ],
      cs: [
        "!Missing Semester 6-11: debugging, profiling, metaprogramming, security @missing-semester",
        "6.006 L1-L2: computation model, asymptotics, data structures, dynamic arrays @mit6006",
        "C++ basics: values/references, const, RAII, `std::vector`/`string`, iterators @learncpp",
      ],
      rob: [
        "ROS 2 install + CLI tutorials: nodes, topics, services, launch, rosbag @ros2",
        "Read F1TENTH modules A-B; run the simulator once @f1tenth",
      ],
    },
  ],
  [
    3,
    "Inverse function theorem",
    "The theorem that everything in optimization and robotics silently uses.",
    {
      math: [
        "!Inverse and implicit function theorems: statements, proof sketch, geometric meaning @rouviere",
        "Application: solving F(x,y)=0 locally, and why the IK Jacobian must be invertible @rouviere,modern-robotics",
      ],
      cs: [
        "6.006 L3-L4: sorting, binary search trees, invariants and correctness proofs @mit6006",
        "CSES: Introductory Problems, first 10 in C++ @cses,cph",
        "Write your own dynamic array + linked list in C++ with tests @learncpp",
      ],
      ml: [
        "Karpathy micrograd part 1: build a scalar autograd engine from scratch, by hand @karpathy",
      ],
      rob: [
        "Articulated Robotics: URDF from first principles, build a URDF for the club car @articulated",
        "Car: get teleop + odometry publishing correctly, record a rosbag @f1tenth",
      ],
    },
  ],
  [
    4,
    "Higher derivatives, Hessians",
    "Second-order structure — the language of convexity.",
    {
      math: [
        "!Second differential, Hessian, Schwarz theorem, Taylor-Young at order 2 @rouviere",
        "Local extrema: first/second-order conditions, saddle points, degenerate cases @rouviere",
      ],
      cs: [
        "6.006 L5-L7: hashing, sorting lower bounds, linear sorts @mit6006",
        "CSES Sorting & Searching: 8 problems @cses",
        "C++: templates, `std::` algorithms, lambdas; rewrite your sorts generically @cs106l",
      ],
      rob: [
        "Wall-following and gap-follow reactive controllers in the F1TENTH sim @f1tenth",
        "Fusion: design a sensor mount for the car (LiDAR or camera), print, iterate @fusion",
      ],
    },
  ],
  [
    5,
    "Constrained extrema",
    "Lagrange multipliers done properly — the first bridge to duality.",
    {
      math: [
        "!Submanifolds of R^n, tangent spaces, Lagrange multipliers with proof @rouviere",
        "20 mixed Rouvière exercises timed, agrég style, no solutions until done @rouviere",
      ],
      cs: [
        "6.006 L8-L10: graph representations, BFS/DFS, topological sort (rebuild from scratch) @mit6006",
        "CSES Graph Algorithms: 6 problems @cses",
        "Profile your C++ solutions; learn `perf` and complexity-vs-constant-factor @csapp",
      ],
      ml: [
        "Karpathy micrograd part 2: MLP, loss, training loop, hand-verified gradients @karpathy",
      ],
      rob: [
        "Pure pursuit path tracking in sim; understand lookahead vs stability @f1tenth",
        "Car: first autonomous lap attempt at low speed with the club",
      ],
    },
    "Differential calculus gap closed: you can state and use IFT and Lagrange multipliers cold, on paper, in 20 minutes.",
  ],
  [
    6,
    "Toussaint sprint I",
    "No coursework. Two weeks of concentrated building — the biggest single-block progress of the term.",
    {
      math: [
        "Boyd ch.1 + ch.2: affine/convex sets, cones, hyperplanes, operations preserving convexity @boyd,ee364a",
      ],
      cs: [
        "6.006 L11-L13: weighted shortest paths, Bellman-Ford, Dijkstra re-derived with proof @mit6006",
        "Build project: a C++ maze/route solver with visualisation, on GitHub, with a README @cp-algorithms",
      ],
      ml: [
        "Karpathy makemore part 1-2: bigram model, then MLP language model, typed line by line @karpathy",
      ],
      rob: [
        "Arm project kick-off: requirements, workspace, payload, servo vs stepper decision @modern-robotics",
        "Order arm parts (see Robotics budget) and start CAD of link 1-3 @fusion",
      ],
    },
  ],
  [
    7,
    "Toussaint sprint II",
    "Finish what you started; holidays are where your project lead comes from.",
    {
      math: [
        "!Boyd ch.3: convex functions, first/second-order conditions, operations, conjugates @boyd,ee364a",
      ],
      cs: [
        "6.006 L14-L16: Johnson, DP fundamentals (bottom-up + memoized) @mit6006",
        "CSES DP section: 8 problems, all in C++ with clean state definitions @cses",
      ],
      ml: [
        "Rebuild makemore from an empty file, no video. If you can't, rewatch and repeat @karpathy",
      ],
      rob: [
        "Print + assemble arm links 1-3; measure real backlash and deflection @fusion",
        "Brunton Control Bootcamp L1-L8: state space, stability, controllability @brunton",
      ],
    },
    "Sprint output: route-solver repo + makemore rebuilt from scratch + arm links 1-3 physically assembled.",
  ],
  [
    8,
    "Convex functions",
    "Boyd becomes the spine of the math track for the next five months.",
    {
      math: [
        "!Boyd 3.1-3.3: convexity criteria, Jensen, log-concavity, quasi-convexity @boyd,ee364a",
        "EE364a HW1, full write-up @ee364a-site",
      ],
      cs: [
        "6.006 L17-L19: DP on subproblems, shortest-path DP, pseudo-polynomial @mit6006",
        "CSES DP: 6 more problems; write a personal DP checklist (state, transition, order, base) @cses",
        "C++: move semantics, smart pointers, ownership; refactor your solver @learncpp",
      ],
      ml: [
        "Karpathy makemore 3: activations, gradients, batchnorm — plot the histograms yourself @karpathy",
      ],
      rob: [
        "Modern Robotics ch.2-3: configuration space, DOF, rigid-body motions, SO(3)/SE(3) @modern-robotics",
        "Arm: wire 2 servos, write a C++/Python joint driver with limits and soft-stop",
      ],
    },
  ],
  [
    9,
    "Convex problems",
    "Recognising convexity is the skill; it is 90% pattern matching over ch.2-3.",
    {
      math: [
        "!Boyd ch.4.1-4.3: optimization problem forms, LP, equivalent transformations @boyd,ee364a",
        "18.065 L1-L5: SVD, four subspaces, low-rank, norms @18065",
      ],
      cs: [
        "6.006 L20-L22: greedy, amortized analysis, union-find @mit6006",
        "CSES Range Queries: sparse table, Fenwick, segment tree — implement all three @cses,cp-algorithms",
        "CS:APP ch.1 + set up the C data-representation labs @csapp",
      ],
      rob: [
        "!Modern Robotics ch.4: forward kinematics, PoE formula, and apply it to your arm @modern-robotics",
        "Articulated Robotics: ros2_control, joint state publisher, RViz visualisation of your arm @articulated",
      ],
    },
  ],
  [
    10,
    "QP, SOCP, SDP",
    "The problem classes you will meet again in MPC, SVMs and trajectory optimization.",
    {
      math: [
        "Boyd 4.4-4.6: QP, QCQP, SOCP, geometric programming, semidefinite programming @boyd",
        "CVXPY: model and solve 5 problems from the additional exercises @ee364a-site",
      ],
      cs: [
        "6.006 L23-L26: complexity, reductions, NP-hardness intuition @mit6006",
        "CSES Graph: 6 harder problems (MST, SCC, flows preview) @cses",
        "Write a mini profiler-driven optimization: make one CSES solution 5× faster @csapp",
      ],
      ml: [
        "Karpathy makemore 4-5: backprop through everything manually, then WaveNet @karpathy",
      ],
      rob: [
        "!Modern Robotics ch.5: velocity kinematics, the Jacobian, singularities, manipulability @modern-robotics",
        "Arm: implement FK in code, compare against measured pose with a ruler/camera",
      ],
    },
  ],
  [
    11,
    "Duality",
    "The single most important chapter in the book for ML and for MVA.",
    {
      math: [
        "!Boyd ch.5.1-5.3: Lagrangian, dual function, weak/strong duality, Slater @boyd,ee364a",
        "Derive the dual of LP, QP and the SVM by hand @boyd",
      ],
      cs: [
        "6.046 L1-L3: divide & conquer, master theorem, randomized algorithms @mit6046",
        "Implement quickselect, randomized quicksort, and a hash table with open addressing @clrs",
        "CS:APP ch.2: integers, floats, and why float32 training behaves the way it does @csapp",
      ],
      rob: [
        "!Modern Robotics ch.6: inverse kinematics, Newton-Raphson IK, damped least squares @modern-robotics,nocedal",
        "Arm: implement numerical IK with joint limits; visualise convergence failures",
      ],
    },
  ],
  [
    12,
    "KKT",
    "Where duality becomes an algorithm.",
    {
      math: [
        "!Boyd 5.4-5.7: KKT conditions, sensitivity, perturbation, theorems of alternatives @boyd,ee364a",
        "EE364a HW3-4 @ee364a-site",
      ],
      cs: [
        "6.046 L4-L6: quicksort analysis, hashing, universal families, skip lists @mit6046",
        "CSES: 5 problems mixing DP + graphs, timed at 45 min each @cses",
        "Refactor arm code as a proper C++ library with unit tests (Catch2 / GoogleTest)",
      ],
      ml: [
        "Karpathy GPT from scratch: implement attention, positional encoding, train nanoGPT @karpathy,attention",
      ],
      rob: [
        "Brunton L9-L16: LQR, pole placement, observability, Kalman intro @brunton",
        "Car: tune the low-level controller; log data for later system identification @f1tenth",
      ],
    },
    "Milestone: KKT conditions derived from scratch for SVM, and nanoGPT trained on a text corpus you chose.",
  ],
  [
    13,
    "Unconstrained minimization",
    "From existence theorems to code that converges.",
    {
      math: [
        "!Boyd ch.9: descent methods, line search (backtracking), gradient vs Newton, convergence rates @boyd,ee364a",
        "Implement gradient descent, Newton and BFGS in Python; compare on ill-conditioned problems @nocedal",
      ],
      cs: [
        "6.046 L7-L9: augmenting data structures, dynamic programming (advanced), amortization @mit6046",
        "CS:APP ch.3: machine-level representation, stack frames, and read one disassembly @csapp",
        "CSES: 4 problems + 1 rewritten in 3 different complexities",
      ],
      rob: [
        "!Kalman & Bayesian filters ch.1-4: g-h filter, discrete Bayes, 1D Kalman @kalman-py",
        "Arm: closed-loop position control with feedforward gravity compensation",
      ],
    },
  ],
  [
    14,
    "Equality constraints & interior point",
    "Finish the algorithmic half of Boyd.",
    {
      math: [
        "Boyd ch.10-11: Newton with equality constraints, barrier method, primal-dual interior point @boyd,ee364a",
        "Implement a barrier-method LP solver from scratch and validate against CVXPY @boyd",
      ],
      cs: [
        "6.046 L10-L12: network flow, max-flow min-cut, applications @mit6046",
        "CSES: flows and matchings, 4 problems @cses",
        "C++: write a small linear algebra header (Eigen-free) to force clarity, then switch to Eigen",
      ],
      ml: [
        "Rebuild nanoGPT from an empty file; write a blog-style note explaining attention shapes @karpathy,annotated-transformer",
      ],
      rob: [
        "Kalman ch.5-8: multivariate KF, sensor fusion of IMU + odometry on your car @kalman-py",
        "Car: fuse wheel odometry and IMU; measure drift before/after",
      ],
    },
  ],
  [
    15,
    "Christmas sprint I",
    "Two weeks. One integrated build. This is where the abstract-to-real gap actually closes.",
    {
      math: [
        "Boyd revision: redo 15 exercises across ch.2-5 without notes @boyd",
      ],
      cs: [
        "Project: implement a small optimizer library in C++ (GD, Newton, BFGS) with Eigen and tests @nocedal",
      ],
      ml: [
        "Train a character transformer on a dataset you care about; write up loss curves and ablations @karpathy",
      ],
      rob: [
        "Arm: full 6-DOF assembly, wiring harness, emergency stop, cable management @modern-robotics",
      ],
    },
  ],
  [
    16,
    "Christmas sprint II",
    "Ship, document, and write the first portfolio page.",
    {
      math: [
        "18.065 L6-L12: least squares, pseudo-inverse, conditioning @18065",
      ],
      cs: [
        "Package the optimizer library: README, benchmarks, CI, and a short design note",
        "CSES: cumulative total ≥ 60 problems solved",
      ],
      ml: [
        "Fine-tune a small pretrained model (e.g. GPT-2 small / DistilBERT) on a custom dataset @d2l",
      ],
      rob: [
        "Arm: end-to-end demo — IK + trajectory + pick a block. Record video @modern-robotics",
        "Write project page #1 (arm) with maths, code and video",
      ],
    },
    "Portfolio piece #1 online: 6-DOF arm doing IK-based pick-and-place, with a written derivation of its kinematics.",
  ],
  [
    17,
    "Measure and integration I",
    "Le Gall opens. This is the rigorous floor every later probability, statistics and concentration-inequality claim in the plan stands on — done now, ahead of statistics, not as an afterthought at Phase 6.",
    {
      math: [
        "!Le Gall ch.1: σ-algebras, Borel sets, construction of a measure, measurable functions @legall,kortchemski",
        "Kortchemski TD1: 6 exercises on σ-algebras and measurability, no solutions until done @kortchemski",
      ],
      cs: [
        "6.046 revision: redo the network-flow and NP-completeness problem sets you rushed in W13-14 @mit6046",
      ],
      rob: [
        "Car: consolidate the odometry/IMU fusion stack from W14; write down every open bug @kalman-py",
      ],
    },
  ],
  [
    18,
    "Measure and integration II",
    "The Lebesgue integral, built properly, and the two convergence theorems every later swap-limits-and-integral move in this plan will cite by name.",
    {
      math: [
        "!Le Gall ch.1-2: Lebesgue integral, monotone and dominated convergence @legall,kortchemski",
        "Fubini-Tonelli and change of variables; Kortchemski TD2 in full @legall,kortchemski",
      ],
      cs: [
        "CSES: cumulative total — 8 more problems, mixed topics @cses",
      ],
      rob: [
        "Arm project: punch list from the W16 demo video; fix the top three issues @modern-robotics",
      ],
    },
  ],
  [
    19,
    "Independence",
    "Probability starts here, not before: independence is a measure-theoretic statement, and every 'i.i.d.' in this plan from now on means exactly this.",
    {
      math: [
        "!Le Gall ch.3: independence, product measures, Borel-Cantelli lemmas, 0-1 laws @legall,kortchemski",
        "Kortchemski TD3: independence and Borel-Cantelli, 6 exercises @kortchemski",
      ],
      cs: [
        "C++: revisit the optimizer library from W15-16, add unit tests you skipped @nocedal",
      ],
      ml: [
        "Re-read your char-transformer write-up from W15; note what you'd change now @karpathy",
      ],
    },
  ],
  [
    20,
    "Laws of large numbers",
    "Why averaging works, made precise — the base case Monte Carlo, bootstrap and SGD all quietly assume. First, elementary concentration too: this is the light dose Phase 4's learning theory needs on schedule.",
    {
      math: [
        "!Le Gall ch.3-4: weak and strong LLN, both proofs @legall,kortchemski",
        "Markov, Chebyshev, Hoeffding — prove them from LLN's toolbox; light pass, deep pass returns in Phase 6 @legall,vershynin",
      ],
      cs: [
        "6.046: finish any remaining problem sets from Phase 1-2 before Phase 3 starts @mit6046",
      ],
      rob: [
        "Kalman filter code: add a unit test suite against known analytical solutions @kalman-py",
      ],
    },
  ],
  [
    21,
    "Central limit theorem",
    "The theorem behind every confidence interval and every 'roughly Gaussian' claim you will make for the rest of the plan. Capstone week: a probability cheat sheet you will still trust in Phase 6.",
    {
      math: [
        "!Le Gall ch.4: characteristic functions, the central limit theorem, proof via Lévy's continuity theorem @legall,kortchemski",
        "Modes of convergence (a.s., in probability, L^p, in distribution) and how they relate; Kortchemski TD4-5 @legall,kortchemski",
      ],
      cs: [
        "Write a 1-page note: what changed in how you think about randomness after 5 weeks of Le Gall",
      ],
      rob: [
        "Car project: log and plot odometry drift statistics using the LLN/CLT you just proved @kalman-py",
      ],
    },
    "A written proof sheet for LLN, CLT and the elementary concentration inequalities — the foundation every later statistics and generalization claim in the plan cites back to.",
  ],
  [
    22,
    "Vision from first principles",
    "Learn what a camera does before you learn what a CNN does.",
    {
      math: [
        "Boyd ch.6 selected: approximation, fitting, regularization, robust estimation @boyd",
        "Trefethen L1-L6: matrix-vector products, orthogonality, QR, conditioning @trefethen",
      ],
      cs: [
        "6.046 L13-L15: linear programming, complexity classes, approximation algorithms @mit6046",
        "!FPCV module 1-2: image formation, pinhole model, lenses, radiometry @fpcv",
        "OpenCV in C++: calibrate a real camera with a chessboard, get intrinsics + distortion @fpcv",
      ],
      ml: [
        "PyTorch fundamentals: datasets, dataloaders, training loop as a reusable template @d2l",
      ],
      rob: [
        "Kalman ch.9-11: EKF and UKF; apply EKF to car state estimation @kalman-py",
        "Car: camera-LiDAR extrinsic calibration",
      ],
    },
  ],
  [
    23,
    "Features and filtering",
    "Classical CV: still the right tool half the time on a robot.",
    {
      math: [
        "Boyd ch.7: statistical estimation, ML/MAP as convex problems, experiment design @boyd",
        "Trefethen L7-L12: SVD applications, least squares, stability @trefethen",
      ],
      cs: [
        "!FPCV 3-4: convolution, edge detection, corner detection (Harris), SIFT pipeline @fpcv,szeliski",
        "Implement Harris corners and a SIFT-lite descriptor by hand in C++ (no OpenCV) @szeliski",
        "6.046: NP-completeness reductions, 3 exercises @mit6046",
      ],
      ml: [
        "EECS498 L1-L4: image classification, linear classifiers, regularization, optimization @eecs498",
      ],
      rob: [
        "Car: implement a vision-based lane/cone detector using classical CV; benchmark FPS @f1tenth",
      ],
    },
  ],
  [
    24,
    "Backprop, properly",
    "You've built it by hand; now understand it as a theorem.",
    {
      math: [
        "Automatic differentiation: forward vs reverse mode, complexity, checkpointing @d2l",
        "Boyd ch.8 skim: geometric problems, then close the linear-read of Boyd @boyd",
      ],
      cs: [
        "FPCV 5: image stitching, homographies, RANSAC — implement RANSAC from scratch @fpcv",
        "CS:APP ch.5-6: optimizing performance, memory hierarchy, cache-friendly code @csapp",
        "Rewrite your convolution in cache-aware C++; measure the speedup @csapp",
      ],
      ml: [
        "EECS498 L5-L8: neural nets, backprop, CNN architecture, training dynamics @eecs498",
        "CS231n assignment 1 (kNN, SVM, softmax, 2-layer net in numpy) @cs231n",
      ],
      rob: [
        "Modern Robotics ch.8: dynamics of open chains, Newton-Euler, Lagrangian formulation @modern-robotics",
      ],
    },
  ],
  [
    25,
    "CNNs",
    "The workhorse. Build one from scratch before you ever call `torchvision`.",
    {
      math: [
        "Convolution as an operator: Toeplitz structure, Fourier view, why weight sharing is a prior @18065",
        "Read 'Attention is all you need' once more — note what you now understand @attention",
      ],
      cs: [
        "CS231n assignment 2: fully-connected nets, batchnorm, dropout, conv nets in numpy @cs231n",
        "CSES: 4 problems; keep the streak alive @cses",
      ],
      ml: [
        "EECS498 L9-L12: CNN architectures, training, hardware/software, ResNet @eecs498,resnet",
        "Reproduce ResNet-18 on CIFAR-10 from scratch; hit >92% test accuracy @resnet",
      ],
      rob: [
        "Deploy your CNN on the car's Jetson; measure latency, quantize, compare to classical CV @f1tenth",
      ],
    },
    "Milestone: ResNet-18 trained from scratch to >92% on CIFAR-10, and running quantized on the car.",
  ],
  [
    26,
    "Statistics that MVA assumes",
    "The probability half of the maths track starts here.",
    {
      math: [
        "!18.650 L1-L6: statistical models, MLE, Fisher information, asymptotic normality @wasserman,18650",
        "Prove consistency and asymptotic normality of the MLE in an exponential family @wasserman,18650",
      ],
      cs: [
        "FPCV 6-7: stereo, depth from disparity, epipolar constraint @fpcv",
        "Implement block-matching stereo, then compare against OpenCV SGBM @szeliski",
        "CS:APP ch.7-8: linking, exceptional control flow @csapp",
      ],
      ml: [
        "EECS498 L13-L15: RNNs, attention, transformers (first pass) @eecs498",
      ],
      rob: [
        "Stereo or depth camera on the car; produce a metric obstacle map @f1tenth",
      ],
    },
  ],
  [
    27,
    "Estimation and the exam sprint",
    "Coursework peak — keep the plan alive at reduced volume, deliberately.",
    {
      math: [
        "18.650 L7-L12: hypothesis testing, confidence intervals, Bayesian inference @wasserman,18650",
      ],
      cs: [
        "6.046 review + past exam under timed conditions @mit6046",
        "CSES: 3 problems only, timed @cses",
      ],
      ml: [
        "CS231n assignment 3 part 1: RNN/transformer captioning @cs231n",
      ],
      rob: [
        "Car: full autonomous run at competition speed; log failures systematically @f1tenth",
      ],
    },
  ],
  [
    28,
    "Motion and optical flow",
    "Time enters the picture — literally.",
    {
      math: [
        "18.650 L13-L18: regression, GLM, PCA with proofs @wasserman,18650",
        "Boyd ch.9-11 revision: re-derive Newton's method convergence @boyd",
      ],
      cs: [
        "FPCV 8: optical flow, Lucas-Kanade, tracking @fpcv",
        "Implement Lucas-Kanade tracking; test on your own robot footage @szeliski",
        "CS:APP ch.9: virtual memory; then a malloc lab attempt @csapp",
      ],
      ml: [
        "EECS498 L16-L18: object detection, segmentation, video @eecs498",
      ],
      rob: [
        "Visual odometry v0 on car footage: features → matches → essential matrix → pose @tum-mvg",
      ],
    },
  ],
  [
    29,
    "February sprint I",
    "Second big build block. Target: the tendon hand.",
    {
      math: [
        "Rouvière: 15 exercises on manifolds and IFT applications, timed @rouviere",
      ],
      cs: [
        "Hand project: design the C++ control firmware architecture (10 servos, tendon coupling)",
      ],
      ml: [
        "Train a small vision model to classify hand poses from a webcam; collect your own dataset @eecs498",
      ],
      rob: [
        "!Tendon hand: finger CAD, tendon routing, pulley sizing, print finger prototype v1 @leaphand",
        "Read LEAP Hand paper + CAD; steal every good decision @leaphand",
      ],
    },
  ],
  [
    30,
    "February sprint II",
    "Prototype in hand — literally.",
    {
      math: [
        "18.650 problem sets: finish 2 full sets @wasserman,18650",
      ],
      cs: [
        "CSES: cumulative ≥ 90 problems @cses",
        "Write the hand's servo calibration tool with a GUI",
      ],
      ml: [
        "Fine-tune DINOv2 features for your hand-pose dataset; compare to training from scratch @dinov2",
      ],
      rob: [
        "Tendon hand: 3 fingers actuated with position control and tension sensing @leaphand",
        "Write project page #2 (hand v1)",
      ],
    },
    "Portfolio piece #2: 3-finger tendon hand closing on objects, with a note on tendon transmission modelling.",
  ],
  [
    31,
    "Learning theory entry",
    "Why does empirical risk minimization work at all?",
    {
      math: [
        "!Bach ch.2-3: decision theory, empirical risk minimization, uniform bounds @bach",
        "Hoeffding, McDiarmid, union bound — prove them, then use them @vershynin",
      ],
      cs: [
        "CS:APP concurrency: threads, synchronization, races; write a thread-safe queue @csapp,ostep",
        "OSTEP: processes, scheduling, virtual memory chapters @ostep",
        "CSES: 4 problems @cses",
      ],
      ml: [
        "Bishop ch.1-3: probabilistic framing, distributions, linear regression the Bayesian way @bishop-dl",
      ],
      rob: [
        "Modern Robotics ch.9-10: trajectory generation, motion planning basics @modern-robotics",
        "Arm: minimum-jerk trajectories, then a time-optimal trapezoidal profile",
      ],
    },
  ],
  [
    32,
    "Kernels and SVM",
    "Classical ML at MVA's level of rigour, compressed into two weeks.",
    {
      math: [
        "Bach ch.7: kernels, RKHS, representer theorem @bach",
        "Derive SVM primal/dual and connect it back to Boyd ch.5 @boyd,bach",
      ],
      cs: [
        "Implement an SMO-based SVM in C++ from the dual you derived @cs229",
        "CS:APP malloc lab: finish it @csapp",
      ],
      ml: [
        "CS229 notes: GLMs, generative vs discriminative, EM @cs229",
        "Bishop ch.4-5: single-layer and deep networks @bishop-dl",
      ],
      rob: [
        "Underactuated L1-L3 (skim): why manipulators ≠ walkers, and what dynamics buys you @underactuated",
      ],
    },
  ],
  [
    33,
    "Generalization",
    "Bias-variance, capacity, and the double descent embarrassment.",
    {
      math: [
        "Bach ch.4: least squares, ridge, bias-variance decomposition with proofs @bach",
        "Rademacher complexity and VC dimension: statements and one full proof @bach",
      ],
      cs: [
        "CSES: 5 problems, focus on your weakest section @cses",
        "Refactor: turn your training loop into a reusable, configurable framework (hydra/argparse, logging, seeds)",
      ],
      ml: [
        "Bishop ch.6-9: gradient descent variants, normalization, initialization @bishop-dl",
        "Reproduce a double-descent curve on a small model; explain it in writing",
      ],
      rob: [
        "Modern Robotics ch.11: robot control — computed torque, impedance control @modern-robotics",
        "Arm: implement impedance control; make it safe to push by hand",
      ],
    },
  ],
  [
    34,
    "Multi-view geometry I",
    "The MVA-flavoured version of vision starts now.",
    {
      math: [
        "Lie groups for robotics: SO(3), SE(3), exp/log maps, adjoint — from Modern Robotics ch.3 + Cremers L2-L3 @modern-robotics,tum-mvg",
      ],
      cs: [
        "!Cremers MVG L1-L4: image formation, rigid motion, perspective projection, camera models @tum-mvg",
        "Implement pose composition, exp/log on SE(3), and a small tf library in C++ @tum-mvg",
        "CS231A notes 1-3: camera models, calibration, epipolar geometry @cs231a",
      ],
      ml: [
        "Bishop ch.10: convolutional networks, and transfer learning experiments @bishop-dl",
      ],
      rob: [
        "Car/arm: replace ad-hoc transforms with your SE(3) library; verify against tf2 @ros2",
      ],
    },
  ],
  [
    35,
    "Multi-view geometry II",
    "Two-view geometry, the essential matrix, and triangulation.",
    {
      math: [
        "Least squares on manifolds: Gauss-Newton, Levenberg-Marquardt @nocedal",
      ],
      cs: [
        "!Cremers MVG L5-L8: epipolar geometry, 8-point algorithm, structure reconstruction @tum-mvg,hz",
        "Implement the 8-point algorithm + triangulation from scratch; validate on synthetic data @hz",
        "CSES: 4 problems @cses",
      ],
      ml: [
        "EECS498 L19-L20: generative models, VAEs @eecs498",
      ],
      rob: [
        "Visual odometry v1: frame-to-frame VO with RANSAC + scale from wheel odometry @tum-mvg",
      ],
    },
  ],
  [
    36,
    "Bundle adjustment",
    "The optimization track and the vision track finally meet.",
    {
      math: [
        "Sparse least squares, Schur complement trick, why BA is tractable @nocedal,tum-mvg",
      ],
      cs: [
        "Cremers MVG L9-L12: bundle adjustment, direct methods, robust estimators @tum-mvg",
        "Run COLMAP on your own image set; read its BA formulation @colmap",
        "Implement a toy 2-view BA with Ceres or g2o @colmap",
      ],
      ml: [
        "Bishop ch.11-12: transformers and attention, second serious pass @bishop-dl,attention",
      ],
      rob: [
        "Glider project kick-off: mission profile, morphing mechanism concepts, airfoil selection @uavbook",
      ],
    },
    "Milestone: your own visual odometry running on real footage, with a written comparison to ORB-SLAM3's front end.",
  ],
  [
    37,
    "April sprint I",
    "Build block: glider airframe + transformer implementation.",
    {
      math: [
        "Boyd ch.5 + KKT: full revision, then attempt an MVA past exam @aspremon",
      ],
      cs: [
        "Implement a transformer in C++ (inference only) to force clarity about shapes and memory @annotated-transformer",
      ],
      ml: [
        "Write a transformer from scratch in PyTorch without looking, then diff against the annotated version @annotated-transformer",
      ],
      rob: [
        "Glider: wing CAD with morphing ribs, foam/carbon build, first glide test (unpowered, RC) @uavbook",
      ],
    },
  ],
  [
    38,
    "April sprint II",
    "Year 1 consolidation and honest self-assessment.",
    {
      math: [
        "Self-assessment: d'Aspremont MVA exam, timed, graded honestly @aspremon",
        "Write a 2-page summary of everything in Boyd you can use without notes @boyd",
      ],
      cs: [
        "Timed mock: 2 medium + 1 hard algorithm problem in 90 minutes, spoken aloud @neetcode",
        "CSES cumulative ≥ 110 @cses",
      ],
      ml: [
        "Reproduce a small paper end-to-end (e.g. ViT-Tiny on CIFAR) and write the report @vit",
      ],
      rob: [
        "Glider: instrument with a flight controller, log IMU/airspeed, analyse the data @px4,uavbook",
      ],
    },
    "Year-1 checkpoint: Boyd ch.1-5 + 9-11 solid, 6.006 + 6.046 done, transformer written from scratch, 3 hardware projects flying/moving.",
  ],
];
