export const pdfTemplate = ({ name, meter, email }) => {
   const today = new Date();
   const charge = 50;
   const unit = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
   const bill = 2 * unit;
   const totalPrice = bill + charge;

   return `
<!doctype html>
<html>
  <head>
     <meta charset="utf-8">
     <title>PDF Result Template</title>
     <style>
        .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
        color: #555;
        }
        .justify-center {
        text-align: center;
        }
        .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        }
        .invoice-box table td {
        padding: 5px;
        vertical-align: top;
        }
        .invoice-box table tr td:nth-child(2) {
        text-align: right;
        }
        .invoice-box table tr.top table td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
        }
        .invoice-box table tr.information table td {
        padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        }
        .invoice-box table tr.details td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
        border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
        }
        @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: center;
        }
        .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: center;
        }
        }
     </style>
  </head>
  <body>
     <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
           <tr class="top">
              <td colspan="2">
                 <table>
                    <tr>
                       <td class="title"><img src="https://img.icons8.com/metro/26/electrical.png"
                          style="width:100%; max-width:156px;"></td>
                       <td>
                       Date of Invoice: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                       <br/>
                       Email: ${`${email}`}
                       </td>
                    </tr>
                 </table>
              </td>
           </tr>
           <tr class="information">
              <td colspan="2">
                 <table>
                    <tr>
                       <td>
                          Customer name: ${name}
                       </td>
                       <td>
                          Meter number: ${meter}
                       </td>
                    </tr>
                 </table>
              </td>
           </tr>
           <tr class="item">
              <td>Unit:</td>
              <td>${unit}</td>
           </tr>
           <tr class="item">
              <td>Bill:</td>
              <td>&#8377 ${bill}</td>
           </tr>
           <tr class="item">
              <td>Additional charge:</td>
              <td>&#8377 ${charge}</td>
           </tr>
        </table>
        <br />
        <h3 class="justify-center">Total price: &#8377 ${totalPrice}</h3>
        <footer>
        <p class="justify-center">Invoice was created on ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
     </footer>
     </div>
  </body>
</html>`;
};
