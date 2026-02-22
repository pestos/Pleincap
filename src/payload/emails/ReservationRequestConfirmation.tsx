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
} from '@react-email/components'
import { render } from '@react-email/render'

export interface ReservationRequestConfirmationProps {
  name: string
  cruiseTitle: string
  cabinCategory: string
  adults: number
  children: number
  cabinsRequested: number
  baseUrl: string
}

export default function ReservationRequestConfirmation({
  name,
  cruiseTitle,
  cabinCategory,
  adults,
  children,
  cabinsRequested,
  baseUrl,
}: ReservationRequestConfirmationProps) {
  const travelersText = children > 0
    ? `${adults} adulte${adults > 1 ? 's' : ''} et ${children} enfant${children > 1 ? 's' : ''}`
    : `${adults} adulte${adults > 1 ? 's' : ''}`

  return (
    <Html>
      <Head />
      <Preview>Demande de reservation - {cruiseTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>PleinCap Croisieres</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={headingStyle}>Demande enregistree !</Text>
            <Text style={textStyle}>
              Bonjour {name},
            </Text>
            <Text style={textStyle}>
              Votre demande de reservation a bien ete enregistree. Notre equipe vous contactera sous 48h.
            </Text>

            <Section style={infoBox}>
              <Text style={infoTitle}>{cruiseTitle}</Text>
              <Text style={infoDetail}>
                Categorie de cabine : {cabinCategory}
              </Text>
              <Text style={infoDetail}>
                Voyageurs : {travelersText}
              </Text>
              <Text style={infoDetail}>
                Cabine{cabinsRequested > 1 ? 's' : ''} souhaitee{cabinsRequested > 1 ? 's' : ''} : {cabinsRequested}
              </Text>
            </Section>

            <Text style={textStyle}>
              En attendant, decouvrez nos croisieres sur{' '}
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

export async function renderReservationRequestConfirmation(
  props: ReservationRequestConfirmationProps
): Promise<string> {
  return await render(<ReservationRequestConfirmation {...props} />)
}
