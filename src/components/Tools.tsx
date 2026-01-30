"use client";

import { motion } from "motion/react";
import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { tools } from "@/data";
import { toolIcons } from "./ToolIcons";

export function Tools() {
  return (
    <FadeUp>
      <section className="flex flex-col gap-5 sm:gap-6 scroll-mt-20">
        <h2 className="font-display italic text-2xl sm:text-3xl text-[var(--color-text-primary)]">
          Tools
        </h2>
        <StaggerContainer
          className="flex flex-wrap gap-6 sm:gap-8"
          staggerDelay={0.06}
        >
          {tools.map((tool) => (
            <StaggerItem key={tool.name}>
              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2.5 w-16 sm:w-20"
              >
                <div className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
                  {toolIcons[tool.icon]}
                </div>
                <span className="font-body text-xs text-[var(--color-text-secondary)]">
                  {tool.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
