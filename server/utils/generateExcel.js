exports.generateExcel = (configDoc, workbook) => {
    let worksheet = workbook.addWorksheet('ReporteExcel');
    const header = configDoc.headers
    const data = configDoc.data;
  
    worksheet.columns =[{width: 20, wrapText:true, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},
      {width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true},{width: 20, wrapText:true}]
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: '4167B8'
        },
        bgColor: {
          argb: ''
        }
      }
      cell.font = {
        bold: true,
        color: {
          argb: 'FFFFFF'
        },
        size: 12
      }
    })
    // Adding Data with Conditional Formatting
    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });
    return workbook;
  }