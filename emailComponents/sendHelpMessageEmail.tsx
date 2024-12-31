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
    Message: string;
    email: string;
  }
  
  export default function EmailMessageTemplate({ firstName, Message, email }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Message</title>
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
        <Preview>Here is a new Messaage</Preview>
        <Section>
          <Row>
            <Heading as="h2">From {firstName},{email}</Heading>
          </Row>
          <Row>
            <Text>
              {Message}
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }