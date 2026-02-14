import React from 'react'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Button,
} from '@react-email/components'
import { render } from '@react-email/render'

export interface CampaignEmailProps {
  preheader?: string
  heading: string
  content: string // HTML content from rich text
  ctaText?: string
  ctaUrl?: string
  campaignId: string
  subscriberId: string
  unsubscribeUrl: string
  baseUrl: string
}

export default function CampaignEmail({
  preheader = '',
  heading,
  content,
  ctaText,
  ctaUrl,
  campaignId,
  subscriberId,
  unsubscribeUrl,
  baseUrl,
}: CampaignEmailProps) {
  return (
    <Html>
      <Head />
      {preheader && <Preview>{preheader}</Preview>}
      <Body style={main}>
        <Container style={container}>
          {/* Header with PleinCap branding */}
          <Section style={header}>
            <Text style={headerText}>PleinCap Croisières</Text>
          </Section>

          {/* Main content */}
          <Section style={contentSection}>
            <Text style={headingStyle}>{heading}</Text>
            <div
              style={contentStyle}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {ctaText && ctaUrl && (
              <Section style={buttonSection}>
                <Button style={button} href={ctaUrl}>
                  {ctaText}
                </Button>
              </Section>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Vous recevez cet email car vous êtes inscrit à la newsletter
              PleinCap.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Se désinscrire
              </Link>
            </Text>
            <Text style={footerText}>
              PleinCap Croisières - Voyages culturels de luxe
            </Text>
          </Section>

          {/* Tracking pixel for opens */}
          <Img
            src={`${baseUrl}/api/tracking/pixel.gif?c=${campaignId}&s=${subscriberId}`}
            width="1"
            height="1"
            alt=""
          />
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#F9F8F6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const header = {
  backgroundColor: '#1a2b3c',
  padding: '24px',
  textAlign: 'center' as const,
}

const headerText = {
  color: '#C5A059',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  fontFamily: 'Georgia, serif',
}

const contentSection = {
  padding: '32px 24px',
}

const headingStyle = {
  color: '#1a2b3c',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '32px',
  margin: '0 0 16px',
  fontFamily: 'Georgia, serif',
}

const contentStyle = {
  color: '#1a2b3c',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#C5A059',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  backgroundColor: '#F9F8F6',
  padding: '24px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const unsubscribeLink = {
  color: '#C5A059',
  textDecoration: 'underline',
}

// Export render function
export async function renderCampaignEmail(
  props: CampaignEmailProps
): Promise<string> {
  return await render(<CampaignEmail {...props} />)
}
