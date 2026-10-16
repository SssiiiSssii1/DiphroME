import type { Project } from "./types";

/**
 * Curated experiments and unconventional projects — things built to find out
 * how something works underneath, not to ship a product. Same shape as
 * `projects` so both sections can share the same rendering rules.
 */
export const experiments: Project[] = [
  {
    name: "sysmon-tui",
    description:
      "A terminal system monitor built with Bubble Tea: live CPU and memory history as sparklines, a searchable and sortable process list, system info, and killing a process only behind an explicit confirmation.",
    stack: ["Go", "Bubble Tea", "gopsutil"],
    href: "https://github.com/SssiiiSssii1/Tui_SyMonitor",
    note: "Split into small packages — metrics, processes, OS info, UI — each with its own unit tests. The view follows Bubble Tea's model/update/view loop, and PID 1 is always refused as a kill target.",
  },
  {
    name: "Concurrent Job Processing System",
    description:
      "A job system that spans two languages: a NestJS REST API hands work to a Go service over gRPC, where a fixed worker pool drains a buffered channel and processes jobs concurrently.",
    stack: ["Go", "gRPC", "NestJS", "Goroutines"],
    href: "https://github.com/SssiiiSssii1/Concurrent-Job-Processing-System",
    note: "Built to use Go's concurrency primitives for real — goroutines, channels, sync.Mutex and WaitGroup — while keeping one protobuf contract honest across two runtimes and tracking job status in memory.",
  },
  {
    name: "Rust Job Queue",
    description:
      "A background job queue written in Rust: tasks are submitted through a GraphQL API and executed asynchronously on Tokio, with automatic retries and job state tracked as it moves.",
    stack: ["Rust", "Tokio", "Axum", "async-graphql"],
    href: "https://github.com/SssiiiSssii1/job-queue-service",
    note: "A second take on the same problem as the Go worker pool, this time in async Rust — shared state under concurrency, retrying without losing jobs, and shutting down cleanly instead of dropping work mid-flight.",
  },
  {
    name: "Qarek — Arabic Sentiment Analysis",
    description:
      "An Arabic sentiment classifier from my graduation project: tokens are normalized (alef, ya, ta marbuta folding, diacritics and tatweel stripped), stop words removed and words stemmed to their roots before TF-IDF feeds Naive Bayes and logistic regression models.",
    stack: ["Python", "scikit-learn", "NLTK ISRI", "pyarabic"],
    href: "https://github.com/SssiiiSssii1/Graduation-Project",
    note: "In Arabic the boring preprocessing is the hard part — clitics, word-form variation and orthography mean normalization and stemming decide more than the classifier does. Trained and evaluated on the dataset below.",
  },
  {
    name: "ArabicDataset",
    description:
      "About 7,000 Arabic sentences across economy, sport, culture, general and political domains, written and reviewed by hand for sentiment training.",
    stack: ["Dataset", "Arabic NLP", "Annotation"],
    href: "https://github.com/SssiiiSssii1/ArabicDataset",
    note: "Made with two classmates for the graduation project instead of scraping something ready-made. It credits the corpora it references (ASTD, ArSenTD, Khaleej-2004, UCI Twitter) and ships with a citation format so others can actually reuse it.",
  },
  {
    name: "Cipher Calculator",
    description:
      "A browser tool for classical ciphers — shift, affine, Vigenère, Hill, permutation and substitution — that encrypts, decrypts, and traces every letter's transformation step by step instead of only printing the result.",
    stack: ["JavaScript", "Classical ciphers", "Modular arithmetic"],
    href: "https://github.com/SssiiiSssii1/Cipher-Calculator",
    note: "The affine mode computes modular inverses with GCD so invalid keys are rejected before anything breaks. Small, but the point was understanding the algebra these ciphers actually rest on.",
  },
];
