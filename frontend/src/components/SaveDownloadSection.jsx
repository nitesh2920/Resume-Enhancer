import React from "react";
import { Save, Download } from "lucide-react";
import { Button } from "./ui/button";

export default function SaveDownloadSection({ save, loading, download }) {
  return (
    <div className="flex justify-end space-x-4 mt-4 ">
      <Button  onClick={download} >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      <Button onClick={save} disabled={loading} >
        <Save className="w-4 h-4 mr-1" />
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
