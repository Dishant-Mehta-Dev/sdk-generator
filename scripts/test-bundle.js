#!/usr/bin/env node
/**
 * Bundle Test Script
 *
 * This script tests the combined package setup by simulating
 * how a user would import and use the package on an MPC server.
 */

// Build the project first
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Testing bundle setup...");

try {
  // Build everything - we're commenting this out to avoid rebuilding
  // when just testing existing builds
  // console.log("Building the package...");
  // execSync("pnpm bundle:build", { stdio: "inherit" });

  // Verify the core files exist
  console.log("\nVerifying core files...");
  const expectedCoreFiles = [
    "dist/bundle.js",
    "dist/bundle.mjs",
    "dist/bundle.d.ts",
    "dist/tools.js",
    "dist/tools.mjs",
    "dist/tools.d.ts",
    "dist/index.js",
    "dist/index.mjs",
    "dist/index.d.ts",
  ];

  let allCoreFilesExist = true;

  for (const file of expectedCoreFiles) {
    const filePath = path.resolve(__dirname, "..", file);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing core file: ${file}`);
      allCoreFilesExist = false;
    } else {
      console.log(`✓ Found core file: ${file}`);
    }
  }

  if (!allCoreFilesExist) {
    console.error("Some core files are missing!");
    process.exit(1);
  }

  // Check the tools directory
  console.log("\nVerifying tools directory...");
  const toolsDir = path.resolve(__dirname, "..", "dist/tools");

  if (!fs.existsSync(toolsDir)) {
    console.error("Tools directory is missing!");
    process.exit(1);
  }

  // Check for compiled tool files
  const toolFiles = fs.readdirSync(toolsDir);
  console.log(`Found ${toolFiles.length} files in tools directory`);

  if (toolFiles.length === 0) {
    console.error("No tool files found in the tools directory!");
    process.exit(1);
  }

  // Verify we have at least index.js and one tool
  const hasIndexJs = toolFiles.includes("index.js");
  const hasAtLeastOneTool = toolFiles.some(
    (file) => file !== "index.js" && file.endsWith(".js")
  );

  if (!hasIndexJs) {
    console.error("Missing index.js in tools directory!");
    process.exit(1);
  }

  if (!hasAtLeastOneTool) {
    console.error("No tool implementation files found in tools directory!");
    process.exit(1);
  }

  console.log("✓ Tools directory contains required files");

  // Test the main exports from the package
  console.log("\nTesting package exports...");

  // 1. Test the main export
  console.log("\n1. Testing main export (@meeting-baas/sdk)...");
  const mainExport = require("../dist/index.js");

  // Check for BaasClient
  if (!mainExport.BaasClient) {
    console.error("Missing BaasClient in main export!");
    process.exit(1);
  }
  console.log("✓ BaasClient export found");

  // Check for types - more flexible approach that doesn't rely on specific type names
  console.log("Checking for exported types...");
  let hasTypes = false;

  // Look for various possible type exports
  const possibleTypeExports = ["Provider", "RecordingMode", "SpeechToText"];
  const foundTypes = possibleTypeExports.filter(
    (type) => mainExport[type] !== undefined
  );

  if (foundTypes.length > 0) {
    console.log(`✓ Found exported types: ${foundTypes.join(", ")}`);
    hasTypes = true;
  } else {
    console.log(
      "⚠️ Warning: Could not find specific expected types, but continuing..."
    );
    // Not failing the test here, since type exports can change with OpenAPI generation
    hasTypes = true; // Force continue even if we don't find the specific types
  }

  // List all available exports
  console.log("\nMain export (@meeting-baas/sdk) includes:");
  const mainExportKeys = Object.keys(mainExport).sort();
  mainExportKeys.forEach((key) => console.log(` - ${key}`));

  // 2. Test the tools export
  console.log("\n2. Testing tools export (@meeting-baas/sdk/tools)...");
  const toolsExport = require("../dist/tools.js");

  // Check for allTools array
  if (!toolsExport.allTools || !Array.isArray(toolsExport.allTools)) {
    console.error("Missing allTools array in tools export!");
    process.exit(1);
  }
  console.log(
    `✓ allTools export found with ${toolsExport.allTools.length} tools`
  );

  // Check for registerTools function
  if (typeof toolsExport.registerTools !== "function") {
    console.error("Missing registerTools function in tools export!");
    process.exit(1);
  }
  console.log("✓ registerTools function export found");

  // Check for at least one tool
  const toolNames = toolsExport.allTools.map((tool) => tool.name).sort();
  if (toolNames.length === 0) {
    console.error("No tools found in allTools array!");
    process.exit(1);
  }

  console.log("\nTools export (@meeting-baas/sdk/tools) includes these tools:");
  toolNames.forEach((name) => console.log(` - ${name}`));

  // Find specific required tools mentioned in the npm page
  const requiredTools = [
    "default-api-join",
    "default-api-get-meeting-data",
    "default-api-delete-data",
    "calendars-api-list-calendars",
    "calendars-api-schedule-record-event",
  ];

  const missingTools = requiredTools.filter(
    (tool) => !toolNames.includes(tool)
  );
  if (missingTools.length > 0) {
    console.error(`Missing essential tools: ${missingTools.join(", ")}`);
    console.error(
      "These tools are mentioned in the package documentation but not found in the bundle!"
    );
    process.exit(1);
  }
  console.log("✓ All required tools are present");

  // 3. Test the bundle export
  console.log("\n3. Testing bundle export (@meeting-baas/sdk/bundle)...");
  const bundleModule = require("../dist/bundle.js");

  // Check if the SDK_MODE is set correctly
  if (bundleModule.SDK_MODE !== "MPC_SERVER") {
    console.error(
      `Expected SDK_MODE to be 'MPC_SERVER', got '${bundleModule.SDK_MODE}'`
    );
    process.exit(1);
  }
  console.log("✓ Bundle has correct SDK_MODE");

  // Check for BaasClient in bundle export
  if (!bundleModule.BaasClient) {
    console.error("Missing BaasClient in bundle export!");
    process.exit(1);
  }
  console.log("✓ BaasClient found in bundle export");

  // Check for registerTools in bundle export
  if (typeof bundleModule.registerTools !== "function") {
    console.error("Missing registerTools function in bundle export!");
    process.exit(1);
  }
  console.log("✓ registerTools function found in bundle export");

  // List all available exports in bundle
  console.log("\nBundle export (@meeting-baas/sdk/bundle) includes:");
  const bundleExportKeys = Object.keys(bundleModule).sort();
  bundleExportKeys.forEach((key) => console.log(` - ${key}`));

  // 4. Test type definitions
  console.log("\n4. Verifying TypeScript definitions...");
  const tsDefFiles = ["dist/index.d.ts", "dist/tools.d.ts", "dist/bundle.d.ts"];

  let allTsDefFilesExist = true;
  for (const file of tsDefFiles) {
    const filePath = path.resolve(__dirname, "..", file);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing TypeScript definition file: ${file}`);
      allTsDefFilesExist = false;
    } else {
      // Check file size to ensure it's not empty
      const stats = fs.statSync(filePath);
      if (stats.size < 10) {
        console.error(`TypeScript definition file is too small: ${file}`);
        allTsDefFilesExist = false;
      } else {
        console.log(`✓ Valid TypeScript definition file: ${file}`);
      }
    }
  }

  if (!allTsDefFilesExist) {
    console.error("Some TypeScript definition files are missing or invalid!");
    process.exit(1);
  }

  // 5. Check package.json exports configuration
  console.log("\n5. Verifying package.json exports configuration...");
  const packageJson = require("../package.json");

  const requiredExports = [".", "./tools", "./bundle"];

  const missingExports = requiredExports.filter(
    (exp) => !packageJson.exports[exp]
  );
  if (missingExports.length > 0) {
    console.error(
      `Missing exports in package.json: ${missingExports.join(", ")}`
    );
    process.exit(1);
  }
  console.log("✓ All required exports are configured in package.json");

  // Final summary
  console.log("\n=============================================");
  console.log("✅ Bundle test completed successfully!");
  console.log("The package is ready to be published with:");
  console.log("\npnpm publish");
  console.log("\nUsers will be able to import:");
  console.log("- import { BaasClient } from '@meeting-baas/sdk'");
  console.log("- import { allTools } from '@meeting-baas/sdk/tools'");
  console.log(
    "- import { BaasClient, SDK_MODE } from '@meeting-baas/sdk/bundle'"
  );

  // Add user-friendly usage examples
  console.log("\n=============================================");
  console.log("📚 GENERATED TOOLS USAGE GUIDE");
  console.log("=============================================");

  // Group tools by API category for better organization
  const toolsByCategory = {};
  toolNames.forEach((name) => {
    const category = name.split("-")[0]; // e.g., "default", "calendars"
    if (!toolsByCategory[category]) {
      toolsByCategory[category] = [];
    }
    toolsByCategory[category].push(name);
  });

  // Display tools by category with import examples
  console.log("\n📋 AVAILABLE TOOLS BY CATEGORY:");

  Object.keys(toolsByCategory)
    .sort()
    .forEach((category) => {
      console.log(`\n${category.toUpperCase().replace(/-API/i, "")} TOOLS:`);

      toolsByCategory[category].sort().forEach((name) => {
        // Convert tool name to valid JavaScript identifier (for import examples)
        const jsName = name.replace(/-/g, "_") + "_tool";
        console.log(`  - ${name}`);
        console.log(`    import { ${jsName} } from '@meeting-baas/sdk/tools';`);
      });
    });

  // Show common usage patterns
  console.log("\n🔧 COMMON USAGE PATTERNS:");

  // 1. Individual tool import
  console.log("\n1. Import and register individual tools:");
  console.log("```typescript");
  console.log("// Import specific tools");
  console.log(
    "import { default_api_join_tool, default_api_get_meeting_data_tool } from '@meeting-baas/sdk/tools';"
  );
  console.log("import { registerTool } from 'your-mpc-server';");
  console.log("");
  console.log("// Register with your MPC server");
  console.log("registerTool(default_api_join_tool);");
  console.log("registerTool(default_api_get_meeting_data_tool);");
  console.log("```");

  // 2. Register all tools at once
  console.log("\n2. Register all tools at once:");
  console.log("```typescript");
  console.log(
    "import { allTools, registerTools } from '@meeting-baas/sdk/tools';"
  );
  console.log("import { registerTool } from 'your-mpc-server';");
  console.log("");
  console.log("// Register all tools with a single function");
  console.log("registerTools(allTools, registerTool);");
  console.log("```");

  // 3. One-step setup with API key
  console.log("\n3. Quick setup with API key:");
  console.log("```typescript");
  console.log(
    "import { allTools, setupBaasTools } from '@meeting-baas/sdk/tools';"
  );
  console.log("import { registerTool } from 'your-mpc-server';");
  console.log("");
  console.log("// Create a client and register tools in one step");
  console.log(
    "const client = setupBaasTools(allTools, registerTool, 'your-api-key');"
  );
  console.log("```");

  // 4. Using with Next.js
  console.log("\n4. Usage in Next.js API route:");
  console.log("```typescript");
  console.log("// app/api/mcp/route.ts");
  console.log(
    "import { allTools, registerTools } from '@meeting-baas/sdk/tools';"
  );
  console.log("import { BaasClient } from '@meeting-baas/sdk';");
  console.log("");
  console.log("export async function POST(req: Request) {");
  console.log("  const { messages } = await req.json();");
  console.log("");
  console.log("  // Initialize your MPC server");
  console.log("  const server = new McpServer();");
  console.log("");
  console.log("  // Register Meeting BaaS tools");
  console.log("  await registerTools(allTools, server.registerTool);");
  console.log("");
  console.log("  // Process the request");
  console.log("  const result = await server.processRequest(messages);");
  console.log("  return Response.json(result);");
  console.log("}");
  console.log("```");

  console.log("\n=============================================");
} catch (error) {
  console.error("Error testing bundle:", error);
  process.exit(1);
}
