/**
 * Migration script: Upload paintings from paintings.json to Sanity
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/migrate-paintings.js
 *
 * Get a write token from: https://www.sanity.io/manage/project/<projectId>/api#tokens
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, join } from "path";

const projectId = "6929eufc";
const dataset = "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error("Error: SANITY_TOKEN environment variable is required.");
  console.error(
    "Get a write token from: https://www.sanity.io/manage/project/6929eufc/api#tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
});

const paintings = JSON.parse(
  readFileSync(resolve("data/paintings.json"), "utf-8")
);

async function migrate() {
  console.log(`Migrating ${paintings.length} paintings to Sanity...\n`);

  for (const painting of paintings) {
    try {
      // Upload image
      const imagePath = join("public", painting.image);
      const imageBuffer = readFileSync(imagePath);
      const filename = painting.image.split("/").pop();

      console.log(`Uploading image: ${filename}...`);
      const imageAsset = await client.assets.upload("image", imageBuffer, {
        filename,
      });

      // Create painting document
      const doc = {
        _type: "painting",
        title: painting.title,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        aspectRatio: painting.aspectRatio,
        size: painting.size || "",
        medium: painting.medium || "",
        sold: painting.sold || false,
        order: painting.id,
      };

      const result = await client.create(doc);
      console.log(`  Created: "${painting.title}" (${result._id})`);
    } catch (err) {
      console.error(`  Failed: "${painting.title}" - ${err.message}`);
    }
  }

  console.log("\nMigration complete!");
}

migrate();
