import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PromptGen Pro" />
        <meta property="og:description" content="Describe the task — get structured prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs." />
        <meta property="og:url" content="https://promptgen-pro.lxsaihub.com/" />
        <meta property="og:image" content="https://promptgen-pro.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PromptGen Pro" />
        <meta name="twitter:description" content="Describe the task — get structured prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs." />
        <meta name="twitter:image" content="https://promptgen-pro.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"PromptGen Pro","url":"https://promptgen-pro.lxsaihub.com/","description":"Describe the task — get structured prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs.","applicationCategory":"BusinessApplication","operatingSystem":"Web"}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
