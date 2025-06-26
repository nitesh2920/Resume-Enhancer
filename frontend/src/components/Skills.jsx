import React from "react";
import { Code, Plus, Trash2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Skills({ resume, updateField, enhance, enhancing ,getSectionIcon}) {
  //   const addSkill = () => {
  //     if (!resume.skills) resume.skills = [];
  //     resume.skills.push("");
  //   };

  const handleAddSkill = () => {
    updateField("skills", null, null, [...(resume.skills || []), ""]);
  };

  const handleSkillChange = (idx, value) => {
    const newSkills = [...(resume.skills || [])];
    newSkills[idx] = value;
    updateField("skills", null, null, newSkills);
  };

  const removeSkill = (idx) => {
    const newSkills = [...(resume.skills || [])];
    newSkills.splice(idx, 1);
    updateField("skills", null, null, newSkills);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          {getSectionIcon("code")}
          <h2 className="font-semibold text-lg ">Skills</h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddSkill}
          className="flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </Button>
      </CardHeader>
      <CardContent>
        {(resume.skills || []).map((skill, idx) => {
          const enhancingKey = `skills-${idx}`;
          return (
            <div key={idx} className="mb-2 flex items-center space-x-2">
              <Input
                value={skill}
                onChange={(e) => handleSkillChange(idx, e.target.value)}
                placeholder="Skill"
              />
              <Button
                size="sm"
                variant="outline"
                disabled={enhancing[enhancingKey]}
                onClick={() => enhance("skills", idx)}
                className="flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {enhancing[enhancingKey] ? "Enhancing..." : "Enhance"}
                </span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeSkill(idx)}
                className="flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
