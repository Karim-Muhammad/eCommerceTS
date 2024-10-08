import fs from "fs";
import path from "path";
import inquirer, { type DistinctQuestion } from "inquirer";

const createIndexFiles = (dirPath) => {
  fs.writeFileSync(path.join(dirPath, "index.ts"), "");
  console.log(`Created index file: ${dirPath}/index.ts`);
};

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
};

const createWorkingDirectory = (dirPath) => {
  createDirectory(dirPath);
  createIndexFiles(dirPath);
};

function createFeature(featureName: string) {
  // Prompt user for input
  const questions: DistinctQuestion[] = [
    {
      type: "confirm",
      name: "createController",
      message: "Do you need a Controller?",
      default: true,
    },
    {
      type: "confirm",
      name: "createRepository",
      message: "Do you need a Repository?",
      default: true,
    },
    {
      type: "confirm",
      name: "createRoutes",
      message: "Do you need Routes?",
      default: true,
    },
    {
      type: "confirm",
      name: "createServices",
      message: "Do you need Services?",
      default: true,
    },
    {
      type: "confirm",
      name: "createModels",
      message: "Do you need Models?",
      default: true,
    },
    {
      type: "confirm",
      name: "createTypes",
      message: "Do you need Types?",
      default: true,
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    const {
      createController,
      createRepository,
      createRoutes,
      createServices,
      createModels,
      createTypes,
    } = answers;

    const baseDir = path.join(`${__dirname}/src/features`, featureName);
    createWorkingDirectory(baseDir);

    if (createController) {
      createWorkingDirectory(path.join(baseDir, "controller"));
    }

    if (createRepository) {
      createWorkingDirectory(path.join(baseDir, "repository"));
    }

    if (createRoutes) {
      createWorkingDirectory(path.join(baseDir, "route"));
    }

    if (createServices) {
      createWorkingDirectory(path.join(baseDir, "services"));
    }

    if (createModels) {
      createWorkingDirectory(path.join(baseDir, "model"));
    }

    if (createTypes) {
      createWorkingDirectory(path.join(baseDir, "types"));
    }

    console.log("Micro-service structure created successfully!");
  });
}

function main(args) {
  switch (args[2]) {
    case "feature":
      createFeature(args[3]);
      break;
    default:
      console.log("Invalid command");
  }
}

main(process.argv);
