import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2 } from "lucide-react"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeGenerator() {
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
    })
    const [education, setEducation] = useState([{
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false
    }])
    const [experience, setExperience] = useState([{ company: "", position: "", startDate: "", endDate: "", description: "", current: false }])
    const [skills, setSkills] = useState([""])
    const [projects, setProjects] = useState([{ name: "", description: "", technologies: "" }])
    const resumeRef = useRef<HTMLDivElement>(null);

    const updatePersonalInfo = (field: string, value: string) => {
        setPersonalInfo({ ...personalInfo, [field]: value })
    }

    const addEducation = () => {
        setEducation([...education, {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            current: false
        }])
    }

    const updateEducation = (index: number, field: string, value: string | boolean) => {
        const newEducation = [...education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        if (field === "current" && value === true) {
            newEducation[index].endDate = "Present";
        }
        setEducation(newEducation);
    };

    const removeEducation = (index: number) => {
        setEducation(education.filter((_, i) => i !== index))
    }

    const addExperience = () => {
        setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "", current: false }])
    }

    const updateExperience = (index: number, field: string, value: string | boolean) => {
        const newExperience = [...experience]
        newExperience[index] = { ...newExperience[index], [field]: value }
        if (field === "current" && value === true) {
            newExperience[index].endDate = "Present"
        }
        setExperience(newExperience)
    }

    const removeExperience = (index: number) => {
        setExperience(experience.filter((_, i) => i !== index))
    }

    const addSkill = () => {
        setSkills([...skills, ""])
    }

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...skills]
        newSkills[index] = value
        setSkills(newSkills)
    }

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index))
    }

    const addProject = () => {
        setProjects([...projects, { name: "", description: "", technologies: "" }])
    }

    const updateProject = (index: number, field: string, value: string) => {
        const newProjects = [...projects]
        newProjects[index] = { ...newProjects[index], [field]: value }
        setProjects(newProjects)
    }

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index))
    }
    // Function to download the resume as a PDF
    const downloadResume = async () => {
        const element = resumeRef.current;
        if (element) {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
    
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
    
            let position = 0;
    
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
    
            pdf.save("resume.pdf");
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Resume Generator</h1>
                </div>
            </header>

            <main className="flex-grow flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
                    <Tabs defaultValue="personal" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="skills">Skills</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal" className="space-y-4">
                            <Input
                                placeholder="Full Name"
                                value={personalInfo.name}
                                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                            />
                            <div className="grid grid-cols-3 gap-4">
                                <Input
                                    placeholder="Email"
                                    value={personalInfo.email}
                                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                                />
                                <Input
                                    placeholder="Phone"
                                    value={personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                                />
                                <Input
                                    placeholder="Location"
                                    value={personalInfo.location}
                                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                                />
                            </div>
                            <Textarea
                                placeholder="Summary"
                                value={personalInfo.summary}
                                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                            />
                        </TabsContent>
                        <TabsContent value="education" className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="p-4 bg-white rounded-lg shadow-sm space-y-4">
                                    <Input
                                        placeholder="School"
                                        value={edu.school}
                                        onChange={(e) => updateEducation(index, "school", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            value={edu.startDate}
                                            onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                                            placeholder="Start Date"
                                        />
                                        <Input
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                                            placeholder="End Date"
                                            disabled={edu.current}
                                        />

                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`current-edu-${index}`}
                                            checked={edu.current}
                                            onCheckedChange={(checked) => updateEducation(index, "current", checked)}
                                        />
                                        <label htmlFor={`current-edu-${index}`}>Currently studying here</label>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addEducation}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Education
                            </Button>
                        </TabsContent>
                        <TabsContent value="experience" className="space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index} className="p-4 bg-white rounded-lg shadow-sm space-y-4">
                                    <Input
                                        placeholder="Company"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Position"
                                        value={exp.position}
                                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Start Date"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                        />
                                        <Input
                                            placeholder="End Date"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                            disabled={exp.current}
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Job Description"
                                        value={exp.description}
                                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`current-exp-${index}`}
                                            checked={exp.current}
                                            onCheckedChange={(checked) => updateExperience(index, "current", checked)}
                                        />
                                        <label htmlFor={`current-exp-${index}`}>I currently work here</label>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addExperience}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Experience
                            </Button>
                        </TabsContent>
                        <TabsContent value="skills" className="space-y-4">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex space-x-2">
                                    <Input
                                        placeholder="Skill"
                                        value={skill}
                                        onChange={(e) => updateSkill(index, e.target.value)}
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => removeSkill(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addSkill}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Skill
                            </Button>
                        </TabsContent>
                        <TabsContent value="projects" className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={index} className="p-4 bg-white rounded-lg shadow-sm space-y-4">
                                    <Input
                                        placeholder="Project Name"
                                        value={project.name}
                                        onChange={(e) => updateProject(index, "name", e.target.value)}
                                    />
                                    <Textarea
                                        placeholder="Project Description"
                                        value={project.description}
                                        onChange={(e) => updateProject(index, "description", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Technologies Used"
                                        value={project.technologies}
                                        onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => removeProject(index)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addProject}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex justify-center p-4">
                    <Button onClick={downloadResume} variant="outline">
                        Download PDF
                    </Button>
                </div>

                <div ref={resumeRef} className="w-full lg:w-1/2 p-6 bg-white shadow-md overflow-y-auto">
                    <div className="max-w-2xl mx-auto font-serif">
                        {/* Name and Contact Information */}
                        <h1 className="text-3xl font-bold text-center mb-2">{personalInfo.name || "Your Name"}</h1>
                        <div className="text-center mb-4 text-sm text-gray-600">
                            {personalInfo.email && <span className="mr-2">{personalInfo.email}</span>}
                            {personalInfo.phone && <span className="mr-2">{personalInfo.phone}</span>}
                            {personalInfo.location && <span>{personalInfo.location}</span>}
                        </div>
                        <hr className="border-t border-gray-300 mb-6" />

                        {/* Summary */}
                        {personalInfo.summary && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-2">Summary</h2>
                                <p className="text-sm text-gray-700">{personalInfo.summary}</p>
                            </div>
                        )}

                        {/* Divider */}
                        <hr className="border-t border-gray-300 mb-6" />

                        {/* Education */}
                        {education.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-2">Education</h2>
                                {education.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold">{edu.school}</span>
                                            <span className="text-sm text-gray-500">{edu.startDate} - {edu.current ? "Present" : edu.endDate}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{edu.degree}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Divider */}
                        <hr className="border-t border-gray-300 mb-6" />

                        {/* Experience */}
                        {experience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-2">Experience</h2>
                                {experience.map((exp, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold">{exp.company}</span>
                                            <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                        </div>
                                        <p className="text-sm italic text-gray-700">{exp.position}</p>
                                        <p className="text-sm mt-1 text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Divider */}
                        <hr className="border-t border-gray-300 mb-6" />

                        {/* Skills */}
                        {skills.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-2">Skills</h2>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {skills.map((skill, index) => (
                                        <li key={index} className="text-sm">{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Divider */}
                        <hr className="border-t border-gray-300 mb-6" />

                        {/* Projects */}
                        {projects.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-2">Projects</h2>
                                {projects.map((project, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="font-bold text-gray-800">{project.name}</p>
                                        <p className="text-sm text-gray-600">{project.description}</p>
                                        <p className="text-sm italic text-gray-700">Technologies: {project.technologies}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </main>

            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6  lg:px-8">
                    <p className="text-center text-sm text-gray-500">© 2023 Resume Generator. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}