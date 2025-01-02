import React from 'react';
import {
  Html,
  Head,
  Body,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';
  
  interface VerificationEmailProps {
    firstName: string;
    otp: string;
  }
  
  export default function EmailTemplate({ firstName, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verify to change Password</title>
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
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {firstName},</Heading>
          </Row>
          <Row>
            <Text>
              Please use the following verification code to change your password:
            </Text>
          </Row>
          <Row>
            <Text>{otp}</Text> 
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }