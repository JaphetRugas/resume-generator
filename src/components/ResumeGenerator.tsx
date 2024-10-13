"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2 } from "lucide-react"

export default function ResumeGenerator() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  })
  const [education, setEducation] = useState([{ school: "", degree: "", year: "", current: false }])
  const [experience, setExperience] = useState([{ company: "", position: "", startDate: "", endDate: "", description: "", current: false }])
  const [skills, setSkills] = useState([""])
  const [projects, setProjects] = useState([{ name: "", description: "", technologies: "" }])

  const updatePersonalInfo = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value })
  }

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "", current: false }])
  }

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setEducation(newEducation)
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "", current: false }])
  }

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const newExperience = [...experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
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
                  <Input 
                    placeholder="Year" 
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                  />
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

        <div className="w-full lg:w-1/2 p-6 bg-white shadow-md overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{personalInfo.name || "Your Name"}</h2>
            <p className="text-center mb-4">
              {personalInfo.email && `${personalInfo.email} | `}
              {personalInfo.phone && `${personalInfo.phone} | `}
              {personalInfo.location}
            </p>
            {personalInfo.summary && (
              <p className="mb-4">{personalInfo.summary}</p>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">EDUCATION</h3>
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{edu.school}</p>
                  <p>{edu.degree}, {edu.year} {edu.current && "(Current)"}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h3>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{exp.company}</p>
                  <p className="italic">{exp.position}</p>
                  <p className="text-sm">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                  <p className="mt-1">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">SKILLS</h3>
              <p>{skills.filter(skill => skill).join(", ")}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">PROJECTS</h3>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{project.name}</p>
                  <p>{project.description}</p>
                  <p className="italic">Technologies: {project.technologies}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© 2023 Resume Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}