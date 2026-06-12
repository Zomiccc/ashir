"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { fetchGitHubRepos, fallbackRepos, type GitHubRepo } from "@/lib/github";

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#B07219",
  "C++": "#F34B7D",
  HTML: "#E34C26",
  CSS: "#563D7C",
};

export function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then((data) => {
        setRepos(data.length > 0 ? data : fallbackRepos);
      })
      .catch(() => setRepos(fallbackRepos))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Open Source & Activity
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Recent work and contributions on GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="h-5 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover rounded-xl p-6 block transition-all group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {repo.description || "No description available."}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-secondary/70">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#8888AA",
                        }}
                      />
                      <span className="font-mono">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    <span className="font-mono">{repo.stargazers_count}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
