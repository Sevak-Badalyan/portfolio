import { cvData } from "../data/cv";
import { Mail, Github, Linkedin, MapPin, Globe } from "lucide-react";

const CV = () => {
    const { personalInfo, highlights, education, languages, skills, projects } = cvData;

    return (
        <div className="bg-white text-gray-800 w-full max-w-[210mm] mx-auto min-h-[297mm] p-8 md:p-12 shadow-lg print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0">
            {/* Header */}
            <header className="border-b-2 border-primary/20 pb-8 mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight uppercase">
                    {personalInfo.name}
                </h1>
                <h2 className="text-xl text-primary font-medium mb-6">{personalInfo.title}</h2>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        {personalInfo.location}
                    </div>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                        {personalInfo.email}
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Linkedin className="w-4 h-4 text-primary" />
                        LinkedIn
                    </a>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Github className="w-4 h-4 text-primary" />
                        GitHub
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                {/* Main Content (Left Column) */}
                <div className="md:col-span-2 print:col-span-2 space-y-8">

                    {/* Summary */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-200 pb-1">
                            Professional Summary
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {personalInfo.summary}
                        </p>
                    </section>

                    {/* Experience / Projects (Since mostly freelance/projects based on data) */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-b border-gray-200 pb-1">
                            Experience & Projects
                        </h3>
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <div key={project.title}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                                        <span className="text-xs text-primary font-medium px-2 py-0.5 bg-blue-50 rounded-full print:bg-transparent print:p-0 print:text-gray-500">
                                            {project.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-primary/80 mb-2 italic">{project.subtitle}</p>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-3 print:line-clamp-none">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.slice(0, 5).map(t => (
                                            <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded print:border print:border-gray-200 print:bg-transparent">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right Column) */}
                <div className="space-y-8">

                    {/* Skills */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-b border-gray-200 pb-1">
                            Skills
                        </h3>

                        <div className="space-y-4">
                            {skills.categories.map((cat) => (
                                <div key={cat.title}>
                                    <h4 className="font-medium text-gray-800 text-sm mb-2 opacity-90">{cat.title}</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.skills.map(skill => (
                                            <span key={skill.name} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded print:bg-transparent print:border print:border-blue-100 print:text-gray-700">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-b border-gray-200 pb-1">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.filter(e => e.type === "Academic").map((edu) => (
                                <div key={edu.title}>
                                    <h4 className="font-medium text-gray-900 text-sm">{edu.title}</h4>
                                    <p className="text-xs text-gray-500">{edu.institution}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Languages */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 uppercase mb-4 border-b border-gray-200 pb-1">
                            Languages
                        </h3>
                        <div className="space-y-2">
                            {languages.map((lang) => (
                                <div key={lang.name} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-700">{lang.name}</span>
                                    <span className="text-gray-500 text-xs">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer / Copyright for Print */}
            <div className="mt-12 pt-4 border-t border-gray-100 text-center text-xs text-gray-400 hidden print:block">
                &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>
        </div>
    );
};

export default CV;
