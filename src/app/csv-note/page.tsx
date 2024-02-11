import CsvNoteForm from "@/components/csv-note/csv-note-form";
import fs from "fs";
import { parse } from "csv-parse/sync";

export default function CsvNotePage() {
  const inputData = fs.readFileSync('./customers.csv', { encoding: "utf-8" });
  const customers = parse(inputData, { columns: true, trim: true });
  return (
    <div>
      <CsvNoteForm customers={customers} />
    </div>
  );
}