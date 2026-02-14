import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Preview,
} from '@react-email/components'
import { render } from '@react-email/render'

interface UnsubscribeConfirmationProps {
  email: string
  baseUrl: string
}

export default function UnsubscribeConfirmation({
  email,
  baseUrl,
}: UnsubscribeConfirmationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Désinscription confirmée - PleinCap</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>PleinCap</Text>
          </Section>
          <Section style={styles.content}>
            <Text style={styles.heading}>Désinscription confirmée</Text>
            <Text style={styles.paragraph}>
              Vous avez été désinscrit de la newsletter PleinCap. Vous ne recevrez plus nos
              communications.
            </Text>
            <Text style={styles.paragraph}>
              Si c'est une erreur, vous pouvez vous réinscrire sur notre site :
            </Text>
            <Section style={styles.buttonContainer}>
              <Link href={`${baseUrl}/news-letter`} style={styles.button}>
                Se réinscrire
              </Link>
            </Section>
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
}

export async function renderUnsubscribeConfirmation(
  props: UnsubscribeConfirmationProps
): Promise<string> {
  return await render(<UnsubscribeConfirmation {...props} />)
}
