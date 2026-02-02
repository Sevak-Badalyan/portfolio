import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Sparkles, Zap, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Terminal, label: "Backend Systems", desc: "Scalable & secure" },
    { icon: Zap, label: "Real-Time Apps", desc: "Socket.io expertise" },
    { icon: Sparkles, label: "Clean Code", desc: "MVC architecture" },
    { icon: Users, label: "Team Player", desc: "Collaborative mindset" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary text-sm">01.</span>
            <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Text Content */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                I'm a passionate <span className="text-primary font-medium">Node.js developer</span> with 
                hands-on experience designing and building scalable backend systems. Currently working at <span className="text-foreground font-medium">Iguan Systems</span> and 
                taking on freelance projects like <span className="text-foreground font-medium">BeautyOS</span>, 
                where I architect complex microservices and business applications from the ground up.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My expertise spans <span className="text-foreground">JavaScript</span>, <span className="text-foreground">TypeScript</span>, 
                and modern frameworks like <span className="text-foreground">Express.js</span> and <span className="text-foreground">NestJS</span>. 
                I'm proficient in building RESTful APIs, integrating real-time features with Socket.io, 
                and working with both SQL (<span className="text-foreground">PostgreSQL</span>) and 
                NoSQL (<span className="text-foreground">MongoDB</span>) databases.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code using MVC architecture and best practices. 
                Whether it's implementing JWT authentication, role-based access control, or payment integrations, 
                I approach each challenge with creativity and attention to detail.
              </p>

              {/* Terminal-style code block */}
              <div className="glass rounded-lg p-4 font-mono text-sm overflow-x-auto mt-8">
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <code className="text-muted-foreground">
                  <span className="text-primary">const</span> developer = {"{"}<br />
                  <span className="pl-4">passion:</span> <span className="text-accent">"building scalable systems"</span>,<br />
                  <span className="pl-4">focus:</span> <span className="text-accent">"backend engineering"</span>,<br />
                  <span className="pl-4">mindset:</span> <span className="text-accent">"always learning"</span><br />
                  {"}"};
                </code>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="glass glass-hover rounded-lg p-4 text-center group cursor-default"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-sm mb-1">{label}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
