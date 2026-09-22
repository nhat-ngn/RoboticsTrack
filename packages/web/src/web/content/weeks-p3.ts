import type { RawWeek } from "./raw";

/**
 * Weeks 74-110 — Phases 7-8.
 * Syntax: "!" prefix = prerequisite gate. "@a,b" suffix = resource ids.
 */
export const weeksP3: RawWeek[] = [
  [
    74,
    "High-dimensional probability opens",
    "Vershynin is the book MVA's theory courses are quietly built on. You now have measure theory and concentration, so it is readable. In parallel: CS336, the single hardest and most valuable engineering block in this plan.",
    {
      math: [
        "!Vershynin ch.1-2: sums of independent random variables, sub-gaussian and sub-exponential tails, MGF bounds @vershynin",
        "Do every exercise in ch.2 — the machinery only sticks through exercises @vershynin",
      ],
      cs: [
        "!CS336 A1 part 1: implement a BPE tokenizer from scratch, train it on a real corpus @cs336",
        "CS336 lectures 1-2: overview, tokenization, the systems-first framing @cs336",
      ],
      ml: [
        "!CS285 L1-4: imitation learning, DAgger, MDP formalism, policy gradients recap @cs285",
      ],
      rob: [
        "Drone: PX4 + Gazebo/SITL setup, offboard control via MAVROS, first simulated mission @px4,uavbook",
      ],
    },
  ],
  [
    75,
    "Random vectors in high dimension",
    "The geometry of high dimensions is counter-intuitive and is exactly why ML works. Meanwhile you train your own LM.",
    {
      math: [
        "Vershynin ch.3: concentration of the norm, isotropic vectors, sub-gaussian random vectors, Grothendieck @vershynin",
        "Prove: random vectors in R^n are nearly orthogonal; relate to embedding dimensionality choices @vershynin",
      ],
      cs: [
        "!CS336 A1 part 2: transformer LM from scratch — RMSNorm, SwiGLU, RoPE, AdamW, cosine schedule @cs336,annotated-transformer",
        "Train it on TinyStories/OpenWebText subset to a target loss; log every ablation @cs336",
      ],
      ml: [
        "CS285 policy gradient lectures: variance reduction, baselines, natural gradient @cs285,spinningup",
      ],
      rob: [
        "Drone: EKF2 tuning, sensor fusion sanity checks, log analysis in Flight Review @px4",
      ],
    },
  ],
  [
    76,
    "Random matrices and GPU kernels",
    "Covering numbers and nets on the maths side; Triton and FlashAttention on the systems side. Both are 'how it really works' weeks.",
    {
      math: [
        "!Vershynin ch.4: nets, covering and packing numbers, operator norm of random matrices, community detection @vershynin",
        "Bai-Yin / Marchenko-Pastur statement level: why spectra of random matrices look the way they do @vershynin,18065",
      ],
      cs: [
        "CS336 systems lectures: GPU architecture, memory bandwidth, roofline, benchmarking discipline @cs336",
        "!Write a Triton kernel: fused softmax, then a minimal FlashAttention; benchmark vs PyTorch SDPA @cs336",
      ],
      ml: [
        "CS285: value-based methods + Q-learning at scale; implement double/duelling DQN variants @cs285,cleanrl",
      ],
      rob: [
        "Drone: onboard path planning — RRT* / A* on a voxel grid, from LaValle's formulations @lavalle,uavbook",
      ],
    },
  ],
  [
    77,
    "Concentration without independence, and distributed training",
    "Two hard weeks in a row. Keep the robotics load light and protect the CS336 blocks.",
    {
      math: [
        "Vershynin ch.5: concentration for random matrices, matrix Bernstein, application to covariance estimation @vershynin",
      ],
      cs: [
        "!CS336 A2: profile and optimize your training loop; find and fix the actual bottleneck @cs336",
        "Distributed training: DDP, ZeRO/FSDP, tensor and pipeline parallelism — implement DDP by hand with NCCL collectives @cs336",
      ],
      ml: [
        "CS285: model-based RL and learned MPC; implement PETS-style planning on a MuJoCo task @cs285,mujoco",
      ],
      rob: [
        "Drone: obstacle avoidance from stereo depth, runs onboard at 20 Hz @uavbook,cs231a",
      ],
    },
  ],
  [
    78,
    "Quadratic forms, offline RL",
    "Hanson-Wright is the workhorse inequality; offline RL is the sub-field closest to your teleop dataset.",
    {
      math: [
        "Vershynin ch.6: quadratic forms, Hanson-Wright, symmetrization, sparse recovery preview @vershynin",
      ],
      cs: [
        "CS336 A3: scaling laws — fit one on your own runs, predict a larger run, then check the prediction @cs336",
        "Interview cadence resumes: 3 mediums + 1 ML-theory question, spoken @neetcode,ml-interviews",
      ],
      ml: [
        "!Offline RL: distribution shift, CQL and IQL; train on your teleop dataset instead of online rollouts @cs285",
      ],
      rob: [
        "Morphing wing: control allocation for a variable-geometry wing, actuator sizing @uavbook,brunton",
      ],
    },
  ],
  [
    79,
    "Random processes and chaining",
    "Dudley's inequality and generic chaining — the deepest maths in the plan, and the direct entry to learning theory.",
    {
      math: [
        "!Vershynin ch.7-8: random processes, Slepian/Sudakov-Fernique, Dudley's inequality, generic chaining @vershynin",
        "Compute the Gaussian width of a few sets (ball, simplex, sparse vectors) yourself @vershynin",
      ],
      cs: [
        "CS336 A4: data curation and filtering; build a dedup + quality-filter pipeline @cs336",
        "DDIA ch.1-4: reliability, data models, storage engines, encoding @ddia",
      ],
      ml: [
        "CS285: exploration and meta-RL lectures; implement RND on a sparse-reward task @cs285",
      ],
      rob: [
        "Morphing wing: hardware-in-the-loop simulation with PX4, then bench-test servos under load @px4,uavbook",
      ],
    },
  ],
  [
    80,
    "VC dimension bridge, alignment",
    "Where high-dimensional probability turns into generalization bounds — and where LMs turn into products.",
    {
      math: [
        "VC dimension, growth function, Sauer-Shelah, uniform convergence; connect chaining to Rademacher complexity @bach,vershynin",
      ],
      cs: [
        "CS336 A5: alignment — SFT, reward modelling, DPO; run one DPO training @cs336",
        "DDIA ch.5-7: replication, partitioning, transactions @ddia",
      ],
      ml: [
        "CS285: inverse RL and reward learning; read the max-entropy IRL derivation carefully @cs285",
      ],
      rob: [
        "Morphing wing: first instrumented glide tests, compare against the aero model @uavbook",
      ],
    },
    "A trained LM you built from tokenizer to DPO, with a scaling-law fit and a benchmark table you can defend line by line.",
  ],
  [
    81,
    "February sprint I",
    "Break week. Use it on the dexterous-manipulation push — this is the work that gets read by MVA/robotics labs.",
    {
      ml: [
        "!Implement diffusion policy end to end on your own hand+arm dataset; compare against ACT @diffusion-policy,act",
      ],
      rob: [
        "Hand: scale the teleop dataset to 300+ demonstrations across 3 tasks @act,leaphand",
      ],
    },
  ],
  [
    82,
    "February sprint II",
    "Break week. Deploy, measure, and write the numbers down.",
    {
      ml: [
        "Ablate visual backbones (ResNet / ViT / DINOv2) for the policy; report success rate with bootstrap CIs @dinov2,vit,18650",
      ],
      rob: [
        "Hand: 50-trial evaluation protocol per task, blind to the operator; publish the table @leaphand,act",
      ],
    },
  ],
  [
    83,
    "Matrix deviations, VLAs",
    "Back to coursework. The maths gets applied to matrix completion; the ML track meets vision-language-action models.",
    {
      math: [
        "Vershynin ch.9: deviations of random matrices on sets, matrix completion, covariance estimation rates @vershynin",
      ],
      cs: [
        "Inference engineering: KV cache, paged attention, quantization (int8/int4), speculative decoding @cs336",
        "Serve your own LM with continuous batching; measure tokens/s and p99 latency @cs336,sysdesign",
      ],
      ml: [
        "!Vision-language-action models: read OpenVLA/RT-2-class papers, then fine-tune an open VLA on your dataset @act,diffusion-policy",
      ],
      rob: [
        "Integrate the VLA/policy on the arm+hand with language-specified tasks @act,leaphand",
      ],
    },
  ],
  [
    84,
    "Sparse recovery, sim-to-real",
    "Compressed sensing closes Vershynin; domain randomization opens the last robotics arc.",
    {
      math: [
        "Vershynin ch.10: sparse recovery, Lasso guarantees, restricted isometry — connect to Boyd's l1 relaxations @vershynin,boyd",
        "Numerical Tours: run the sparse-recovery and optimal-transport notebooks @numerical-tours,cot",
      ],
      cs: [
        "ML system design: 3 written designs (training platform, feature store, robot fleet telemetry) @sysdesign,ddia",
        "Timed set: 2 hards, out loud, with complexity analysis @neetcode,epi",
      ],
      ml: [
        "!Sim-to-real: domain randomization, system identification, actuator-network approaches @isaaclab,cs285",
      ],
      rob: [
        "IsaacLab: set up the quadruped environment, train locomotion with massively parallel PPO @isaaclab,mujoco",
      ],
    },
  ],
  [
    85,
    "Learning theory I",
    "Bach's book is the closest published thing to MVA's theory core. Nine weeks with it, starting now.",
    {
      math: [
        "!Bach ch.1-3: learning problem, ERM, decision theory, universal consistency @bach",
        "Bach ch.4: linear least squares theory, fixed-design analysis, ridge rates @bach",
      ],
      cs: [
        "Computational optimal transport ch.1-4: Monge/Kantorovich, Sinkhorn; implement Sinkhorn @cot,numerical-tours",
      ],
      ml: [
        "Train the quadruped locomotion policy in Isaac to a target velocity-tracking reward; log the curriculum @isaaclab",
      ],
      rob: [
        "Deploy the Isaac policy on the real quadruped; measure the sim-to-real gap numerically @isaaclab,cs123",
      ],
    },
  ],
  [
    86,
    "Learning theory II",
    "Kernels and RKHS — heavily examined at MVA and genuinely useful.",
    {
      math: [
        "!Bach ch.7: kernels, RKHS, representer theorem, kernel ridge regression rates @bach",
        "Implement kernel ridge + random Fourier features; verify the approximation error scaling @bach,vershynin",
      ],
      cs: [
        "DDIA ch.8-9: distributed system trouble, consistency and consensus @ddia",
        "Read the Sinkhorn/OT section of the MVA course notes for the courses you plan to take @cot,mva-cours",
      ],
      ml: [
        "Robot learning: train with domain randomization ranges swept; find which randomizations matter @isaaclab",
      ],
      rob: [
        "Quadruped: rough terrain + push recovery on hardware, 20 trials, documented @cs123,isaaclab",
      ],
    },
  ],
  [
    87,
    "Learning theory III",
    "Rademacher complexity and the model-selection story. Also: the first serious interview simulation.",
    {
      math: [
        "Bach ch.4-5 (complexity): Rademacher complexity, uniform bounds, model selection, oracle inequalities @bach,vershynin",
      ],
      cs: [
        "!Full mock interview loop: 2 algorithms + 1 ML system design + 1 research deep-dive, 4 hours, recorded @neetcode,ml-interviews,sysdesign",
        "Watch your own recordings and write down the three verbal habits to fix @ml-interviews",
      ],
      ml: [
        "Reproduce one recent robot-learning paper's headline result on your own hardware or in sim @diffusion-policy,isaaclab",
      ],
      rob: [
        "Full-system integration: arm + hand + camera + language interface as one launchable stack @ros2,act",
      ],
    },
  ],
  [
    88,
    "Learning theory IV",
    "Local averaging and neural network theory — the last theory block before the research phase.",
    {
      math: [
        "Bach ch.6 + 9: local averaging (kNN, Nadaraya-Watson), and neural networks as adaptive bases @bach",
        "Bach ch.12: SGD analysis, averaged SGD rates, why constant step sizes work in practice @bach",
      ],
      cs: [
        "Choose and read the source of one production system in your area (Ceres, gtsam, or vLLM) and write a 2-page architecture note @orbslam3,cs336",
      ],
      ml: [
        "Write the RL + robot-learning literature map: 30 papers, grouped, with one line each on what it changed @cs285,act,diffusion-policy",
      ],
      rob: [
        "Drone: full autonomous mission — takeoff, vision-based waypoint navigation, landing @px4,uavbook,lavalle",
      ],
    },
  ],
  [
    89,
    "April sprint I",
    "Break week. This is where the research project gets chosen — do not skip the literature work.",
    {
      math: [
        "Bach ch.13: generalization of neural networks, NTK and beyond — statement level, honestly @bach",
      ],
      ml: [
        "Pick the research question. Write a 3-page proposal: gap, hypothesis, method, evaluation, risks @cs285,act",
      ],
      rob: [
        "Prepare the experimental platform for the research project — freeze the hardware @leaphand,cs123",
      ],
    },
  ],
  [
    90,
    "April sprint II — Phase 7 close",
    "Build the baselines before you build the idea. Almost every failed student project skips this.",
    {
      cs: [
        "Reproduce two baselines exactly, with the authors' hyperparameters, and log the numbers @cs336,cleanrl",
      ],
      ml: [
        "Baseline table complete, evaluation harness written and version-controlled @cleanrl,act",
      ],
      rob: [
        "Data collection for the research project starts; dataset card written on day one @act",
      ],
    },
    "A 3-page research proposal with two reproduced baselines and a working evaluation harness.",
  ],
  [
    91,
    "Research execution I",
    "Phase 8 has one job: produce something a lab would read, and be measurably MVA-ready. Coursework is now maintenance only.",
    {
      math: [
        "Bach ch.8: sparse methods and l1 theory, revisited with Vershynin's tools @bach,vershynin",
        "Weekly discipline from here: one MVA-course problem set per week, timed @mva-cours,aspremon",
      ],
      cs: [
        "Research code hygiene: config system, seeds, experiment tracking, reproducible runs from a clean clone @cs336,missing-semester",
      ],
      ml: [
        "!Method v1 implemented and running; first result vs baseline, however bad @cs285,act",
      ],
      rob: [
        "Hardware reliability pass: fix everything that costs you an experiment run @leaphand,cs123",
      ],
    },
  ],
  [
    92,
    "Research execution II",
    "Iterate on the method. Keep an experiment log with dates — you will need it for the writeup.",
    {
      math: [
        "Bach ch.10-11: optimization for machine learning, convex vs non-convex guarantees @bach,nocedal",
      ],
      cs: [
        "Profile and speed up the research pipeline 3x; experiment latency is the real bottleneck @cs336,csapp",
      ],
      ml: [
        "Ablate the method's two core design choices; keep or kill each on evidence @cs285",
      ],
      rob: [
        "Extend the evaluation to a second task to test generality @act,diffusion-policy",
      ],
    },
  ],
  [
    93,
    "Research execution III",
    "Statistical honesty week: your own results, with error bars.",
    {
      math: [
        "Apply your statistics: bootstrap CIs, paired tests, multiple-comparison correction on your results @wasserman,18650,vershynin",
      ],
      cs: [
        "Write the plotting and table-generation code once, properly, so results regenerate from scratch @fluent-python",
      ],
      ml: [
        "Seed sweep: 5 seeds per condition minimum; report variance, not just means @cleanrl,18650",
      ],
      rob: [
        "Blind evaluation protocol run by a clubmate, not you @act",
      ],
    },
  ],
  [
    94,
    "Paper reading rhythm",
    "MVA is a research master's. Reading fast and critically is a graded skill — practise it deliberately.",
    {
      math: [
        "Read 2 theory papers from the MVA reading lists; write a half-page critique of each @mva-cours,bach",
      ],
      cs: [
        "Read 1 systems paper (SLAM or LLM systems) and reimplement its key figure @orbslam3,cs336",
      ],
      ml: [
        "Read 3 papers in your research area; note precisely what each one gets wrong @cs285,act",
      ],
      rob: [
        "Method v2 based on what the reading changed @act,diffusion-policy",
      ],
    },
  ],
  [
    95,
    "MVA course map decisions",
    "Choose the M2 courses you will target and check each prerequisite against what you have actually done.",
    {
      math: [
        "!Go through the MVA course list; for each target course, list its prerequisites and your evidence of meeting them @mva-cours",
        "Fill the top two gaps with targeted work, not a new course @mva-cours,bach",
      ],
      cs: [
        "Draft the MVA application: CV, project descriptions, motivation letter v1 @mva-cours",
      ],
      ml: [
        "Research: results table stable enough to show someone else @cs285",
      ],
      rob: [
        "Portfolio: rebuild the project pages with results, not just videos @cs123,leaphand",
      ],
    },
  ],
  [
    96,
    "Writing week",
    "Write the paper. Writing exposes the holes in the experiments while you still have time to fix them.",
    {
      math: [
        "MVA past-exam set: optimization + learning theory, timed and graded @aspremon,mva-cours",
      ],
      cs: [
        "Release the research code publicly with a reproduction script and a results checksum @cs336",
      ],
      ml: [
        "!Full paper draft: abstract, related work, method, experiments, limitations @bach,cs285",
      ],
      rob: [
        "Record the demonstration video that goes with the paper @act",
      ],
    },
  ],
  [
    97,
    "Feedback week",
    "Get it read by someone with power to say it is wrong: a professor, a PhD student, a lab you cold-email.",
    {
      math: [
        "MVA past-exam set: probability + statistics, timed and graded @mva-cours,wasserman,18650",
      ],
      cs: [
        "Interview loop #2, full 4-hour simulation, new problems @neetcode,ml-interviews,sysdesign",
      ],
      ml: [
        "Send the draft to 3 readers; incorporate feedback ruthlessly, keep a change log @bach",
      ],
      rob: [
        "Cold-email 5 labs (MVA-affiliated included) with the paper and the demo video @mva-cours",
      ],
    },
  ],
  [
    98,
    "Second result",
    "One result is luck; two is a research profile. Push the strongest thread further.",
    {
      math: [
        "Bach exercises: the chapters you rated weakest in the Phase 7 audit @bach",
      ],
      cs: [
        "Optimize the deployed policy for onboard inference (quantize, fuse, batch) and measure latency @cs336,csapp",
      ],
      ml: [
        "Extension experiment: the obvious next question your paper raises @cs285,act",
      ],
      rob: [
        "Deploy on a second platform (quadruped or drone) to show the method transfers @isaaclab,px4",
      ],
    },
  ],
  [
    99,
    "School-year close",
    "Wrap the academic year cleanly, then the final summer is yours.",
    {
      math: [
        "Final coursework audit: every topic in this plan rated 0-3 on 'can I teach it?' @bach,nocedal,vershynin",
      ],
      cs: [
        "Publish everything: 5 repos, all with READMEs, benchmarks and honest limitation sections @cs336,orbslam3",
      ],
      ml: [
        "Paper v2 submitted somewhere real (workshop, arXiv, or lab application) @bach",
      ],
      rob: [
        "Club handover document — you will not be the one maintaining these robots forever @f1tenth",
      ],
    },
    "Year-2 checkpoint: a written paper with two results, five public repos, an MVA prerequisite audit with evidence, and a full interview-loop simulation passed.",
  ],
  [
    100,
    "Summer: revision architecture",
    "Optional block. If you do nothing else this summer, do the spaced-revision passes — they are what makes two years of work retrievable under exam pressure.",
    {
      math: [
        "Build the revision system: one A4 sheet per topic, 40 sheets, spaced schedule @nocedal,bach,vershynin",
      ],
      cs: [
        "Spaced-repetition deck for algorithms + systems facts you keep forgetting @csapp,cses",
      ],
    },
  ],
  [
    101,
    "Summer: optimization revision",
    "Pass one: the track that started as your weakness.",
    {
      math: [
        "Full timed pass over Boyd ch.1-5, 9-11 and Nocedal; re-derive KKT, duality, BFGS, interior point from blank paper @boyd,nocedal",
        "d'Aspremont MVA exams: all available past papers, timed @aspremon",
      ],
      rob: [
        "Light build: whatever hardware repair the autumn demos need @cs123",
      ],
    },
  ],
  [
    102,
    "Summer: probability and statistics revision",
    "Pass two.",
    {
      math: [
        "Vershynin ch.1-8 revision by exercises only; 18.650 estimation and testing re-derived @vershynin,wasserman,18650",
        "MVA probabilistic-methods past papers, timed @mva-cours",
      ],
    },
  ],
  [
    103,
    "Summer: learning theory revision",
    "Pass three — the material MVA interviews probe hardest.",
    {
      math: [
        "Bach: full book revision via the exercises and your own summaries @bach",
      ],
      ml: [
        "Explain out loud, recorded: ERM, Rademacher bounds, kernel rates, SGD analysis @bach",
      ],
    },
  ],
  [
    104,
    "Summer: vision and geometry revision",
    "Pass four.",
    {
      cs: [
        "MVG revision: derive F, E, PnP, triangulation, BA structure from memory @hz,tum-mvg",
        "Rebuild a minimal SfM pipeline from a blank file in one sitting @cs231a,colmap",
      ],
    },
  ],
  [
    105,
    "Summer: deep learning and RL revision",
    "Pass five.",
    {
      ml: [
        "Write a transformer, a DQN and a PPO agent from blank files, no references, timed @annotated-transformer,cleanrl",
        "Explain 15 architectures/algorithms on camera, 3 minutes each @cs285,sutton",
      ],
    },
  ],
  [
    106,
    "Summer: interview finish",
    "Turn preparation into fluency. The target is being unbothered, not being clever.",
    {
      cs: [
        "Interview loop #3 and #4 with real humans (peers, club seniors, alumni) @neetcode,ml-interviews",
        "Behavioural + project deep-dive answers written and rehearsed for all 7 projects @ml-interviews",
      ],
    },
  ],
  [
    107,
    "Summer: portfolio build",
    "Everything you have made, presented as if a hiring lab is skimming it in 90 seconds.",
    {
      cs: [
        "Portfolio site: projects, papers, repos, results — no fluff, numbers everywhere @missing-semester",
      ],
      rob: [
        "Final demo reel: 7 projects, 3 minutes, results-first editing @cs123,leaphand,px4",
      ],
    },
  ],
  [
    108,
    "Summer: applications",
    "MVA and everything adjacent: internships, labs, exchange options.",
    {
      math: [
        "Final MVA application package: dossier, transcripts, motivation letter, project annex @mva-cours",
      ],
      cs: [
        "Apply: 10 research internships and 5 labs, each with a tailored first paragraph @mva-cours",
      ],
    },
  ],
  [
    109,
    "Summer: open questions",
    "Spend a week on the thing you most want to know, with no plan attached to it.",
    {
      ml: [
        "Free exploration: the paper or idea you kept postponing @cs285,cot",
      ],
      rob: [
        "Free build: the mechanism you have wanted to try since Phase 1 @fusion",
      ],
    },
  ],
  [
    110,
    "End of plan",
    "Two years, 105 weeks. Write the retrospective and set the next 6-month plan — the habit matters more than this document.",
    {
      math: [
        "Final self-assessment across all four tracks; publish the honest scorecard @mva-cours",
      ],
      cs: [
        "Write the retrospective: what worked, what was wasted, what you would cut @missing-semester",
      ],
      ml: [
        "Set the next objectives: M2 courses, research direction, target labs @mva-cours",
      ],
      rob: [
        "Hand the club a roadmap for the projects that outlive you @f1tenth",
      ],
    },
    "Final scorecard: master-level competence documented per track, MVA application submitted, portfolio and paper public, next 6-month plan written.",
  ],
];
