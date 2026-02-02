import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Languages & Runtime",
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Node.js", level: 95 },
      ],
    },
    {
      title: "Frameworks",
      skills: [
        { name: "Express.js", level: 95 },
        { name: "NestJS", level: 75 },
        { name: "React.js", level: 70 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "Redis", level: 70 },
      ],
    },
    {
      title: "Tools & Other",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 65 },
        { name: "Socket.io", level: 85 },
      ],
    },
  ];

  const softSkills = [
    "Communication",
    "Teamwork",
    "Time Management",
    "Creative Thinking",
    "Problem Solving",
    "Critical Analysis",
  ];

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      {/* Background effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-96 bg-primary/5 blur-3xl" />
      
      <div className="container px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary text-sm">02.</span>
            <h2 className="text-2xl md:text-3xl font-bold">Skills & Expertise</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Technical Skills */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * catIndex, duration: 0.5 }}
                className="glass rounded-lg p-6"
              >
                <h3 className="font-mono text-primary text-sm mb-6">{`// ${category.title}`}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: 0.3 + i * 0.1 + catIndex * 0.15, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="font-mono text-primary text-sm mb-6 text-center">{`// Soft Skills`}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {softSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                  className="px-4 py-2 glass glass-hover rounded-full text-sm font-medium hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
