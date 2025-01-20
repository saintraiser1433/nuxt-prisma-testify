<template>
  <div>
    <button @click="generatePDF" class="px-4 py-2 bg-blue-500 text-white rounded">
      Generate Certificate
    </button>
  </div>
</template>

<script setup>
import { jsPDF } from "jspdf";
import gstc from "~/assets/logo/gstc.png";
import seait from "~/assets/logo/seait.png";
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/franklingothic.js";
import "~/assets/fonts/tahoma-normal.js";
const generatePDF = () => {
  // Initialize PDF with custom dimensions (in points, 72 points = 1 inch)
  const doc = new jsPDF({
    unit: "px",
    format: [220, 260],
  });

  //   doc.rect(0, 0, 286, 355, "F");

  // Add border to match the image
  doc.setLineWidth(0.5);
  doc.rect(2, 2, 216, 256);

  //   // Configure fonts and colors

  //header
  doc.setFont("oldenglishtextmt", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text("South East Asian Institute of Technology, Inc.", 108, 48, {
    align: "center",
  });

  doc.setFont("Franklin Gothic Bold", "bold");
  doc.setFontSize(11);
  doc.text("Guidance Services and Testing Center", 108, 60, { align: "center" });

  //date
  doc.setFont("tahoma", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  const textWidth = doc.getTextWidth("Date: Jan 20, 2025");
  doc.text("Date: Jan 20, 2025", 10, 80);
  doc.line(10, 82, 10 + textWidth, 82);

  //body
  const preText = "This is to certify that ";
  const name = "MAMAC,CREZELYN-ARTH BRIGOLE";
  const midText =
    ", has taken the Entrance Examinations 2024 and is qualified to take the course ";
  const course = "BACHELOR OF SCIENCE IN CRIMINOLOGY";
  const endText = " for Academic Year 2024-2025.";

  // Combine the text
  const content = preText + name + midText + course + endText;

  doc.setFontSize(9);
  const margin = 10;
  const maxWidth = 200;

  // Split text with adjusted width
  let splitTitle = doc.splitTextToSize(content, maxWidth);

  // Create text with proper justification
  doc.text(splitTitle, margin, 100, {
    align: "justify",
    maxWidth: maxWidth,
    lineHeightFactor: 1.4, // Reduced line height
  });

  doc.addImage(seait, "PNG", 78, 7, 30, 30);
  doc.addImage(gstc, "PNG", 108, 3, 42, 42);

  //checked by section
  doc.setFont("tahoma", "normal");
  doc.setFontSize(9);
  doc.text("Checked by:", 10, 165);
  doc.line(75, 165, 200, 165);

  doc.setFont("Franklin Gothic Bold", "bold");
  doc.setFontSize(7);
  doc.text("Guidance Personnel In-Charge", 140, 171, {
    align: "center",
  });

  //noted section
  doc.setFont("tahoma", "normal");
  doc.setFontSize(9);
  doc.text("Noted by:", 10, 190);
  doc.line(75, 190, 200, 190);

  doc.setFont("Franklin Gothic Bold", "bold");
  doc.setFontSize(7);
  doc.text("Rovi D. Soliterio, MA, RGC", 140, 197, {
    align: "center",
  });

  //program head section
  doc.setFont("tahoma", "normal");
  doc.setFontSize(9);
  doc.text("Approved by:", 10, 220);
  doc.line(75, 220, 200, 220);

  doc.setFont("Franklin Gothic Bold", "bold");
  doc.setFontSize(7);
  doc.text("Program Head/Dean", 140, 226, {
    align: "center",
  });

  doc.save("certificate.pdf");
};
</script>
