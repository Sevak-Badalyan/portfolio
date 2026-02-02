import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code, Languages } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      icon: GraduationCap,
      title: "Master's in Business Informatics",
      institution: "Armenian State University of Economics",
      period: "2025 – Present",
      type: "Academic",
    },
    {
      icon: GraduationCap,
      title: "Bachelor's Degree",
      institution: "National Polytechnic University of Armenia",
      // Information Technology
      period: "2021 – 2025",
      type: "Academic",
    },
    {
      icon: Code,
      title: "Back-End Development",
      institution: "Aren Mehrabyan Foundation",
      period: "2023",
      type: "Professional",
    },
    {
      icon: Code,
      title: "Front-End Development",
      institution: "Picsart Academy",
      period: "2022",
      type: "Professional",
    },
    {
      icon: Languages,
      title: "English Language",
      institution: "Lezounery Toun",
      period: "2024",
      type: "Language",
    },
  ];

  const languages = [
    { name: "Armenian", level: "Native", percentage: 100 },
    { name: "Russian", level: "Upper-Intermediate", percentage: 80 },
    { name: "English", level: "Pre-Intermediate", percentage: 50 },
  ];

  return (
    <section id="education" className="py-24 md:py-32 relative">
      {/* Background effect */}
      <div className="absolute left-0 top-1/3 w-1/3 h-96 bg-accent/5 blur-3xl" />

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
            <span className="font-mono text-primary text-sm">04.</span>
            <h2 className="text-2xl md:text-3xl font-bold">Education & Training</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="md:col-span-2 space-y-6">
              {education.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex gap-4 group"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:glow-primary transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    {i < education.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.period}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.institution}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass rounded-lg p-6 h-fit"
            >
              <h3 className="font-mono text-primary text-sm mb-6">{`// Languages`}</h3>
              <div className="space-y-5">
                {languages.map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : {}}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
