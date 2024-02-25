import XLSX from 'xlsx-js-style';
import {WorkSheet} from './Worksheet';

export class ExcelFileBase {
  fileName: string
  sheets: any[]
}

export class ExcelFile extends ExcelFileBase {
  /**
   * @param luckysheetJson luckysheet.toJson() 返回数据
   * @param fileName
   */
  constructor(luckysheetJson: any, fileName?: string) {
    super();
    const {title, data} = luckysheetJson
    this.fileName = fileName || luckysheetJson.title
    this.sheets = data?.map((item: any) => new WorkSheet(item))
  }

  export() {
    const wb = XLSX.utils.book_new()
    this.sheets?.forEach((sheet: WorkSheet) => {
      XLSX.utils.book_append_sheet(wb, sheet.toData(), sheet.name)
    })
    XLSX.writeFile(wb, `${this.fileName}.xlsx`)
  }

  s2ab(s: any) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  exportBlob() {
    const wb = XLSX.utils.book_new();
    this.sheets?.forEach((sheet: WorkSheet) => {
      XLSX.utils.book_append_sheet(wb, sheet.toData(), sheet.name)
    })
    const writeWb = XLSX.write(wb, {bookType: "xlsx", type: "binary"});
    return new Blob(
      [this.s2ab(writeWb)], {type: "application/octet-stream"}
    );
  }
}