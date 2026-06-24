"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Brain, Download } from "lucide-react";

export default function MeetingSummary() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("meetingSummary");
    if (data) setSummary(data);
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("🧠 MeetVerse AI Meeting Summary", 20, 20);

    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(summary, 170);

    pdf.text(lines, 20, 40);

    pdf.save("MeetVerse-AI-Summary.pdf");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-3xl font-bold flex items-center gap-2">
        🧠 AI Meeting Summary
      </h1>

      <div className="mt-10 bg-[#111827] p-6 rounded-xl whitespace-pre-line">
        {summary}
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-lg"
      >
        <Download size={18} />
        Download PDF
      </button>

    </div>
  );
}