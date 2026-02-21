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
  Button,
} from '@react-email/components'
import { render } from '@react-email/render'

export interface LiveLinkNotificationProps {
  name: string
  conferenceTitle: string
  conferenceDate: string
  conferenceTime?: string
  speakerName?: string
  youtubeLiveUrl: string
  baseUrl: string
}

export default function LiveLinkNotification({
  name,
  conferenceTitle,
  conferenceDate,
  conferenceTime,
  speakerName,
  youtubeLiveUrl,
  baseUrl,
}: LiveLinkNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Le lien pour le live est disponible - {conferenceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>PleinCap Croisieres</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={headingStyle}>Votre conference en direct !</Text>
            <Text style={textStyle}>
              Bonjour {name},
            </Text>
            <Text style={textStyle}>
              Le lien pour rejoindre la visioconference en direct est maintenant disponible.
              Cliquez sur le bouton ci-dessous pour acceder au live YouTube.
            </Text>

            <Section style={infoBox}>
              <Text style={infoTitle}>{conferenceTitle}</Text>
              <Text style={infoDetail}>
                Date : {conferenceDate}
                {conferenceTime ? ` a ${conferenceTime}` : ''}
              </Text>
              {speakerName && (
                <Text style={infoDetail}>Conferencier : {speakerName}</Text>
              )}
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={youtubeLiveUrl}>
                Rejoindre le Live
              </Button>
            </Section>

            <Text style={smallText}>
              Ou copiez ce lien dans votre navigateur :{' '}
              <Link href={youtubeLiveUrl} style={linkStyle}>{youtubeLiveUrl}</Link>
            </Text>

            <Text style={textStyle}>
              A bientot sur{' '}
              <Link href={baseUrl} style={linkStyle}>plein-cap.com</Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              PleinCap Croisieres - Voyages culturels de luxe
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

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

const textStyle = {
  color: '#1a2b3c',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const infoBox = {
  backgroundColor: '#F9F8F6',
  border: '1px solid #C5A059',
  borderRadius: '4px',
  padding: '20px',
  margin: '24px 0',
}

const infoTitle = {
  color: '#1a2b3c',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  fontFamily: 'Georgia, serif',
}

const infoDetail = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '4px 0',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#C5A059',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
}

const smallText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0 0 24px',
}

const linkStyle = {
  color: '#C5A059',
  textDecoration: 'underline',
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

export async function renderLiveLinkNotification(
  props: LiveLinkNotificationProps
): Promise<string> {
  return await render(<LiveLinkNotification {...props} />)
}
