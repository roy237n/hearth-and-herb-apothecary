import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props { name?: string; email?: string; subject?: string; message?: string }

const NewEnquiry = ({ name, email, subject, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New website enquiry{subject ? `: ${subject}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>GL Biochem Peptide</Text>
        <Heading style={h1}>New website enquiry</Heading>
        <Text style={label}>From</Text>
        <Text style={text}>{name || 'Visitor'} ({email || 'no email'})</Text>
        <Text style={label}>Subject</Text>
        <Text style={text}>{subject || '—'}</Text>
        <Hr style={hr} />
        <Text style={{ ...text, whiteSpace: 'pre-wrap' }}>{message || ''}</Text>
        <Hr style={hr} />
        <Text style={muted}>Reply from Admin → Inbox or email the visitor directly.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewEnquiry,
  subject: (d: Record<string, any>) => `New enquiry: ${d['subject'] || 'Website contact form'}`,
  displayName: 'New enquiry (to admin)',
  to: 'jingyanglbiochempeptides@gmail.com',
  previewData: { name: 'Jane Doe', email: 'jane@example.com', subject: 'Product enquiry: Retatrutide 10 mg', message: 'Hello, is this available for shipping to the UK?' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const brand = { fontSize: '13px', fontWeight: 700, color: '#16a34a', margin: '0 0 8px' }
const h1 = { fontSize: '22px', color: '#111111', margin: '0 0 20px' }
const label = { fontSize: '12px', color: '#666666', margin: '12px 0 2px', textTransform: 'uppercase' as const }
const text = { fontSize: '15px', color: '#111111', margin: '0', lineHeight: '1.5' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const muted = { fontSize: '12px', color: '#666666' }
