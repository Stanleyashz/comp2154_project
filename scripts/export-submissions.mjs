import fs from "node:fs/promises";
import path from "node:path";
import { copyFile } from "node:fs/promises";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from "docx";

const rootDir = process.cwd();
const reportsDir = path.join(rootDir, "docs", "reports");
const submissionsDir = path.join(rootDir, "submissions");

const exportTargets = [
  {
    sourcePath: path.join(rootDir, "docs", "planning", "project-overview.md"),
    output: "Stanley_Okafor_COMP2154_Project_Overview.docx",
    title: "Project Overview - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "planning", "kanban-backlog.md"),
    output: "Stanley_Okafor_COMP2154_Kanban_Backlog.docx",
    title: "Kanban Backlog - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "architecture", "system-design.md"),
    output: "Stanley_Okafor_COMP2154_System_Design.docx",
    title: "System Design - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "testing", "test-strategy.md"),
    output: "Stanley_Okafor_COMP2154_Test_Strategy.docx",
    title: "Test Strategy - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "testing", "test-cases.md"),
    output: "Stanley_Okafor_COMP2154_Test_Cases.docx",
    title: "Test Cases - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "testing", "defect-log.md"),
    output: "Stanley_Okafor_COMP2154_Defect_Log.docx",
    title: "Defect Log - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "references", "CLI_COMMAND_REFERENCE.md"),
    output: "Stanley_Okafor_COMP2154_CLI_Command_Reference.docx",
    title: "CLI Command Reference - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "references", "COURSE_MATERIALS_SUMMARY.md"),
    output: "Stanley_Okafor_COMP2154_Course_Materials_Summary.docx",
    title: "Course Materials Summary - COMP 2154"
  },
  {
    sourcePath: path.join(rootDir, "docs", "reports", "requirements-gathering-report.md"),
    output: "Stanley_Okafor_COMP2154_Requirements_Gathering_Report.docx",
    title: "Requirements Gathering Report - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "reports", "project-proposal.md"),
    output: "Stanley_Okafor_COMP2154_Project_Proposal.docx",
    title: "Project Proposal - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "reports", "progress-report-1.md"),
    output: "Stanley_Okafor_COMP2154_Progress_Report_1.docx",
    title: "Progress Report 1 - Job Application Tracker"
  },
  {
    sourcePath: path.join(rootDir, "docs", "presentation", "final-presentation.md"),
    output: "Stanley_Okafor_COMP2154_Final_Presentation.docx",
    title: "Final Presentation - Job Application Tracker"
  },
  {
    sourcePath: path.join(reportsDir, "progress-report-2.md"),
    output: "Stanley_Okafor_COMP2154_Progress_Report_2.docx",
    title: "Progress Report 2 - Job Application Tracker"
  },
  {
    sourcePath: path.join(reportsDir, "progress-report-3.md"),
    output: "Stanley_Okafor_COMP2154_Progress_Report_3.docx",
    title: "Progress Report 3 - Job Application Tracker"
  },
  {
    sourcePath: path.join(reportsDir, "progress-report-4.md"),
    output: "Stanley_Okafor_COMP2154_Progress_Report_4.docx",
    title: "Progress Report 4 - Job Application Tracker"
  },
  {
    sourcePath: path.join(reportsDir, "final-report.md"),
    output: "Stanley_Okafor_COMP2154_Final_Report.docx",
    title: "Final Report - Job Application Tracker"
  }
];

const copyTargets = [
  {
    sourcePath: "C:\\Users\\okafo\\Downloads\\JAT_Complete_Explanation.docx",
    output: "Stanley_Okafor_JAT_Complete_Explanation.docx"
  }
];

function paragraphFromInline(text, options = {}) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);

  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
      continue;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: "Consolas" }));
      continue;
    }

    runs.push(new TextRun(part));
  }

  return new Paragraph({
    children: runs.length ? runs : [new TextRun("")],
    ...options
  });
}

function makeHeading(text, level) {
  const headingMap = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3
  };

  return new Paragraph({
    text,
    heading: headingMap[level] || HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 }
  });
}

function parseTable(lines, startIndex) {
  const tableLines = [];
  let index = startIndex;

  while (index < lines.length && lines[index].trim().startsWith("|")) {
    tableLines.push(lines[index].trim());
    index += 1;
  }

  const rows = tableLines
    .filter((line, rowIndex) => rowIndex !== 1 || !/^(\|\s*:?-+:?\s*)+\|?$/.test(line))
    .map((line, rowIndex) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
        .map(
          (cellText) =>
            new TableCell({
              children: [paragraphFromInline(cellText || " ")],
              width: { size: 25, type: WidthType.PERCENTAGE },
              shading: rowIndex === 0 ? { fill: "EDEDED" } : undefined
            })
        );

      return new TableRow({ children: cells });
    });

  return {
    node: new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows
    }),
    nextIndex: index
  };
}

function markdownToDocxChildren(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const children = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      children.push(new Paragraph({ text: "" }));
      continue;
    }

    if (trimmed.startsWith("# ")) {
      children.push(makeHeading(trimmed.slice(2).trim(), 1));
      continue;
    }

    if (trimmed.startsWith("## ")) {
      children.push(makeHeading(trimmed.slice(3).trim(), 2));
      continue;
    }

    if (trimmed.startsWith("### ")) {
      children.push(makeHeading(trimmed.slice(4).trim(), 3));
      continue;
    }

    if (trimmed === "---") {
      children.push(new Paragraph({ text: "" }));
      continue;
    }

    if (trimmed.startsWith("|")) {
      const { node, nextIndex } = parseTable(lines, index);
      children.push(node);
      index = nextIndex - 1;
      continue;
    }

    if (/^[-*] /.test(trimmed)) {
      children.push(
        paragraphFromInline(trimmed.replace(/^[-*]\s+/, ""), {
          bullet: { level: 0 }
        })
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      children.push(paragraphFromInline(trimmed, { spacing: { after: 80 } }));
      continue;
    }

    children.push(paragraphFromInline(trimmed, { spacing: { after: 80 } }));
  }

  return children;
}

async function exportFile({ sourcePath, output, title }) {
  const markdown = await fs.readFile(sourcePath, "utf8");
  const doc = new Document({
    creator: "Codex",
    title,
    sections: [
      {
        properties: {},
        children: markdownToDocxChildren(markdown)
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile(path.join(submissionsDir, output), buffer);
}

await fs.mkdir(submissionsDir, { recursive: true });

for (const target of exportTargets) {
  try {
    await exportFile(target);
    console.log(`Exported ${target.output}`);
  } catch (error) {
    console.log(`Skipped ${target.output}: ${error.code || error.message}`);
  }
}

for (const target of copyTargets) {
  try {
    await copyFile(target.sourcePath, path.join(submissionsDir, target.output));
    console.log(`Copied ${target.output}`);
  } catch (error) {
    console.log(`Skipped ${target.output}: ${error.code || error.message}`);
  }
}
