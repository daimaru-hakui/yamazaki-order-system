import CsvNoteForm from "@/components/csv-note/csv-note-form";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { db } from "@/db";

export default async function CsvNotePage() {
  const inputData = fs.readFileSync('./customers.csv', { encoding: "utf-8" });
  const customers = parse(inputData, { columns: true, trim: true });
  const skus = await db.sku.findMany({
    include: {
      product: {
        include: {
          color: {
            select: {
              name: true
            }
          }
        }
      },
      size: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <div className="mx-auto max-w-[500px]">
      <CsvNoteForm customers={customers} skus={skus} />
    </div>
  );
}