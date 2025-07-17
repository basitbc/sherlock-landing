import { sendForm } from '@emailjs/browser';

export const sendEmail = (formRef, formData) => {
  return new Promise((resolve, reject) => {
    sendForm(
      'service_uafl8ai',
      'template_5isp5sn',
      formRef.current,
      'qk2DOsDGiz0fh-FsT'
    )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          resolve(result);
        },
        (error) => {
          console.log('Email send error:', error.text);
          reject(error);
        }
      );
  });
};