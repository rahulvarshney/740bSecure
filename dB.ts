import { parse } from "jsr:@std/csv";

export interface AgentData {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}


export async function readCsvFile(filePath: string) {
    try {
        const csvContent = await Deno.readTextFile(filePath);
        const data = parse(csvContent, {
            skipFirstRow: true, // Skip the header row
        });
        console.log('inside readCsvFile module');
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error reading or parsing CSV:", error);
    }
}