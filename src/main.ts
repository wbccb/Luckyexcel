import {LuckyFile} from "./ToLuckySheet/LuckyFile";

import {HandleZip} from './HandleZip';
import {ExcelFile as ExceljsFile} from './toExceljs/ExcelFile'

import {IuploadfileList} from "./ICommon";
import {ExcelFile} from './toExcel/ExcelFile'


export class LuckyExcel {
  static transformExcelToLucky(excelFile: File,
                               callback?: (files: IuploadfileList, fs?: string) => void,
                               errorHandler?: (err: Error) => void) {
    let handleZip: HandleZip = new HandleZip(excelFile);

    handleZip.unzipFile(function (files: IuploadfileList) {
        let luckyFile = new LuckyFile(files, excelFile.name);
        let luckysheetfile = luckyFile.Parse();
        let exportJson = JSON.parse(luckysheetfile);
        if (callback != undefined) {
          callback(exportJson, luckysheetfile);
        }
      },
      function (err: Error) {
        if (errorHandler) {
          errorHandler(err);
        } else {
          console.error(err);
        }
      });
  }

  static transformExcelToLuckyByUrl(
    url: string,
    name: string,
    callBack?: (files: IuploadfileList, fs?: string) => void,
    errorHandler?: (err: Error) => void) {
    let handleZip: HandleZip = new HandleZip();
    handleZip.unzipFileByUrl(url, function (files: IuploadfileList) {
        let luckyFile = new LuckyFile(files, name);
        let luckysheetfile = luckyFile.Parse();
        let exportJson = JSON.parse(luckysheetfile);
        if (callBack != undefined) {
          callBack(exportJson, luckysheetfile);
        }
      },
      function (err: Error) {
        if (errorHandler) {
          errorHandler(err);
        } else {
          console.error(err);
        }
      });
  }

  static transformLuckyToExcel(
    luckysheetJson: any,
    callBack?: (files: any) => void,
    errorHandler?: (err: Error) => void) {
    try {
      const excelFile = new ExcelFile(luckysheetJson)
      excelFile.export();
      callBack?.(excelFile)
    } catch (e) {
      errorHandler?.(e)
    }
  }


  static transformLuckyToExcelBlob(luckysheetJson: any, fileName: string, callBack?: (files: any, blobData: any) => void, errorHandler?: (err: Error) => void) {
    try {
      const excelFile = new ExceljsFile(luckysheetJson)
      excelFile.exportBlob().then((blobData: any) => {
        callBack?.(excelFile, blobData)
      }).catch(err => {
        errorHandler?.(err)
      });
    } catch (e) {
      errorHandler?.(e)
    }
  }

  static transformLuckyToExceljs(
    luckysheetJson: any,
    callBack?: (files?: any) => void,
    errorHandler?: (err: Error) => void) {
    const excelFile = new ExceljsFile(luckysheetJson)
    excelFile.export().then((data) => {
      callBack?.(data)
    }).catch(err => {
      errorHandler?.(err)
    });
  }
}
// @ts-ignore
window.LuckyExcel = LuckyExcel;