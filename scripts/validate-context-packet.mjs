import { readFile } from "node:fs/promises";

const requiredStrings = ["version", "title", "goal", "currentState", "nextAction"];

export function validatePacket(packet) {
  const errors = [];

  if (packet === null || typeof packet !== "object" || Array.isArray(packet)) {
    return ["The packet must be a JSON object."];
  }

  for (const key of requiredStrings) {
    if (typeof packet[key] !== "string" || packet[key].trim().length === 0) {
      errors.push(`Missing a non-empty '${key}' string.`);
    }
  }

  if (packet.version !== "1.0") {
    errors.push("'version' must be '1.0'.");
  }

  if (!Array.isArray(packet.verification) || packet.verification.length === 0) {
    errors.push("Provide at least one verification step.");
  } else if (packet.verification.some((step) => typeof step !== "string" || step.trim().length === 0)) {
    errors.push("Every verification step must be a non-empty string.");
  }

  if (packet.files !== undefined) {
    if (!Array.isArray(packet.files)) {
      errors.push("'files' must be an array when provided.");
    } else {
      for (const [index, file] of packet.files.entries()) {
        if (file === null || typeof file !== "object" || typeof file.path !== "string" || typeof file.purpose !== "string") {
          errors.push(`File entry ${index + 1} needs string 'path' and 'purpose' values.`);
        }
      }
    }
  }

  return errors;
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/validate-context-packet.mjs <packet.json>");
    process.exitCode = 2;
    return;
  }

  let packet;
  try {
    packet = JSON.parse(await readFile(inputPath, "utf8"));
  } catch (error) {
    console.error(`Could not read valid JSON from ${inputPath}: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  const errors = validatePacket(packet);
  if (errors.length > 0) {
    console.error(`Invalid context packet:\n- ${errors.join("\n- ")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Valid context packet: ${packet.title}`);
}

if (typeof process !== "undefined" && import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
