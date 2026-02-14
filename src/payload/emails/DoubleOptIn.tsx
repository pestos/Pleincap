import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Preview,
  Img,
} from '@react-email/components'
import { render } from '@react-email/render'

interface DoubleOptInProps {
  email: string
  confirmUrl: string
  baseUrl: string
}

export default function DoubleOptIn({ email, confirmUrl, baseUrl }: DoubleOptInProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Confirmez votre inscription à la newsletter PleinCap</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>PleinCap</Text>
          </Section>
          <Section style={styles.content}>
            <Text style={styles.heading}>Confirmez votre inscription</Text>
            <Text style={styles.paragraph}>
              Merci de votre intérêt pour la newsletter PleinCap. Cliquez sur le bouton
              ci-dessous pour confirmer votre inscription.
            </Text>
            <Section style={styles.buttonContainer}>
              <Link href={confirmUrl} style={styles.button}>
                Confirmer mon inscription
              </Link>
            </Section>
            <Text style={styles.note}>
              <strong>Ce lien est valide pendant 24 heures.</strong>
            </Text>
            <Text style={styles.footer}>
              Si vous n'avez pas demandé cette inscription, ignorez cet email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#F9F8F6',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    maxWidth: '600px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1a2b3c',
    padding: '32px 24px',
    textAlign: 'center' as const,
  },
  logo: {
    color: '#C5A059',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
  },
  content: {
    padding: '40px 24px',
  },
  heading: {
    color: '#1a2b3c',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 24px 0',
    textAlign: 'center' as const,
  },
  paragraph: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 24px 0',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '32px 0',
  },
  button: {
    backgroundColor: '#C5A059',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    padding: '16px 32px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  note: {
    color: '#666666',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '24px 0 0 0',
    textAlign: 'center' as const,
  },
  footer: {
    color: '#999999',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '32px 0 0 0',
    textAlign: 'center' as const,
  },
}

export async function renderDoubleOptIn(props: DoubleOptInProps): Promise<string> {
  return await render(<DoubleOptIn {...props} />)
}
