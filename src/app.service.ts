import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLogs, EmailLogsDocument } from './schema/email-logs.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(EmailLogs.name)
    private emailLogsModel: Model<EmailLogsDocument>,
) { }


  getHello(): string {
    return 'Hello World!';
  }

  async create(
  payload:any
) {
    try {
      const emaildata = await payload.forEach(v => {
        return new Promise(function(resolve, reject) {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: 'user@gmail.com',
              pass: 'password'
            }
          });
      


          let mailOptions = {
            from: "Email",
            to: v.email,
            subject: "News Letter",
            text: `Hi ${v.firstName + ' ' + v.lastName}, The ${v.newsletter_name} and the contents are, ${v.newsletter_content}` 
  
          };

          console.log("mailOptions",mailOptions,v)
      
          transporter.sendMail(mailOptions, async function(error, info) {
            if (error) {
              console.log(error);
              reject(null);
            } else {
 
              console.log("Email sent: " + info.response);
              resolve(true);
            }
          });
        });
  
    
      });
 
    } catch (err) {
        throw new RpcException(
            err.error_description || err.message || err.error,
        );
    }
}

}
