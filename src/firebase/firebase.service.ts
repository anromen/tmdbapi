import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

const service = {
  type: 'service_account',
  project_id: 'tmdbapi-9d4d6',
  private_key_id: '36bcd6bdb4142c2c05b56069ffdb63ed443be252',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/FZQzBGpDVGdn\n6EldlVD1McuBCZkMOu0MQ+nAWJ53JK8oMW64bUabBSLe+EvM7+upjV5FuA2lhEUY\nHSBRJBl2n/o7JnWIV4ksY77G0od3ABSbd8kuTJKZp4VCR4wjaGSbbJ8GA1oh17va\n2C3ER5GplH/+lx5DKzTA8C52MrRmZYPqBFMQjxep/wnU1+McC4A+Q5tI/1XGEYeW\n4+QZKn05IsCQVTrNwjxXGcMgN+t/s8s1+vyIzMOeq8dwZsJkuIkiC2aM40VlZ4tY\ndSRjdNQGeSBRrk1aXQiDjHK2VNoxLerOMwV3I2DlWfl2Ud233BXJxZWTF3RjrreM\noLrrR0tZAgMBAAECggEAAZgZvio3g7vIyBBjSk1UWVNSxg8RMI2uTBel89WZbteG\nwZBWAuJggCsVDSSnpzxKLEYyZuT/8iVOGUMm8Z5aOwffI86wlNRcH9tuLET13duJ\nkHl5m3IGmBMSdMjZhbMZgcVwdzGgdx9QYSVEDnrlX3OOdM6IcVmDLWfjj1dhc2g6\nMgabaufJ/AIs/8ddjcN/E2apOWBC5B4K2VBNarvSVO6iulGj8S/jYkAqxNz8B4ii\nXlDnvuIP9dJjYl/aFpMSziWosFj7fihHfM4aeH9107fMQDM1cxsjcQH5P9Z71CCP\n/JJBW+/pC09LtMYCinZhMDXIsx+edNXAs0VQkJh4AQKBgQDz0qN1Zu/19YfDGh4n\n6pfVtGK0EVqzdoElKXS4+vQ2Q/LaDU4kzloEPJqNGkQESPMeWq5FcMqYY7N1TRf9\nKCQH/krcEs+uYw7HKL+ZDkBFMkqiBzn3ozKCXZ9qcB3y0ig/M2KtDQWQ0Awdh3vY\nsqB2J/k/y4TbrtPS3YlpSmQcAQKBgQDIoKjhovhDKRhXQWcNMEH+KgQx/5SW5W0M\nsX1XWRihrILRWJkqcjNk3uRWbvMiUXtOpn8jHi9s898OtUg7nTEuRzyUTnOmZSGQ\nwnQ3H2RmApgXhGpunjEsiErKUr9P93qsIJyjtUHB7vwlpTlelKmzuTjjOclXS0pQ\nPy3e1tWPWQKBgQC0Kc8Sry9cxUK+DYx+3j+3b4UHnVMyDLy84vcWwIi3mFnYecBm\nPfwR6V4iKWhc6jKLGWJweTmahQFUCdVSANku9t4F4/iF2ThQPXHl/LvM5a50L3bL\n31ExN1DWa2YVyOhoWuXtDRQxvylUoIoIw2UCKeNpGk9frL1ksMIahReYAQKBgGLD\nZB+fYGN/aXIayiYd6X67JFGQpY8a5fHntfI38/4ytDtmSBAzI8W2S+WYvKvaPL9d\nCx04kNQrwVS2PRbLrRhBDTtc22XARyPB9f/kvkHRaRm6n8JQsZhgh6DN10wAYi01\n6KZWZkaX5RyLF5DN0jSdK7oACnOkprKWR3h5fawRAoGBANuquZXwvNN33Pt1J4hp\nBbXC7tNnClyJjRbTpOhR6TlN37NVoGpgAUxTbTK7v7bJWFL5/YXPNKPRbr5iRLjK\n9REB0rgWUc1Yvw3FrRo0LwVJxCp1H2yP9RnY0wOVE7qRN6nxnD65WRgX2lSLby7O\nkOm9ecsQtCv/7tcPo2occZYO\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-966r2@tmdbapi-9d4d6.iam.gserviceaccount.com',
  client_id: '103360374030864714369',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-966r2%40tmdbapi-9d4d6.iam.gserviceaccount.com',
};

const params = {
  type: service.type,
  projectId: service.project_id,
  privateKeyId: service.private_key_id,
  privateKey: service.private_key,
  clientEmail: service.client_email,
  clientId: service.client_id,
  authUri: service.auth_uri,
  tokenUrl: service.auth_uri,
  authProviderX509CertUrl: service.auth_provider_x509_cert_url,
  clientX509CertUrl: service.client_x509_cert_url,
};

@Injectable()
export class FirebaseService {
  private db: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(params),
      databaseURL: 'https://tmdbapi-9d4d6-default-rtdb.firebaseio.com',
    });
    this.db = admin.database();
  }

  async post(data: any, id: string) {
    try {
      return await this.db.ref(`movies/${id}`).set(data);
    } catch (e) {
      return e;
    }
  }
}
