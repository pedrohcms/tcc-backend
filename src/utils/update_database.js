require("dotenv").config();
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Please enter arguments for the command, exiting.");

  return;
}

// Updating database with migrations
try {
  console.log(`Running command: npx knex ${args}`);

  childProcess.execSync(`npx knex ${args}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return;
    }

    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
  });
} catch (error) {
  console.log("Error while running migrations:");
  console.log(error);
  rollbackMigrations();
  return;
}

try {
  console.log("Removing old prisma files if necessary");

  let folderPath = path.resolve(__dirname, "..", "node_modules", ".prisma");

  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(path.resolve(folderPath), {
      recursive: true,
    });
  }

  folderPath = path.resolve(
    __dirname,
    "..",
    "node_modules",
    "@prisma",
    "client"
  );

  if (fs.existsSync(path.resolve(folderPath))) {
    fs.rmdirSync(path.resolve(folderPath), {
      recursive: true,
    });
  }
} catch (error) {
  console.log("Error while removing old prisma files:");
  console.log(error);
  rollbackMigrations();
  return;
}

// Updating schema.prisma
try {
  console.log("Running prisma introspect");

  folderPath = path.resolve(__dirname, "..", "config", "schema.prisma");

  childProcess.execSync(
    `npx prisma introspect --schema=${folderPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }

      if (stdout) {
        console.log(`stdout: ${stdout}`);
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
    }
  );
} catch (error) {
  console.log("Error while running prisma introspect:");
  console.log(error);
  rollbackMigrations();
  return;
}

// Updating Prisma Client
try {
  console.log("Generating Prisma Client");

  childProcess.execSync(
    `npx prisma generate --schema=${folderPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }

      if (stdout) {
        console.log(`stdout: ${stdout}`);
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
    }
  );
} catch (error) {
  console.log("Error while updating Prisma Client:");
  console.log(error);
  rollbackMigrations();
  return;
}

// Rollback migrations in case of error.
function rollbackMigrations() {
  try {
    console.log("Rolling back current migrations.");

    childProcess.execSync(
      "npx knex migrate:rollback",
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          return;
        }

        if (stdout) {
          console.log(`stdout: ${stdout}`);
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    );
  } catch (error) {
    console.log("Error while rolling back currrent migrations:");
    console.log(error);
    return;
  }
}
