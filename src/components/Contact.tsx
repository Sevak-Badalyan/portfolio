import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Mail, Github, Linkedin, Send, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_CONTACT_API_URL || "";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!BACKEND_URL) {
      // Fallback: open mailto with pre-filled data
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`);
      window.open(`mailto:sevak.badalyan.01@gmail.com?subject=${subject}&body=${body}`);
      toast({ title: "Opening email client", description: "Your default email app should open shortly." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "sevak.badalyan.01@gmail.com", href: "mailto:sevak.badalyan.01@gmail.com" },
    { icon: Github, label: "GitHub", value: "github.com/sevak-badalyan", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sevak-badalyan", href: "https://linkedin.com/in/sevak-badalyan" },
    { icon: MapPin, label: "Location", value: "Yerevan, Armenia", href: "#" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-border" />
            <span className="font-mono text-primary text-sm">05. What's Next?</span>
            <div className="w-12 h-px bg-border" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            I'm currently open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi,
            my inbox is always open!
          </p>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-xl p-6 md:p-8 mb-12 text-left space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-muted-foreground">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-muted-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-muted-foreground">Message</label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all glow-primary disabled:opacity-50"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.4 }}
                className="flex items-center gap-4 p-4 glass glass-hover rounded-lg group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{link.label}</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {link.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
