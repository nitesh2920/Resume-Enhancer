import React from "react";
import {  Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function SummarySection({ resume, enhance, enhancing,getSectionIcon, updateField }) {
  const enhancingKey = "summary-null";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {getSectionIcon("summary")}
          <h2 className="font-semibold text-lg text-white">Summary</h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          disabled={enhancing[enhancingKey]}
          onClick={() => enhance("summary", null)}
          className="flex items-center space-x-1"
        >
          <Sparkles className="w-4 h-4" />
          <span>{enhancing[enhancingKey] ? "Enhancing..." : "Enhance"}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          value={resume.summary || ""}
          onChange={(e) => updateField("summary", null, null, e.target.value)}
          placeholder="Write a brief summary about yourself"
          rows={5}
        />
      </CardContent>
    </Card>
  );
}
