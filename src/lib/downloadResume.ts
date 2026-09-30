import { jsPDF } from 'jspdf';
import { RESUME } from '../data/resume';
import { EMAIL, GITHUB_USERNAME, LOCATION } from '../data/site';
import { RESUME_URL } from '../data/site';

const FILE_NAME = 'Akhilesh-Resume.pdf';

function triggerBlobDownload(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = FILE_NAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the browser a moment before revoking so the download isn't interrupted.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function generatePdfFromData(): Blob {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeLine = (
    text: string,
    size: number,
    style: 'normal' | 'bold' | 'italic',
    lineHeight: number,
    gapAfter = 0
  ) => {
    if (!text) return;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += gapAfter;
  };

  // Name
  writeLine(RESUME.name, 26, 'bold', 30, 4);
  // Headline + org
  writeLine(`${RESUME.headline} — ${RESUME.org}`, 12, 'normal', 16, 4);
  // Contact line
  writeLine(`${EMAIL} | ${LOCATION} | github.com/${GITHUB_USERNAME}`, 10, 'normal', 14, 10);

  const sectionTitle = (title: string) => {
    ensureSpace(34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  };

  // Education
  sectionTitle('Education');
  RESUME.education.forEach((edu) => {
    writeLine(`${edu.degree} (${edu.period})`, 11, 'bold', 15);
    writeLine(edu.school, 10, 'italic', 13);
    writeLine(edu.coursework, 10, 'normal', 13, 8);
  });

  // Experience
  sectionTitle('Experience');
  RESUME.experience.forEach((exp) => {
    writeLine(`${exp.role} — ${exp.org} (${exp.period})`, 11, 'bold', 15);
    exp.points.forEach((point) => {
      writeLine(`• ${point}`, 10, 'normal', 13, 2);
    });
    y += 6;
  });

  // Technical Proficiencies
  sectionTitle('Technical Proficiencies');
  RESUME.skills.forEach((group) => {
    writeLine(`${group.group}: ${group.items.join(', ')}`, 10, 'normal', 13, 4);
  });
  y += 4;

  // Highlights
  sectionTitle('Highlights & Achievements');
  RESUME.highlights.forEach((h) => {
    writeLine(`• ${h}`, 10, 'normal', 13, 2);
  });

  return doc.output('blob');
}

export async function downloadResume(onError?: (message: string) => void) {
  try {
    const res = await fetch(RESUME_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    triggerBlobDownload(blob);
    return;
  } catch {
    // fall through to jsPDF generation
  }

  try {
    const blob = generatePdfFromData();
    triggerBlobDownload(blob);
  } catch {
    onError?.('Download failed. Please check your connection and try again.');
  }
}
