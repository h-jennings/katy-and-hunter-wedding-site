import fs from "node:fs";
import path from "node:path";
import csv from "csv-parser";
import { db } from "../src";
import { parties } from "../src/schema";

const CSV_SOURCE = path.join(__dirname, "/data/wedding-guest-parties.csv");
interface Party {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}
const results: Array<Party> = [];

function main() {
  function mapResultsToDb(results: Array<Party>) {
    return results.map((party) => {
      return {
        name: party.name,
        email: party.email || null,
        phone: party.phone || null,
        address: `${party.address.trim()} \n${party.city.trim()} ${party.zip.trim()}`,
      };
    });
  }

  fs.createReadStream(CSV_SOURCE, { encoding: "utf8" })
    .pipe(
      csv({
        mapHeaders: ({ header }) => {
          return header.replace(/^Party\s/, "").toLowerCase();
        },
      }),
    )
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      const partiesData = mapResultsToDb(results);

      try {
        await db.delete(parties);

        await db.insert(parties).values(
          partiesData.map((p) => {
            return {
              displayName: p.name,
              address: p.address,
              phoneNumber: p.phone,
              email: p.email,
            };
          }),
        );

        console.log(`success: ${await db.$count(parties)} added`);
      } catch (err) {
        console.error("failed", err);
      }
    });
}

main();
