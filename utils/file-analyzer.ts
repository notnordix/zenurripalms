// This is a temporary file to help us analyze the project structure
// We'll remove it after our analysis

import fs from "fs"
import path from "path"

// Function to recursively get all files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

// Function to check if a file is imported in other files
function isFileImported(filePath: string, allFiles: string[]): boolean {
  const fileName = path.basename(filePath, path.extname(filePath))

  // Skip checking for certain core files that we know are used
  if (
    filePath.includes("layout.tsx") ||
    filePath.includes("page.tsx") ||
    fileName === "globals" ||
    fileName === "utils"
  ) {
    return true
  }

  let isImported = false

  for (const file of allFiles) {
    if (file === filePath) continue

    const content = fs.readFileSync(file, "utf8")

    // Check for imports of this file
    if (
      content.includes(`from './${fileName}'`) ||
      content.includes(`from "../${fileName}"`) ||
      content.includes(`from "@/${path.dirname(filePath).replace(/\\/g, "/")}/${fileName}"`) ||
      content.includes(`import ${fileName}`) ||
      content.includes(`import { ${fileName}`) ||
      content.includes(`<${fileName}`)
    ) {
      isImported = true
      break
    }
  }

  return isImported
}

// Main function to find unused files
function findUnusedFiles(rootDir: string): string[] {
  const allFiles = getAllFiles(rootDir)
  const unusedFiles: string[] = []

  allFiles.forEach((file) => {
    if (!isFileImported(file, allFiles)) {
      unusedFiles.push(file)
    }
  })

  return unusedFiles
}

// Run the analysis
const unusedFiles = findUnusedFiles("./")
console.log("Potentially unused files:")
unusedFiles.forEach((file) => console.log(file))
