import React from "react";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";

export default function UploadResume({ loading, uploadFile,getSectionIcon }) {
  return (
    <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
      <CardHeader>
        <div className="flex items-center space-x-2">
           {getSectionIcon("upload")}
          <h2 className="text-xl text-white font-semibold">Upload Resume</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your PDF or DOCX file to get started
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center py-6">
          <input
            disabled={loading}
            onChange={uploadFile}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="uploadFile"
          />
          <Label
            htmlFor="uploadFile"
            className="cursor-pointer px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Choose file"}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
