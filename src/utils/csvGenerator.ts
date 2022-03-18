
import { ExportToCsv } from 'export-to-csv';

export const exportDataToCsv = (data: any, filename: string = 'generated') => {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Daily Donation Data',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
}