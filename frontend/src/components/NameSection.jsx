import React from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NameSection({
  resume,
  enhance,
  enhancing,
  updateField,
  getSectionIcon
}) {
  const enhancingKey = "name-null";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {getSectionIcon("user")}
          <h2 className="font-semibold text-lg text-white">Name</h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          disabled={enhancing[enhancingKey]}
          onClick={() => enhance("name", null)}
          className="flex items-center space-x-1"
        >
          <Sparkles className="w-4 h-4" />
          <span>{enhancing[enhancingKey] ? "Enhancing..." : "Enhance"}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Input
          value={resume.name || ""}
          onChange={(e) => updateField("name", null, null, e.target.value)}
          placeholder="Your full name"
        />
      </CardContent>
    </Card>
  );
}
