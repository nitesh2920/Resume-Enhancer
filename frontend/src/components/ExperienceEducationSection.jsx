import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ExperienceEducationSection({
  section,
  resume,
  addEntry,
  removeEntry,
  enhance,
  enhancing,
  updateField,
  getSectionIcon,
}) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getSectionIcon(section)}
          <h2 className="font-semibold text-lg capitalize text-white">{section}</h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addEntry(section)}
          className="flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </Button>
      </CardHeader>
      <CardContent>
        {resume[section]?.map((item, idx) => {
          const enhancingKey = `${section}-${idx}`;
          return (
            <div
              key={idx}
              className="mb-4 p-4 border rounded-md border-gray-300 dark:border-gray-700 relative"
            >
              <div className="flex justify-end space-x-2 mb-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => enhance(section, idx)}
                  disabled={enhancing[enhancingKey]}
                  className="flex items-center space-x-1"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{enhancing[enhancingKey] ? "Enhancing..." : "Enhance"}</span>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeEntry(section, idx)}
                  className="flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </Button>
              </div>

              <Input
                value={item.title || ""}
                onChange={(e) => updateField(section, idx, "title", e.target.value)}
                placeholder="Title"
                className="mb-2"
              />
              {section === "experience" && (
                <>
                  <Input
                    value={item.company || ""}
                    onChange={(e) => updateField(section, idx, "company", e.target.value)}
                    placeholder="Company"
                    className="mb-2"
                  />
                  <Input
                    value={item.duration || ""}
                    onChange={(e) => updateField(section, idx, "duration", e.target.value)}
                    placeholder="Duration"
                    className="mb-2"
                  />
                  <Textarea
                    value={item.description || ""}
                    onChange={(e) => updateField(section, idx, "description", e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                </>
              )}
              {section === "education" && (
                <>
                  <Input
                    value={item.school || ""}
                    onChange={(e) => updateField(section, idx, "school", e.target.value)}
                    placeholder="School"
                    className="mb-2"
                  />
                  <Input
                    value={item.year || ""}
                    onChange={(e) => updateField(section, idx, "year", e.target.value)}
                    placeholder="Year"
                    className="mb-2"
                  />
                </>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
