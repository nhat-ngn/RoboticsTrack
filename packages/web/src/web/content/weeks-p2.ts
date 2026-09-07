import type { RawWeek } from "./raw";

/**
 * Weeks 34-68 — Phases 5-6 (3 May 2027 → 2 Jan 2028).
 * Syntax: "!" prefix = prerequisite gate. "@a,b" suffix = resource ids.
 */
export const weeksP2: RawWeek[] = [
  // ───────── PHASE 5 — Transformers, geometry, dynamics (W34-W51) ─────────
  [
    34,
    "SVD as the master factorization",
    "Year 2 opens on numerical linear algebra. You know abstract algebra; you do not yet know which factorization to reach for when a matrix is 40k x 40k and badly conditioned. Everything downstream — PCA, least squares, low-rank adapters, bundle adjustment, PCA on features — is this.",
    {
      math: [
        "!SVD: existence, geometric picture, Eckart-Young low-rank optimality, four fundamental subspaces read off Σ @18065,trefethen",
        "Trefethen lectures 1-5: matrix-vector view, orthogonality, norms, the SVD @trefethen",
      ],
      cs: [
        "!CS231A lectures 1-2: pinhole camera, intrinsics/extrinsics, homogeneous coordinates, projective vs affine @cs231a",
        "Camera calibration in practice: checkerboard, OpenCV `calibrateCamera`, read the reprojection error honestly @cs231a,szeliski",
        "CSES graph section: finish it (cumulative ≥ 130) @cses",
      ],
      ml: [
        "!Close read of 'Attention Is All You Need' with the annotated implementation open beside it — every shape, every mask @attention,annotated-transformer",
      ],
      rob: [
        "!Modern Robotics ch.8: dynamics of open chains — Lagrangian formulation, mass matrix, Coriolis, Newton-Euler recursion @modern-robotics",
        "Racing car: full-lap autonomy attempt with the current stack, log everything @f1tenth",
      ],
    },
  ],
  [
    35,
    "Least squares, QR, conditioning",
    "The single most reused computation in vision and ML, plus the vocabulary to say why your solver blew up.",
    {
      math: [
        "!QR via Gram-Schmidt/Householder, normal equations vs QR vs SVD, condition number and backward stability @trefethen",
        "Trefethen 6-12 + exercises: why you never form A^T A explicitly @trefethen,18065",
      ],
      cs: [
        "!CS231A 3-4: two-view geometry, epipolar constraint, essential and fundamental matrices @cs231a,hz",
        "Implement the 8-point algorithm from scratch (normalization included), compare against OpenCV @cs231a,hz",
        "C++: move semantics, perfect forwarding, RAII wrappers for OpenCV/Eigen handles @effective-cpp,cs106l",
      ],
      ml: [
        "Tokenization + positional encodings: BPE, absolute vs learned vs RoPE, why context extrapolation fails @cs224n,karpathy",
      ],
      rob: [
        "Modern Robotics ch.9: trajectory generation — point-to-point, time scaling, via points @modern-robotics",
        "Racing car: pure-pursuit vs Stanley controller comparison on logged laps @f1tenth",
      ],
    },
  ],
  [
    36,
    "Eigenvalue algorithms",
    "How iterative solvers actually work, so 'it converged' stops being a mystery.",
    {
      math: [
        "Power iteration, QR algorithm, Krylov subspaces, Arnoldi/Lanczos, conjugate gradient @trefethen,18065",
        "Trefethen 24-32 + implement CG in NumPy and watch the residual @trefethen",
      ],
      cs: [
        "!CS231A 5-6: triangulation, PnP, RANSAC as a robust estimator (and its failure modes) @cs231a",
        "Implement RANSAC + P3P yourself; measure inlier ratio vs pose error @cs231a,szeliski",
        "Interview cadence: 4 medium problems, timed, spoken aloud @neetcode,epi",
      ],
      ml: [
        "Fine-tuning taxonomy: full FT, LoRA, adapters, prefix tuning — implement LoRA on a small LM by hand @cs224n,lilog",
      ],
      rob: [
        "!Modern Robotics ch.11: computed-torque control, PD + feedforward, stability of the error dynamics @modern-robotics",
        "6-DOF arm: workspace spec, reach/payload targets, actuator sizing spreadsheet from the dynamics @modern-robotics,fusion",
      ],
    },
  ],
  [
    37,
    "Randomized NLA and structure from motion",
    "Low-rank thinking is the bridge between your linear algebra and modern ML systems.",
    {
      math: [
        "Randomized SVD, Johnson-Lindenstrauss sketching, Nyström approximation @18065,vershynin",
        "18.065: matrix completion, nuclear norm as a convex surrogate for rank — connect back to Boyd @18065,boyd",
      ],
      cs: [
        "!CS231A 7-8: structure from motion, bundle adjustment as a sparse nonlinear least-squares problem @cs231a,hz",
        "Run COLMAP on 80 of your own photos; read the sparse/dense pipeline docs and inspect the output @colmap",
        "C++: Eigen properly — expression templates, aliasing, block operations, sparse matrices @effective-cpp",
      ],
      ml: [
        "ViT: patchify, class token, inductive-bias tradeoff vs CNNs; run the paper's ablations mentally @vit,resnet",
      ],
      rob: [
        "6-DOF arm: full CAD, reduction choice (belt vs cycloidal vs harmonic), print/order the first joint @fusion,modern-robotics",
        "Order arm parts — motors, drivers, encoders — against the BOM @fusion",
      ],
      // deliverable below
    },
    "A COLMAP reconstruction of a real scene you shot, plus your own 8-point + RANSAC + triangulation pipeline reproducing the two-view geometry on the same images.",
  ],
  [
    38,
    "Numerical optimization I",
    "Boyd told you what a convex problem is. Nocedal tells you what the solver does — this is the half MVA assumes and most students skip.",
    {
      math: [
        "!Nocedal ch.2-3: line search, Wolfe conditions, convergence rates of steepest descent vs Newton @nocedal",
        "Implement backtracking line search + Newton with Hessian modification; plot convergence @nocedal,ee364a",
      ],
      cs: [
        "CS:APP ch.1-2 preview: bits, integer/float representation, why your loss went NaN @csapp",
        "C++ concurrency: threads, mutexes, atomics, false sharing; parallelize one vision loop @effective-cpp,cs106l",
        "CSES cumulative ≥ 145 @cses",
      ],
      ml: [
        "Self-supervised learning: DINOv2 objective, why its features work zero-shot; extract them for a robot scene @dinov2",
      ],
      rob: [
        "Arm: assemble joints 1-3, wire drivers, get closed-loop position control on one axis @modern-robotics",
        "ROS 2: write the arm's driver node + `ros2_control` hardware interface @ros2",
      ],
    },
  ],
  [
    39,
    "Numerical optimization II",
    "Quasi-Newton and trust regions — the methods that are actually in SciPy, Ceres and every SLAM backend.",
    {
      math: [
        "!Nocedal ch.4 + 6: trust-region methods, BFGS/L-BFGS derivation, secant condition, limited memory @nocedal",
        "Implement BFGS and L-BFGS from scratch; benchmark on Rosenbrock and a logistic regression @nocedal",
      ],
      cs: [
        "!Levenberg-Marquardt and Gauss-Newton: derive from Nocedal ch.10, then read Ceres' implementation @nocedal,colmap",
        "Write a 2-view bundle adjustment in C++ with Ceres, then again with your own LM @colmap,hz",
        "Mock interview: 1 hard graph problem + 1 design-a-data-structure, out loud @neetcode,epi",
      ],
      ml: [
        "Detection and segmentation: anchor-free heads, DETR's set-prediction loss, Hungarian matching @cs231n,eecs498",
      ],
      rob: [
        "Arm: assemble joints 4-6, calibrate encoders and joint limits, publish TF tree @ros2,modern-robotics",
        "Arm: gravity compensation from the mass matrix — hold pose with motors nearly free @modern-robotics",
      ],
    },
  ],
  [
    40,
    "Large-scale optimization and autodiff",
    "Why L-BFGS, CG and Adam behave the way they do, and what a tape actually stores.",
    {
      math: [
        "Nocedal ch.5 + 7: nonlinear CG, inexact Newton, Hessian-free methods @nocedal",
        "!Reverse-mode autodiff: derive it as the chain rule on a DAG; hand-write a 200-line autodiff engine @karpathy,nocedal",
      ],
      cs: [
        "Fluent Python: dataclasses, protocols, iterators, context managers, `functools` — kill your prépa-style Python @fluent-python",
        "Package your vision code as a proper Python library with tests and typing @fluent-python,missing-semester",
        "CS231A: optical flow (Lucas-Kanade), KLT tracking, implement one @cs231a,szeliski",
      ],
      ml: [
        "Training infrastructure: mixed precision, grad accumulation, checkpointing, LR schedules, seeding, W&B logging @d2l,cs336",
      ],
      rob: [
        "Arm: IK (analytic + damped least squares) and Cartesian jogging in ROS 2 @modern-robotics,ros2",
        "Arm: MoveIt 2 setup, collision model, plan-and-execute a joint-space trajectory @ros2",
      ],
    },
  ],
  [
    41,
    "Constrained solvers, first pass",
    "Cross the line from 'I can recognise a convex problem' to 'I can write the solver'.",
    {
      math: [
        "Nocedal ch.12: theory of constrained optimization, LICQ, second-order conditions @nocedal,boyd",
        "Projected gradient, proximal operators, ISTA/FISTA — implement and test on Lasso @bach,boyd",
      ],
      cs: [
        "!Sparse linear algebra for BA: Schur complement trick, sparsity patterns, why ordering matters @colmap,nocedal",
        "Read the ORB-SLAM3 paper end to end; run it on a dataset and on your own handheld footage @orbslam3",
        "Timed set: 3 mediums in 75 minutes @neetcode",
      ],
      ml: [
        "Diffusion models: forward/reverse SDE intuition, DDPM loss, sampling — needed for diffusion policies later @diffusion-policy,lilog",
      ],
      rob: [
        "Arm + camera: hand-eye calibration, then a vision-guided pick @modern-robotics,cs231a",
        "Arm: torque-mode control experiment, log tracking error vs PD gains @modern-robotics",
      ],
    },
  ],
  [
    42,
    "Semester close-out",
    "Consolidate before the summer. Nothing new — prove to yourself the year held.",
    {
      math: [
        "Timed self-assessment: NLA + Nocedal problem set, graded honestly @trefethen,nocedal",
        "One-page cheat sheet per topic: SVD, QR, CG, Newton, BFGS, trust region, KKT @trefethen,nocedal",
      ],
      cs: [
        "Write the full two-view → SfM pipeline report: your numbers vs COLMAP's @cs231a,colmap",
        "CSES cumulative ≥ 160; log which categories still feel slow @cses",
      ],
      ml: [
        "Fine-tune a ViT/DINOv2 backbone on images from your own robot; report accuracy and failure cases @vit,dinov2",
      ],
      rob: [
        "Arm: pick-and-place demo, 20 consecutive attempts, report success rate on video @modern-robotics",
      ],
    },
    "6-DOF arm doing repeatable vision-guided pick-and-place, plus a written NLA/optimization self-assessment with your grade on it.",
  ],
  // ───────── Summer sprint 2027 (W43-W51) — optional / light ─────────
  [
    43,
    "Summer sprint: arm to spec",
    "You said you take two months off. This block is intentionally optional — hardware only, no reading load. Anything you do here is upside.",
    {
      rob: [
        "Arm: full gravity + friction compensation, impedance control on one axis @modern-robotics",
        "Arm: repeatability measurement with a dial indicator; write the number down @modern-robotics",
      ],
      ml: ["Optional: 1h/week keeping the training loop warm — nothing new @d2l"],
    },
  ],
  [
    44,
    "Summer sprint: hand design",
    "The tendon hand is your best manipulation-research asset. Design it properly rather than fast.",
    {
      rob: [
        "!Tendon-driven hand: kinematic design, 10 servos, routing, pulley radii, tendon tension budget @leaphand,articulated",
        "Study the LEAP Hand build docs and decide what you copy vs redesign @leaphand",
      ],
    },
  ],
  [
    45,
    "Summer sprint: hand build",
    "Print, assemble, break, reprint.",
    {
      rob: [
        "Hand: print all phalanges, assemble two fingers, validate tendon travel and return springs @leaphand",
        "Hand: servo driver board, power budget, current sensing for crude force feedback @leaphand",
      ],
    },
  ],
  [
    46,
    "Summer sprint: hand control",
    "From twitching servos to a controllable end-effector.",
    {
      rob: [
        "Hand: joint-space control, finger IK, grasp primitives (power, pinch, tripod) @leaphand,manipulation",
        "Mount the hand on the arm; unified ROS 2 control stack for 16 DOF @ros2,modern-robotics",
      ],
    },
  ],
  [
    47,
    "Summer: rest week",
    "Deliberately empty. Two years is long; burning out in month 11 is the main failure mode of plans like this.",
    {},
  ],
  [
    48,
    "Summer sprint: teleop data",
    "Data is the scarce resource in robot learning. Build the collection rig now and you spend year 2 training, not plumbing.",
    {
      rob: [
        "Build a teleoperation setup (leader arm or VR/glove) and record synchronized video + joint states @act,leaphand",
        "Collect 50+ demonstrations of one manipulation task; write the dataset loader @act",
      ],
      ml: ["Read the ACT paper and the ALOHA setup carefully before recording anything @act"],
    },
  ],
  [
    49,
    "Summer sprint: imitation learning",
    "Your first learned policy on your own hardware. This is the moment the ML track stops being theory.",
    {
      ml: [
        "!Train an ACT-style transformer policy on your teleop dataset; report success rate @act",
        "Train a diffusion policy on the same data and compare sample efficiency @diffusion-policy",
      ],
      rob: ["Deploy the policy on the arm+hand, measure success over 30 trials on video @act,diffusion-policy"],
    },
  ],
  [
    50,
    "Summer sprint: failure analysis",
    "The interesting part of robot learning is why it fails.",
    {
      ml: [
        "Ablate: dataset size, action chunking, image augmentation, backbone (ResNet vs DINOv2) @act,dinov2",
      ],
      rob: ["Fix the top two hardware causes of policy failure (backlash, tendon slack, camera drift) @leaphand"],
    },
  ],
  [
    51,
    "Summer close: year 1 review",
    "Write it down or it did not happen. This is also the raw material for MVA applications and internship CVs.",
    {
      math: ["Re-derive from memory: KKT, BFGS update, SVD optimality. Note the gaps and schedule them @nocedal,trefethen"],
      cs: ["Publish the SfM + VO repo with README, benchmarks and honest limitations @cs231a,colmap"],
      ml: ["Write a 6-page technical report on the imitation-learning experiment, paper-style @act,diffusion-policy"],
      rob: ["Portfolio video: car, arm, hand, glider — 90 seconds, no music, just results @f1tenth"],
    },
    "Year-1 portfolio: 4 hardware projects on video, 3 public repos, 1 paper-style report, and a written gap list driving Phase 6.",
  ],
  // ───────── PHASE 6 — Master-level (W52-W68) ─────────
  [
    52,
    "Statistics from scratch",
    "You have measure-free probability from prépa. MVA assumes real statistical inference: estimators, asymptotics, and the vocabulary of learning theory. Start here.",
    {
      math: [
        "!18.650 L1-4: statistical models, estimators, bias/variance, consistency, MLE @18650",
        "Derive MLE for Bernoulli, Gaussian, exponential families by hand @18650,murphy",
      ],
      cs: [
        "!CS:APP ch.1-2 + Data Lab: bit manipulation, two's complement, IEEE 754 edge cases @csapp",
        "Read the float section twice — then explain your own NaN loss from Phase 5 @csapp",
        "Interview restart: 3 mediums, timed @neetcode",
      ],
      ml: [
        "!Sutton & Barto ch.1-3: MDPs, returns, value functions, Bellman equations. Derive both Bellman equations yourself @sutton,silver",
      ],
      rob: [
        "!Underactuated Robotics L1-3: dynamics of underactuated systems, linearization, LQR @underactuated",
        "Implement LQR on a cart-pole in Python; verify against the Riccati solution @underactuated",
      ],
    },
  ],
  [
    53,
    "Asymptotics",
    "The delta method and Fisher information are how statisticians talk about the same second-order behaviour Nocedal gave you.",
    {
      math: [
        "18.650 L5-8: CLT for estimators, Fisher information, Cramér-Rao, delta method @18650",
        "Prove asymptotic normality of the MLE in a one-parameter family @18650",
      ],
      cs: [
        "!CS:APP ch.3 + Bomb Lab: x86-64, stack frames, calling conventions, reading disassembly @csapp",
        "Compile one of your C++ vision kernels and read its assembly; find one wasted instruction @csapp",
        "CSES: DP section, 10 problems @cses,cph",
      ],
      ml: [
        "Sutton & Barto ch.4: dynamic programming — policy evaluation, policy/value iteration; implement both on GridWorld @sutton",
      ],
      rob: [
        "Underactuated L4-6: iLQR / DDP; implement iLQR for the cart-pole swing-up @underactuated",
      ],
    },
  ],
  [
    54,
    "Testing and cache-aware code",
    "Hypothesis testing you will need to read papers honestly; the memory hierarchy you will need to make anything fast.",
    {
      math: [
        "18.650 L9-13: hypothesis testing, Neyman-Pearson, Wald/LR tests, p-values and their misuse @18650",
        "Confidence intervals and the bootstrap; implement a bootstrap CI on your own policy success rates @18650",
      ],
      cs: [
        "!CS:APP ch.5-6 + Cache Lab: program optimization, locality, cache blocking @csapp",
        "Optimize a matrix multiply from naive to blocked+SIMD; report GFLOP/s at each step @csapp,trefethen",
      ],
      ml: [
        "Sutton & Barto ch.5-6: Monte Carlo methods, TD(0), the bias-variance story of RL targets @sutton,silver",
      ],
      rob: [
        "Underactuated L7-9: trajectory optimization, direct collocation; solve a swing-up with collocation @underactuated",
      ],
    },
  ],
  [
    55,
    "Bayesian inference and systems plumbing",
    "Priors, posteriors and conjugacy — the language of half of MVA — alongside the OS layer under every training run.",
    {
      math: [
        "18.650 Bayesian chapters + Murphy ch.4-5: priors, conjugacy, posterior predictive, MAP vs MLE @18650,murphy",
        "Gaussian identities you will reuse forever: marginals, conditionals, precision form @murphy,bishop-dl",
      ],
      cs: [
        "CS:APP ch.7-8: linking, symbol resolution, exceptions and signals @csapp",
        "OSTEP ch.1-14: processes, scheduling, address spaces @ostep",
        "Mock interview: 1 hard + 1 medium, timed, recorded @neetcode,epi",
      ],
      ml: [
        "Sutton & Barto ch.7 + 12: n-step TD, TD(λ), eligibility traces @sutton",
      ],
      rob: [
        "Underactuated: MPC formulation; run MPC on the racing car simulator and compare against pure pursuit @underactuated,f1tenth",
      ],
    },
  ],
  [
    56,
    "Regression theory and virtual memory",
    "Least squares once more — this time as statistics, with the distributional claims attached.",
    {
      math: [
        "18.650: linear regression theory, Gauss-Markov, ridge as MAP, GLMs and logistic regression @18650,murphy",
        "Derive ridge's bias-variance tradeoff explicitly; connect to conditioning from Trefethen @18650,trefethen",
      ],
      cs: [
        "!CS:APP ch.9 + Malloc Lab: virtual memory, page tables, writing an allocator @csapp",
        "Explain (in writing) what happens on a page fault during a CUDA host-to-device copy @csapp,ostep",
      ],
      ml: [
        "!Sutton & Barto ch.9-11: function approximation, semi-gradient TD, the deadly triad @sutton,silver",
      ],
      rob: [
        "Underactuated L: contact dynamics, hybrid systems, complementarity constraints @underactuated",
        "Quadruped: decide the architecture (direct-drive vs geared, mass budget, actuator torque density) @cs123,underactuated",
      ],
    },
  ],
  [
    57,
    "Multivariate theory and concurrency",
    "PCA with proofs, and the concurrency knowledge that separates 'wrote a robot node' from 'wrote a robot system'.",
    {
      math: [
        "Multivariate Gaussian: whitening, Mahalanobis distance, PCA as MLE of a latent linear model @murphy,18065",
        "Prove PCA's optimality via SVD; then read Vershynin's covariance-estimation preview @18065,vershynin",
      ],
      cs: [
        "CS:APP ch.10-12: system I/O, network programming, concurrent programming, race conditions @csapp",
        "OSTEP concurrency: locks, condition variables, semaphores; write a thread-safe sensor buffer @ostep",
      ],
      ml: [
        "!DQN: read the paper, then implement DQN from scratch on CartPole and Pong; compare to CleanRL's @sutton,cleanrl",
      ],
      rob: [
        "Legged locomotion theory: SLIP model, ZMP, capture point, Raibert heuristic @underactuated,cs123",
      ],
    },
    "A quadruped design review document: kinematics, actuator sizing from the SLIP/torque analysis, BOM, and a build schedule.",
  ],
  [
    58,
    "Measure theory, minimum viable",
    "Not for elegance — MVA's probabilistic courses and Vershynin both assume it. Two weeks of targeted work, not a full course.",
    {
      math: [
        "!σ-algebras, measurable functions, Lebesgue integral, monotone and dominated convergence @18650,vershynin",
        "Fubini-Tonelli and change of variables — the two you actually use in ML derivations @vershynin",
      ],
      cs: [
        "!TUM Multiple View Geometry L1-4 (or HZ ch.2-4): projective geometry, transformations, camera models, rigorously @tum-mvg,hz",
        "Stachniss SLAM lectures 1-5: the SLAM problem, EKF-SLAM @stachniss,probrob",
      ],
      ml: [
        "Policy gradient theorem: derive REINFORCE from scratch, then the baseline variance reduction @sutton,cs285",
      ],
      rob: [
        "Quadruped: full CAD, order actuators and drivers against the BOM @cs123,fusion",
      ],
    },
  ],
  [
    59,
    "Toussaint sprint I",
    "Break week — no coursework. Two weeks of hardware and code, which is where project leaps actually come from.",
    {
      cs: ["Implement stereo visual odometry in C++ from scratch: features, matching, PnP, local BA @orbslam3,hz"],
      rob: ["Quadruped: machine and assemble all four legs, bench-test one leg's torque @cs123"],
      ml: ["Optional: finish the DQN Atari run and write down what actually mattered @cleanrl"],
    },
  ],
  [
    60,
    "Toussaint sprint II",
    "Break week — the SLAM stack becomes yours.",
    {
      cs: [
        "Add loop closure to your VO using DBoW-style place recognition; measure ATE against ground truth @orbslam3,stachniss",
      ],
      rob: [
        "Quadruped: assemble the body, wire power distribution and E-stop, first standing test @cs123",
      ],
    },
    "Your own stereo VO/SLAM in C++ with loop closure, benchmarked (ATE/RPE) against ORB-SLAM3 on KITTI or EuRoC.",
  ],
  [
    61,
    "Conditional expectation and n-view geometry",
    "Conditional expectation as an L² projection is the single most useful reframing in probability. Then: geometry beyond two views.",
    {
      math: [
        "!Conditional expectation as orthogonal projection in L²; tower property, martingale definition @vershynin,18650",
        "Filtrations, stopping times, Doob's inequality — enough to read concentration proofs @vershynin",
      ],
      cs: [
        "HZ ch.9-11: fundamental matrix estimation properly, trifocal tensor, n-view reconstruction @hz,tum-mvg",
        "Stachniss 6-10: graph-based SLAM, information matrices, pose-graph optimization @stachniss,probrob",
      ],
      ml: [
        "Actor-critic: A2C from scratch, then GAE; sweep the λ and see the bias-variance curve @sutton,cleanrl",
      ],
      rob: [
        "Quadruped: leg IK, joint-level PD control, torque limits and safety @cs123,modern-robotics",
      ],
    },
  ],
  [
    62,
    "Concentration inequalities",
    "The core technical tool of statistical learning theory. Learn it properly now; Vershynin in Phase 7 assumes it.",
    {
      math: [
        "!Markov, Chebyshev, Chernoff, Hoeffding, Bernstein, McDiarmid — proofs, not statements @vershynin,bach",
        "Apply: how many demonstrations do you need to estimate your policy's success rate to ±3%? @vershynin",
      ],
      cs: [
        "!Bundle adjustment for real: implement pose-graph BA with g2o or Ceres on your own SLAM output @colmap,stachniss",
        "Sparse Schur complement by hand on a 5-pose, 40-landmark problem @colmap,nocedal",
      ],
      ml: [
        "!PPO: derive the trust-region and clipped objectives, implement PPO from scratch, verify against CleanRL @cs285,cleanrl,spinningup",
      ],
      rob: [
        "Quadruped: standing balance controller (ZMP or QP-based ground reaction force allocation) @underactuated,cs123",
      ],
    },
  ],
  [
    63,
    "Constrained optimization, numerically",
    "SQP, penalties and augmented Lagrangians — what MPC and every robotics QP solver runs on.",
    {
      math: [
        "Nocedal ch.15-17: penalty and augmented Lagrangian methods, SQP @nocedal",
        "Implement an augmented Lagrangian solver; test on a constrained trajectory-optimization toy @nocedal,underactuated",
      ],
      cs: [
        "Read ORB-SLAM3's source: tracking, local mapping, atlas, IMU initialization @orbslam3",
        "Visual-inertial: IMU preintegration derivation, then read a VINS implementation @orbslam3,probrob",
        "CSES cumulative ≥ 180 @cses",
      ],
      ml: [
        "Continuous control: DDPG, TD3, SAC — derive the maximum-entropy objective; implement SAC @cs285,cleanrl,spinningup",
      ],
      rob: [
        "Quadruped: convex MPC for a trot gait in MuJoCo; tune the gait schedule @mujoco,underactuated",
      ],
    },
  ],
  [
    64,
    "Interior point and model-based RL",
    "Close the optimization arc: you will have implemented every solver class you cite.",
    {
      math: [
        "Nocedal ch.19 + Boyd ch.11 revisited: primal-dual interior point; implement one for an LP/QP @nocedal,boyd",
        "Compare your solver against OSQP/ECOS on the same MPC problem; explain the gap @nocedal,ee364b",
      ],
      cs: [
        "Kalman/EKF/UKF from first principles in Python, then on your own IMU logs @kalman-py,probrob",
        "Probabilistic Robotics ch.2-5: Bayes filters, EKF, particle filters @probrob",
      ],
      ml: [
        "Model-based RL: learned dynamics, MPC with a learned model, PETS; read the CS285 model-based lectures @cs285",
      ],
      rob: [
        "Quadruped: deploy the trot on hardware; log tracking error, fix the top failure @cs123,mujoco",
      ],
    },
  ],
  [
    65,
    "Exploration and estimation on hardware",
    "Where sim-to-real starts to bite, and where the estimation theory pays off.",
    {
      math: [
        "Information theory basics: entropy, KL, mutual information, Fano — needed for exploration and for MVA @murphy,bach",
      ],
      cs: [
        "Probabilistic Robotics ch.7-9: localization, occupancy grids, mapping @probrob,stachniss",
        "System design: design a data pipeline for 10 TB of robot logs (ingest, index, replay) @sysdesign,ddia",
      ],
      ml: [
        "Exploration: ε-greedy vs UCB vs Thompson vs RND; implement two on a hard-exploration task @cs285,sutton",
      ],
      rob: [
        "Quadruped: state estimation from IMU + leg odometry (EKF), validate against motion capture or a tape measure @kalman-py,probrob",
      ],
    },
  ],
  [
    66,
    "Integration week",
    "Make the pieces one system instead of seven demos.",
    {
      math: ["Timed MVA-style exam: optimization + statistics + probability, 3 hours, graded @aspremon,mva-cours"],
      cs: ["Run your own VO against ORB-SLAM3 on the quadruped's onboard camera; write the comparison @orbslam3"],
      ml: ["Train a locomotion policy in MuJoCo with PPO; compare against your MPC controller @mujoco,cs285"],
      rob: ["Quadruped: autonomous walk to a visually-specified goal, using your own SLAM stack @cs123,orbslam3"],
    },
  ],
  [
    67,
    "Christmas sprint I",
    "Break week. Big-block work: the learned-vs-model-based comparison is a genuinely portfolio-grade result.",
    {
      ml: [
        "Full study: PPO policy vs convex MPC on the quadruped — sample efficiency, robustness, compute @cs285,mujoco",
      ],
      rob: ["Quadruped: rough-terrain trial, log falls and diagnose each one @cs123"],
    },
  ],
  [
    68,
    "Christmas sprint II — mid-plan review",
    "Halfway. Be brutal about what is actually solid, then set Phase 7's targets.",
    {
      math: ["Gap audit: list every topic you cannot re-derive from memory; schedule the top five @nocedal,18650"],
      cs: ["Publish the SLAM repo with benchmarks; write the design doc as if onboarding a teammate @orbslam3"],
      ml: ["Write the RL foundations summary: 12 algorithms, one paragraph each, from memory @sutton,cs285"],
      rob: ["Portfolio update: quadruped + arm + hand video, plus a written system architecture diagram @cs123"],
    },
    "Mid-plan checkpoint: statistics + measure theory + full Nocedal done, CS:APP done, own SLAM benchmarked, 12 RL algorithms implemented, quadruped walking.",
  ],
];
