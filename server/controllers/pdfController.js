// Importing required modules using ES6 syntax
import pdf from 'html-pdf';
import path from 'path';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { pdfTemplate } from '../documents/document.js';

import ENV from '../config.js';
import dotenv from 'dotenv';

// Configuring dotenv
dotenv.config();

// Function to create a PDF
export const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            console.log(err);
        }
        res.send('pdf generated');
    });
};

// Function to fetch the PDF
// export const fetchPdf = (req, res) => {
//     res.sendFile(path.join(__dirname, 'invoice.pdf'));
// };

export const fetchPdf = (req, res) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    res.sendFile(path.join(__dirname, 'invoice.pdf'));
};

// Function to send the PDF via email
export const sendPdf = (req, res) => {
    // const pathToAttachment = path.join(__dirname, 'invoice.pdf');
    //const pathToAttachment = path.join(__dirname, 'pdfs', 'invoice.pdf');
    const pathToAttachment = path.join(process.cwd(), 'invoice.pdf');


    const attachment = fs.readFileSync(pathToAttachment).toString('base64');

    // Creating nodemailer transport
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ENV.EMAIL, // Your Gmail username
            pass: ENV.PASSWORD, // Your Gmail password
        },
        tls: { rejectUnauthorized: false },
    });

    // Sending email with attached PDF
    smtpTransport.sendMail({
        from: process.env.EMAIL, // Your email address
        to: req.body.email, // Recipient's email address
        subject: 'Electric meter bill',
        html: `
        Testing Pdf Generate document, Thanks.`,
        attachments: [
            {
                content: attachment,
                filename: 'invoice.pdf',
                contentType: 'application/pdf',
                path: pathToAttachment,
            },
        ],
    }, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send('Mail has been sent to your email. Check your mail.');
        }
    });
};
