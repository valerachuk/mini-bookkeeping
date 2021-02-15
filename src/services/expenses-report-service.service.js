import { ipcRenderer } from 'electron';
import {
  ExpensesRepository,
  ISO8601DateFormatter,
  NotificationsService
} from '@/services';
import fs from 'fs';

export default {

  requestShowingSaveDialog (id) {
    ExpensesRepository
      .readPrettyView(id)
      .then(expenseInfo => {
        ipcRenderer.once('save-dialog-callback', (e, dialogDoneInfo) => {
          if (dialogDoneInfo.canceled) return;
          this.saveReport(expenseInfo, dialogDoneInfo.filePath);
        });
        ipcRenderer.send('show-save-dialog', {
          title: 'Save expense report...',
          defaultPath: `Expense report #${expenseInfo.Id}`,
          properties: ['createDirectory'],
          filters: [
            { name: 'HTML', extensions: ['html'] },
            { name: 'All Files', extensions: ['*'] }
          ]
        });
      });
  },

  saveReport (expenseInfo, filePath) {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Expense report #${expenseInfo.Id}</title>
          <style>
            * {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              color: #1A237E;
            }
      
            body {
              background-color: #FAFAFA;
            }
      
            h1 {
              font-style: italic;
            }
            
            .timestamp {
              text-align: right;
            }
          </style>
        </head>
        <body>
          <h1>
            Expense report #${expenseInfo.Id}
          </h1>
          <hr />
          <h2><u>Id:</u> ${expenseInfo.Id}</h2>
          <h2><u>Description:</u> ${expenseInfo.Description}</h2>
          <h2><u>Price:</u> ${expenseInfo.Price}</h2>
          <h2><u>DateOfPurchase:</u> ${ISO8601DateFormatter.formatDate(expenseInfo.DateOfPurchase)}</h2>
          <h2><u>Department:</u> ${expenseInfo.Department}</h2>
          <h2><u>Employee:</u> ${expenseInfo.Employee}</h2>
          <h2><u>TypeOfCost:</u> ${expenseInfo.TypeOfCost}</h2>
          <h2><u>Shop:</u> ${expenseInfo.Shop}</h2>
          <hr />
          <p class="timestamp"><u>Generated at:</u> ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `;

    fs.writeFile(filePath, htmlTemplate, error => {
      if (error) {
        throw error;
      } else {
        NotificationsService.fireSuccess(`Successfully saved report to: ${filePath}`);
      }
    });
  }

};
