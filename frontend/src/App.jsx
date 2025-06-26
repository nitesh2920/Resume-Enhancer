import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Upload
} from "lucide-react";

import { Button } from "./components/ui/button";
import Skills from "./components/Skills";
import axios from "axios";

import UploadResume from "./components/UploadResume";
import NameSection from "./components/NameSection";
import SummarySection from "./components/SummarySection";
import ExperienceEducationSection from "./components/ExperienceEducationSection";
import SaveDownloadSection from "./components/SaveDownloadSection";

const mockAxios = {
  post: async (url, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (url.includes("/upload")) {
      return {
        data: {
          resume: {
            name: "John Doe",
            summary:
              "Experienced software developer with 5+ years in full-stack development.",
            experience: [
              {
                title: "Senior Developer",
                company: "Tech Corp",
                duration: "2021-Present",
                description: "Lead development of web applications"
              }
            ],
            education: [
              {
                degree: "Bachelor of Computer Science",
                school: "University of Technology",
                year: "2019"
              }
            ],
            skills: ["JavaScript", "React", "Node.js", "Python"]
          }
        }
      };
    }
    if (url.includes("/ai-enhance")) {
      return {
        data: {
          enhanced: data.content + " [AI Enhanced]"
        }
      };
    }
    return { data: { success: true } };
  }
};

export default function App() {
  const [resume, setResume] = useState(null);
  const [resumeId, setResumeId] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await mockAxios.post("http://localhost:8000/upload", data);
      setResume(res.data.resume);
      setResumeId(Date.now().toString());
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (section, idx, key, value) => {
    if (!resume) return;
    setResume((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (idx === null) {
        copy[section] = value;
      } else {
        copy[section][idx][key] = value;
      }
      return copy;
    });
  };

  const addEntry = (section) => {
    if (!resume) return;
    setResume((prev) => {
      const copy = { ...prev };
      copy[section].push({});
      return copy;
    });
  };

  const removeEntry = (section, idx) => {
    if (!resume) return;
    setResume((prev) => {
      const copy = { ...prev };
      copy[section] = copy[section].filter((_, i) => i !== idx);
      return copy;
    });
  };

  const enhance = async (section, idx) => {
    if (!resume) return;

    const enhanceKey = `${section}-${idx}`;
    setEnhancing((prev) => ({ ...prev, [enhanceKey]: true }));

    let content = idx === null ? resume[section] : resume[section][idx];

    try {
      const res = await axios.post("http://localhost:8000/ai-enhance", {
        section: section + (idx === null ? "" : `[${idx}]`),
        content: JSON.stringify(content)
      });

      const enhanced = res.data.enhanced;

      setResume((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if (idx === null) {
          copy[section] = enhanced;
        } else {
          copy[section][idx] = enhanced; // treat as text
        }
        return copy;
      });
    } catch (error) {
      console.error("Enhance failed:", error);
      alert("Enhance failed");
    } finally {
      setEnhancing((prev) => ({ ...prev, [enhanceKey]: false }));
    }
  };

  const save = async () => {
    if (!resume) return;

    setLoading(true);
    try {
      await mockAxios.post("http://localhost:8000/save-resume", {
        resume_id: resumeId,
        data: resume
      });
      alert("Saved!");
    } catch (error) {
      alert("Save failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!resume) return;
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${resumeId}.json`;
    a.click();
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case "experience":
        return <Briefcase className="w-5 h-5 text-white" />;
      case "user":
        return <User className="w-5 h-5 text-white" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-white" />;
      case "skills":
        return <Code className="w-5 h-5 text-white" />;
      case "summary":
        return <FileText className="w-5 h-5 text-white" />;
      case "upload":
        return <Upload className="w-5 h-5 text-blue-600 " />;
        case "skill":
          return           <Code className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resume Editor
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create and enhance your professional resume
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>

        {!resume ? (
          <UploadResume
            loading={loading}
            uploadFile={uploadFile}
            getSectionIcon={getSectionIcon}
          />
        ) : (
          <>
            <NameSection
              resume={resume}
              enhance={enhance}
              enhancing={enhancing}
              updateField={updateField}
              getSectionIcon={getSectionIcon}
            />
            <SummarySection
              resume={resume}
              enhance={enhance}
              enhancing={enhancing}
              updateField={updateField}
              getSectionIcon={getSectionIcon}
            />
            {["experience", "education"].map((section) => (
              <ExperienceEducationSection
                key={section}
                section={section}
                resume={resume}
                addEntry={addEntry}
                removeEntry={removeEntry}
                enhance={enhance}
                enhancing={enhancing}
                updateField={updateField}
                getSectionIcon={getSectionIcon}
              />
            ))}
            <Skills
              resume={resume}
              updateField={updateField}
              enhance={enhance}
              enhancing={enhancing}
              getSectionIcon={getSectionIcon}
            />
            <SaveDownloadSection
              save={save}
              loading={loading}
              download={download}
            />
          </>
        )}
      </div>
    </div>
  );
}
