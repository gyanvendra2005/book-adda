import React from 'react';
import {
  Html,
  Head,

  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,

} from '@react-email/components';
  
  interface VerificationEmailProps {
    firstName: string;
    MobileNo: string;
    email:string
  }
  
  export default function EmailDetailsTemplate({ firstName,email, MobileNo }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Contact Details</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here is the contact details </Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello, Thanks for using Book Swap</Heading>
          </Row>
          <Row>
            <Text>
              Hereis the contact details of the seller
            </Text>
          </Row>
          <Row>
            <Text>
              Name:{firstName}
              <br />
              MobileNo.:{MobileNo}
              <br />
              Email:{email}
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }